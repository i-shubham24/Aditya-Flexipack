"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/company/common/CountUp";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { facts } from "@/content/site";
import type { Tone } from "@/components/system/tones";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HILL = "#3a040b";

// The three things the old Sustainability page leads with, as figures.
const STATS = [
  { value: facts.solar.value, unit: "MW", label: "solar power on site" },
  { value: facts.rainwater.value, unit: "", label: "rainwater harvesting systems" },
  { value: "3-stage", unit: "", label: "pyrolysis, turning waste into energy" },
];

/**
 * Sustainability opener, "sunrise over Rania": the campus seen through a round sun that rises from behind a dark
 * hill on load and sets as the page scrolls, with the plant's green figures counting up on the hill.
 * The sun has two layers: the outer one follows the scroll, the inner one plays the entrance.
 */
export function SustainHero(props?: { title?: string; intro?: ReactNode; tone?: Tone; photo?: { src: string; alt: string }; action?: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  void props;

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-photo]", { yPercent: 55, autoAlpha: 0, duration: 1.3, ease: "power3.out" }, 0.1);
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-sun-scroll]", {
          yPercent: 35,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="dark" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-wine text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M0 0 H1200 V160 C 980 250, 820 90, 600 170 S 200 290, 0 150 Z" fill="#520912" />
        </svg>

        <div className="shell page-grid relative flex-1 items-end gap-y-8 pt-[calc(var(--header-h)+1.5rem)]">
          <div className="span-lead relative z-10 pb-[clamp(1rem,5svh,4rem)]">
            <h1 id="page-title" data-hero-title className="display text-d1">
              Sustainable by design.
            </h1>
            <p data-hero-fade className="mt-5 max-w-[30rem] text-lead text-white/85">
              Clean energy, saved water and recycled waste, on one 18-acre campus.
            </p>
            <div data-hero-fade className="mt-7">
              <ButtonLink href="/packaging-partnership/" tone="white">
                Talk to us
              </ButtonLink>
            </div>
          </div>

          <div className="span-side flex justify-center lg:justify-end">
            <div data-sun-scroll className="w-[min(60vw,19rem)] lg:w-[min(26vw,24rem)]">
              <div data-hero-photo className="rounded-full bg-blush p-[4%]">
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/media/plant/plant-exterior.webp"
                    alt="The Aditya Flexipack campus at Rania, near Kanpur"
                    fill
                    priority
                    sizes="(min-width: 1024px) 29rem, 68vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The hill sits in front of the sun, so the sun rises from behind it and sets into it */}
        <div className="relative z-[5] -mt-[clamp(4.5rem,13vw,11rem)]">
          <svg aria-hidden viewBox="0 0 1200 160" preserveAspectRatio="none" className="block h-[clamp(4.5rem,13vw,11rem)] w-full">
            <path d="M0 160 V78 C 210 18, 430 112, 650 62 S 1030 8, 1200 52 V160 Z" fill={HILL} />
          </svg>
          <div style={{ background: HILL }}>
            <dl className="shell page-grid gap-y-5 pb-[clamp(1.25rem,4svh,2.5rem)] pt-1">
              {STATS.map((s) => (
                <div key={s.label} className="col-span-full sm:col-span-4 lg:col-span-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex items-baseline gap-3 sm:block">
                    <span className="display tabular text-[clamp(2rem,3.4vw,3.2rem)] leading-none">
                      <CountUp value={s.value} />
                      {s.unit && <span className="ml-1.5 text-[0.55em]">{s.unit}</span>}
                    </span>
                    <span className="block text-small text-white/75 sm:mt-1.5">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
