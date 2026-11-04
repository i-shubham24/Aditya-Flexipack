"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/company/common/CountUp";
import { Contour } from "@/components/company/common/Contour";
import { facts } from "@/content/site";
import { BAY_W, BayGlyph, CRIMSON, CRIMSON_LIGHT, FOIL_2, FOIL_3, ROOM_H, ROOM_Y, Tanks, WHITE, WINE, slopePanels } from "./roof-drawing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INK = "#1c1517";
const INK_SOFT = "#4d4447";

type Bay = { title: string; photo?: { src: string; alt: string; caption: string } };

/** The old About page's "Our integrated infrastructure" list, one capability per bay, in the old order. */
const BAYS: Bay[] = [
  {
    title: "In-house ink manufacturing",
    photo: {
      src: "/media/old/products-inks/photo-ink-pots-printing-unit.webp",
      alt: "Blue, red and yellow ink pots sitting in the inking unit of a printing press",
      caption: "Ink pots in the inking unit of a press",
    },
  },
  {
    title: "Cylinder making",
    photo: {
      src: "/media/old/home/plant-copper-cylinder-engraver.webp",
      alt: "A copper-plated gravure cylinder mounted on an engraving machine",
      caption: "A copper cylinder on the engraving machine",
    },
  },
  {
    title: "CPP film processing",
    photo: {
      src: "/media/old/home/plant-blown-film-tower-close.webp",
      alt: "The blown-film tower seen from below, with blue handrails",
      caption: "The blown-film tower, seen from below",
    },
  },
  {
    title: "In-house metallising",
    photo: {
      src: "/media/old/products-films/banner-film-slitting-rolls.webp",
      alt: "Narrow rolls of metallised film on a slitter-rewinder shaft",
      caption: "Metallised film rolls on a slitter",
    },
  },
  {
    title: "Liquid and shaped pouching",
    photo: {
      src: "/media/old/home/plant-super-perfast-machine.webp",
      alt: "A red and steel machine labelled Super Perfast, with a touchscreen, in a white tiled room",
      caption: "The Super Perfast machine",
    },
  },
  {
    title: "Pyrolysis plant and waste recycling",
    photo: {
      src: "/media/old/career/stock-recycling-sorting.webp",
      alt: "Plant recycling and material sorting line in operation",
      caption: "Recycling & pyrolysis recovery line",
    },
  },
];

// The saw-tooth roof: one chunky tooth per bay, with three solar panels on each slope.
const TEETH = BAYS.map((_, i) => `${i * BAY_W + 10},160 ${i * BAY_W + 190},100 ${i * BAY_W + 190},160`);
const DESK_PANELS = BAYS.flatMap((_, i) => slopePanels(i * BAY_W + 10, 160, i * BAY_W + 190, 100, 3, 44, 12, 22));
const MOBILE_TEETH = [0, 1, 2].map((i) => `${i * 120 + 8},92 ${i * 120 + 112},48 ${i * 120 + 112},92`);
const MOBILE_PANELS = [0, 1, 2].flatMap((i) => slopePanels(i * 120 + 8, 92, i * 120 + 112, 48, 2, 34, 10, 16, [7, 17]));

const gap = "lg:gap-x-[clamp(1.25rem,1.8vw,1.5rem)]";

/**
 * About's centrepiece: the integrated plant as one long shed under a chunky saw-tooth roof. Six rooms, one per
 * in-house capability, with solar panels on the roof and rainwater tanks below ground. Scrolling lights the rooms
 * one by one (scrubbed, linear, no pin) until the whole plant is lit. The HTML ships fully lit.
 */
