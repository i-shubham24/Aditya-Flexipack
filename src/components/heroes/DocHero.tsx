"use client";

import { useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

/** Plain sheet for the legal pages: a short field, the H1 on the document column, lines rise and nothing else. */
export function DocHero({ title, intro, tone }: { title: string; intro?: ReactNode; tone: Tone }) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];
  useHeroIntro(root);

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        <div className="shell page-grid min-h-[max(40svh,22rem)] items-end pb-[calc(var(--section-y)*0.6)] pt-[calc(var(--header-h)+2.5rem)]">
          <div className="span-doc">
            <h1 id="page-title" data-hero-title className="display text-d1">
              {title}
            </h1>
            {intro && (
              <div data-hero-fade className={`mt-5 max-w-doc text-lead ${t.sub}`}>
                {intro}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
