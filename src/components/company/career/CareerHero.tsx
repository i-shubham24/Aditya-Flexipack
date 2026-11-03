"use client";

import { useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { DIE, DieWindow, windowIntro } from "@/components/company/common/DieWindow";

/**
 * Career's opener, composed from the company family but turned around: the intro and the way in come first, top
 * left, the H1 holds the bottom left, and a tall spout-pouch window rises out of the bottom edge on the right,
 * cut off by the field like a pack coming up off the line.
 */
export function CareerHero({
  title,
  intro,
  note,
  tone,
  photo,
  action,
}: {
  title: string;
  intro: ReactNode;
  note: string;
  tone: Tone;
  photo: { src: string; alt: string };
  action: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];

  useHeroIntro(root, (tl) => windowIntro(root.current, DIE.spout, tl));

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        {/* The pouch's offcut, three times over, hanging from the top left */}
        <svg aria-hidden viewBox={`0 0 ${DIE.spout.w} ${DIE.spout.h}`} className="pointer-events-none absolute -left-[16%] -top-[62%] h-[170%] w-auto">
          <path d={DIE.spout.d} fill={t.contour} />
        </svg>

        <div className="shell page-grid relative min-h-[min(78svh,46rem)] gap-y-8 pb-[calc(var(--section-y)*0.7)] pt-[calc(var(--header-h)+2.5rem)] lg:grid-rows-[auto_1fr]">
          <h1 id="page-title" data-hero-title className="display col-span-full self-end text-d1 lg:col-span-7 lg:row-start-2">
            {title}
          </h1>

          <div className="col-span-full lg:col-span-5 lg:row-start-1">
            <div data-hero-fade className={`max-w-measure text-lead ${t.sub}`}>
              {intro}
            </div>
            <div data-hero-fade className="mt-6">
              {action}
            </div>
          </div>

          <figure className="relative col-span-full lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:-mb-[calc(var(--section-y)*0.7+4rem)] lg:self-end lg:justify-self-end">
            <DieWindow
              die={DIE.spout}
              photo={photo}
              dark={t.dark}
              crop={{ scale: 1.1, x: 0.5, y: 0.6 }}
              className="h-[min(56svh,26rem)] w-auto max-w-full lg:h-[min(72svh,40rem)]"
            />
            <figcaption
              data-hero-fade
              className={`hand mt-3 inline-block -rotate-2 text-note lg:absolute lg:right-full lg:top-[16%] lg:mr-4 lg:mt-0 lg:whitespace-nowrap ${t.note}`}
            >
              {note}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
