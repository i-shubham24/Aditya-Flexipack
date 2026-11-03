import { forms, type FormId } from "@/content/forms";
import { site } from "@/content/site";

const MAX_FILE = 5 * 1024 * 1024;
const FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Receives every site form. Validates against the same definitions the forms render from, then mails the
 * enquiry through Resend when RESEND_API_KEY is set. Until then it answers 503 "not-live" so the page can say so.
 */
export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const id = String(data.get("form") ?? "") as FormId;
  const def = forms[id];
  if (!def) return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  // Bots fill the hidden field; people never see it.
  if (String(data.get("website") ?? "")) return Response.json({ ok: true });

  const errors: Record<string, string> = {};
  const lines: string[] = [];
  const attachments: { filename: string; content: string }[] = [];

  for (const f of def.fields) {
    if (f.type === "file") {
      const files = data.getAll(f.name).filter((v): v is File => v instanceof File && v.size > 0);
      if (files.length > (f.maxFiles ?? 1)) errors[f.name] = `Please attach no more than ${f.maxFiles ?? 1} files.`;
      else if (files.some((v) => v.size > MAX_FILE)) errors[f.name] = "Please attach files under 5 MB each.";
      else if (files.some((v) => !FILE_TYPES.includes(v.type))) errors[f.name] = "Please attach PDF or Word documents.";
      else if (!files.length && f.required) errors[f.name] = `Please attach your ${f.label.toLowerCase()}.`;
      else for (const v of files) attachments.push({ filename: v.name, content: Buffer.from(await v.arrayBuffer()).toString("base64") });
      continue;
    }
    const v = data.get(f.name);
    const s = typeof v === "string" ? v.trim().slice(0, 4000) : "";
    if (f.required && !s) errors[f.name] = `Please enter your ${f.label.toLowerCase()}.`;
    else if (s && f.type === "email" && !EMAIL.test(s)) errors[f.name] = "Please enter a valid email address.";
    else if (s && f.type === "tel" && s.replace(/\D/g, "").length < 8) errors[f.name] = "Please enter a phone number we can call.";
    else if (s && f.options && !f.options.includes(s)) errors[f.name] = "Please choose one of the options.";
    if (s) lines.push(`${f.label}: ${s}`);
  }

  if (Object.keys(errors).length) return Response.json({ ok: false, reason: "invalid", errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, reason: "not-live" }, { status: 503 });

  const replyTo = String(data.get("email") ?? "");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `${site.name} website <website@adityaflexipack.com>`,
      to: [process.env.ENQUIRY_TO ?? site.email],
      reply_to: EMAIL.test(replyTo) ? replyTo : undefined,
      subject: `${def.subject} from ${String(data.get("company") ?? data.get("firstName") ?? data.get("name") ?? "the website")}`,
      text: lines.join("\n"),
      attachments: attachments.length ? attachments : undefined,
    }),
  });
  if (!res.ok) return Response.json({ ok: false, reason: "failed" }, { status: 502 });
  return Response.json({ ok: true });
}
