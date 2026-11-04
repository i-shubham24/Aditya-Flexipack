"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

        // The text travels along the wave as the page scrolls
        const scrollListener = () => {
          const currentY = window.scrollY;
          const deltaY = currentY - lastScrollY;
          lastScrollY = currentY;
          if (deltaY !== 0) {
            updateOffset(deltaY * 0.75);
          }
        };
        window.addEventListener("scroll", scrollListener, { passive: true });

        // Two photo cards entrance and scroll scrub
        const cardsStage = root.current?.querySelector("[data-cards-stage]");
        if (cardsStage) {
          gsap.from("[data-card-back]", {
            y: 110,
            rotate: -3,
            autoAlpha: 0,
            duration: 1,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: cardsStage, start: "top 80%", once: true },
          });
          gsap.from("[data-card-front]", {
            y: 90,
            rotate: 5,
            autoAlpha: 0,
            duration: 1,
            delay: 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: cardsStage, start: "top 80%", once: true },
          });

          const cardsScrub = { trigger: cardsStage, start: "top bottom", end: "bottom top", scrub: 1.2 };
          gsap.to("[data-scrub-front]", { y: -45, rotate: -3, ease: "none", scrollTrigger: cardsScrub });
          gsap.to("[data-scrub-back]", { y: -80, x: 20, rotate: 4, ease: "none", scrollTrigger: cardsScrub });
        }

        return () => {
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
      <div className="panel bg-crimson-wash pt-2 sm:pt-3 overflow-hidden">
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

        {/* The headline set on a continuous wave, slanting lower on the left */}
        <div className="relative block w-[104%] -ml-[2%] overflow-visible origin-right -rotate-[1.5deg] -translate-y-3 sm:-translate-y-5 lg:-translate-y-6">
          <svg
            aria-hidden
            viewBox="0 0 1600 260"
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
        </div>

        <div className="shell relative -mt-[1.5vw] lg:-mt-[1vw] grid items-center gap-8 lg:grid-cols-12 pb-6 sm:pb-8 lg:pb-12">
          <div className="relative z-10 pt-6 pb-2 sm:pt-8 sm:pb-4 lg:pt-0 lg:pb-0 lg:col-span-5">
            <p className="hand -rotate-2 text-[clamp(2.1rem,3.2vw,2.75rem)] text-crimson">
              Quality is our identity
            </p>
            <p className="mt-3.5 max-w-[28rem] text-[clamp(1.15rem,1.4vw,1.35rem)] leading-relaxed text-ink">
              Branded pouches for biscuits, snacks, staples and more, printed,
              laminated and sealed under one roof near Kanpur.
            </p>
            <ButtonLink href="/packaging-partnership/" className="mt-8 lg:mt-6">
              Start your pack
            </ButtonLink>
          </div>

          {/* Two tactile photo cards, dealt across the peach field */}
          <div
            data-cards-stage
            className="relative mx-auto aspect-[16/11] w-[min(90vw,36rem)] lg:col-span-7 lg:mr-0 flex items-center justify-center min-h-[285px] sm:min-h-[360px]"
          >
            {/* Outer layer tracks scrub, inner plays entrance */}
            <div data-scrub-back className="absolute inset-0 flex items-center justify-center">
              <div data-card-back className="w-[min(50vw,18rem)] translate-x-[22%] -translate-y-[8%] rotate-[9deg] rounded-[var(--radius-xl)] bg-white p-2.5 shadow-xl">
                <div className="relative aspect-[1100/1456] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/media/products/foil-pouch-zip.webp"
                    alt="Aluminium foil zipper pouches made by Aditya Flexipack"
                    fill
                    sizes="(min-width: 1024px) 24rem, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div data-scrub-front className="relative z-10 flex items-center justify-center">
              <div data-card-front className="w-[min(53vw,20rem)] -translate-x-[14%] translate-y-[6%] -rotate-[6deg] rounded-[var(--radius-xl)] bg-white p-2.5 shadow-2xl">
                <div className="relative aspect-[1100/1456] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/media/products/branded-pouches.webp"
                    alt="Printed pillow packs carrying the Aditya Flexipack mark"
                    fill
                    sizes="(min-width: 1024px) 26rem, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
