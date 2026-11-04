"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORDS = ["We", "make", "the", "part", "you", "tear", "open."];

/**
 * Branded floating pouch layers with 3D depth, positioned across the stage.
 * Depth sets travel speed on scroll; spin adds subtle rotational drift.
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

/** Tonal contour layers in the logo's crimson. */
function Contours() {
  return (
    <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <path data-contour d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#dc0a05" />
      <path data-contour d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z" fill="#e81911" />
      <path data-contour d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#b80000" />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Built paused so the start state paints at once, then played when the loader hands over.
        const intro = gsap.timeline({ paused: true, delay: 0.1 });
        intro
          .from("[data-word]", { yPercent: 60, rotate: () => gsap.utils.random(-8, 8), scale: 0.7, autoAlpha: 0, duration: 0.9, ease: "back.out(1.7)", stagger: 0.06 }, 0)
          .from("[data-float]", {
            scale: 0.72,
            y: (_i, target) => {
              const depth = Number((target as HTMLElement).dataset.depth || 1);
              return 40 * depth;
            },
            rotate: (_i, target) => {
              const spin = Number((target as HTMLElement).dataset.spin || 0);
              return spin * 0.7;
            },
            autoAlpha: 0,
            duration: 1.1,
            ease: "back.out(1.6)",
            stagger: 0.05,
          }, 0.1)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.5);
        
        const release = afterLoader(() => intro.play());
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 };
        
        gsap.to("[data-contour]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });

        // Scroll parallax: layers float and separate smoothly in 3D depth space as user scrolls
        const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
        layers.forEach((layer) => {
          const inner = layer.querySelector<HTMLElement>("[data-float]");
          const depth = Number(inner?.dataset.depth || 1);
          const spin = Number(inner?.dataset.spin || 0);

          gsap.to(layer, {
            y: -52 * depth,
            x: (depth - 1) * 20,
            rotate: spin * 0.25,
            ease: "none",
            scrollTrigger: scrub,
          });
        });

        // Stage gentle lift near bottom exit
        gsap.to("[data-stage]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: scrub,
        });

        // Subtle ambient floating levitation so pouches and cookies feel alive
        layers.forEach((layer, i) => {
          const inner = layer.querySelector<HTMLElement>("[data-float]");
          if (!inner) return;
          const depth = Number(inner.dataset.depth || 1);
          gsap.to(inner, {
            y: `+=${depth > 1.2 ? 9 : 5}`,
            rotate: `+=${depth > 1.2 ? 2.5 : 1}`,
            duration: 2.8 + (i % 4) * 0.45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.2 + i * 0.12,
          });
        });
        return release;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="dark" aria-labelledby="hero-title" className="relative h-[100svh] min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
      {/* Full bleed, edge to edge and up under the header, rounded only where it meets the page */}
      <div className="relative h-full overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson text-white">
        <Contours />
        <div className="shell relative z-10 flex h-full flex-col justify-center pb-20 pt-[calc(var(--header-h)+1.25rem)] sm:pb-24 sm:pt-[calc(var(--header-h)+2rem)] lg:pb-0 lg:pt-[var(--header-h)]">
          <div className="max-w-[44rem] mt-2 sm:mt-4 lg:mt-0">
            <h1 id="hero-title" className="display text-[clamp(2.6rem,7.5vw,8.2rem)] leading-[0.88] sm:leading-[0.86]">
              {WORDS.map((w, i) => (
                <span key={i} data-word className="inline-block pr-[0.22em]">
                  {w}
                </span>
              ))}
            </h1>
            <p data-hero-fade className="mt-3.5 sm:mt-6 max-w-[22rem] sm:max-w-[30rem] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-white/90">
              Packaging that powers performance for India&apos;s leading brands: laminates, pouches, films, inks and cylinders,
              made under one roof near Kanpur.
            </p>
            <div data-hero-fade className="mt-5 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <ButtonLink href="/products/" tone="white">
                Explore solutions
              </ButtonLink>
              <Link href="/packaging-partnership/" className="inline-flex min-h-11 items-center font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
                Partner with us
              </Link>
            </div>
          </div>
        </div>

        {/* 3D floating branded pouches and cookies stage */}
        <div
          data-pouches
          data-stage
          className="pointer-events-none absolute bottom-2.5 right-1.5 aspect-[623/610] w-[min(48vw,13.5rem)] sm:bottom-4 sm:right-4 sm:w-[min(44vw,18.5rem)] lg:bottom-auto lg:right-[3.5%] lg:top-1/2 lg:w-[min(48vw,44rem)] lg:-translate-y-1/2"
        >
          {LAYERS.map((l) => (
            <div
              key={l.src}
              data-layer
              className="absolute"
              style={{
                left: `${l.left}%`,
                top: `${l.top}%`,
                width: `${l.width}%`,
              }}
            >
              <div
                data-float
                data-depth={l.depth}
                data-spin={l.spin}
                className="w-full"
              >
                <Image
                  src={`/media/packs/${l.src}.webp`}
                  alt={
                    l.src === "cluster"
                      ? "Printed stand-up pouches carrying the Aditya Flexipack mark"
                      : ""
                  }
                  width={400}
                  height={340}
                  priority={l.src === "cluster" || l.src === "green"}
                  sizes="(min-width: 1024px) 40vw, 68vw"
                  className="h-auto w-full drop-shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
