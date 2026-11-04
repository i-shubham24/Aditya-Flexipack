"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Why us", set as chunky stickers slapped across the seal with intentional tilts.
 * Calibrated to large display scale with slants preserved across render cycles.
 */
const STICKERS = [
  { t: "Benchmarked quality", c: "bg-crimson text-white", pos: "lg:left-[2%] lg:top-[55%]", r: -4.5 },
  { t: "Rapid turnaround", c: "bg-white text-crimson", pos: "lg:right-[2%] lg:top-[55%]", r: 3.5 },
  { t: "Backward integrated", c: "bg-wine text-white", pos: "lg:left-[4%] lg:top-[72%]", r: 3 },
  { t: "Ethical practices", c: "bg-ink text-white", pos: "lg:right-[3%] lg:top-[72%]", r: -3 },
  { t: "25+ years, family owned", c: "bg-blush text-wine", pos: "lg:left-1/2 lg:-translate-x-1/2 lg:top-[88%]", r: -2.5 },
];

export function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-sticker]", {
          scale: 0.2,
          autoAlpha: 0,
          duration: 0.75,
          ease: "back.out(1.9)",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-seal]", start: "top 65%", once: true },
        });
        gsap.from("[data-arc]", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-seal]", start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-[calc(var(--section-y)*0.8)] lg:pt-[calc(var(--section-y)*0.55)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path d="M0 300 C 200 180, 360 420, 600 330 S 980 120, 1200 230 V800 H0 Z" fill="#e4e7eb" />
          <path d="M0 560 C 220 470, 400 650, 640 570 S 1000 420, 1200 500 V800 H0 Z" fill="#dadee3" />
        </svg>

        <h2 id="why-title" className="sr-only">
          Why Aditya Flexipack
        </h2>

        <div data-seal className="shell relative">
          <div className="relative mx-auto max-w-[78rem] lg:h-[40rem]">
            {/* Title arched over the seal */}
            <svg data-arc aria-hidden viewBox="0 -110 800 410" overflow="visible" className="mx-auto block w-[min(92vw,40rem)]">
              <defs>
                <path id="why-arc" d="M 90 290 A 310 310 0 0 1 710 290" />
              </defs>
              <text className="display" fontSize="78" fill="#45060e" textAnchor="middle">
                <textPath href="#why-arc" startOffset="50%">
                  Why Aditya Flexipack?
                </textPath>
              </text>
            </svg>

            {/* Centred on the arc: lift the seal by its own radius past the arc's baseline */}
            <div className="relative mx-auto -mt-8 aspect-square w-[min(44vw,11.5rem)] rounded-full bg-[#fff6f5] ring-[6px] ring-wine sm:-mt-12 sm:w-[min(46vw,14rem)] sm:ring-[8px] lg:-mt-[4.5rem] lg:w-[min(52vw,17rem)] lg:ring-[10px]">
              <Image
                src="/media/brand/af-emblem.png"
                alt="The Aditya Flexipack AF emblem"
                fill
                sizes="17rem"
                className="rounded-full object-contain p-[16%]"
              />
            </div>

            {/* Chunky slanted stickers: large display font with preserved slants */}
            <ul className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 lg:mt-0 lg:block">
              {STICKERS.map((s) => (
                <li
                  key={s.t}
                  data-sticker
                  className={`w-fit max-w-[min(88vw,22rem)] lg:max-w-none lg:absolute lg:whitespace-nowrap ${s.pos}`}
                >
                  <div
                    className={`display rounded-[1.25rem] px-4 py-2 text-center text-[clamp(1rem,3.2vw,1.35rem)] leading-none sm:px-5 sm:py-2.5 lg:px-6 lg:py-3.5 lg:text-[clamp(1.1rem,2.5vw,2.75rem)] shadow-md transition-transform hover:scale-105 ${s.c}`}
                    style={{
                      transform: `rotate(${s.r}deg)`,
                      transformOrigin: "center center",
                    }}
                  >
                    {s.t}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
