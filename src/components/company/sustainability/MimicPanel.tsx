"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LAMP_ON = "#ff4b3e"; // crimson-light
const FOIL_3 = "#c6cbd1";
const WINE = "#45060e";

/** Where each flake of recycled film starts before the band closes up. */
const LOOSE = [
  { x: -6, y: -20, r: -16 },
  { x: 5, y: 16, r: 11 },
  { x: -3, y: -12, r: 9 },
  { x: 7, y: 22, r: -13 },
  { x: -5, y: -24, r: 17 },
  { x: 4, y: 13, r: -9 },
  { x: -4, y: -17, r: 13 },
  { x: 6, y: 19, r: -11 },
];

const glyph = "block h-auto w-24 shrink-0 overflow-visible fill-none stroke-foil-3 [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] sm:w-40 [&_*]:[vector-effect:non-scaling-stroke]";

function Tanks() {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={glyph}>
      <path d="M8 14 H192 M45 14 V30 M100 14 V30 M155 14 V30" />
      {[20, 75, 130].map((x) => (
        <rect key={`l${x}`} data-level x={x + 5} y="52" width="40" height="52" rx="5" fill={LAMP_ON} stroke="none" />
      ))}
      {[20, 75, 130].map((x) => (
        <rect key={x} x={x} y="30" width="50" height="80" rx="9" />
      ))}
      <path d="M70 98 H75 M125 98 H130" />
    </svg>
  );
}

function SolarArray() {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={glyph}>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => (
          <rect key={`${r}${c}`} data-cell data-d={r + c} x={10 + c * 31} y={10 + r * 22} width="27" height="18" rx="2" fill={LAMP_ON} />
        )),
      )}
      <path d="M58 78 L46 112 M142 78 L154 112 M28 112 H172" />
    </svg>
  );
}

function Pyrolysis() {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={glyph}>
      <path d="M8 6 H60 L44 34 H24 Z M34 34 V54" />
      {[14, 78, 142].map((x) => (
        <rect key={x} data-chamber x={x} y="54" width="44" height="48" rx="5" fill={LAMP_ON} />
      ))}
      <path d="M58 78 H78 M122 78 H142 M164 54 V22 M157 22 H171 M8 110 H192" />
    </svg>
  );
}

function FilmBand() {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={glyph}>
      {LOOSE.map((_, i) => (
        <rect key={i} data-flake x={12 + i * 22} y="50" width="22" height="20" rx="2" fill={LAMP_ON} stroke="none" />
      ))}
      <rect x="12" y="50" width="176" height="20" rx="4" />
      <path d="M12 88 H188" strokeDasharray="2 7" />
    </svg>
  );
}

type Region = { title: string; readout: string; unit?: string; spoken: string; body: string; glyph: ReactNode };

/** The four initiatives from the old Sustainability page, each with the figure the copy gives it. */
const REGIONS: Region[] = [
  {
    title: "Rainwater harvesting",
    readout: "3",
    spoken: "rainwater harvesting systems",
    body: "Water conservation is critical to how we run. Three systems collect and reuse rainwater. We rely less on outside water sources.",
    glyph: <Tanks />,
  },
  {
    title: "Solar power",
    readout: "1.35",
    unit: "MW",
    spoken: "of solar power installed",
    body: "We are moving to clean, renewable energy. Solar meets a significant share of the plant's needs. That cuts carbon emissions and fossil fuel use.",
    glyph: <SolarArray />,
  },
  {
    title: "Recycling and pyrolysis",
    readout: "3",
    unit: "stages",
    spoken: "of pyrolysis",
    body: "We close the loop. Our pyrolysis system turns waste into energy. Our recycling plant gives plastic waste a second life.",
    glyph: <Pyrolysis />,
  },
  {
    title: "Post-industrial recycled (PIR) materials",
    readout: "PIR",
    spoken: "",
    body: "Where clients need it, we add post-industrial recycled waste to their packs. It helps brands meet sustainability goals, with no loss of quality or performance.",
    glyph: <FilmBand />,
  },
];

/**
 * Sustainability's centrepiece: the plant's resources as a control-room mimic panel. The wine panel is the board,
 * a foil bus runs round the four systems into the plant node, and each system has its lamp, readout and glyph.
 * When the board arrives the lamps switch on one by one and each system comes to life once. The HTML ships lit.
 */
