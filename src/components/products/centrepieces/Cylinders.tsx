"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cylinders = productBySlug("cylinders");

/* Plated cylinders are chrome, so the drawing keeps to the foil silvers, white and ink; the head carries the brand reds. */
const FOIL = "#eceef1";
const FOIL2 = "#dfe2e6";
const FOIL3 = "#c6cbd1";
const WHITE = "#ffffff";
const INK = "#1c1517";
const WINE = "#45060e";
const CRIMSON = "#ce0000";

/** The drawing is set out lying down, 4:1. Phones draw the same group stood up. */
const W = 1200;
const H = 300;
const BODY = { x: 96, y: 66, w: 1008, h: 224 };
/** The head parks at the far end of the face once the pass is complete. */
const HEAD_X = BODY.x + BODY.w;

/** Chrome as flat bands, top to bottom: edge, shoulder, highlight, face, belly, edge. */
const BANDS: [number, number, string][] = [
  [66, 14, FOIL3],
  [80, 28, FOIL2],
  [108, 24, WHITE],
  [132, 82, FOIL],
  [214, 40, FOIL2],
  [254, 36, FOIL3],
];

/** A staggered screen of 6-unit rhombs, the shape a diamond stylus cuts. */
const CELLS = "M4 .6 7 3 4 5.4 1 3ZM0-2.4 3 0 0 2.4-3 0ZM8-2.4 11 0 8 2.4 5 0ZM0 3.6 3 6 0 8.4-3 6ZM8 3.6 11 6 8 8.4 5 6Z";

function Journal({ side }: { side: "left" | "right" }) {
  // Mirror the left journal for the right end.
  const x = (left: number, width: number) => (side === "left" ? left : W - left - width);
  return (
    <g>
      <rect x={x(24, 52)} y="150" width="52" height="56" rx="6" fill={FOIL3} />
      <rect x={x(24, 52)} y="150" width="52" height="38" rx="6" fill={FOIL2} />
      <rect x={x(30, 40)} y="158" width="40" height="8" rx="4" fill={WHITE} />
      <rect x={x(76, 20)} y="122" width="20" height="112" rx="4" fill={FOIL3} />
      <rect x={x(79, 6)} y="130" width="6" height="40" rx="3" fill={WHITE} />
    </g>
  );
}

/**
 * One cylinder and its engraving head, in lying-down coordinates. `id` keeps each copy's defs apart. No guide rail
 * is drawn: a long thin bar reads as a divider line, and the stylus already ties the head to the face.
 */
function Drawing({ id }: { id: string }) {
  const cells = `${id}-cells`;
  const word = `${id}-word`;
  const cut = `${id}-cut`;
  const face = `${id}-face`;
  return (
    <>
      <defs>
        <pattern id={cells} width="8" height="6" patternUnits="userSpaceOnUse">
          <path d={CELLS} fill={INK} />
        </pattern>
        {/* The word, set in the display face, decides which cells exist; the cut decides how far the head has been. */}
        <mask id={word} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <text
            x={W / 2}
            y="228"
            textAnchor="middle"
            fontSize="190"
            textLength="780"
            lengthAdjust="spacingAndGlyphs"
            fill={WHITE}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
          >
            Cylinders
          </text>
        </mask>
        <clipPath id={cut}>
          <rect data-cut x={BODY.x} y="0" width={BODY.w} height={H} />
        </clipPath>
        <clipPath id={face}>
          <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx="10" />
        </clipPath>
      </defs>

      <Journal side="left" />
      <Journal side="right" />

      <g clipPath={`url(#${face})`}>
        {BANDS.map(([y, h, fill]) => (
          <rect key={y} x={BODY.x} y={y} width={BODY.w} height={h} fill={fill} />
        ))}
        <rect x={BODY.x} y={BODY.y} width="10" height={BODY.h} fill={FOIL3} />
        <rect x={BODY.x + BODY.w - 10} y={BODY.y} width="10" height={BODY.h} fill={FOIL3} />
        <g clipPath={`url(#${cut})`}>
          <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} fill={`url(#${cells})`} mask={`url(#${word})`} />
        </g>
      </g>

      {/* Engraving head: carriage, stylus arm, diamond touching the face. */}
      <g data-head>
        <rect x={HEAD_X - 34} y="4" width="68" height="34" rx="9" fill={WINE} />
        <rect x={HEAD_X - 20} y="15" width="40" height="8" rx="4" fill={CRIMSON} />
        <rect x={HEAD_X - 6} y="36" width="12" height="18" fill={INK} />
        <path d={`M${HEAD_X} 70 ${HEAD_X - 8} 59 ${HEAD_X} 48 ${HEAD_X + 8} 59Z`} fill={CRIMSON} />
      </g>
    </>
  );
}

