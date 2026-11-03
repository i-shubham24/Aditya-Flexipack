"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Copy, Mail, Phone } from "lucide-react";

const row = "group/act flex min-h-12 w-full items-stretch gap-[3px] text-left text-[0.98rem] font-semibold";
const labelCls =
  "flex min-w-0 flex-1 items-center rounded-[var(--radius-sm)] bg-foil px-5 py-3 text-ink [overflow-wrap:anywhere] transition-transform duration-300 ease-[var(--ease-back)] group-hover/act:-translate-y-0.5";
const knobCls =
  "grid w-12 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-transform duration-300 ease-[var(--ease-back)] group-hover/act:-translate-y-0.5";

function Act({ href, icon, children, external }: { href: string; icon: ReactNode; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} className={row} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span className={labelCls}>{children}</span>
      <span aria-hidden className={knobCls}>
        {icon}
      </span>
    </a>
  );
}

/**
 * One address with its actions as a tidy stack of 48px split rows: open it in Google Maps, copy it, call, write.
 * No map embed; the Maps link does that job without third-party scripts.
 */
export function AddressCard({
  title,
  lines,
  mapUrl,
  phone,
  email,
}: {
  title: string;
  lines: readonly string[];
  mapUrl: string;
  phone?: { label: string; href: string };
  email?: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    const value = lines.join(", ");
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // No clipboard access: select the address so it can be copied by hand.
      const range = document.createRange();
      if (text.current) range.selectNodeContents(text.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  }

  return (
    <div>
      <h3 className="display text-d3 text-ink">{title}</h3>
      <address ref={text} className="mt-4 text-lead not-italic text-ink-soft">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <ul className="mt-7 grid max-w-[26rem] gap-[3px]">
        <li>
          <Act href={mapUrl} external icon={<ArrowUpRight className="size-5" strokeWidth={2.2} />}>
            Open in Google Maps
          </Act>
        </li>
        <li>
          <button type="button" onClick={copy} className={`${row} cursor-pointer`}>
            <span className={labelCls}>{copied ? "Address copied" : "Copy address"}</span>
            <span aria-hidden className={knobCls}>
              <Copy className="size-5" strokeWidth={2.2} />
            </span>
          </button>
        </li>
        {phone && (
          <li>
            <Act href={phone.href} icon={<Phone className="size-5" strokeWidth={2.2} />}>
              Call {phone.label}
            </Act>
          </li>
        )}
        {email && (
          <li>
            <Act href={`mailto:${email}`} icon={<Mail className="size-5" strokeWidth={2.2} />}>
              {email}
            </Act>
          </li>
        )}
      </ul>
      <p aria-live="polite" className="sr-only">
        {copied ? `${title} address copied` : ""}
      </p>
    </div>
  );
}
