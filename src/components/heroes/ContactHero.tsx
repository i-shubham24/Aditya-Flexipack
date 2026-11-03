"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { afterLoader } from "@/components/layout/Loader";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tonal wavy contour layers matching Home & Awards Hero in brand crimson */
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

export function ContactHero() {
  const root = useRef<HTMLElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const count = { v: 0 };
        const show = () => {
          if (kmRef.current) kmRef.current.textContent = `${Math.round(count.v)} km`;
        };

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
            "[data-hero-milestone]",
            {
              y: 60,
              scale: 0.9,
              autoAlpha: 0,
              duration: 1,
              ease: "back.out(1.4)",
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
          )
          .to(
            count,
            {
              v: 15,
              duration: 1.1,
              ease: "power2.out",
              onUpdate: show,
            },
            0.4,
          );

        const release = afterLoader(() => intro.play());

        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-contour]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-milestone]", { y: -30, ease: "none", scrollTrigger: scrub });

        return () => {
          release();
          if (kmRef.current) kmRef.current.textContent = "15 km";
        };
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
      {/* Wavy tonal contours matching Home & Awards Hero */}
      <Contours />

      <div className="shell relative z-10 flex h-full flex-col justify-center pb-[4svh] pt-[var(--header-h)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left Column: Bold Display Headline & Concise Copy */}
        <div className="lg:col-span-7">
          <div data-hero-title>
            <h1
              id="page-title"
              className="display text-[clamp(3.4rem,7.5vw,7.4rem)] leading-[0.88] text-white"
            >
              Get in touch.
            </h1>
          </div>

          <p
            data-hero-fade
            className="mt-5 max-w-[32rem] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed text-white/90"
          >
            We believe in strong, long-term partnerships. Reach out for custom flexible packaging, technical specs, or visiting our 18-acre Kanpur manufacturing plant.
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-4">
            <ButtonLink href="#contact-form" tone="white">
              Fill the form
            </ButtonLink>
            <ButtonLink href={site.phoneHref} tone="white" plain>
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>

        {/* Right Column: Unique Sculpted Highway Milestone (Kilometre Stone) with Animated Count-Up */}
        <div className="relative mx-auto mt-6 flex flex-col items-center justify-center lg:col-span-5 lg:mt-0">
          <div
            data-hero-milestone
            className="group relative flex flex-col items-center"
          >
            {/* The Concrete Indian Milestone */}
            <div
              role="img"
              aria-label="National Highway Milestone: NH 2, Kanpur 15 km"
              className="relative w-44 overflow-hidden rounded-t-[5.5rem] rounded-b-2xl bg-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/10 sm:w-52 lg:w-60"
            >
              {/* Arched Top Cap in Deep Brand Wine */}
              <div className="flex h-24 items-center justify-center bg-wine px-4 pt-4 text-center text-white sm:h-28">
                <span className="display text-3xl font-bold tracking-wider sm:text-4xl">
                  NH 2
                </span>
              </div>

              {/* Concrete Milestone Body */}
              <div className="flex flex-col items-center px-4 pt-5 pb-7 text-center">
                <span className="display text-2xl font-black tracking-wider text-ink sm:text-3xl">
                  KANPUR
                </span>
                <span
                  ref={kmRef}
                  className="display mt-1 text-4xl font-extrabold tracking-tight text-crimson sm:text-5xl"
                >
                  15 km
                </span>
                <span className="mt-2.5 inline-block rounded-full bg-crimson-wash px-3 py-1 text-[0.75rem] font-bold text-wine">
                  Rania Campus Exit
                </span>
              </div>
            </div>

            {/* Tactile Ground Shadow */}
            <div className="mt-2 h-3.5 w-48 rounded-full bg-black/25 blur-sm sm:w-56 lg:w-64" />

            {/* Handwritten callout pointing to connectivity */}
            <p className="hand mt-3 -rotate-2 text-center text-xl text-blush sm:text-2xl">
              on the Kolkata to Delhi highway
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
