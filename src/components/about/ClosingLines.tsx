"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINES = [
  { t: "Smart packaging.", c: "text-crimson", x: "lg:ml-0", r: -3 },
  { t: "Cleaner planet.", c: "text-wine", x: "lg:ml-[14%]", r: 2 },
  { t: "Sustainable future.", c: "text-ink", x: "lg:ml-[6%]", r: -1 },
];

/** The old page's closing line, set as three chunky slugs that slide in from alternate sides as you scroll. */
export function ClosingLines() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { xPercent: i % 2 ? 18 : -18, rotate: 0 },
            { xPercent: 0, rotate: LINES[i].r, ease: "none", scrollTrigger: { trigger: root.current, start: "top 90%", end: "center 55%", scrub: 0.6 } },
          );
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el, i) => gsap.set(el, { rotate: LINES[i].r }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="closing-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 360 C 220 260, 400 460, 640 380 S 1000 220, 1200 300 V600 H0 Z" fill="#ffd9d3" />
        </svg>
        <div className="shell relative">
          <h2 id="closing-title" className="display grid gap-2 text-[clamp(3rem,9vw,9.6rem)] leading-[0.9]">
            {LINES.map((l) => (
              <span key={l.t} data-line className={`block w-fit ${l.c} ${l.x}`}>
                {l.t}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
