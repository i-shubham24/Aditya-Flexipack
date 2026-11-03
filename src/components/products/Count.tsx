"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A published figure that counts up once as it enters view. The final value is in the HTML and holds the width,
 * so nothing reflows; screen readers, reduced-motion and no-JS visitors only ever get the final value.
 */
export function Count({ value, className = "" }: { value: string; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const face = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const target = Number(value.replace(/,/g, ""));
      if (!Number.isFinite(target) || target <= 0) return;
      const grouped = value.includes(",");
      const show = (n: number) => {
        if (face.current) face.current.textContent = grouped ? Math.round(n).toLocaleString("en-US") : String(Math.round(n));
      };
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        show(0);
        const tween = gsap.to(state, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          paused: true,
          onUpdate: () => show(state.n),
        });
        const st = ScrollTrigger.create({ trigger: root.current, start: "top 88%", once: true, onEnter: () => tween.play() });
        return () => {
          st.kill();
          tween.kill();
          show(target);
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [value] },
  );

  return (
    <span ref={root} className={`tabular inline-grid ${className}`}>
      <span className="sr-only">{value}</span>
      {/* The final value sizes the cell; the face counts over it. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={face} aria-hidden className="col-start-1 row-start-1 text-right">
        {value}
      </span>
    </span>
  );
}
