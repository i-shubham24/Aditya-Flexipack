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

const UNIT_PHRASE = "Packaging that powers performance \u00A0\u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0\u00A0 ";
const REPEATED_TEXT = UNIT_PHRASE.repeat(6);

export function RisingPacks() {
  const root = useRef<HTMLElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const textPath = textPathRef.current;
        const measure = measureRef.current;

        // Base offset where x=30px on screen begins along the wave
        const baseOffset = 2450;
        const phraseLength = measure?.getComputedTextLength() || 1920;

        let totalProgress = 0;
        let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        const updateOffset = (delta: number) => {
          if (!textPath) return;
          totalProgress = (totalProgress + delta) % phraseLength;
          if (totalProgress < 0) totalProgress += phraseLength;
          textPath.setAttribute("startOffset", `${baseOffset - totalProgress}`);
        };

        // Continuous smooth infinite glide
        const onTick = (_time: number, deltaTime: number) => {
          updateOffset((55 * deltaTime) / 1000);
        };
        gsap.ticker.add(onTick);

        // Responsive scroll interaction: scrolling moves the text along the wave naturally
        const scrollListener = () => {
          const currentY = window.scrollY;
          const deltaY = currentY - lastScrollY;
          lastScrollY = currentY;
          if (deltaY !== 0) {
            updateOffset(deltaY * 0.75);
          }
        };
        window.addEventListener("scroll", scrollListener, { passive: true });

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

        return () => {
          gsap.ticker.remove(onTick);
          window.removeEventListener("scroll", scrollListener);
        };
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
      <div className="panel bg-crimson-wash pt-[calc(var(--section-y)*0.35)] overflow-hidden">
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
        {/* The headline set on a continuous wave, infinite seamless loop */}
        <svg
          aria-hidden
          viewBox="0 20 1600 240"
          className="relative block w-full overflow-visible"
        >
          <defs>
            <path
              id="power-wave"
              d="M -2400 150 C -2140 95, -1860 205, -1600 150 C -1340 95, -1060 205, -800 150 C -540 95, -260 205, 0 150 C 260 95, 540 205, 800 150 C 1060 95, 1340 205, 1600 150 C 1860 95, 2140 205, 2400 150 C 2660 95, 2940 205, 3200 150 C 3460 95, 3740 205, 4000 150 C 4260 95, 4540 205, 4800 150 C 5060 95, 5340 205, 5600 150 C 5860 95, 6140 205, 6400 150 C 6660 95, 6940 205, 7200 150 C 7460 95, 7740 205, 8000 150 C 8260 95, 8540 205, 8800 150 C 9060 95, 9340 205, 9600 150 C 9860 95, 10140 205, 10400 150 C 10660 95, 10940 205, 11200 150 C 11460 95, 11740 205, 12000 150"
            />
          </defs>
          <text
            ref={measureRef}
            aria-hidden
            className="display font-bold"
            fontSize="100"
            letterSpacing="-2"
            style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
          >
            {UNIT_PHRASE}
          </text>
          <text
            className="display font-bold"
            fontSize="100"
            fill="#1c1517"
            letterSpacing="-2"
          >
            <textPath
              ref={textPathRef}
              data-wave-text
              href="#power-wave"
              startOffset="2450"
            >
              {REPEATED_TEXT}
            </textPath>
          </text>
        </svg>

        <div className="shell relative -mt-[2vw] lg:-mt-[1.5vw] grid items-end gap-6 lg:grid-cols-12">
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
