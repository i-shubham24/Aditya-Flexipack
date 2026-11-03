"use client";

import { useId, useRef, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

const INK = "#1c1517";
const CRIMSON = "#ce0000";
const FOIL3 = "#c6cbd1";

/** CPP: a flat die drops a curtain of melt onto the chill roll, and flat film runs off to the right. */
function CastArt() {
  return (
    <>
      <rect x="44" y="16" width="112" height="28" rx="6" fill={INK} />
      <path d="M62 44 H138 L112 88 H88 Z" fill={INK} />
      <rect data-curtain x="97" y="88" width="6" height="61" fill={CRIMSON} />
      <circle cx="130" cy="200" r="60" fill={FOIL3} stroke={INK} strokeWidth="3" />
      <circle data-roll cx="130" cy="200" r="44" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="6 9" opacity="0.45" />
      <circle cx="130" cy="200" r="9" fill={INK} />
      <path data-film d="M100 148 A60 60 0 0 1 190 200 L190 248 Q190 268 210 268 L306 268" fill="none" stroke={CRIMSON} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

/** Metallised: clear film runs through the vacuum chamber, and a silver front sweeps along it as it leaves. */
function MetalArt({ metal }: { metal: string }) {
  return (
    <>
      <defs>
        {/* The .metal-swatch colours */}
        <linearGradient id={metal} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#e9ebee" />
          <stop offset="0.22" stopColor="#f8f9fa" />
          <stop offset="0.38" stopColor="#a9afb7" />
          <stop offset="0.52" stopColor="#eef0f3" />
          <stop offset="0.66" stopColor="#8f969e" />
          <stop offset="0.82" stopColor="#f4f5f7" />
          <stop offset="1" stopColor="#c9cdd2" />
        </linearGradient>
      </defs>
      <rect x="12" y="146" width="90" height="22" fill="#fff" stroke={FOIL3} strokeWidth="2" />
      <rect x="100" y="64" width="120" height="180" rx="16" fill={INK} />
      <rect x="100" y="146" width="120" height="22" fill="#fff" opacity="0.18" />
      <rect x="136" y="214" width="48" height="12" rx="3" fill="#ff4b3e" />
      <g data-vapour fill={FOIL3}>
        <circle cx="148" cy="196" r="4" />
        <circle cx="160" cy="184" r="4" />
        <circle cx="172" cy="196" r="4" />
      </g>
      <rect data-metal x="218" y="146" width="90" height="22" fill={`url(#${metal})`} stroke={FOIL3} strokeWidth="2" />
      <rect data-front x="303" y="140" width="5" height="34" rx="2" fill="#fff" stroke={INK} strokeWidth="1.5" />
    </>
  );
}

/** Blown: a tube inflates upward from the ring die and closes flat at the top nip. */
function BlownArt() {
  return (
    <>
      <rect x="128" y="262" width="64" height="28" rx="4" fill={INK} />
      <ellipse cx="160" cy="260" rx="46" ry="9" fill={INK} />
      <path d="M92 126 L146 56 M228 126 L174 56" stroke={INK} strokeWidth="2" opacity="0.35" />
      <path
        data-bubble
        d="M126 254 C124 232 100 214 100 182 L100 124 L152 58 L168 58 L220 124 L220 182 C220 214 196 232 194 254 Z"
        fill="#ffe3df"
        stroke={CRIMSON}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="148" cy="46" r="11" fill={FOIL3} stroke={INK} strokeWidth="2.5" />
      <circle cx="172" cy="46" r="11" fill={FOIL3} stroke={INK} strokeWidth="2.5" />
      <path data-layflat d="M160 35 V18 Q160 10 168 10 L306 10" fill="none" stroke={CRIMSON} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

/** One short process per window, 1.2 s, ending on the frame the HTML already shows. */
function build(win: HTMLElement, id: string) {
  const q = gsap.utils.selector(win);
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  if (id === "cpp") {
    tl.from(q("[data-curtain]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.35, ease: "power1.in" }, 0)
      .from(q("[data-film]"), { drawSVG: "0%", duration: 0.75 }, 0.3)
      .from(q("[data-roll]"), { strokeDashoffset: 75, duration: 0.9 }, 0.3);
  } else if (id === "metallised") {
    tl.from(q("[data-vapour] circle"), { y: 22, autoAlpha: 0, duration: 0.4, stagger: 0.08, ease: "power1.out" }, 0)
      .from(q("[data-metal]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.8 }, 0.35)
      .from(q("[data-front]"), { x: -85, duration: 0.8 }, 0.35);
  } else {
    tl.from(q("[data-bubble]"), { scaleX: 0.3, scaleY: 0, transformOrigin: "50% 100%", duration: 0.8, ease: "power2.out" }, 0)
      .from(q("[data-layflat]"), { drawSVG: "0%", duration: 0.4 }, 0.8);
  }
  return tl;
}

/**
 * Films, "The Three Dies". Three process windows (cast, metallising, blown) index the three film sections below.
 * Each plays once as it enters and holds its end frame; pointing at or focusing a window plays it again.
 * Reduced motion and no-JS get the end frames.
 */
export function FilmsCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const plays = useRef<Record<string, gsap.core.Timeline>>({});
  const metal = `metal-${useId().replace(/[:]/g, "")}`;
  const p = productBySlug("films");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-die]", root.current).forEach((win) => {
          const id = win.dataset.die ?? "";
          const tl = build(win, id);
          plays.current[id] = tl;
          ScrollTrigger.create({ trigger: win, start: "top 80%", once: true, onEnter: () => tl.play() });
        });
        return () => {
          plays.current = {};
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const replay = (id: string) => plays.current[id]?.restart();

  if (!p?.films) return null;
  const art = { cpp: <CastArt />, metallised: <MetalArt metal={metal} />, blown: <BlownArt /> } as Record<string, ReactNode>;

  return (
    <section ref={root} aria-labelledby="dies-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="dies-title" title={p.headline} standfirst={p.brief[0]} />
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-[clamp(1.25rem,1.8vw,1.5rem)]">
          {p.films.map((f) => (
            <li key={f.id}>
              <a
                href={`#${f.id}`}
                data-die={f.id}
                onMouseEnter={() => replay(f.id)}
                onFocus={() => replay(f.id)}
                className="group grid aspect-[16/10] grid-cols-2 items-center gap-4 rounded-[var(--radius-lg)] bg-foil p-4 transition-colors duration-300 hover:bg-foil-2 sm:flex sm:aspect-[4/5] sm:flex-col sm:items-stretch sm:p-5"
              >
                <svg aria-hidden viewBox="0 0 320 300" className="h-full min-h-0 w-full sm:flex-1">
                  {art[f.id]}
                </svg>
                <span className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <span className="display text-d3 text-ink">{f.name}</span>
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-transform duration-300 ease-[var(--ease-back)] group-hover:translate-y-0.5"
                  >
                    <ArrowDown className="size-5" strokeWidth={2.4} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
