"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(SplitText, useGSAP);

/**
 * Shared hero entrance: the H1 ([data-hero-title]) rises line by line, [data-hero-fade] follows, and `extra` adds a
 * family's own moves to the same timeline. Everything waits for the loader and is skipped for reduced motion,
 * so the HTML always holds the finished hero.
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>, extra?: (tl: gsap.core.Timeline) => void) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true });
        let started = false;
        let lines: gsap.core.Tween | undefined;
        const title = scope.current?.querySelector<HTMLElement>("[data-hero-title]");
        const split = title
          ? SplitText.create(title, {
              type: "lines",
              autoSplit: true,
              onSplit(self) {
                lines = gsap.from(self.lines, { yPercent: 45, autoAlpha: 0, duration: 0.8, ease: "power4.out", stagger: 0.08, paused: !started });
                return lines;
              },
            })
          : undefined;
        tl.from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 0.3);
        extra?.(tl);
        const release = afterLoader(() => {
          started = true;
          lines?.play();
          tl.play();
        });
        return () => {
          release();
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
}
