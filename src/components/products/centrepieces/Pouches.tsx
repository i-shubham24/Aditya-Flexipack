"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";

gsap.registerPlugin(MorphSVGPlugin, useGSAP);

type Box = { x1: number; x2: number; y1: number; y2: number };
type Format = {
  /** The pouch outline; the one path that morphs. */
  outline: string;
  /** Extents for the W and H dimension arrows. */
  box: Box;
  /** Seal zones, drawn as 45 degree hatching. */
  seals: ReactNode;
  /** Notch, zip, spout, gusset fold or barrier layer. */
  details?: ReactNode;
};

const W = "#fff";
const rect = (x: number, y: number, w: number, h: number, fill: string) => <rect x={x} y={y} width={w} height={h} fill={fill} />;
/** Stand-up, the format the page opens on, so the server HTML already holds its outline. */
const STANDUP = "M160 120 H420 V540 Q420 570 390 570 H190 Q160 570 160 540 Z";

const notch = (x: number, y: number, dir: 1 | -1) => <path d={`M${x} ${y - 9} L${x + dir * 14} ${y} L${x} ${y + 9}`} fill="none" stroke={W} strokeWidth="3" strokeLinejoin="round" />;

/** Seven formats from "Our offering", drawn as die-lines in a 600 x 700 field. No sizes are given: W and H only. */
function formats(hatch: string, clip: string): Format[] {
  const h = `url(#${hatch})`;
  const shaped =
    "M190 130 H370 C370 210 330 240 330 300 C330 360 400 400 400 480 L400 530 Q400 570 360 570 H200 Q160 570 160 530 L160 480 C160 400 230 360 230 300 C230 240 190 210 190 130 Z";
  const standup = STANDUP;
  const gusset = <path d="M160 492 Q290 440 420 492" fill="none" stroke={W} strokeWidth="2.5" strokeDasharray="10 8" opacity="0.85" />;
  const standupSeals = (
    <>
      {rect(160, 120, 260, 32, h)}
      {rect(160, 152, 22, 388, h)}
      {rect(398, 152, 22, 388, h)}
    </>
  );
  return [
    {
      // Shaped: sealed all round, then die-cut to the brand's contour.
      outline: shaped,
      box: { x1: 160, x2: 400, y1: 130, y2: 570 },
      seals: (
        <g clipPath={`url(#${clip})`}>
          <path d={shaped} fill="none" stroke={h} strokeWidth="48" />
        </g>
      ),
      details: notch(160, 505, 1),
    },
    {
      // Liquid: a spout fitted in the top seal.
      outline: "M170 190 H410 V530 Q410 570 370 570 H210 Q170 570 170 530 Z",
      box: { x1: 170, x2: 410, y1: 190, y2: 570 },
      seals: (
        <>
          {rect(170, 190, 240, 36, h)}
          {rect(170, 226, 26, 314, h)}
          {rect(384, 226, 26, 314, h)}
        </>
      ),
      details: (
        <>
          <rect x="266" y="142" width="48" height="48" rx="4" fill="#a10000" stroke={W} strokeWidth="3" />
          <rect x="254" y="100" width="72" height="44" rx="8" fill="#a10000" stroke={W} strokeWidth="3" />
          <path d="M262 114 H318 M262 126 H318" stroke={W} strokeWidth="2" opacity="0.6" />
          {notch(410, 246, -1)}
        </>
      ),
    },
    {
      // Centre seal: end seals top and bottom, and the long fin seal down the middle.
      outline: "M146 170 H414 Q420 170 420 176 V534 Q420 540 414 540 H146 Q140 540 140 534 V176 Q140 170 146 170 Z",
      box: { x1: 140, x2: 420, y1: 170, y2: 540 },
      seals: (
        <>
          {rect(140, 170, 280, 44, h)}
          {rect(140, 496, 280, 44, h)}
          {rect(262, 214, 36, 282, h)}
        </>
      ),
      details: notch(140, 192, 1),
    },
    {
      // Side seal: sealed down both sides.
      outline: "M160 140 H420 V570 H160 Z",
      box: { x1: 160, x2: 420, y1: 140, y2: 570 },
      seals: (
        <>
          {rect(160, 140, 34, 430, h)}
          {rect(386, 140, 34, 430, h)}
        </>
      ),
      details: notch(420, 176, -1),
    },
    {
      // Three side seal: both sides and the bottom, open at the top.
      outline: "M150 150 H430 V560 H150 Z",
      box: { x1: 150, x2: 430, y1: 150, y2: 560 },
      seals: (
        <>
          {rect(150, 150, 32, 378, h)}
          {rect(398, 150, 32, 378, h)}
          {rect(150, 528, 280, 32, h)}
        </>
      ),
      details: (
        <>
          <path d="M150 150 H430" stroke="#ce0000" strokeWidth="5" />
          <path d="M150 150 H430" stroke={W} strokeWidth="2.5" strokeDasharray="10 8" />
          {notch(430, 186, -1)}
        </>
      ),
    },
    {
      // Stand-up: top and side seals, a zip track under the notch, and the bottom gusset folded in.
      outline: standup,
      box: { x1: 160, x2: 420, y1: 120, y2: 570 },
      seals: standupSeals,
      details: (
        <>
          <path d="M182 186 H398 M182 196 H398" stroke={W} strokeWidth="3" />
          {notch(420, 168, -1)}
          {gusset}
        </>
      ),
    },
    {
      // High barrier: the stand-up outline with the barrier layer drawn inside it.
      outline: standup,
      box: { x1: 160, x2: 420, y1: 120, y2: 570 },
      seals: standupSeals,
      details: (
        <>
          <path d="M196 160 H384 V526 Q384 546 364 546 H216 Q196 546 196 526 Z" fill="none" stroke={W} strokeWidth="2.5" opacity="0.85" />
          {notch(420, 168, -1)}
          {gusset}
        </>
      ),
    },
  ];
}

