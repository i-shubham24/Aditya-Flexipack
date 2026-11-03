"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nextPage } from "@/content/next";
import { TONES, type Tone } from "@/components/system/tones";
import { setCurtainTone } from "@/components/layout/RouteCurtain";

// The wine footer sits directly below this panel, so a wine destination is shown in crimson instead.
const AVOID_FOOTER: Partial<Record<Tone, Tone>> = { wine: "crimson" };

/**
 * The shared ending: a rounded panel in the next page's colour that is one big link to it. Hover or focus lifts it,
 * and the route curtain comes down in the same colour so the hand-off is seamless. Pass `tone` if the section
 * above would otherwise share its colour.
 */
export function TearStrip({ from, tone }: { from: string; tone?: Tone }) {
  const next = nextPage(from);
  if (!next) return null;
  const field = tone ?? AVOID_FOOTER[next.tone] ?? next.tone;
  const t = TONES[field];

  return (
    <section aria-labelledby="tear-title" className="pt-[var(--frame)]">
      <Link
        href={next.href}
        onClick={() => setCurtainTone(field)}
        className={`panel group block min-h-[clamp(18rem,45vh,28rem)] transition-transform duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5 ${t.bg} ${t.ink}`}
      >
        <div className="shell page-grid min-h-[inherit] content-end gap-y-8 pb-[var(--section-y)] pt-[var(--section-y)]">
          <div className="span-lead">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 id="tear-title" className="display text-d1">
                <span className="sr-only">Next page: </span>
                {next.title}
              </h2>
              <span aria-hidden className={`hand inline-block -rotate-2 text-note ${t.note}`}>
                next page
              </span>
            </div>
            <p className={`mt-4 text-lead ${t.sub}`}>{next.note}</p>
          </div>
          <div className="span-side flex items-end lg:justify-end">
            <span
              aria-hidden
              className={`grid size-16 place-items-center rounded-[var(--radius-sm)] transition-transform duration-300 ease-[var(--ease-back)] group-hover:translate-x-1 ${
                t.dark ? "bg-white text-ink" : "bg-ink text-white"
              }`}
            >
              <ArrowRight className="size-7" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
