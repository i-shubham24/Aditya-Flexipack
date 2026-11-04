"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tonal wavy contour layers calibrated for every color palette */
const CONTOURS: Record<Tone, [string, string, string]> = {
  crimson: ["#dc0a05", "#e81911", "#b80000"],
  wine: ["#520912", "#5c0b15", "#3a040b"],
  deep: ["#b80000", "#8a0000", "#700000"],
  ink: ["#2a2124", "#382e32", "#140e10"],
  foil: ["#e4e7eb", "#dadee3", "#f4f5f7"],
  blush: ["#ffb4aa", "#ffd6d0", "#ffa195"],
  wash: ["#ffd9d3", "#ffcfc8", "#ffece9"],
};

/**
 * Short opener for desk pages: full screen on desktop like the Home hero, shorter on phones and tablets (.hero-h).
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
  const layers = CONTOURS[tone] ?? CONTOURS.crimson;

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-teaser]", { y: 36, autoAlpha: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.55);
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-contour]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title" className="hero-h">
      <div className={`relative h-full overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        {/* Dynamic wavy contour graphics matched to the palette */}
        <svg
          aria-hidden
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            data-contour
            d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z"
            fill={layers[0]}
          />
          <path
            data-contour
            d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z"
            fill={layers[1]}
          />
          <path
            data-contour
            d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z"
            fill={layers[2]}
          />
        </svg>

        <div className="shell page-grid relative z-10 flex h-full flex-col justify-center pb-[4svh] pt-[var(--header-h)] lg:grid lg:items-center lg:gap-y-6">
          <div className="span-lead max-w-[42rem]">
            <h1 id="page-title" data-hero-title className="display text-[clamp(2.4rem,4.6vw,4.8rem)] leading-[0.92]">
              {title}
            </h1>
            {intro && (
              <div data-hero-fade className={`mt-4 max-w-[32rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed ${t.sub}`}>
                {intro}
              </div>
            )}
            {actions && (
              <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                {actions}
              </div>
            )}
          </div>
          {teaser && (
            <div data-hero-teaser className="span-quarter mt-6 lg:mt-0">
              {teaser}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
