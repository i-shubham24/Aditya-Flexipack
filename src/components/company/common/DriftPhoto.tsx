"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RATIOS = {
  "4:5": "aspect-[4/5]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
} as const;

/**
 * A photograph set straight on its section's background, like PhotoFrame, whose picture drifts a few percent
 * inside its rounded mask as the page scrolls (scrubbed, linear). The drift lives on an inner layer, so the figure
 * itself stays free for a reveal. At rest, and for reduced motion, the picture sits centred.
 */
export function DriftPhoto({
  src,
  alt,
  ratio,
  caption,
  sizes,
  dark = false,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: keyof typeof RATIOS;
  caption?: string;
  sizes: string;
  dark?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-drift]",
          { yPercent: -4.5 },
          { yPercent: 4.5, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <figure ref={root} className={className}>
      <div className={`relative overflow-hidden rounded-[var(--radius-lg)] ${RATIOS[ratio]}`}>
        <div data-drift className="absolute inset-x-0 -inset-y-[6%]">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
      {caption && <figcaption className={`mt-3 text-caption ${dark ? "text-white/75" : "text-ink-soft"}`}>{caption}</figcaption>}
    </figure>
  );
}