/** Where the face starts and ends along the drawing's length, as fractions, for timing the items. */
const B0 = BODY.x / W;
const B1 = HEAD_X / W;
const along = (f: number) => Math.min(1, Math.max(0, (f - B0) / (B1 - B0)));

/**
 * Cylinders centrepiece, "The Engraving Pass". A chrome gravure cylinder lies across the page; an engraving head
 * travels along it and the cells it cuts spell "Cylinders" in halftone. The four reasons sit under the
 * cylinder (beside it on phones, where it stands up) and come up to full strength as the head passes them.
 * The HTML holds the finished, fully engraved state; the pass is a linear scrub with no pin.
 */
export function CylindersCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const items = cylinders?.extra ?? [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const pass = (orient: "h" | "v") => {
        const figure = root.current?.querySelector<HTMLElement>("[data-figure]");
        const svg = root.current?.querySelector<SVGSVGElement>(`[data-orient="${orient}"]`);
        const head = svg?.querySelector("[data-head]");
        const cut = svg?.querySelector("[data-cut]");
        if (!figure || !head || !cut) return;
        const travel = HEAD_X - BODY.x;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: figure, start: "top 75%", end: "bottom 60%", scrub: true },
        });
        // The head and the cut edge share one clock, so cells appear exactly under the stylus.
        tl.fromTo(head, { x: -travel }, { x: 0, duration: 1 }, 0);
        tl.fromTo(cut, { attr: { width: 0 } }, { attr: { width: travel }, duration: 1 }, 0);
        // Each reason owns a quarter of the cylinder's length and lights while the head crosses it.
        gsap.utils.toArray<HTMLElement>("[data-item]", figure).forEach((item, k, all) => {
          const a = along(k / all.length);
          const b = along((k + 1) / all.length);
          tl.fromTo(item, { opacity: 0.4 }, { opacity: 1, duration: Math.max(b - a, 0.01) }, a);
        });
      };
      mm.add("(max-width: 639px) and (prefers-reduced-motion: no-preference)", () => pass("v"));
      mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => pass("h"));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cylinders-pass-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="cylinders-pass-title" title={cylinders?.extraTitle ?? "Why our cylinders"} />

        <div data-figure className="page-grid gap-y-10">
          {/* Phones: the cylinder stands in columns 1-2 and the head runs top to bottom. */}
          <div className="col-[1/3] row-start-1 sm:hidden">
            <svg data-orient="v" aria-hidden viewBox={`0 0 ${H} ${W}`} className="block h-auto w-full">
              <g transform={`translate(${H} 0) rotate(90)`}>
                <Drawing id={`${uid}v`} />
              </g>
            </svg>
          </div>
          <div className="span-full hidden sm:block">
            <svg data-orient="h" aria-hidden viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
              <Drawing id={`${uid}h`} />
            </svg>
          </div>

          <ol className="col-[3/5] row-start-1 grid grid-rows-4 sm:col-[1/-1] sm:row-start-2 sm:grid-cols-4 sm:grid-rows-1 sm:gap-x-5 lg:gap-x-[clamp(1.25rem,1.8vw,1.5rem)]">
            {items.map((item, k) => (
              <li key={item} data-item className="pt-1">
                <span aria-hidden className="display tabular block text-d3 text-crimson">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="display mt-2 block text-d4 text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
