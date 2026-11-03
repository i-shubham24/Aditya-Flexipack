"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A published figure that counts up once as it enters view. The HTML holds the final value ("4,000", "1.35",
 * "500+"), and the box keeps its final width while counting so nothing beside it shifts. Reduced motion and no-JS
 * visitors only ever see the final value.
 */
export function CountUp({ value, className = "", duration = 1.4 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const node = el?.firstChild;
      const m = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
      if (!el || !node || !m) return;
      const [, pre, num, post] = m;
      const target = parseFloat(num.replace(/,/g, ""));
      const decimals = num.split(".")[1]?.length ?? 0;
      const fmt = (n: number) =>
        pre + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: num.includes(",") }) + post;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.style.minWidth = `${el.getBoundingClientRect().width}px`;
        const o = { n: 0 };
        node.nodeValue = fmt(0);
        const tween = gsap.to(o, {
          n: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            node.nodeValue = fmt(o.n);
          },
          onComplete: () => {
            node.nodeValue = value;
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          node.nodeValue = value;
          el.style.minWidth = "";
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value] },
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {value}
    </span>
  );
}
