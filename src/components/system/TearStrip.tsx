"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nextPage } from "@/content/next";
import { type Tone } from "@/components/system/tones";
import { setCurtainTone } from "@/components/layout/RouteCurtain";

const AVOID_FOOTER: Partial<Record<Tone, Tone>> = { wine: "crimson" };

/**
 * The shared ending: a clean, pure white panel directly above the footer that invites users
 * to the next section. Hover or focus lifts it gracefully with high-contrast typography.
 */
export function TearStrip({ from, tone }: { from: string; tone?: Tone }) {
  const next = nextPage(from);
  if (!next) return null;
  const field = tone ?? AVOID_FOOTER[next.tone] ?? next.tone;

  return (
    <section aria-labelledby="tear-title" className="pt-[var(--frame)]">
      <Link
        href={next.href}
        onClick={() => setCurtainTone(field)}
        className="panel group block min-h-[clamp(18rem,45vh,28rem)] bg-white text-ink border-t border-foil-2 shadow-sm transition-transform duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
      >
        <div className="shell page-grid min-h-[inherit] content-end gap-y-8 pb-[var(--section-y)] pt-[var(--section-y)]">
          <div className="span-lead">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 id="tear-title" className="display text-d1 text-ink group-hover:text-crimson transition-colors">
                <span className="sr-only">Next page: </span>
                {next.title}
              </h2>
              <span aria-hidden className="hand inline-block -rotate-2 text-note text-crimson">
                next page
              </span>
            </div>
            <p className="mt-4 text-lead text-ink-soft">{next.note}</p>
          </div>
          <div className="span-side flex items-end lg:justify-end">
            <span
              aria-hidden
              className="grid size-16 place-items-center rounded-[var(--radius-sm)] bg-crimson text-white transition-all duration-300 ease-[var(--ease-back)] group-hover:translate-x-1 group-hover:bg-wine shadow-sm"
            >
              <ArrowRight className="size-7" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
