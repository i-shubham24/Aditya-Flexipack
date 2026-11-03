"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { EnquiryForm, StatusMessage, type EnquiryStatus } from "@/components/forms/EnquiryForm";
import { forms, PRODUCT_NEEDS } from "@/content/forms";
import { Pack, type PackFormat } from "@/components/ui/Pack";

/** The four steps of the old partnership process, set on the card as its route. */
const ROUTE = [
  { title: "Submit your application", body: "Share your company profile, product list and certifications." },
  { title: "Evaluation and review", body: "We assess your quality, compliance and strategic fit." },
  { title: "Testing and approval", body: "Submit samples and documents for final review." },
  { title: "Partnership agreement", body: "Receive onboarding confirmation and begin collaboration." },
];

/** One distinct pack silhouette per requirement (decorative; the label carries the meaning). */
const PACK: Record<(typeof PRODUCT_NEEDS)[number], PackFormat> = {
  "Single layer": "pillow",
  Laminate: "wrapper",
  "Laddi pack / polybag": "laddi",
  "CPP films": "gusset",
  "PE film": "polybag",
  Inks: "sachet",
  Cylinders: "spout",
  Pouches: "standup",
};
const packOf = (o?: string) => PACK[o as keyof typeof PACK];

/** Product pages can link here as /packaging-partnership/?product=laminates#begin to preselect a tile. */
const FROM_SLUG: Record<string, string> = {
  laminates: "Laminate",
  pouches: "Pouches",
  inks: "Inks",
  cylinders: "Cylinders",
  polybags: "Laddi pack / polybag",
};

const LABEL = Object.fromEntries(forms.packaging.fields.map((f) => [f.name, f.label]));
const DONE: EnquiryStatus[] = ["sent", "not-live", "failed"];

