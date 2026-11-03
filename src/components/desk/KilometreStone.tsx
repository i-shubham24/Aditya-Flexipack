"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(useGSAP);

/**
 * Hero teaser for Contact: an Indian highway milestone planted in a white verge that runs along the hero's
 * bottom edge. After the title settles the stone rises from behind the verge and its distance counts up to
 * 15 km, once. The HTML holds the finished stone; reduced motion shows it as is.
 */
export function KilometreStone() {
  const root = useRef<HTMLDivElement>(null);
  const km = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const count = { v: 0 };
        const show = () => {
          if (km.current) km.current.textContent = `${Math.round(count.v)} km`;
        };
        const tl = gsap.timeline({ paused: true, delay: 0.95 });
        tl.from("[data-stone]", { yPercent: 100, duration: 0.7, ease: "expo.out" }).to(
          count,
          { v: 15, duration: 0.9, ease: "power2.out", onUpdate: show },
          0.2,
        );
        show();
        const release = afterLoader(() => tl.play());
        return () => {
          release();
          if (km.current) km.current.textContent = "15 km";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative flow-root [--verge:5.5rem] lg:[--verge:calc(var(--section-y)*0.45)]">
      {/* The stone column reaches down to the hero's bottom edge; its foot is hidden behind the verge. */}
      <div className="mb-[calc(var(--section-y)*-0.6)] w-40 sm:w-48 lg:w-[18rem]">
        <div data-stone role="img" aria-label="Highway milestone: NH 2, Kanpur 15 km">
          <div className="grid aspect-[2/1] place-items-end justify-items-center rounded-t-full bg-wine pb-[6%] text-white">
            <span className="display text-d3">NH 2</span>
          </div>
          <div className="bg-white px-3 pt-4 pb-[calc(var(--verge)+1rem)] text-center">
            <span className="display block text-d3 text-ink">KANPUR</span>
            <span ref={km} className="display tabular mt-1 block text-d2 text-crimson">
              15 km
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute -inset-x-[200vw] bottom-[calc(var(--section-y)*-0.6)] z-10 h-[var(--verge)] bg-white" />

      <p className="hand absolute bottom-[calc(var(--section-y)*-0.6+var(--verge)/2)] left-[calc(10rem+1rem)] z-20 max-w-[calc(100%-11rem)] translate-y-1/2 -rotate-2 text-note text-crimson sm:left-[calc(12rem+1.5rem)] sm:max-w-none lg:left-auto lg:right-full lg:mr-8 lg:whitespace-nowrap">
        on the Kolkata to Delhi highway
      </p>
    </div>
  );
}
