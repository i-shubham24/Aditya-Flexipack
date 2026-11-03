"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tonal wavy contour layers calibrated for every product's color palette */
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
 * Product-line opener: calibrated with dynamic wavy graphics matched to each product's palette.
 */
export function RangeHero({
  name,
  note,
  lead,
  tone,
  photo,
  spec,
  actions,
}: {
  name: string;
  note?: string;
  lead?: ReactNode;
  tone: Tone;
  photo: { src: string; alt: string };
  spec?: { label: string; value: string }[];
  actions?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];
  const layers = CONTOURS[tone] ?? CONTOURS.crimson;

  useHeroIntro(root, (tl) => {
    tl.fromTo(
      "[data-range-photo]",
      { xPercent: 12, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
      0.2,
    );
    const [a, b] = ["[data-register=a]", "[data-register=b]"];
    tl.fromTo(a, { x: -6, y: -2, autoAlpha: 0.9 }, { x: 0, y: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(2)" }, 0.3)
      .fromTo(b, { x: 6, y: 3, autoAlpha: 0.9 }, { x: 0, y: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(2)" }, 0.3);
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
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title" className="h-[100svh] min-h-[640px]">
      <div className={`relative h-full flex flex-col justify-between overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        {/* Dynamic wavy contour graphics matched to the product's color palette */}
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

        <div className="shell page-grid relative z-10 flex-1 items-center gap-y-6 pt-[var(--header-h)] pb-4">
          <div className="span-lead relative z-10 max-w-[44rem]">
            <div className="relative isolate">
              <span aria-hidden data-register="a" className="display invisible absolute inset-0 -z-10 text-[clamp(3.4rem,7.5vw,7.4rem)] text-crimson-light">
                {name}
              </span>
              <span aria-hidden data-register="b" className={`display invisible absolute inset-0 -z-10 text-[clamp(3.4rem,7.5vw,7.4rem)] ${t.dark ? "text-ink" : "text-wine"}`}>
                {name}
              </span>
              <h1 id="page-title" className="display text-[clamp(3.4rem,7.5vw,7.4rem)] leading-[0.88]">
                {name}
              </h1>
            </div>
            {note && (
              <p data-hero-fade className={`hand mt-3 inline-block -rotate-2 text-note ${t.note}`}>
                {note}
              </p>
            )}
            {lead && (
              <div data-hero-fade className={`mt-4 max-w-[34rem] text-[clamp(1.05rem,1.3vw,1.22rem)] leading-relaxed ${t.sub}`}>
                {lead}
              </div>
            )}
            {actions && (
              <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                {actions}
              </div>
            )}
          </div>

          {/* Photo column: columns 9-12, framed cleanly with shadow and rounded corners */}
          <div
            data-range-photo
            className="relative -mx-[var(--gutter)] aspect-[16/10] lg:col-[9/13] lg:mx-0 lg:mr-[calc(-1*(var(--gutter)+max(0px,(100vw-92rem)/2)))] lg:aspect-auto lg:h-[min(48svh,25rem)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-l-[var(--radius-xl)] shadow-2xl border-l border-y border-white/20">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {spec && spec.length > 0 && (
          <div className={`${t.deeper} shrink-0 relative z-10 backdrop-blur-md`}>
            <dl data-spec className="shell page-grid gap-y-3 py-4">
              {spec.slice(0, 4).map((s) => (
                <div key={s.label} className="col-span-2 sm:col-span-4 lg:col-span-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-[clamp(1.6rem,2.2vw,2.2rem)]">{s.value}</span>
                    <span className={`mt-0.5 block text-caption ${t.sub}`}>{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
