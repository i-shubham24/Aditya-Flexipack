"use client";

import type { FocusEvent, MouseEvent } from "react";
import { gsap } from "gsap";

/**
 * Aardvark's button hover, letter for letter: each character squashes down and tips (yPercent 55, scaleY 0.3,
 * 17deg) in the first fifth of the move, then springs back on an elastic ease, staggered across the word.
 * Only for a real pointer that can hover, and never with reduced motion.
 */
const CAN_DANCE = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** The label split into characters for the dance; the whole word stays readable to assistive tech. */
export function DanceText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block whitespace-nowrap">
        {[...text].map((c, i) => (
          <span key={i} data-char className="inline-block origin-center will-change-transform">
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </>
  );
}

export function dance(root: Element) {
  if (!window.matchMedia(CAN_DANCE).matches) return;
  const chars = root.querySelectorAll("[data-char]");
  if (!chars.length) return;
  gsap.killTweensOf(chars);
  gsap.fromTo(
    chars,
    { yPercent: 0, scaleY: 1, rotate: 0 },
    {
      keyframes: {
        "0%": { yPercent: 0, scaleY: 1, rotate: 0 },
        "20%": { yPercent: 55, scaleY: 0.3, rotate: 17, ease: "power2.in" },
        "100%": { yPercent: 0, scaleY: 1, rotate: 0, ease: "elastic.out(1,0.4)" },
      },
      duration: 0.725,
      stagger: { amount: 0.225 },
    },
  );
}

export function settle(root: Element) {
  const chars = root.querySelectorAll("[data-char]");
  if (!chars.length) return;
  gsap.to(chars, { yPercent: 0, scaleY: 1, rotate: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
}

/** Spread onto any link or button that holds a DanceText. */
export const danceHandlers = {
  onMouseEnter: (e: MouseEvent<HTMLElement>) => dance(e.currentTarget),
  onMouseLeave: (e: MouseEvent<HTMLElement>) => settle(e.currentTarget),
  onFocus: (e: FocusEvent<HTMLElement>) => {
    if (e.currentTarget.matches(":focus-visible")) dance(e.currentTarget);
  },
  onBlur: (e: FocusEvent<HTMLElement>) => settle(e.currentTarget),
};
