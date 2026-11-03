"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** A proofreader's ring in crimson pen, drawn once around a word when it comes into view. */
export function ProofMark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState<"idle" | "wait" | "draw">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDrawn("wait");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn("draw");
          io.disconnect();
        }
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] h-[136%] w-[116%] overflow-visible"
      >
        <path
          d="M18 46 C 14 18, 92 6, 150 10 C 192 13, 198 40, 178 58 C 150 80, 50 78, 22 62 C 8 54, 12 34, 38 24"
          fill="none"
          stroke="var(--color-crimson)"
          strokeWidth="3.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          className={`${drawn === "draw" ? "transition-[stroke-dashoffset] duration-[1100ms] ease-out-expo" : ""} ${drawn === "wait" ? "[stroke-dashoffset:1]" : "[stroke-dashoffset:0]"}`}
        />
      </svg>
    </span>
  );
}
