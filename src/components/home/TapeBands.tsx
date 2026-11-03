"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BANDS = [
  {
    text: "Quality is our identity",
    bg: "bg-crimson",
    ink: "text-white",
    mark: "bg-blush",
    blobs: ["#e31a12", "#b30000"],
    tilt: "-rotate-[3deg]",
    from: 0,
    to: -18,
  },
  {
    text: "Laminates, pouches, films, polybags, inks and cylinders",
    bg: "bg-foil-2",
    ink: "text-wine",
    mark: "bg-crimson",
    blobs: ["#eceef1", "#c6cbd1"],
    tilt: "rotate-[3.5deg]",
    from: -18,
    to: 0,
  },
];

/** Two printed tapes crossing the page; they only travel when the page does. */
export function TapeBands() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-tape]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { xPercent: BANDS[i].from },
            { xPercent: BANDS[i].to, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    // Decorative: both lines are said in full elsewhere on the page.
    <div ref={root} aria-hidden className="relative h-[clamp(19rem,36vw,32rem)] overflow-clip">
      {BANDS.map((b, i) => (
        <div
          key={b.text}
          className={`absolute -left-[10%] w-[120%] ${b.tilt} ${b.bg} ${i === 0 ? "top-[27%]" : "top-[52%]"}`}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M120 120 C 180 40, 300 10, 380 0 H 560 C 470 50, 430 90, 420 120 Z" fill={b.blobs[0]} />
            <path d="M760 120 C 800 60, 900 40, 980 60 S 1100 20, 1200 0 V120 Z" fill={b.blobs[1]} />
          </svg>
          <div data-tape className={`relative flex w-max items-center gap-[0.5em] whitespace-nowrap py-[0.12em] ${b.ink}`}>
            {Array.from({ length: 4 }, (_, k) => (
              <span key={k} className="display flex items-center gap-[0.5em] text-[clamp(2.4rem,6.4vw,6.4rem)] leading-[1.1]">
                {b.text}
                <span className={`inline-block size-[0.32em] rotate-45 rounded-[0.06em] ${b.mark}`} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
