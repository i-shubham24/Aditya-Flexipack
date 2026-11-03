"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Phones only: an "Apply now" split button rides along at the bottom right and drops away (12em, 0.8s) once the
 * form's top reaches 80% of the viewport, coming back if the reader scrolls up again. Once it has dropped it is
 * also hidden from keyboard and screen readers. Without scripts it simply stays put.
 */
export function RidingApply({ target }: { target: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      // Looked up on the document: selector text inside this hook would be scoped to the button itself.
      const form = document.querySelector(target);
      if (!el || !form) return;
      const mm = gsap.matchMedia();
      mm.add({ phone: "(max-width: 639px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        if (!ctx.conditions?.phone) return;
        const duration = ctx.conditions.reduce ? 0 : 0.8;
        const drop = () => gsap.to(el, { y: "12em", duration, ease: "power2.in", overwrite: true, onComplete: () => gsap.set(el, { visibility: "hidden" }) });
        const ride = () => {
          gsap.set(el, { visibility: "visible" });
          gsap.to(el, { y: 0, duration, ease: "power3.out", overwrite: true });
        };
        ScrollTrigger.create({ trigger: form, start: "top 80%", end: "max", onEnter: drop, onLeaveBack: ride });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [target] },
  );

  return (
    <div ref={root} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 sm:hidden">
      <ButtonLink href={target} tone="crimson">
        Apply now
      </ButtonLink>
    </div>
  );
}
