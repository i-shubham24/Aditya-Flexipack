"use client";

import { useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { DIE, DieWindow, windowIntro } from "@/components/company/common/DieWindow";

/**
 * Sustainability's opener, composed from the company family (field, offcut contour, die-cut window, line reveal)
 * but laid out as a rail: the H1 stands alone at the bottom left across eight columns, and the right rail carries
 * the flat-bottom bag window high up, with the intro and the action under it.
 */
export function SustainHero({
  title,
  intro,
  tone,
  photo,
  action,
}: {
  title: string;
  intro: ReactNode;
  tone: Tone;
  photo: { src: string; alt: string };
  action: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];

  useHeroIntro(root, (tl) => windowIntro(root.current, DIE.gusset, tl));

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        {/* The bag's offcut, three times over, rising from the bottom left */}
        <svg aria-hidden viewBox={`0 0 ${DIE.gusset.w} ${DIE.gusset.h}`} className="pointer-events-none absolute -bottom-[75%] -left-[14%] h-[175%] w-auto">
          <path d={DIE.gusset.d} fill={t.contour} />
        </svg>

        <div className="shell page-grid relative min-h-[min(78svh,46rem)] gap-y-10 pb-[calc(var(--section-y)*0.7)] pt-[calc(var(--header-h)+2.5rem)]">
          <h1 id="page-title" data-hero-title className="display col-span-full self-end text-d1 lg:col-span-8 lg:row-start-1">
            {title}
          </h1>

          <div className="col-span-full lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-start">
            <DieWindow
              die={DIE.gusset}
              photo={photo}
              dark={t.dark}
              crop={{ scale: 1.25, x: 0.5, y: 0.45 }}
              className="h-[min(44svh,20rem)] w-auto max-w-full lg:h-[min(40svh,19rem)]"
            />
            <div data-hero-fade className={`mt-8 max-w-measure text-lead ${t.sub}`}>
              {intro}
            </div>
            <div data-hero-fade className="mt-8">
              {action}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
