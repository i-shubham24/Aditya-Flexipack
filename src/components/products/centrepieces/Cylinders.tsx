"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cylinders = productBySlug("cylinders");

/* Plated cylinders are chrome, so the cylinder keeps to the foil silvers and white; the head and the cells carry the reds. */
const FOIL = "#eceef1";
const FOIL2 = "#dfe2e6";
const FOIL3 = "#c6cbd1";
const WHITE = "#ffffff";
const WINE = "#45060e";
const CRIMSON = "#ce0000";

/** The drawing is set out lying down, 4:1. Below 1024px the same group stands up. */
const W = 1200;
const H = 300;
const FACE = { x: 96, y: 72, w: 1008, h: 216 };
/** The head parks at the far end of the face once the pass is complete. */
const HEAD_X = FACE.x + FACE.w;
const TRAVEL = FACE.w;

/** Chrome as four fat flat bands: shoulder, highlight, face, belly. */
const BANDS: [number, number, string][] = [
  [72, 44, FOIL2],
  [116, 30, WHITE],
  [146, 92, FOIL],
  [238, 50, FOIL3],
];

/** Each reason fills with its own ink as the head passes it. White type passes on all four. */
const FILLS = ["bg-crimson", "bg-crimson-deep", "bg-wine", "bg-ink"];

function Journal({ side }: { side: "left" | "right" }) {
  // Mirror the left journal for the right end.
  const x = (left: number, width: number) => (side === "left" ? left : W - left - width);
  return (
    <g>
      <rect x={x(14, 72)} y="150" width="72" height="60" rx="22" fill={FOIL3} />
      <rect x={x(24, 52)} y="160" width="52" height="14" rx="7" fill={WHITE} />
      <rect x={x(66, 40)} y="116" width="40" height="128" rx="18" fill={FOIL2} />
    </g>
  );
}

/**
 * One cylinder and its engraving head, in lying-down coordinates. `id` keeps each copy's defs apart. The cells
 * are fat halftone dots: the word only exists where the dots fall inside it, and only as far as the head has been.
 */
function Drawing({ id }: { id: string }) {
  const dots = `${id}-dots`;
  const word = `${id}-word`;
  const cut = `${id}-cut`;
  const face = `${id}-face`;
  return (
    <>
      <defs>
        <pattern id={dots} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.9" fill={CRIMSON} />
          <circle cx="9" cy="9" r="2.9" fill={CRIMSON} />
        </pattern>
        <mask id={word} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <text
            x={W / 2}
            y="236"
            textAnchor="middle"
            fontSize="196"
            textLength="800"
            lengthAdjust="spacingAndGlyphs"
            fill={WHITE}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
          >
            Cylinders
          </text>
        </mask>
        <clipPath id={cut}>
          <rect data-cut x={FACE.x} y="0" width={FACE.w} height={H} />
        </clipPath>
        <clipPath id={face}>
          <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} rx="34" />
        </clipPath>
      </defs>

      <Journal side="left" />
      <Journal side="right" />

      <g clipPath={`url(#${face})`}>
        {BANDS.map(([y, h, fill]) => (
          <rect key={y} x={FACE.x} y={y} width={FACE.w} height={h} fill={fill} />
        ))}
        <g clipPath={`url(#${cut})`}>
          <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} fill={`url(#${dots})`} mask={`url(#${word})`} />
        </g>
      </g>

      {/* Engraving head: a fat crimson carriage with a lamp, a wine arm and a rounded diamond on the face. */}
      <g data-head>
        <rect x={HEAD_X - 46} y="0" width="92" height="48" rx="16" fill={CRIMSON} />
        <circle cx={HEAD_X - 20} cy="24" r="8" fill={WHITE} />
        <rect x={HEAD_X - 9} y="44" width="18" height="22" fill={WINE} />
        <path
          d={`M${HEAD_X} 84 ${HEAD_X - 11} 70 ${HEAD_X} 56 ${HEAD_X + 11} 70Z`}
          fill={WINE}
          stroke={WINE}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

/** The four reasons as one colour bar of split blocks; `base` is the unfilled copy that sits underneath. */
function Bar({ items, base = false }: { items: string[]; base?: boolean }) {
  const Tag = base ? "div" : "ol";
  return (
    <Tag
      aria-hidden={base || undefined}
      data-bar-fill={base ? undefined : true}
      className={`grid h-full grid-rows-4 gap-[3px] lg:grid-cols-4 lg:grid-rows-1 ${base ? "absolute inset-0" : "relative z-[1]"}`}
    >
      {items.map((item, k) => {
        const Cell = base ? "div" : "li";
        return (
          <Cell
            key={item}
            className={`flex flex-col justify-between gap-2 rounded-[var(--radius-md)] p-3 sm:p-5 lg:min-h-[11rem] ${
              base ? "bg-foil text-ink" : `${FILLS[k % FILLS.length]} text-white`
            }`}
          >
            <span aria-hidden className="display tabular block text-d3">
              {String(k + 1).padStart(2, "0")}
            </span>
            <span className="display block hyphens-auto break-words text-d4">{item}</span>
          </Cell>
        );
      })}
    </Tag>
  );
}

/**
 * Cylinders centrepiece, "The Engraving Pass". A chunky chrome gravure cylinder lies across the page; a crimson
 * engraving head travels along it and the cells it cuts spell "Cylinders" in fat halftone dots. Under the face,
 * the four reasons form one colour bar that fills behind the head, so each reason lights as the head reaches it.
 * Below 1024px the cylinder stands up and the bar runs beside it. The HTML holds the finished, fully engraved
 * state; the pass is a linear scrub with no pin.
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
        const fill = root.current?.querySelector<HTMLElement>("[data-bar-fill]");
        if (!figure || !head || !cut || !fill) return;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: figure, start: "top 75%", end: "bottom 60%", scrub: true },
        });
        // Head, cut edge and bar fill share one clock. The bar spans exactly the face, so its fill edge sits under the stylus.
        tl.fromTo(head, { x: -TRAVEL }, { x: 0, duration: 1 }, 0);
        tl.fromTo(cut, { attr: { width: 0 } }, { attr: { width: TRAVEL }, duration: 1 }, 0);
        tl.fromTo(
          fill,
          { clipPath: orient === "h" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          0,
        );
      };
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => pass("v"));
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => pass("h"));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cylinders-pass-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          id="cylinders-pass-title"
          title={cylinders?.extraTitle ?? "Why our cylinders"}
          standfirst="Built for precision, durability and repeatability."
        />

        {/*
          Below 1024px: two equal columns, the standing cylinder and the bar. The bar's block padding is 32% of its
          own column width, which is 8% of the cylinder's height, so the bar spans exactly the face.
          From 1024px: the cylinder across columns 1-12 and the bar under its face (8% in from each side).
        */}
        <div data-figure className="grid max-w-[24rem] grid-cols-2 gap-x-4 sm:mx-auto sm:gap-x-5 lg:max-w-none lg:grid-cols-1 lg:gap-y-5">
          <div className="lg:hidden">
            <svg data-orient="v" aria-hidden viewBox={`0 0 ${H} ${W}`} className="block h-auto w-full">
              <g transform={`translate(${H} 0) rotate(90)`}>
                <Drawing id={`${uid}v`} />
              </g>
            </svg>
          </div>
          <div className="hidden lg:block">
            <svg data-orient="h" aria-hidden viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
              <Drawing id={`${uid}h`} />
            </svg>
          </div>

          <div className="py-[32%] lg:px-[8%] lg:py-0">
            <div className="relative h-full">
              <Bar items={items} base />
              <Bar items={items} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