/** W under the pack and H beside it, with extension ticks: a die-line's dimensions, deliberately unnumbered. */
function Dimensions({ box, marker }: { box: Box; marker: string }) {
  const y = 622;
  const x = box.x2 + 52;
  const m = `url(#${marker})`;
  return (
    <g stroke={W} strokeWidth="2" fill={W}>
      <path d={`M${box.x1} ${box.y2 + 14} V${y + 12} M${box.x2} ${box.y2 + 14} V${y + 12}`} opacity="0.55" />
      <line x1={box.x1 + 4} y1={y} x2={box.x2 - 4} y2={y} markerStart={m} markerEnd={m} />
      <path d={`M${box.x2 + 14} ${box.y1} H${x + 12} M${box.x2 + 14} ${box.y2} H${x + 12}`} opacity="0.55" />
      <line x1={x} y1={box.y1 + 4} x2={x} y2={box.y2 - 4} markerStart={m} markerEnd={m} />
      <text x={(box.x1 + box.x2) / 2} y={y + 40} stroke="none" textAnchor="middle" className="display" fontSize="26">
        W
      </text>
      <text x={x + 22} y={(box.y1 + box.y2) / 2 + 9} stroke="none" className="display" fontSize="26">
        H
      </text>
    </g>
  );
}

const DEFAULT = 5; // Stand-up: the format with the most to show (seals, notch, zip and gusset).

/**
 * Pouches, "The Format Morph". A radio group of the seven formats beside a large white die-line on crimson.
 * Choosing a format morphs the outline (MorphSVG, 0.6 s) while seals and details crossfade; arrow keys move
 * through the formats, and a live region names the new drawing. No auto-advance; reduced motion swaps instantly.
 */
export function PouchesCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const outline = useRef<SVGPathElement>(null);
  const uid = useId().replace(/[:]/g, "");
  const ids = { hatch: `hatch-${uid}`, clip: `clip-${uid}`, marker: `arrow-${uid}`, title: `morph-title-${uid}` };
  const shapes = formats(ids.hatch, ids.clip);
  const [active, setActive] = useState(DEFAULT);
  const p = productBySlug("pouches");

  // Kill any morph still running when the drawing leaves the page.
  useGSAP(() => () => gsap.killTweensOf(outline.current), { scope: root });

  /** The outline path is left to GSAP after the first render: React never rewrites its `d`. */
  function choose(i: number) {
    setActive(i);
    const path = outline.current;
    if (!path) return;
    const to = shapes[i].outline;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.set(path, { attr: { d: to } });
    else gsap.to(path, { morphSVG: to, duration: 0.6, ease: "power2.inOut", overwrite: true });
  }

  if (!p) return null;
  const names = p.offerings;
  const label = `Die-line of ${names[active].toLowerCase().replace(/ pouches$/, " pouch")}`;

  return (
    <section ref={root} aria-labelledby={ids.title} className="py-[var(--section-y)]">
      <div className="shell page-grid gap-y-[var(--stack)]">
        <div className="col-span-full lg:col-[1/6]">
          <h2 id={ids.title} className="display text-d2 text-ink">
            {p.offeringsTitle}
          </h2>
          <p className="mt-5 max-w-measure text-lead text-ink-soft">Seven formats. Choose one to see its die-line.</p>

          <div role="radiogroup" aria-labelledby={ids.title} className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {names.map((name, i) => (
              <label
                key={name}
                className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] bg-foil px-4 py-2 font-semibold text-ink transition-colors duration-300 [&:not(:has(:checked)):hover]:bg-foil-2 has-[:checked]:bg-crimson has-[:checked]:text-white has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-ink"
              >
                <input
                  type="radio"
                  name={`format-${uid}`}
                  value={i}
                  checked={i === active}
                  onChange={() => choose(i)}
                  className="sr-only"
                />
                <span aria-hidden className="tabular text-small text-crimson group-has-[:checked]:text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-tight">{name}</span>
              </label>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {label}
          </p>
        </div>

        <div className="relative col-span-full aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-crimson sm:aspect-[4/3] lg:col-[6/13] lg:aspect-auto lg:h-[min(84svh,46rem)] lg:self-start">
          <svg viewBox="0 0 600 700" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id={ids.hatch} width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M-3 3 L3 -3 M0 12 L12 0 M9 15 L15 9" stroke={W} strokeOpacity="0.3" strokeWidth="2.5" />
              </pattern>
              <clipPath id={ids.clip}>
                <path d={shapes[0].outline} />
              </clipPath>
              <marker id={ids.marker} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill={W} />
              </marker>
            </defs>

            <path ref={outline} d={STANDUP} fill="#a10000" stroke={W} strokeWidth="3" strokeLinejoin="round" />

            {shapes.map((s, i) => (
              <g
                key={names[i]}
                aria-hidden
                className="transition-opacity duration-[600ms] ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                {s.seals}
                {s.details}
                <Dimensions box={s.box} marker={ids.marker} />
                <text x="40" y="76" fill={W} className="display" fontSize="38">
                  {names[i]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
