"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";
import { Count } from "@/components/products/Count";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const polybags = productBySlug("polybags");

const FOIL = "#eceef1";
const FOIL3 = "#c6cbd1";

/** Fat crimp ridges as a repeating zig-zag, so the texture tiles at any bag size instead of stretching. */
const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const CRIMP_DOWN = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' preserveAspectRatio='none'><path d='M0 2 12 10 24 2' fill='none' stroke='#ce0000' stroke-width='3' stroke-linejoin='round'/></svg>",
);
const CRIMP_ACROSS = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 24' preserveAspectRatio='none'><path d='M2 0 10 12 2 24' fill='none' stroke='#ce0000' stroke-width='3' stroke-linejoin='round'/></svg>",
);

/**
 * The three seals. The outer span stamps (a clip that runs along the edge); the inner band presses (it starts a
 * fifth wider and settles), so no element is ever driven by two tweens. The clips allow sideways room for the press.
 */
const SEALS = [
  {
    side: "left",
    outer: "inset-y-0 left-0 w-[var(--seal)]",
    texture: { backgroundImage: CRIMP_DOWN, backgroundSize: "100% 12px" },
    hidden: "inset(0% -25% 100% -25%)",
    shown: "inset(0% -25% 0% -25%)",
    press: "scaleX",
  },
  {
    side: "bottom",
    outer: "inset-x-0 bottom-0 h-[var(--seal)]",
    texture: { backgroundImage: CRIMP_ACROSS, backgroundSize: "12px 100%" },
    hidden: "inset(-25% 100% -25% 0%)",
    shown: "inset(-25% 0% -25% 0%)",
    press: "scaleY",
  },
  {
    side: "right",
    outer: "inset-y-0 right-0 w-[var(--seal)]",
    texture: { backgroundImage: CRIMP_DOWN, backgroundSize: "100% 12px" },
    hidden: "inset(100% -25% 0% -25%)",
    shown: "inset(0% -25% 0% -25%)",
    press: "scaleX",
  },
] as const;

/** Share of each third spent stamping; the rest is the press. */
const STAMP = 0.85;

/**
 * Polybags centrepiece, "Three Sides Sealed". One clear polybag, standing on a crimson-wash shape, carries the
 * offering as its print and is sealed on its three sides as the page scrolls: left top to bottom, then the
 * bottom left to right, then the right bottom to top, each finishing with a short press (linear scrub, no pin).
 * A crimson badge counts up to the published 120 micron; the industries sit beside the bag as chunky rows.
 * The HTML holds the sealed bag and every final value.
 */
export function PolybagsCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const offering = polybags?.offerings ?? [];
  const industries = polybags?.extra ?? [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const bag = root.current?.querySelector<HTMLElement>("[data-bag]");
        if (bag) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: bag, start: "top 70%", end: "bottom 70%", scrub: true },
          });
          SEALS.forEach((seal, i) => {
            const outer = bag.querySelector<HTMLElement>(`[data-seal="${seal.side}"]`);
            const band = outer?.firstElementChild;
            if (!outer || !band) return;
            tl.fromTo(outer, { clipPath: seal.hidden }, { clipPath: seal.shown, duration: STAMP }, i);
            tl.fromTo(band, { [seal.press]: 1.2 }, { [seal.press]: 1, duration: 1 - STAMP }, i + STAMP);
          });
        }

        // The badge pops on once as it arrives; its figure counts up inside (Count). Nothing else moves the badge.
        const badge = root.current?.querySelector<HTMLElement>("[data-badge]");
        if (badge) {
          gsap.from(badge, {
            scale: 0.6,
            autoAlpha: 0,
            duration: 0.6,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: badge, start: "top 85%", once: true },
          });
        }

        // The industries rise into place once (24px and a fade over 0.6s).
        const list = root.current?.querySelector<HTMLElement>("[data-industries]");
        if (list) {
          gsap.from(gsap.utils.toArray<HTMLElement>("[data-industry]", list), {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: { trigger: list, start: "top 80%", once: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="polybags-seal-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          id="polybags-seal-title"
          title={polybags?.offeringsTitle ?? "Our offering"}
          standfirst="Single and multi-coloured mono-layer film, sealed on three sides."
        />

        <div className="page-grid gap-y-[var(--stack)]">
          {/* The stage: a crimson-wash shape with a soft tonal contour, the bag standing on it. */}
          <div className="relative col-span-full overflow-clip rounded-[var(--radius-2xl)] bg-crimson-wash px-5 pb-10 pt-24 sm:col-[1/5] sm:px-8 lg:col-[1/7] lg:pb-14 lg:pt-28">
            <svg aria-hidden viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[62%] w-full">
              <path d="M0 130C110 50 230 210 360 140S530 50 600 100V400H0Z" fill="#ffd2cb" />
            </svg>

            <p aria-hidden className="hand absolute left-5 top-8 -rotate-2 text-note text-crimson sm:left-8">
              3-side seal
            </p>

            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[26rem]">
              {/* The published figure, on a round crimson badge over the bag's open corner */}
              <p
                data-badge
                className="absolute -right-3 -top-16 z-[3] grid size-[6.5rem] place-content-center rounded-full bg-crimson text-center text-white sm:-right-6 lg:size-[7.5rem]"
              >
                <span className="text-caption font-semibold leading-none">up to</span>
                <Count value="120" className="display text-d3 leading-none" />
                <span className="text-caption font-semibold leading-none">micron</span>
              </p>

              <div data-bag className="relative overflow-hidden rounded-[var(--radius-lg)] [--seal:1.25rem] sm:[--seal:1.5rem]">
                {/* The open top: the back panel shows above the front panel's dipped edge. */}
                <svg aria-hidden viewBox="0 0 100 28" preserveAspectRatio="none" className="block h-7 w-full">
                  <rect width="100" height="28" fill={FOIL3} />
                  <path d="M0 28V9Q50 26 100 9V28Z" fill={FOIL} />
                </svg>

                <div className="relative bg-foil px-[calc(var(--seal)+1.25rem)] pb-[calc(var(--seal)+1.75rem)] pt-5 sm:px-[calc(var(--seal)+1.75rem)]">
                  {/* Gloss on clear film: one soft white sweep */}
                  <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute left-[9%] top-[3%] h-[46%] w-[30%]">
                    <path d="M22 0C44 0 52 10 44 30L28 88C24 100 0 100 0 86V18C0 7 9 0 22 0Z" fill="#fff" opacity="0.6" />
                  </svg>
                  <div className="relative">
                    <p aria-hidden className="display text-d3 text-crimson">
                      {polybags?.name ?? "Polybags"}
                    </p>
                    <ul className="mt-5 grid gap-y-3 font-semibold leading-snug text-crimson max-sm:text-small">
                      {offering.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span aria-hidden className="mt-[0.45em] size-2.5 shrink-0 rounded-full bg-crimson" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {SEALS.map((seal) => (
                  <span key={seal.side} aria-hidden data-seal={seal.side} className={`absolute ${seal.outer}`}>
                    <span className="block h-full w-full bg-crimson-deep" style={seal.texture} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div data-industries className="col-span-full sm:col-[5/9] lg:col-[8/13] lg:self-center">
            <h3 className="display text-d3 text-ink">{polybags?.extraTitle ?? "Industries catered to"}</h3>
            <ul className="mt-8 grid gap-y-5">
              {industries.map((industry, k) => (
                <li key={industry} data-industry className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-3 sm:grid-cols-[4.25rem_minmax(0,1fr)]">
                  <span aria-hidden className="display tabular text-d3 text-crimson">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-d4 text-ink">{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