export function UnderOneRoof() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const storeys = gsap.utils.toArray<HTMLElement>("[data-storey]", el);
      const mm = gsap.matchMedia();

      // 640 and up: one scrub across the whole section, from its top at 75% to its bottom at 40% of the viewport.
      mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 40%", scrub: true },
        });
        const rooms = gsap.utils.toArray<SVGElement>("[data-desk] [data-room]", el);
        const glyphs = gsap.utils.toArray<SVGElement>("[data-desk] [data-glyph]", el);
        rooms.forEach((room, i) => {
          tl.fromTo(room, { fill: FOIL_2 }, { fill: WHITE, duration: 1 }, i);
          tl.fromTo(glyphs[i], { color: FOIL_3 }, { color: CRIMSON, duration: 1 }, i);
          const cap = storeys[i]?.querySelector("[data-cap]");
          const thumb = storeys[i]?.querySelector("[data-thumb]");
          if (cap) tl.fromTo(cap, { color: INK_SOFT }, { color: INK, duration: 1 }, i);
          if (thumb) tl.fromTo(thumb, { opacity: 0.4 }, { opacity: 1, duration: 1 }, i);
        });
        // At 90%: the solar roof lights in one quick pass and the tanks fill. Everything is under one roof.
        tl.fromTo("[data-desk] [data-panel]", { fill: FOIL_3 }, { fill: CRIMSON_LIGHT, duration: 0.15, stagger: 0.02 }, 6);
        tl.fromTo("[data-desk] [data-water]", { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.4 }, 6.1);
        tl.fromTo("[data-cap-7]", { color: INK_SOFT }, { color: INK, duration: 0.4 }, 6.1);
        tl.set({}, {}, 6.67);
      });

      // Phones: the shed stands up as six storeys; each lights as it crosses 60% of the viewport.
      mm.add("(max-width: 639px) and (prefers-reduced-motion: no-preference)", () => {
        const toggle = (trigger: Element) =>
          gsap.timeline({ defaults: { duration: 0.45, ease: "power1.out" }, scrollTrigger: { trigger, start: "top 60%", toggleActions: "play none none reverse" } });
        storeys.forEach((li) => {
          const tl = toggle(li).fromTo(li, { backgroundColor: FOIL_2 }, { backgroundColor: WHITE }, 0);
          const glyph = li.querySelector("[data-glyph]");
          const cap = li.querySelector("[data-cap]");
          const thumb = li.querySelector("[data-thumb]");
          if (glyph) tl.fromTo(glyph, { color: FOIL_3 }, { color: CRIMSON }, 0);
          if (cap) tl.fromTo(cap, { color: INK_SOFT }, { color: INK }, 0);
          if (thumb) tl.fromTo(thumb, { opacity: 0.4 }, { opacity: 1 }, 0);
        });
        const roof = el.querySelector("[data-mobile-roof]");
        if (roof) toggle(roof).fromTo(roof.querySelectorAll("[data-panel]"), { fill: FOIL_3 }, { fill: CRIMSON_LIGHT, stagger: 0.04 }, 0);
        const base = el.querySelector("[data-mobile-base]");
        if (base)
          toggle(base)
            .fromTo(base.querySelectorAll("[data-water]"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 100%" }, 0)
            .fromTo("[data-cap-7]", { color: INK_SOFT }, { color: INK }, 0);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="roof-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[calc(var(--section-y)*0.8)]">
        <Contour tone="foil" shape="high" />
        <div className="shell relative">
          <SectionHeader id="roof-title" title="Our integrated infrastructure" />

          <div className="relative">
            <p aria-hidden className="hand mb-2 text-right text-note text-crimson sm:absolute sm:right-0 sm:top-0 sm:mb-0">
              <span className="inline-block -rotate-2">everything under one roof</span>
            </p>

            {/* Phones: the saw-tooth roof with its solar panels caps the stack of storeys */}
            <svg data-mobile-roof aria-hidden viewBox="0 0 360 100" className="block h-auto w-full overflow-visible sm:hidden">
              {MOBILE_TEETH.map((pts) => (
                <polygon key={pts} points={pts} fill={WINE} stroke={WINE} strokeWidth="10" strokeLinejoin="round" />
              ))}
              {MOBILE_PANELS.map((pts) => (
                <polygon key={pts} data-panel points={pts} fill={CRIMSON_LIGHT} stroke="none" />
              ))}
            </svg>

            {/* 640 and up: the whole shed, one room over each pair of grid columns */}
            <svg data-desk aria-hidden viewBox="0 0 1200 430" className="hidden h-auto w-full overflow-visible sm:block">
              {TEETH.map((pts) => (
                <polygon key={pts} points={pts} fill={WINE} stroke={WINE} strokeWidth="14" strokeLinejoin="round" />
              ))}
              {DESK_PANELS.map((pts) => (
                <polygon key={pts} data-panel points={pts} fill={CRIMSON_LIGHT} stroke="none" />
              ))}
              {BAYS.map((_, i) => (
                <g key={i} transform={`translate(${i * BAY_W} 0)`}>
                  <rect data-room x="8" y={ROOM_Y} width={BAY_W - 16} height={ROOM_H} rx="22" fill={WHITE} />
                  <g data-glyph fill="currentColor" style={{ color: CRIMSON }}>
                    <BayGlyph index={i} />
                  </g>
                </g>
              ))}
              <rect x="0" y="358" width="1200" height="14" rx="7" fill={WINE} />
              <Tanks xs={[1010, 1070, 1130]} top={380} />
            </svg>
          </div>

          <ol className={`grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-6 ${gap}`}>
            {BAYS.map((b, i) => (
              <li
                key={b.title}
                data-storey
                className="grid grid-cols-2 items-center gap-x-4 rounded-[var(--radius-xl)] bg-white p-4 sm:block sm:rounded-none sm:bg-transparent sm:p-0"
              >
                <svg aria-hidden viewBox={`0 ${ROOM_Y + 8} 200 ${ROOM_H - 8}`} className="block h-auto w-full sm:hidden">
                  <g data-glyph fill="currentColor" style={{ color: CRIMSON }}>
                    <BayGlyph index={i} />
                  </g>
                </svg>
                <div>
                  <span aria-hidden className="display tabular block text-d3 text-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 data-cap className="display mt-2 text-d4 text-ink hyphens-auto [overflow-wrap:break-word]">
                    {b.title}
                  </h3>
                  {b.photo && (
                    <div data-thumb className="mt-4">
                      <PhotoFrame
                        src={b.photo.src}
                        alt={b.photo.alt}
                        ratio="1:1"
                        caption={b.photo.caption}
                        sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 40vw"
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Phones: the ground and the tanks under it, at the base of the stack */}
          <svg data-mobile-base aria-hidden viewBox="0 0 360 80" className="mt-2 block h-auto w-full sm:hidden">
            <rect x="0" y="0" width="360" height="12" rx="6" fill={WINE} />
            <Tanks xs={[190, 248, 306]} top={24} w={50} h={52} />
          </svg>

          {/* Second row, under the ground: the solar roof and the tanks, then the way to the gallery */}
          <div className={`mt-10 grid gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-12 ${gap}`}>
            <ol start={7} className="sm:col-span-2 lg:col-span-6 lg:col-start-7">
              <li>
                <span aria-hidden className="display tabular block text-d3 text-crimson">
                  07
                </span>
                <h3 data-cap-7 className="display mt-2 text-d4 text-ink hyphens-auto [overflow-wrap:break-word]">
                  Solar energy generation and rainwater harvesting
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-x-5">
                  {[facts.solar, facts.rainwater].map((f) => (
                    <div key={f.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-small text-ink-soft">{f.label}</dt>
                      <dd className="display tabular text-d2 text-crimson">
                        <CountUp value={f.value} />
                        <span className="ml-2 text-d4 text-ink">{f.unit}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 max-w-measure text-ink-soft">Sustainable pack options, built to cut waste and champion recyclability.</p>
                <ButtonLink href="/sustainability/" tone="crimson" className="mt-6">
                  Our sustainability work
                </ButtonLink>
              </li>
            </ol>
            <div className="self-end sm:col-span-2 lg:order-first lg:col-span-4">
              <ButtonLink href="/gallery/" tone="ink">
                Visit the gallery
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
