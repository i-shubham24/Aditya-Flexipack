"use client";

import { useId, useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

export type WindowShape = "standup" | "gusset" | "pillow" | "sachet" | "spout";

// Pack silhouettes drawn as die lines. Each company page looks at its photo through a different one.
const SHAPES: Record<WindowShape, { w: number; h: number; d: string }> = {
  standup: { w: 100, h: 140, d: "M8 4 H92 V12 L88 15 L92 18 V120 Q92 136 76 136 H24 Q8 136 8 120 V18 L12 15 L8 12 Z" },
  gusset: { w: 100, h: 150, d: "M14 4 H86 L92 18 V140 Q92 146 86 146 H14 Q8 146 8 140 V18 Z" },
  pillow: {
    w: 150,
    h: 104,
    d: "M10 6 H140 L146 12 L140 18 L146 24 L140 30 L146 36 L140 42 L146 48 L140 54 L146 60 L140 66 L146 72 L140 78 L146 84 L140 90 L146 96 L140 98 H10 L4 96 L10 90 L4 84 L10 78 L4 72 L10 66 L4 60 L10 54 L4 48 L10 42 L4 36 L10 30 L4 24 L10 18 L4 12 Z",
  },
  sachet: { w: 84, h: 116, d: "M4 4 H80 V22 L74 26 L80 30 V112 H4 Z" },
  spout: { w: 100, h: 150, d: "M40 2 H60 V18 H56 V24 Q72 22 86 24 L92 132 Q92 146 78 146 H22 Q8 146 8 132 L14 24 Q28 22 44 24 V18 H40 Z" },
};

/**
 * Company-page opener (About, Sustainability, Awards, Gallery, Career): H1 bottom-left on the left line, and one
 * real photograph seen through a pack-shaped die-cut window whose die line draws itself in. The window's offcut,
 * three times larger, is the field's tonal contour.
 */
export function CompanyHero({
  title,
  intro,
  note,
  tone,
  shape,
  photo,
  actions,
}: {
  title: string;
  intro?: ReactNode;
  note?: string;
  tone: Tone;
  shape: WindowShape;
  photo: { src: string; alt: string };
  actions?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const clip = `win-${useId().replace(/[:«»]/g, "")}`;
  const t = TONES[tone];
  const s = SHAPES[shape];

  useHeroIntro(root, (tl) => {
    const lines = root.current?.querySelectorAll<SVGPathElement>("[data-dieline]") ?? [];
    lines.forEach((p) => {
      const len = p.getTotalLength();
      tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.1);
    });
    tl.from("[data-window-photo]", { scale: 1.04, svgOrigin: `${s.w / 2} ${s.h / 2}`, duration: 1.2, ease: "power2.out" }, 0.1);
  });

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        <svg aria-hidden viewBox={`0 0 ${s.w} ${s.h}`} className="pointer-events-none absolute -right-[12%] -top-[35%] h-[175%] w-auto">
          <path d={s.d} fill={t.contour} />
        </svg>

        <div className="shell page-grid relative min-h-[min(78svh,46rem)] items-end gap-y-10 pb-[calc(var(--section-y)*0.7)] pt-[calc(var(--header-h)+2.5rem)]">
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

          <figure className="span-side relative lg:pl-[8%]">
            <svg viewBox={`-6 -6 ${s.w + 12} ${s.h + 12}`} role="img" aria-label={photo.alt} className="block h-auto max-h-[60svh] w-full max-w-[22rem] lg:ml-auto lg:max-h-[min(64svh,34rem)] lg:max-w-none">
              <defs>
                <clipPath id={clip}>
                  <path d={s.d} />
                </clipPath>
              </defs>
              <g clipPath={`url(#${clip})`}>
                <image data-window-photo href={photo.src} x="0" y="0" width={s.w} height={s.h} preserveAspectRatio="xMidYMid slice" />
              </g>
              {/* Cut line, and the bleed line a few millimetres outside it, as on a die-line drawing */}
              <path data-dieline d={s.d} fill="none" stroke={t.dark ? "#ffffff" : "#1c1517"} strokeWidth="0.9" strokeLinejoin="round" />
              <path
                d={s.d}
                fill="none"
                stroke={t.dark ? "#ffffff" : "#1c1517"}
                strokeOpacity="0.45"
                strokeWidth="0.5"
                strokeDasharray="2.5 2"
                transform={`translate(${s.w / 2} ${s.h / 2}) scale(1.06) translate(${-s.w / 2} ${-s.h / 2})`}
              />
            </svg>
            {note && (
              <figcaption data-hero-fade className={`hand mt-4 inline-block -rotate-2 text-note ${t.note}`}>
                {note}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
