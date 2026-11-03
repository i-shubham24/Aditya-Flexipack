"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type RouteStep = { title: string; body: string };

/**
 * The vendor application route: four big numbers in a row. Scrolling through the panel lights them one after
 * another (scrubbed, linear). The words never dim; reduced motion and no-JS get the fully lit row.
 */
export function VendorRoute({ steps }: { steps: RouteStep[] }) {
  const root = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nums = gsap.utils.toArray<HTMLElement>("[data-step-no]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 55%", scrub: true } });
        nums.forEach((n) => tl.fromTo(n, { opacity: 0.22 }, { opacity: 1, ease: "none", duration: 1 }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="page-grid gap-y-12">
      {steps.map((s, i) => (
        <li key={s.title} className="col-span-full sm:col-span-4 lg:col-span-3">
          <span data-step-no aria-hidden className="display tabular block text-d1 text-white">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="display mt-5 text-d4 text-white">{s.title}</h3>
          <p className="mt-2 max-w-[22rem] text-white/90">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