export function MimicPanel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const articles = gsap.utils.toArray<HTMLElement>("[data-region]", el);
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]", el);

      /** One system coming to life: lamp, readout and glyph. */
      const wake = (tl: gsap.core.Timeline, a: HTMLElement, at: number) => {
        tl.fromTo(a.querySelector("[data-lamp]"), { backgroundColor: FOIL_3 }, { backgroundColor: LAMP_ON, duration: 0.12 }, at);
        const count = a.querySelector<HTMLElement>("[data-count]");
        const node = count?.firstChild;
        if (count && node) {
          const final = count.dataset.count ?? "";
          const target = parseFloat(final);
          const decimals = final.split(".")[1]?.length ?? 0;
          const o = { n: 0 };
          node.nodeValue = (0).toFixed(decimals);
          tl.to(o, { n: target, duration: 0.8, ease: "power2.out", onUpdate: () => void (node.nodeValue = o.n.toFixed(decimals)) }, at);
        }
        const levels = a.querySelectorAll("[data-level]");
        if (levels.length) tl.from(levels, { scaleY: 0, transformOrigin: "50% 100%", duration: 0.8, ease: "power1.inOut" }, at);
        const cells = a.querySelectorAll<SVGElement>("[data-cell]");
        if (cells.length)
          tl.fromTo(cells, { fill: WINE }, { fill: LAMP_ON, duration: 0.15, stagger: (_i, target: SVGElement) => Number(target.dataset.d) * (0.45 / 7) }, at);
        const chambers = a.querySelectorAll("[data-chamber]");
        if (chambers.length) tl.fromTo(chambers, { fill: FOIL_3 }, { fill: LAMP_ON, duration: 0.2, stagger: 0.2 }, at);
        const flakes = a.querySelectorAll("[data-flake]");
        if (flakes.length)
          tl.from(
            flakes,
            {
              x: (i: number) => LOOSE[i].x,
              y: (i: number) => LOOSE[i].y,
              rotation: (i: number) => LOOSE[i].r,
              opacity: 0.55,
              transformOrigin: "50% 50%",
              duration: 0.6,
              ease: "power3.out",
            },
            at,
          );
      };

      // Counters write their own text, so put the published figures back whenever the motion is torn down.
      const restore = () => {
        counters.forEach((c) => {
          if (c.firstChild) c.firstChild.nodeValue = c.dataset.count ?? "";
        });
      };

      const mm = gsap.matchMedia();
      // Desktop: the whole board wakes once, when the panel's top reaches 70% of the viewport.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true } });
        articles.forEach((a, i) => wake(tl, a, i * 0.25));
        return restore;
      });
      // Below that the systems stack on a ladder, and each wakes as it enters.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        articles.forEach((a) => wake(gsap.timeline({ scrollTrigger: { trigger: a, start: "top 80%", once: true } }), a, 0));
        return restore;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="mimic-title" className="pt-[var(--frame)]">
      <div className="panel bg-wine py-[calc(var(--section-y)*0.75)] text-white">
        <div className="shell">
          <SectionHeader id="mimic-title" title="Our key sustainability initiatives" dark />

          <div className="relative">
            {/* The bus: a loop round the four systems and a cross into the plant node (desktop), a ladder below */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              <span className="absolute inset-0 rounded-[var(--radius-xl)] border-2 border-foil-3" />
              <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-foil-3" />
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-foil-3" />
            </div>
            <span aria-hidden className="absolute bottom-10 left-2 top-[1.375rem] w-0.5 -translate-x-1/2 bg-foil-3 lg:hidden" />

            <p className="relative z-10 flex min-h-11 items-center pl-10 text-small font-semibold lg:absolute lg:left-1/2 lg:top-1/2 lg:min-h-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[var(--radius-sm)] lg:border-2 lg:border-foil-3 lg:bg-wine lg:px-4 lg:py-2">
              <span aria-hidden className="absolute left-2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-[3px] border-2 border-foil-3 bg-wine lg:hidden" />
              <span className="sr-only">Our plant at </span>Rania, Kanpur Dehat
            </p>

            <div className="grid lg:grid-cols-2 lg:grid-rows-2">
              {REGIONS.map((r) => (
                <article key={r.title} data-region className="relative pb-12 pl-10 pt-8 lg:p-[clamp(2rem,3.5vw,3.5rem)] lg:pb-[clamp(2.5rem,4.5vw,4.5rem)]">
                  <span
                    aria-hidden
                    data-lamp
                    className="absolute left-2 top-[calc(2rem+0.46*var(--text-d2))] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-wine bg-crimson-light lg:left-0 lg:top-[calc(clamp(2rem,3.5vw,3.5rem)+0.46*var(--text-d2))]"
                  />
                  <div className="flex flex-col">
                    <h3 className="display mt-6 text-d4 text-white">{r.title}</h3>
                    <div className="order-first flex items-start justify-between gap-6">
                      <p className="display tabular text-d2 text-white">
                        {/^\d/.test(r.readout) ? (
                          <span data-count={r.readout} className="inline-block">
                            {r.readout}
                          </span>
                        ) : (
                          r.readout
                        )}
                        {r.unit && <span className="ml-2 text-d4">{r.unit}</span>}
                        {r.spoken && <span className="sr-only"> {r.spoken}</span>}
                      </p>
                      {r.glyph}
                    </div>
                    <p className="mt-3 max-w-measure text-white/80">{r.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
