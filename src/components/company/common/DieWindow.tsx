"use client";

import { useId } from "react";
import { gsap } from "gsap";

/** Pack silhouettes as die lines (the same outlines CompanyHero cuts), for heroes composed outside it. */
export const DIE = {
  gusset: { w: 100, h: 150, d: "M14 4 H86 L92 18 V140 Q92 146 86 146 H14 Q8 146 8 140 V18 Z" },
  spout: { w: 100, h: 150, d: "M40 2 H60 V18 H56 V24 Q72 22 86 24 L92 132 Q92 146 78 146 H22 Q8 146 8 132 L14 24 Q28 22 44 24 V18 H40 Z" },
} as const;

export type Die = (typeof DIE)[keyof typeof DIE];

/**
 * One real photograph seen through a pack-shaped die-cut window, with its cut line and dashed bleed line.
 * `crop` zooms the photo inside the window (1 = fit) and sets where it centres, so each hero frames its own view.
 */
export function DieWindow({
  die,
  photo,
  dark,
  crop = { scale: 1, x: 0.5, y: 0.5 },
  className = "",
}: {
  die: Die;
  photo: { src: string; alt: string };
  dark: boolean;
  crop?: { scale: number; x: number; y: number };
  className?: string;
}) {
  const clip = `die-${useId().replace(/[:«»]/g, "")}`;
  const stroke = dark ? "#ffffff" : "#1c1517";
  const w = die.w * crop.scale;
  const h = die.h * crop.scale;
  return (
    <svg viewBox={`-6 -6 ${die.w + 12} ${die.h + 12}`} role="img" aria-label={photo.alt} className={`block ${className}`}>
      <defs>
        <clipPath id={clip}>
          <path d={die.d} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <image
          data-window-photo
          href={photo.src}
          x={-(w - die.w) * crop.x}
          y={-(h - die.h) * crop.y}
          width={w}
          height={h}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
      <path data-dieline d={die.d} fill="none" stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />
      <path
        d={die.d}
        fill="none"
        stroke={stroke}
        strokeOpacity="0.45"
        strokeWidth="0.5"
        strokeDasharray="2.5 2"
        transform={`translate(${die.w / 2} ${die.h / 2}) scale(1.06) translate(${-die.w / 2} ${-die.h / 2})`}
      />
    </svg>
  );
}

/** The company family's entrance moves for a die window, added to a hero's intro timeline. */
export function windowIntro(scope: HTMLElement | null, die: Die, tl: gsap.core.Timeline) {
  scope?.querySelectorAll<SVGPathElement>("[data-dieline]").forEach((p) => {
    const len = p.getTotalLength();
    tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.1);
  });
  const photo = scope?.querySelector("[data-window-photo]");
  if (photo) tl.from(photo, { scale: 1.04, svgOrigin: `${die.w / 2} ${die.h / 2}`, duration: 1.2, ease: "power2.out" }, 0.1);
}
