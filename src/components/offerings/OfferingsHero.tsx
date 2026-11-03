"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { TONES, type Tone } from "@/components/system/tones";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The band's top edge is pinked, the zig-zag a sachet's crimp is cut with, so the photo reads as a pack torn open.
const TOOTH = 12;
const PINKED = `conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) 0 0 / ${TOOTH * 2}px ${TOOTH}px repeat-x, linear-gradient(#000 0 0) 0 ${TOOTH}px / 100% 100% no-repeat`;
const BAND_EDGE: CSSProperties = { WebkitMask: PINKED, mask: PINKED };

/**
 * The Offerings opener. Unlike the other range heroes (name beside a tall photo column), this one is a shop
 * front: the name, its Caveat note and one line along the top over a soft tonal contour, and a full-bleed
 * panoramic band of real packs filling the lower half of the field, its top edge pinked like a sachet seal. The band unrolls downward once after the loader,
 * and its photo drifts inside it as the hero scrolls away (linear, one to one). The HTML holds the open band.
 */
export function OfferingsHero({
  title,
  note,
  lead,
  actions,
  photo,
  tone,
}: {
  title: string;
  note?: string;
  lead: ReactNode;
  actions: ReactNode;
  photo: { src: string; alt: string };
  tone: Tone;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];

  // Entrance, on the band's outer layer: it unrolls from its pinked top edge.
  useHeroIntro(root, (tl) => {
    tl.fromTo(
      "[data-hero-teaser]",
      { autoAlpha: 1, clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
      0.2,
    );
  });

  // Scroll, on the photo's own inner layer, so the two never share a transform.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-band-photo]",
          { yPercent: 0 },
          { yPercent: 9, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        {/* A soft tonal contour across the field, as on every colour panel */}
        <svg aria-hidden viewBox="0 0 1200 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[70%] w-full">
          <path d="M0 0 H1200 V120 C 1000 220, 840 70, 620 150 S 220 280, 0 170 Z" fill={t.contour} />
        </svg>

        <div className="shell page-grid relative items-end gap-y-6 pb-[var(--stack)] pt-[calc(var(--header-h)+2.5rem)]">
          <div className="span-lead flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <h1 id="page-title" data-hero-title className="display text-d0">
              {title}
            </h1>
            {note && (
              <p data-hero-fade className={`hand inline-block -rotate-2 text-note ${t.note}`}>
                {note}
              </p>
            )}
          </div>
          <div className="span-side lg:pb-[0.35em]">
            <div data-hero-fade className="max-w-[30rem] text-lead font-medium">
              {lead}
            </div>
            <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          </div>
        </div>

        <div
          data-hero-teaser
          style={BAND_EDGE}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video lg:aspect-[21/9] lg:max-h-[min(52svh,34rem)]"
        >
          <div data-band-photo className="absolute inset-x-0 -top-[10%] h-[120%]">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
