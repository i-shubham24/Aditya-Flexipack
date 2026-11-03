"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The old site's "Why us", set as chunky stickers slapped across the seal. */
// Laid out in rows that start just under the arc's ends, so the title always stays clear.
const STICKERS = [
  { t: "Benchmarked quality", c: "bg-crimson text-white", pos: "left-[0%] top-[53%]", r: -4 },
  { t: "Rapid turnaround", c: "bg-white text-crimson", pos: "right-[0%] top-[53%]", r: 3 },
  { t: "Backward integrated", c: "bg-wine text-white", pos: "left-[4%] top-[68%]", r: 3 },
  { t: "Ethical practices", c: "bg-ink text-white", pos: "right-[3%] top-[68%]", r: -3 },
  { t: "25+ years, family owned", c: "bg-blush text-wine", pos: "lg:left-1/2 lg:-translate-x-1/2 top-[86%]", r: -2 },
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
        gsap.from("[data-arc]", { autoAlpha: 0, y: 30, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: "[data-seal]", start: "top 75%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil pb-[var(--section-y)] pt-[calc(var(--section-y)*0.7)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path d="M0 300 C 200 180, 360 420, 600 330 S 980 120, 1200 230 V800 H0 Z" fill="#e4e7eb" />
          <path d="M0 560 C 220 470, 400 650, 640 570 S 1000 420, 1200 500 V800 H0 Z" fill="#dadee3" />
        </svg>

        <h2 id="why-title" className="sr-only">
          Why Aditya Flexipack
        </h2>

        <div data-seal className="shell relative">
          <div className="relative mx-auto max-w-[78rem] lg:h-[39rem]">
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

            <div className="relative mx-auto -mt-[3.5rem] aspect-square w-[min(52vw,17rem)] rounded-full bg-[#fff6f5] ring-[10px] ring-wine sm:-mt-[5rem]">
              <Image src="/media/brand/af-emblem.png" alt="The Aditya Flexipack AF emblem" fill sizes="17rem" className="rounded-full object-contain p-[16%]" />
            </div>

            <ul className="mt-10 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block">
              {STICKERS.map((s) => (
                <li
                  key={s.t}
                  data-sticker
                  className={`display rounded-[1.25rem] px-5 py-3 text-[clamp(1.4rem,2.5vw,2.7rem)] leading-none lg:absolute lg:whitespace-nowrap lg:px-6 lg:py-3.5 ${s.c} ${s.pos}`}
                  style={{ rotate: `${s.r}deg` }}
                >
                  {s.t}
                </li>
              ))}
            </ul>
          </div>

          <p className="mx-auto mt-14 max-w-[42rem] text-center text-[1.1rem] leading-relaxed text-ink lg:mt-10">
            As a family-owned and managed company, we combine experience with professionalism. Stable leadership, transparent
            communication and a deep commitment to customers allow swift decisions and lasting partnerships.
          </p>
        </div>
      </div>
    </section>
  );
}
