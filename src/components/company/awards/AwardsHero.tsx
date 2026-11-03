"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tonal wavy contour layers in crimson, matching the Home Hero */
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
        fill="#dc0a05"
      />
      <path
        data-contour
        d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z"
        fill="#e81911"
      />
      <path
        data-contour
        d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z"
        fill="#b80000"
      />
    </svg>
  );
}

export function AwardsHero({ tone }: { tone?: string } = {}) {
  const root = useRef<HTMLElement>(null);
  void tone;

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
      data-hero="dark"
      aria-labelledby="page-title"
      className="relative h-[100svh] min-h-[640px] overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson text-white"
    >
      {/* Wavy tonal contours matching the Home Hero */}
      <Contours />

      <div className="shell relative z-10 flex h-full flex-col justify-center pb-[4svh] pt-[var(--header-h)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left Column: Bold Display Headline & Short Crisp Copy (Zero Pills) */}
        <div className="lg:col-span-7">
          <div data-hero-title>
            <h1
              id="page-title"
              className="display text-[clamp(3.2rem,7vw,7.2rem)] leading-[0.88] text-white"
            >
              Recognised <span className="inline-block">by Presidents.</span>
            </h1>
          </div>

          <p
            data-hero-fade
            className="mt-5 max-w-[32rem] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed text-white/90"
          >
            Honoured twice as Entrepreneur of the Year by two Presidents of India, alongside excellence awards from Parle, Britannia, and ITC Foods.
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-4">
            <ButtonLink href="/about-us/" tone="white">
              Our story
            </ButtonLink>
          </div>
        </div>

        {/* Right Column: Clean, Ordered, Museum-Grade Presidential Award Photo */}
        <div className="relative mx-auto mt-6 w-full max-w-[28rem] lg:col-span-5 lg:mt-0 lg:max-w-none">
          <div
            data-hero-photo
            className="overflow-hidden rounded-[var(--radius-xl)] bg-white p-2.5 shadow-2xl ring-1 ring-black/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ink/10">
              <Image
                src="/media/awards/award-apj-abdul-kalam.webp"
                alt="President Dr. A.P.J. Abdul Kalam presenting the Entrepreneur of the Year award"
                fill
                sizes="(min-width: 1024px) 34rem, 90vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2 pb-1">
              <span className="text-sm font-bold text-ink">
                Presented by Dr. A.P.J. Abdul Kalam
              </span>
              <span className="text-xs font-semibold text-crimson">
                Entrepreneur of the Year
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
