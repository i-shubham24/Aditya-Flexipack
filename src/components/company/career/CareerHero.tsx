"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { afterLoader } from "@/components/layout/Loader";
import type { Tone } from "@/components/system/tones";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tonal wavy contour layers calibrated for the warm blush & wine palette */
function Contours() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        data-contour
        d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z"
        fill="#ffb4aa"
      />
      <path
        data-contour
        d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z"
        fill="#ffd6d0"
      />
      <path
        data-contour
        d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z"
        fill="#ffa195"
      />
    </svg>
  );
}

export function CareerHero(props?: {
  title?: string;
  intro?: ReactNode;
  note?: string;
  tone?: Tone;
  photo?: { src: string; alt: string };
  action?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  void props;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ paused: true, delay: 0.1 });
        intro
          .from(
            "[data-hero-title]",
            {
              y: 40,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            0,
          )
          .from(
            "[data-hero-photo]",
            {
              y: 50,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.15,
          )
          .from(
            "[data-hero-fade]",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
            },
            0.3,
          );

        const release = afterLoader(() => intro.play());

        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-contour]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-photo]", { y: -40, ease: "none", scrollTrigger: scrub });

        return release;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-hero="light"
      aria-labelledby="page-title"
      className="relative h-[100svh] min-h-[640px] overflow-clip rounded-b-[var(--radius-2xl)] bg-blush text-wine"
    >
      {/* Wavy tonal contours matching the Home Hero aesthetic */}
      <Contours />

      <div className="shell relative z-10 flex h-full flex-col justify-center pb-[4svh] pt-[var(--header-h)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left Column: Bold Display Headline & Concise Copy (Zero Pills) */}
        <div className="lg:col-span-7">
          <div data-hero-title>
            <h1
              id="page-title"
              className="display text-[clamp(3.2rem,7vw,7.2rem)] leading-[0.88] text-wine"
            >
              Build the future <span className="inline-block">of packaging.</span>
            </h1>
          </div>

          <p
            data-hero-fade
            className="mt-5 max-w-[32rem] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed text-wine/90"
          >
            Join 500+ makers, engineers, and creators shaping high-performance packaging on an 18-acre campus.
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-4">
            <ButtonLink href="#apply" tone="wine">
              Apply now
            </ButtonLink>
          </div>
        </div>

        {/* Right Column: Clean, Ordered Modern Converting Hall Photo */}
        <div className="relative mx-auto mt-6 w-full max-w-[28rem] lg:col-span-5 lg:mt-0 lg:max-w-none">
          <div
            data-hero-photo
            className="overflow-hidden rounded-[var(--radius-xl)] bg-white p-2.5 shadow-2xl ring-1 ring-black/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ink/10">
              <Image
                src="/media/plant/press-hall.webp"
                alt="Modern high-speed press hall and converting floor at the Rania campus"
                fill
                sizes="(min-width: 1024px) 34rem, 90vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2 pb-1">
              <span className="text-sm font-bold text-ink">
                Rania Campus
              </span>
              <span className="text-xs font-semibold text-crimson">
                Modern Converting Floor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
