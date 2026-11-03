"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The old site's floating pouch shot, cut into its parts. Positions are percentages of the original frame;
 * depth sets how far each part travels, so the cookies outrun the pouches.
 */
const LAYERS = [
  { src: "green", left: 38.04, top: 14.92, width: 19.58, depth: 0.6, spin: -8 },
  {
    src: "magenta",
    left: 62.12,
    top: 24.59,
    width: 26.65,
    depth: 0.85,
    spin: 7,
  },
  { src: "cluster", left: 8.35, top: 35.74, width: 57.3, depth: 1, spin: -5 },
  {
    src: "cookie-1",
    left: 79.13,
    top: 66.56,
    width: 8.67,
    depth: 1.7,
    spin: 70,
  },
  {
    src: "cookie-2",
    left: 52.65,
    top: 40.82,
    width: 8.67,
    depth: 1.5,
    spin: -60,
  },
  {
    src: "cookie-3",
    left: 11.24,
    top: 30.98,
    width: 8.03,
    depth: 1.9,
    spin: 90,
  },
  {
    src: "cookie-4",
    left: 7.54,
    top: 56.72,
    width: 4.65,
    depth: 2.2,
    spin: -120,
  },
  {
    src: "cookie-5",
    left: 66.61,
    top: 62.79,
    width: 4.49,
    depth: 2,
    spin: 110,
  },
  {
    src: "cookie-6",
    left: 89.09,
    top: 29.34,
    width: 3.85,
    depth: 2.4,
    spin: -90,
  },
];

export function RisingPacks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The headline runs along its wave as the page moves, never on its own.
        gsap.fromTo(
          "[data-wave-text]",
          { attr: { startOffset: 1650 } },
          {
            attr: { startOffset: 250 },
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        // Parts rise from below, settle into the shot, then keep drifting apart at their own depth.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-stage]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((el) => {
          const depth = Number(el.dataset.depth);
          const spin = Number(el.dataset.spin);
          tl.fromTo(
            el,
            { yPercent: 45 * depth + 25, rotate: spin },
            { yPercent: 0, rotate: 0, ease: "power2.out", duration: 1 },
            0,
          ).to(
            el,
            {
              yPercent: -30 * depth,
              rotate: spin * -0.3,
              ease: "none",
              duration: 1,
            },
            1,
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="power-title"
      className="pt-[var(--frame)]"
    >
      <div className="panel bg-crimson-wash pt-[calc(var(--section-y)*0.35)]">
        <svg
          aria-hidden
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0 120 C 220 40, 380 260, 560 210 S 860 40, 1200 140 V900 H0 Z"
            fill="#ffd9d3"
          />
          <path
            d="M0 640 C 240 520, 420 720, 700 610 S 1040 470, 1200 560 V900 H0 Z"
            fill="#ffcfc8"
          />
        </svg>

        <h2 id="power-title" className="sr-only">
          Packaging that powers performance
        </h2>
        {/* The headline set on a wave, wider than the screen, the way a printed web runs off the press */}
        <svg
          aria-hidden
          viewBox="0 30 1600 320"
          className="relative block w-full overflow-visible"
        >
          <defs>
            <path
              id="power-wave"
              d="M -1700 330 C -1200 250, -700 420, -200 320 S 500 120, 900 200 S 1500 60, 2000 110 S 3000 260, 3600 160"
            />
          </defs>
          <text
            className="display"
            fontSize="168"
            fill="#1c1517"
            letterSpacing="-4"
          >
            <textPath data-wave-text href="#power-wave" startOffset="900">
              Packaging that powers performance
            </textPath>
          </text>
        </svg>

        <div className="shell relative -mt-[7vw] grid items-end gap-6 lg:grid-cols-12">
          <div className="relative z-10 pb-10 lg:col-span-4 lg:pb-[12vh]">
            <p className="hand -rotate-2 text-[2rem] text-crimson">
              Quality is our identity
            </p>
            <p className="mt-3 max-w-[24rem] text-[1.1rem] leading-relaxed text-ink">
              Branded pouches for biscuits, snacks, staples and more, printed,
              laminated and sealed under one roof near Kanpur.
            </p>
            <ButtonLink href="/packaging-partnership/" className="mt-6">
              Start your pack
            </ButtonLink>
          </div>

          <div
            data-stage
            className="relative mx-auto -mb-[6%] aspect-[623/610] w-[min(94vw,46rem)] lg:col-span-8 lg:mr-0"
          >
            {LAYERS.map((l) => (
              <div
                key={l.src}
                data-layer
                data-depth={l.depth}
                data-spin={l.spin}
                className="absolute"
                style={{
                  left: `${l.left}%`,
                  top: `${l.top}%`,
                  width: `${l.width}%`,
                }}
              >
                <Image
                  src={`/media/packs/${l.src}.webp`}
                  alt={
                    l.src === "cluster"
                      ? "Printed stand-up pouches carrying the Aditya Flexipack mark"
                      : ""
                  }
                  width={360}
                  height={300}
                  sizes="(min-width: 1024px) 26rem, 50vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
