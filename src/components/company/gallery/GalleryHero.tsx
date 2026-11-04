"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const H = (f: string) => `/media/old/home/${f}.webp`;
const G = (f: string) => `/media/old/gallery/${f}.webp`;

// A walk along the line: press hall, film, cylinders, converting, campus.
const STRIP = [
  { src: H("plant-press-hall-overview"), alt: "The press hall from above, with a gravure press line" },
  { src: G("plant-blown-film-tower-stairs"), alt: "Blown film tower with its blue and cream stairways" },
  { src: H("plant-copper-cylinder-engraver"), alt: "Copper gravure cylinder on the engraving machine" },
  { src: G("plant-printed-film-rewinder"), alt: "Blue printed film running on a rewinder" },
  { src: H("plant-laminator-unwind-s575"), alt: "Laminator unwind stand with a roll of white film" },
  { src: G("plant-proof-press-wide"), alt: "Proof press with a printed sleeve on the cylinder" },
  { src: H("plant-exterior-building"), alt: "The plant building with its lawn and flagpoles" },
];

/**
 * Gallery opener: the title on the wash field, and a strip of real plant photos along the foot that rises into
 * place on load and drifts sideways only as the page scrolls.
 */
export function GalleryHero() {
  const root = useRef<HTMLElement>(null);

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-photo]", { yPercent: 35, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }, 0.15);
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The strip (outer) follows the scroll; each photo (inner) plays its own entrance.
        gsap.to("[data-strip]", {
          xPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="light" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson-wash text-wine">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 520 C 240 430, 470 640, 730 540 S 1060 420, 1200 480 V800 H0 Z" fill="#ffd6d0" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center gap-y-5 pb-8 pt-[calc(var(--header-h)+1.5rem)]">
          <div className="span-lead">
            <h1 id="page-title" data-hero-title className="display text-d1">
              Our plant and journey
            </h1>
          </div>
          <div className="span-side self-end">
            <p data-hero-fade className="hand inline-block -rotate-2 text-note text-crimson">
              Capturing excellence
            </p>
            <p data-hero-fade className="mt-3 max-w-[26rem] text-lead text-ink-soft">
              A walk through our 18-acre plant near Kanpur.
            </p>
          </div>
        </div>

        <div className="relative pb-[clamp(1.25rem,4svh,2.5rem)]">
          <ul data-strip className="flex w-max gap-[clamp(0.75rem,1.4vw,1.25rem)] px-[var(--gutter)]">
            {STRIP.map((p) => (
              <li key={p.src} data-hero-photo className="relative aspect-[4/5] h-[clamp(10rem,30svh,19rem)] overflow-hidden rounded-[var(--radius-lg)]">
                <Image src={p.src} alt={p.alt} fill priority sizes="(min-width: 1024px) 16rem, 40vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
