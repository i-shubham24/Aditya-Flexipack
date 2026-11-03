"use client";

import { useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

/**
 * Short opener for the desk pages (Packaging partnership, Vendor partnership, Contact): the H1 and intro on the
 * left line, and a teaser of the page's own centrepiece in 9-12 that arrives last.
 */
export function PartnerHero({
  title,
  intro,
  tone,
  teaser,
  actions,
}: {
  title: string;
  intro?: ReactNode;
  tone: Tone;
  teaser?: ReactNode;
  actions?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];
  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-teaser]", { y: 36, autoAlpha: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.55);
  });

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[55%] w-full">
          <path d="M0 330 C 220 250, 420 420, 660 330 S 1020 190, 1200 260 V600 H0 Z" fill={t.contour} />
        </svg>
        <div className="shell page-grid relative min-h-[min(60svh,36rem)] items-end gap-y-10 pb-[calc(var(--section-y)*0.6)] pt-[calc(var(--header-h)+2.5rem)]">
          <div className="span-lead">
            <h1 id="page-title" data-hero-title className="display text-d1">
              {title}
            </h1>
            {intro && (
              <div data-hero-fade className={`mt-6 max-w-measure text-lead ${t.sub}`}>
                {intro}
              </div>
            )}
            {actions && (
              <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {actions}
              </div>
            )}
          </div>
          {teaser && (
            <div data-hero-teaser className="span-quarter">
              {teaser}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
