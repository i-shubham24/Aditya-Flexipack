"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { BAY_W, BLUSH, BayGlyph, CRIMSON, EAVE, FLOOR, FOIL, FOIL_3, RIDGE, Tanks, slopePanels } from "./roof-drawing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INK = "#1c1517";
const INK_SOFT = "#4d4447";
const WHITE = "#ffffff";

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
      caption: "A copper gravure cylinder on the engraving machine",
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
      caption: "Metallised film rolls on a slitter-rewinder",
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
  { title: "Pyrolysis plant and waste recycling" },
];

const ROOF_PATH =
  `M0 ${FLOOR} V${EAVE}` + BAYS.map((_, i) => ` L${(i + 1) * BAY_W} ${RIDGE}${i < BAYS.length - 1 ? ` V${EAVE}` : ""}`).join("") + ` V${FLOOR}`;
const DESK_PANELS = BAYS.flatMap((_, i) => slopePanels(i * BAY_W, EAVE, (i + 1) * BAY_W, RIDGE, 5, 32, 6, 14));
const MOBILE_PANELS = [0, 1, 2].flatMap((i) => slopePanels(i * 120, 60, (i + 1) * 120, 24, 3, 34, 7, 8));

const lines = "fill-none stroke-crimson [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] [&_*]:[vector-effect:non-scaling-stroke]";

