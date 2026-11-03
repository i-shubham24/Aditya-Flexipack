"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLS = 25;
const ROWS = 20;
const PITCH = 54;
const R = 9;
const LIT = "#ff4b3e"; // crimson-light
const DIM = "#5c0b15"; // wine-2

/** A 5 x 7 dot-matrix figure set: only the glyphs "500+" needs. */
const FONT: Record<string, string[]> = {
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "0": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
};

// "500+" set from column 1, row 3, each glyph doubled vertically, one blank column between glyphs.
const ON = new Set<string>();
[..."500+"].forEach((ch, k) =>
  FONT[ch].forEach((row, fr) =>
    [...row].forEach((bit, fc) => {
      if (bit !== "1") return;
      ON.add(`${1 + k * 6 + fc},${3 + fr * 2}`);
      ON.add(`${1 + k * 6 + fc},${4 + fr * 2}`);
    }),
  ),
);

// The last dot, bottom right, is left open: the "+", and the way in.
const RING = { c: COLS - 1, r: ROWS - 1 };
const at = (i: number) => PITCH / 2 + i * PITCH;

/**
 * Career's centrepiece: exactly 500 dots, one for each person in "500+ skilled professionals". They print row by
 * row like an inkjet coder; the dots inside a dot-matrix "500+" print in crimson-light, and one open ring is left
 * at the end for the next person. The HTML ships printed.
 */
export function HeadcountPrint() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
        // The print head runs down the rows, 30 ms a row, and each row appears as it passes.
        tl.set("[data-head]", { opacity: 1 }, 0)
          .fromTo("[data-head]", { y: 0 }, { y: ROWS * PITCH, duration: ROWS * 0.03, ease: `steps(${ROWS})` }, 0)
          .from("[data-row]", { autoAlpha: 0, duration: 0.01, stagger: 0.03 }, 0.03)
          .to("[data-head]", { opacity: 0, duration: 0.15 }, ROWS * 0.03)
          // Then the open ring pulses, once.
          .to("[data-ring]", { scale: 1.3, svgOrigin: `${at(RING.c)} ${at(RING.r)}`, duration: 0.3, ease: "power1.inOut", yoyo: true, repeat: 1 }, ROWS * 0.03 + 0.1);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="print-title" className="pt-[var(--frame)]">
      <div className="panel bg-ink py-[calc(var(--section-y)*0.75)] text-white">
        <div className="shell">
          <div className="page-grid mb-[var(--stack)]">
            <h2 id="print-title" className="display span-lead text-d2">
              Work alongside 500+ skilled professionals
            </h2>
          </div>

          <div className="relative">
            <svg
              role="img"
              aria-label="Five hundred dots, one for each of our 500+ people"
              viewBox={`0 0 ${COLS * PITCH} ${ROWS * PITCH}`}
              className="block h-auto w-full overflow-visible max-sm:[&_.dot]:[r:12.5px]"
            >
              {Array.from({ length: ROWS }, (_, r) => (
                <g key={r} data-row>
                  {Array.from({ length: COLS }, (_, c) =>
                    c === RING.c && r === RING.r ? (
                      <circle key={c} data-ring className="dot" cx={at(c)} cy={at(r)} r={R} fill="none" stroke="#ffffff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    ) : (
                      <circle key={c} className="dot" cx={at(c)} cy={at(r)} r={R} fill={ON.has(`${c},${r}`) ? LIT : DIM} />
                    ),
                  )}
                </g>
              ))}
              {/* The print head, only seen while it prints */}
              <rect data-head x="-6" y="-10" width={COLS * PITCH + 12} height="8" rx="4" fill="#c6cbd1" opacity="0" />
            </svg>
            {/* The open ring is a link: a 44px target centred on it */}
            <a
              href="#apply"
              aria-label="Apply now"
              className="absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors hover:bg-white/15"
              style={{ left: `${(at(RING.c) / (COLS * PITCH)) * 100}%`, top: `${(at(RING.r) / (ROWS * PITCH)) * 100}%` }}
            />
          </div>

          <div className="page-grid mt-10 items-center gap-y-6">
            <p className="span-lead max-w-measure text-lead text-white/80">One dot for each of our 500+ people. The open ring is yours.</p>
            <div className="span-side lg:justify-self-end">
              <ButtonLink href="#apply" tone="white">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