/** A live value: a soft blank bar until the visitor fills it, then the text, set in with a short rise. */
function Live({ value, className, bar }: { value?: string; className: string; bar: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const filled = Boolean(value?.trim());
  const was = useRef(filled);
  useEffect(() => {
    if (filled && !was.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    }
    was.current = filled;
  }, [filled]);
  return (
    <span ref={ref} className={`block break-words ${className}`}>
      {filled ? value : <span className={`block rounded-[var(--radius-xs)] ${bar}`} />}
    </span>
  );
}

/** One colour block of the card: the value first, its field name under it. */
function Block({ label, tone, children, className = "" }: { label: string; tone: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius-lg)] px-5 py-4 ${tone} ${className}`}>
      {children}
      <span className="mt-2 block text-caption font-semibold opacity-80">{label}</span>
    </div>
  );
}

/**
 * The Job Ticket, set as a stack of colour blocks beside the packaging form. It fills in live as the brand types,
 * and carries the partnership process as its route. A real delivery ticks step 1; while delivery is not live the
 * card says so instead, and it never fakes success.
 */
export function JobTicket() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [sent, setSent] = useState(false);
  const formBox = useRef<HTMLDivElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const done = DONE.includes(status);

  // Preselect a requirement from ?product= (an option's text or a product page slug).
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("product")?.trim().toLowerCase();
    if (!want) return;
    const option = FROM_SLUG[want] ?? PRODUCT_NEEDS.find((o) => o.toLowerCase() === want);
    const radio = option ? formBox.current?.querySelector<HTMLInputElement>(`input[name="product"][value="${option}"]`) : null;
    if (radio && !radio.checked) {
      radio.checked = true;
      radio.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  // The answer pops onto the card; on phones, bring it into view.
  useEffect(() => {
    const el = result.current;
    if (!done || !el) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.animate([{ opacity: 0, transform: "translateY(24px) scale(0.92)" }, { opacity: 1, transform: "none" }], {
        duration: 600,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      });
    }
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -window.innerHeight * 0.3 });
    else el.scrollIntoView({ block: "center" });
  }, [done, status]);

  const company = values.company;
  const product = values.product;
  const brief = values.brief?.trim();
  const shortBrief = brief && brief.length > 120 ? `${brief.slice(0, 120).trimEnd()}…` : brief;
  const pack = packOf(product);

  return (
    <div className="page-grid gap-y-8">
      {/* Phones: the two headline blocks above the form */}
      <div aria-hidden className="span-full grid grid-cols-2 gap-[3px] lg:hidden">
        <div className="rounded-[var(--radius-lg)] bg-wine px-4 py-4 text-white">
          <Live value={company} className="display text-d4" bar="h-6 w-4/5 bg-white/15" />
        </div>
        <div className="rounded-[var(--radius-lg)] bg-crimson px-4 py-4 text-white">
          <Live value={product} className="display text-d4" bar="h-6 w-3/5 bg-white/20" />
        </div>
      </div>

      <div ref={formBox} className="span-lead">
        <EnquiryForm
          form="packaging"
          tone="wash"
          statusDisplay="announce"
          tiles={{ product: (o) => <Pack format={packOf(o) ?? "standup"} /> }}
          onInput={setValues}
          onStatus={setStatus}
          onSent={() => setSent(true)}
        />
      </div>

      <div className="span-quarter grid content-start gap-[3px] lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
        {/* Phones see the filled values once the form has an answer; the blocks above the form cover the rest */}
        <div aria-hidden className={`grid gap-[3px] ${done ? "" : "max-lg:hidden"}`}>
          <Block label={LABEL.company} tone="bg-wine text-white">
            <Live value={company} className="display text-d3" bar="h-[1em] w-4/5 bg-white/15" />
          </Block>
          <Block label={LABEL.product} tone="bg-crimson text-white" className="relative overflow-hidden">
            <span className="flex items-end justify-between gap-3">
              <Live value={product} className="display min-w-0 text-d2" bar="h-[0.9em] w-36 bg-white/20" />
              <span className={`w-16 shrink-0 transition-opacity duration-300 ${pack ? "opacity-100" : "opacity-30"}`}>
                <Pack format={pack ?? "standup"} ink={pack ? "#45060e" : "#a10000"} />
              </span>
            </span>
          </Block>
          <div className="grid grid-cols-2 gap-[3px]">
            <Block label={LABEL.industry} tone="bg-blush text-wine">
              <Live value={values.industry} className="font-semibold" bar="h-[1.2em] w-4/5 bg-wine/10" />
            </Block>
            <Block label={`${LABEL.city}, ${LABEL.country.toLowerCase()}`} tone="bg-white text-ink">
              <Live value={[values.city, values.country].filter((v) => v?.trim()).join(", ")} className="font-semibold" bar="h-[1.2em] w-4/5 bg-foil" />
            </Block>
          </div>
          <Block label={LABEL.brief} tone="bg-white text-ink">
            <Live value={shortBrief} className="text-small leading-snug" bar="h-[2.6em] w-full bg-foil" />
          </Block>
        </div>

        <section aria-labelledby="ticket-route" className="rounded-[var(--radius-lg)] bg-ink px-5 py-5 text-white">
          <h3 id="ticket-route" className="display text-d4">
            Our partnership process
          </h3>
          <ol className="mt-5 grid gap-4">
            {ROUTE.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                <span
                  aria-hidden
                  className={`display tabular grid size-10 place-items-center rounded-[var(--radius-sm)] text-[1.1rem] transition-colors duration-500 ${
                    i === 0 ? (sent ? "bg-crimson text-white" : "bg-blush text-wine") : "bg-white/10 text-white/80"
                  }`}
                >
                  {i === 0 && sent ? <Check className="size-5" strokeWidth={3} /> : i + 1}
                </span>
                <div>
                  <p className="font-semibold leading-snug">{s.title}</p>
                  <p className="mt-0.5 text-small leading-snug text-white/75">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {done && (
          <div ref={result} className="mt-[calc(1.5rem-3px)] rounded-[var(--radius-lg)] bg-white px-5 py-5 text-ink">
            <StatusMessage status={status} className="text-[0.98rem] leading-relaxed" />
          </div>
        )}
      </div>
    </div>
  );
}
