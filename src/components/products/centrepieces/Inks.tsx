"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const inks = productBySlug("inks");

/** The six drawdown inks, in order, each with the text colour that passes contrast on it. */
const INKS = [
  { film: "bg-crimson text-white", puddle: "text-crimson" },
  { film: "bg-crimson-deep text-white", puddle: "text-crimson-deep" },
  { film: "bg-wine text-white", puddle: "text-wine" },
  { film: "bg-ink text-white", puddle: "text-ink" },
  { film: "bg-crimson-light text-ink", puddle: "text-crimson-light" },
  { film: "bg-blush text-ink", puddle: "text-blush" },
] as const;

/** Three plump, hand-poured puddles, so no two neighbouring stripes look stamped from one shape. */
const PUDDLES = [
  "M0 40V24C0 12 8 6 18 8C24 1 36-1 46 4C54-1 68-1 76 6C86 2 97 8 99 18C100 24 100 32 100 40Z",
  "M0 40V22C0 10 10 4 22 7C30 0 44 0 52 6C62 0 76 2 82 9C92 6 100 13 100 24V40Z",
  "M0 40V26C1 14 11 9 20 11C28 2 40 1 48 7C58 1 68 0 78 7C88 3 99 10 100 21V40Z",
];

/** A chunky drawdown rod in two flat chrome tones. */
const ROD = "linear-gradient(to bottom, #ffffff 0 46%, #c6cbd1 46% 100%)";

/**
 * Each stripe carries its own piece of the rod. The pieces meet in the gaps, so a row reads as one rod; the
 * pieces at the ends of a row reach into the card margin and round off as handles. Rows hold 2 stripes on
 * phones, 3 up to 1279px and 6 above, so the ends move with the breakpoint.
 */
function rodEdges(i: number) {
  return [
    i % 2 === 0 ? "left-[var(--rod-out)] rounded-l-full" : "left-[var(--rod-in)] rounded-l-none",
    i % 2 === 1 ? "right-[var(--rod-out)] rounded-r-full" : "right-[var(--rod-in)] rounded-r-none",
    i % 3 === 0 ? "sm:left-[var(--rod-out)] sm:rounded-l-full" : "sm:left-[var(--rod-in)] sm:rounded-l-none",
    i % 3 === 2 ? "sm:right-[var(--rod-out)] sm:rounded-r-full" : "sm:right-[var(--rod-in)] sm:rounded-r-none",
    i === 0 ? "xl:left-[var(--rod-out)] xl:rounded-l-full" : "xl:left-[var(--rod-in)] xl:rounded-l-none",
    i === 5 ? "xl:right-[var(--rod-out)] xl:rounded-r-full" : "xl:right-[var(--rod-in)] xl:rounded-r-none",
  ].join(" ");
}

/**
 * Inks centrepiece, "The Drawdown Card". Ink labs judge an ink by drawing it down a card with a rod; the six
 * offering statements are six fat drawdown stripes on one silver card. The HTML holds the drawn card. With
 * motion allowed, the rod starts under the puddles and the scroll pulls it down, laying each stripe's ink down
 * to the rod (linear scrub, no pin). Phones and tablets draw one row after another.
 */
export function InksCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const statements = inks?.offerings ?? [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const draw = (perRow: number) => {
        const card = root.current?.querySelector<HTMLElement>("[data-card]");
        if (!card) return;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: card, start: "top 70%", end: "bottom 60%", scrub: true, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-stripe]", card).forEach((stripe, i) => {
          const film = stripe.querySelector<HTMLElement>("[data-film]");
          const box = stripe.querySelector<HTMLElement>("[data-film-box]");
          const rod = stripe.querySelector<HTMLElement>("[data-rod]");
          if (!film || !box || !rod) return;
          const row = Math.floor(i / perRow);
          // The film's clip edge and the rod's centre share one linear clock, so the ink stops exactly at the rod.
          tl.fromTo(film, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, row);
          tl.fromTo(rod, { y: () => -box.offsetHeight }, { y: 0, duration: 1 }, row);
        });
      };
      mm.add("(max-width: 639px) and (prefers-reduced-motion: no-preference)", () => draw(2));
      mm.add("(min-width: 640px) and (max-width: 1279px) and (prefers-reduced-motion: no-preference)", () => draw(3));
      mm.add("(min-width: 1280px) and (prefers-reduced-motion: no-preference)", () => draw(6));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="inks-drawdown-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          id="inks-drawdown-title"
          title={inks?.offeringsTitle ?? "Our offering"}
          standfirst="Made by our ISO 22000:2018 certified sister concern."
        />

        {/* The card bleeds into the gutter by its own margin, so the stripes sit exactly on the page columns. */}
        <div
          data-card
          className="relative -mx-[var(--pad)] overflow-clip rounded-[var(--radius-xl)] bg-foil px-[var(--pad)] pb-[calc(var(--pad)+1.5rem)] pt-[calc(var(--pad)+0.5rem)] [--pad:clamp(0.75rem,1.6vw,1.5rem)] [--rod:1rem] lg:[--rod:1.25rem]"
        >
          {/* Soft tonal contours, the same move as the homepage panels */}
          <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 250C200 140 380 380 620 290S1000 110 1200 210V600H0Z" fill="#e4e7eb" />
            <path d="M0 470C230 390 420 560 660 480S1010 350 1200 420V600H0Z" fill="#dadee3" />
          </svg>

          <ol
            className="relative grid grid-cols-2 gap-x-[var(--g)] gap-y-12 [--g:1rem] sm:grid-cols-3 sm:[--g:1.25rem] lg:[--g:clamp(1.25rem,1.8vw,1.5rem)] xl:grid-cols-6"
            style={{ "--rod-in": "calc(var(--g) * -0.5 - 1px)", "--rod-out": "calc(var(--pad) * -0.6)" } as CSSProperties}
          >
            {statements.map((statement, i) => {
              const ink = INKS[i % INKS.length];
              return (
                <li key={statement} data-stripe className="flex min-h-[15rem] flex-col xl:min-h-[23rem]">
                  <svg
                    aria-hidden
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className={`relative z-[1] -mb-px block h-10 w-full lg:h-14 ${ink.puddle}`}
                  >
                    <path d={PUDDLES[i % PUDDLES.length]} fill="currentColor" />
                  </svg>
                  <div data-film-box className="relative flex-1">
                    <div
                      data-film
                      className={`flex h-full flex-col justify-between gap-4 rounded-b-[var(--radius-lg)] px-3 pb-7 pt-1 sm:px-4 ${ink.film}`}
                    >
                      <p className="display hyphens-auto break-words text-d4">{statement}</p>
                      <span aria-hidden className="display tabular text-d3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      data-rod
                      className={`absolute bottom-[calc(var(--rod)*-0.5)] z-[2] h-[var(--rod)] ${rodEdges(i)}`}
                      style={{ background: ROD }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