/**
 * About's centrepiece: an architect's section through the integrated plant. Six bays under one saw-tooth roof,
 * one per in-house capability, with solar on the slopes and rainwater tanks under the ground line. Scrolling
 * lights the bays one by one (scrubbed, linear, no pin) until the whole plant is lit. The HTML ships lit.
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
        gsap.utils.toArray<SVGElement>("[data-bay]", el).forEach((bay, i) => {
          tl.fromTo(bay, { fill: FOIL }, { fill: WHITE, duration: 1 }, i);
          const li = storeys[i];
          const cap = li?.querySelector("[data-cap]");
          const thumb = li?.querySelector("[data-thumb]");
          if (cap) tl.fromTo(cap, { color: INK_SOFT }, { color: INK, duration: 1 }, i);
          if (thumb) tl.fromTo(thumb, { opacity: 0.4 }, { opacity: 1, duration: 1 }, i);
        });
        // At 90%: the roof lights in one quick pass and the tanks fill. Everything under one roof.
        tl.fromTo("[data-desk] [data-panel]", { fill: FOIL_3 }, { fill: CRIMSON, duration: 0.15, stagger: 0.012 }, 6);
        tl.fromTo("[data-desk] [data-water]", { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.4 }, 6.1);
        tl.fromTo("[data-cap-7]", { color: INK_SOFT }, { color: INK, duration: 0.4 }, 6.1);
        tl.set({}, {}, 6.67);
      });

      // Phones: the shed stands up as six storeys; each lights as it crosses 60% of the viewport.
      mm.add("(max-width: 639px) and (prefers-reduced-motion: no-preference)", () => {
        const toggle = (trigger: Element) =>
          gsap.timeline({ defaults: { duration: 0.45, ease: "power1.out" }, scrollTrigger: { trigger, start: "top 60%", toggleActions: "play none none reverse" } });
        storeys.forEach((li) => {
          const tl = toggle(li).fromTo(li, { backgroundColor: FOIL }, { backgroundColor: WHITE }, 0);
          const cap = li.querySelector("[data-cap]");
          const thumb = li.querySelector("[data-thumb]");
          if (cap) tl.fromTo(cap, { color: INK_SOFT }, { color: INK }, 0);
          if (thumb) tl.fromTo(thumb, { opacity: 0.4 }, { opacity: 1 }, 0);
        });
        const roof = el.querySelector("[data-mobile-roof]");
        if (roof) toggle(roof).fromTo(roof.querySelectorAll("[data-panel]"), { fill: FOIL_3 }, { fill: CRIMSON, stagger: 0.03 }, 0);
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
      <div className="panel bg-foil py-[var(--section-y)]">
        <div className="shell">
          <SectionHeader id="roof-title" title="Our integrated infrastructure" standfirst="Heavily backward integrated" />

          <div className="relative">
            {/* The capacity plate on the left gable: real text, so it is read even though the drawing is not */}
            <p className="mb-6 inline-flex flex-col rounded-[var(--radius-sm)] border-2 border-crimson bg-white px-4 py-2.5 lg:absolute lg:left-0 lg:top-[0.5%] lg:z-10 lg:mb-0">
              <span className="display tabular text-d4 text-crimson">4,000 MT/month</span>
              <span className="text-caption font-semibold text-ink">Laminates production capacity</span>
            </p>

            {/* Phones: the saw-tooth roof with its solar panels caps the stack of storeys */}
            <svg data-mobile-roof aria-hidden viewBox="0 0 360 96" className={`block h-auto w-full overflow-visible sm:hidden ${lines}`}>
              {MOBILE_PANELS.map((pts) => (
                <polygon key={pts} data-panel points={pts} fill={CRIMSON} stroke="none" />
              ))}
              <path d="M1 96 V60 L120 24 V60 L240 24 V60 L359 24 V96" />
            </svg>

            {/* 640 and up: the whole section, one bay per pair of grid columns */}
            <svg data-desk aria-hidden viewBox="0 0 1200 420" className={`hidden h-auto w-full overflow-visible sm:block ${lines}`}>
              {BAYS.map((_, i) => {
                const x = i * BAY_W;
                return <polygon key={x} data-bay points={`${x},${EAVE} ${x + BAY_W},${RIDGE} ${x + BAY_W},${FLOOR} ${x},${FLOOR}`} fill={WHITE} stroke="none" />;
              })}
              {DESK_PANELS.map((pts) => (
                <polygon key={pts} data-panel points={pts} fill={CRIMSON} stroke="none" />
              ))}
              <g opacity="0.35">
                {BAYS.slice(1).map((_, i) => (
                  <path key={i} d={`M${(i + 1) * BAY_W} ${EAVE} V${FLOOR}`} />
                ))}
              </g>
              {BAYS.map((_, i) => (
                <g key={i} transform={`translate(${i * BAY_W} 0)`}>
                  <BayGlyph index={i} />
                </g>
              ))}
              <path d={ROOF_PATH} />
              {/* Gutter and downpipe at the right gable, feeding the tanks below ground */}
              <path d={`M1192 ${RIDGE + 6} V378 H1180`} />
              <path d={`M-12 ${FLOOR} H1212`} />
              <Tanks xs={[1012, 1072, 1132]} top={368} />
            </svg>
          </div>

          <ol className="grid sm:mt-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-6 lg:gap-x-[clamp(1.25rem,1.8vw,1.5rem)]">
            {BAYS.map((b, i) => (
              <li
                key={b.title}
                data-storey
                className="grid grid-cols-2 items-start gap-x-4 border-x-2 border-b-2 border-crimson bg-white p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0"
              >
                <svg aria-hidden viewBox="0 164 200 198" className={`block h-auto w-full self-center overflow-visible sm:hidden ${lines}`}>
                  <BayGlyph index={i} />
                </svg>
                <div>
                  <span aria-hidden className="display tabular block text-d3 text-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 data-cap className="display mt-2 text-d4 text-ink">
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

          {/* Phones: the tanks sit under the ground line at the base of the stack */}
          <svg data-mobile-base aria-hidden viewBox="0 0 360 72" className={`block h-auto w-full overflow-visible sm:hidden ${lines}`}>
            <path d="M-8 1 H368" />
            <Tanks xs={[196, 252, 308]} top={14} />
          </svg>

          {/* Second row, under the ground line: solar and rainwater, then the way to the gallery */}
          <div className="mt-8 grid gap-y-6 sm:mt-14 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-[clamp(1.25rem,1.8vw,1.5rem)]">
            <ol start={7} className="lg:col-span-4 lg:col-start-9">
              <li>
                <span aria-hidden className="display tabular block text-d3 text-crimson">
                  07
                </span>
                <h3 className="display mt-2 text-d4">
                  <Link
                    href="/sustainability/"
                    data-cap-7
                    className="inline-flex min-h-11 items-center text-ink underline decoration-crimson decoration-2 underline-offset-[0.2em] hover:text-crimson"
                  >
                    Solar energy generation and rainwater harvesting
                  </Link>
                </h3>
              </li>
            </ol>
            <p className="self-end lg:order-first lg:col-span-4">
              <Link
                href="/gallery/"
                className="inline-flex min-h-11 items-center text-lead font-semibold text-ink underline decoration-crimson decoration-2 underline-offset-[0.25em] hover:text-crimson"
              >
                Visit the gallery
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Keep the palette import honest for the tanks' water colour, used inside <Tanks>.
void BLUSH;
