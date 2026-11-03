"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { GROUPS, TALLY_WORD, tallyGlyph } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Where each group's rows start in the board's running count, so the fills alternate across groups.
const FIRST_ROW = GROUPS.map((_, gi) => GROUPS.slice(0, gi).reduce((sum, g) => sum + g.honours.length, 0));

/** Moves keyboard focus to the evidence a row jumps to, so the next Tab continues from there. */
function focusEvidence(id: string) {
  document.getElementById(`${id}-title`)?.focus({ preventScroll: true });
}

/**
 * The Honours Board: every honour typeset in rows on the wine panel, led by its tally. Rows are separated by
 * alternating fills, never lines, and each row links to its photographs further down the page.
 *
 * Motion (once, as the board enters): rows rise 16px and fade 0.06s apart; each tally counts up to its number
 * while two misregistered copies (crimson and blush, 4px either side) sit behind it, then the copies snap into
 * register with a slight overshoot. The HTML holds the final board, which reduced motion and no-JS get.
 */
export function HonoursBoard() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-board-item]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-board]", start: "top 78%", once: true } });
        tl.from(items, { y: 16, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }, 0);

        const resets: (() => void)[] = [];
        items.forEach((item, i) => {
          const tally = item.querySelector<HTMLElement>("[data-tally]");
          if (!tally) return;
          const n = Number(tally.dataset.tally);
          const layers = Array.from(tally.children) as HTMLElement[];
          // Mutate the existing text nodes so React's own nodes stay in place.
          const write = (k: number) =>
            layers.forEach((l) => {
              if (l.firstChild) l.firstChild.nodeValue = tallyGlyph(k);
            });
          write(1);
          resets.push(() => write(n));

          const at = i * 0.06 + 0.25;
          for (let k = 2; k <= n; k++) tl.call(write, [k], at + (k - 1) * 0.18);
          const snap = at + (n - 1) * 0.18 + 0.12;
          const [crimson, blush] = layers;
          tl.fromTo(crimson, { x: -4, autoAlpha: 1 }, { x: 0, duration: 0.35, ease: "back.out(2.6)" }, snap)
            .fromTo(blush, { x: 4, autoAlpha: 1 }, { x: 0, duration: 0.35, ease: "back.out(2.6)" }, snap)
            .set([crimson, blush], { autoAlpha: 0 }, snap + 0.4);
        });
        return () => resets.forEach((r) => r());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="board-title" className="pt-[var(--frame)]">
      <div className="panel bg-wine py-[var(--section-y)] text-white">
        <div className="shell">
          <SectionHeader id="board-title" title="Awards and achievements" dark />

          <div data-board className="grid gap-y-[var(--stack)]">
            {GROUPS.map((group, gi) => (
              <div key={group.id}>
                <h3 data-board-item className="display text-d4 text-blush">
                  {group.short}
                </h3>
                <ol className="mt-5">
                  {group.honours.map((h, hi) => {
                    const glyph = tallyGlyph(h.tally);
                    const fill = (FIRST_ROW[gi] + hi) % 2 === 0 ? "bg-wine-2" : "";
                    return (
                      <li
                        key={h.id}
                        data-board-item
                        className={`page-grid -mx-3 min-h-[5.5rem] items-center gap-y-3 rounded-[var(--radius-md)] px-3 py-4 lg:-mx-4 lg:px-4 ${fill}`}
                      >
                        <p className="display tabular col-[1/2] text-d2 lg:col-[1/3]">
                          <span aria-hidden data-tally={h.tally} className="relative inline-block">
                            <span className="invisible absolute inset-0 text-crimson">{glyph}</span>
                            <span className="invisible absolute inset-0 text-blush">{glyph}</span>
                            <span className="relative text-crimson-light">{glyph}</span>
                          </span>
                          <span className="sr-only">{TALLY_WORD[h.tally]}</span>
                        </p>
                        <p className="display col-[2/5] text-d3 sm:col-[2/9] lg:col-[3/9]">{h.title}</p>
                        <p className="col-[1/3] text-blush sm:col-[2/6] lg:col-[9/11]">{h.from}</p>
                        <ButtonLink
                          href={`#${h.id}`}
                          tone="white"
                          onClick={() => focusEvidence(h.id)}
                          className="col-[3/5] justify-self-end sm:col-[6/9] lg:col-[11/13]"
                        >
                          See it<span className="sr-only">: {h.title}</span>
                        </ButtonLink>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
