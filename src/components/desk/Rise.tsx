"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The standard reveal for the desk pages: children marked `data-rise` rise 24px and fade in over 0.6s, once.
 * Nothing is hidden in the HTML, so no-JS and reduced-motion visitors simply see the finished section.
 */
export function Rise({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          gsap.from(el, { y: 24, autoAlpha: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
