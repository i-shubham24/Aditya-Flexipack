import { forms, type FormId } from "@/content/forms";
import { site } from "@/content/site";

const MAX_FILE = 5 * 1024 * 1024;
const FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXTS = [".pdf", ".doc", ".docx"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// 1. IN-MEMORY RATE LIMITING (SLIDING WINDOW)
// ==========================================
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 submissions per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // Evict expired entries opportunistically (5% of requests)
  if (Math.random() < 0.05) {
    for (const [key, record] of rateLimits.entries()) {
      if (now > record.resetAt) rateLimits.delete(key);
    }
  }

  const record = rateLimits.get(ip);
  if (!record || now > record.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= MAX_REQUESTS) {
    return true;
  }
  record.count += 1;
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

// ==========================================
// 2. CSRF & ORIGIN CHECK
// ==========================================
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) return true; // Direct same-origin browser requests or test agents
    try {
      const url = new URL(referer);
      if (host && url.host === host) return true;
      return (
        url.hostname === "adityaflexipack.com" ||
        url.hostname.endsWith(".adityaflexipack.com") ||
        url.hostname.endsWith(".vercel.app") ||
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      );
    } catch {
      return false;
    }
  }

  try {
    const url = new URL(origin);
    if (host && url.host === host) return true;
    return (
      url.hostname === "adityaflexipack.com" ||
      url.hostname.endsWith(".adityaflexipack.com") ||
      url.hostname.endsWith(".vercel.app") ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

// ==========================================
// 3. DEEP FILE VALIDATION (MAGIC BYTES)
// ==========================================
function isValidDocumentMagicBytes(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;
  // %PDF- (0x25, 0x50, 0x44, 0x46, 0x2D)
  if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  ) {
    return true;
  }
  // PK\x03\x04 (ZIP container for DOCX / OpenXML)
  if (
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04
  ) {
    return true;
  }
  // OLE2 Compound Document for legacy DOC
  if (
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1
  ) {
    return true;
  }
  return false;
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/\0/g, "")
    .replace(/[/\\?%*:|"<>]/g, "_")
    .replace(/\.\.+/g, ".")
    .trim()
    .slice(0, 100);
}

function sanitizeHeader(val: string): string {
  // Strip CRLF to prevent email header injection
  return val.replace(/[\r\n\0]/g, " ").trim();
}

/**
 * Receives every site form. Validates against the same definitions the forms render from, then mails the
 * enquiry through Resend when RESEND_API_KEY is set. Until then it answers 503 "not-live" so the page can say so.
 */
export async function POST(request: Request) {
  // 1. CSRF Protection: Verify request origin
  if (!isAllowedOrigin(request)) {
    return Response.json(
      { ok: false, reason: "forbidden", error: "Cross-site request blocked." },
      { status: 403 },
    );
  }

  // 2. Rate Limiting by client IP
  const clientIp = getClientIp(request);
  if (checkRateLimit(clientIp)) {
    return Response.json(
      {
        ok: false,
        reason: "rate-limited",
        error: "Too many requests. Please wait a few minutes before submitting again.",
      },
      {
        status: 429,
        headers: { "Retry-After": "600" },
      },
    );
  }

  // 3. Parse and validate form payload
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const id = String(data.get("form") ?? "") as FormId;
  const def = forms[id];
  if (!def) return Response.json({ ok: false, reason: "invalid" }, { status: 400 });

  // Bot honeypot: Bots fill the hidden field; humans never see it
  if (String(data.get("website") ?? "")) {
    return Response.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const lines: string[] = [];
  const attachments: { filename: string; content: string }[] = [];

  for (const f of def.fields) {
    if (f.type === "file") {
      const files = data
        .getAll(f.name)
        .filter((v): v is File => v instanceof File && v.size > 0);

      if (files.length > (f.maxFiles ?? 1)) {
        errors[f.name] = `Please attach no more than ${f.maxFiles ?? 1} files.`;
      } else if (files.some((v) => v.size > MAX_FILE)) {
        errors[f.name] = "Please attach files under 5 MB each.";
      } else if (files.some((v) => !FILE_TYPES.includes(v.type))) {
        errors[f.name] = "Please attach PDF or Word documents.";
      } else if (
        files.some(
          (v) =>
            !ALLOWED_EXTS.some((ext) => v.name.toLowerCase().endsWith(ext)),
        )
      ) {
        errors[f.name] = "Only .pdf, .doc, and .docx files are permitted.";
      } else if (!files.length && f.required) {
        errors[f.name] = `Please attach your ${f.label.toLowerCase()}.`;
      } else {
        // Deep inspection of magic bytes to ensure file is legitimate
        let hasInvalidMagicBytes = false;
        for (const file of files) {
          const rawBuffer = await file.arrayBuffer();
          const bytes = new Uint8Array(rawBuffer);
          if (!isValidDocumentMagicBytes(bytes)) {
            hasInvalidMagicBytes = true;
            break;
          }
          const cleanName = sanitizeFilename(file.name);
          attachments.push({
            filename: cleanName || "attachment.pdf",
            content: Buffer.from(rawBuffer).toString("base64"),
          });
        }
        if (hasInvalidMagicBytes) {
          errors[f.name] =
            "The attached file is not a valid PDF or Word document.";
        }
      }
      continue;
    }

    const v = data.get(f.name);
    // Enforce 4,000 char maximum length to mitigate buffer bloat
    const s = typeof v === "string" ? v.trim().slice(0, 4000) : "";
    if (f.required && !s) {
      errors[f.name] = `Please enter your ${f.label.toLowerCase()}.`;
    } else if (s && f.type === "email" && !EMAIL.test(s)) {
      errors[f.name] = "Please enter a valid email address.";
    } else if (s && f.type === "tel" && s.replace(/\D/g, "").length < 8) {
      errors[f.name] = "Please enter a phone number we can call.";
    } else if (s && f.options && !f.options.includes(s)) {
      errors[f.name] = "Please choose one of the options.";
    }
    if (s) {
      lines.push(`${f.label}: ${s}`);
    }
  }

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, reason: "invalid", errors }, { status: 422 });
  }

  // 4. Dispatch email through Resend
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ ok: false, reason: "not-live" }, { status: 503 });
  }

  const rawReplyTo = String(data.get("email") ?? "");
  const replyTo = EMAIL.test(rawReplyTo) ? sanitizeHeader(rawReplyTo) : undefined;
  const rawSubject = `${def.subject} from ${String(
    data.get("company") ??
      data.get("firstName") ??
      data.get("name") ??
      "the website",
  )}`;
  const subject = sanitizeHeader(rawSubject);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.ENQUIRY_FROM ??
          `${site.name} website <website@adityaflexipack.com>`,
        to: [process.env.ENQUIRY_TO ?? site.email],
        reply_to: replyTo,
        subject,
        text: lines.join("\n"),
        attachments: attachments.length ? attachments : undefined,
      }),
      // Network timeout to prevent hung serverless execution
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return Response.json({ ok: false, reason: "failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, reason: "failed", error: "Delivery timed out or failed." },
      { status: 504 },
    );
  }
}
