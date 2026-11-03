"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const polybags = productBySlug("polybags");

const FOIL = "#eceef1";
const FOIL2 = "#dfe2e6";
const FOIL3 = "#c6cbd1";

/** Crimp ridges as a repeating zig-zag, so the texture tiles at any bag size instead of stretching. */
const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const CRIMP_DOWN = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 8' preserveAspectRatio='none'><path d='M0 1.5 10 6.5 20 1.5' fill='none' stroke='#ce0000' stroke-width='1.8'/></svg>",
);
const CRIMP_ACROSS = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 20' preserveAspectRatio='none'><path d='M1.5 0 6.5 10 1.5 20' fill='none' stroke='#ce0000' stroke-width='1.8'/></svg>",
);

/**
 * The three seals. The outer span stamps (a clip that runs along the edge); the inner band presses (it starts a
 * fifth wider and settles), so no element is ever driven by two tweens. The clips allow sideways room for the press.
 */
const SEALS = [
  {
    side: "left",
    outer: "inset-y-0 left-0 w-[var(--seal)]",
    texture: { backgroundImage: CRIMP_DOWN, backgroundSize: "100% 8px" },
    hidden: "inset(0% -25% 100% -25%)",
    shown: "inset(0% -25% 0% -25%)",
    press: "scaleX",
  },
  {
    side: "bottom",
    outer: "inset-x-0 bottom-0 h-[var(--seal)]",
    texture: { backgroundImage: CRIMP_ACROSS, backgroundSize: "8px 100%" },
    hidden: "inset(-25% 100% -25% 0%)",
    shown: "inset(-25% 0% -25% 0%)",
    press: "scaleY",
  },
  {
    side: "right",
    outer: "inset-y-0 right-0 w-[var(--seal)]",
    texture: { backgroundImage: CRIMP_DOWN, backgroundSize: "100% 8px" },
    hidden: "inset(100% -25% 0% -25%)",
    shown: "inset(0% -25% 0% -25%)",
    press: "scaleX",
  },
] as const;

/** Share of each third spent stamping; the rest is the press. */
const STAMP = 0.85;

/**
 * Polybags centrepiece, "Three Sides Sealed". One clear polybag carries the offering as its print and is sealed
 * on its three sides as the page scrolls: left top to bottom, then the bottom left to right, then the right
 * bottom to top, each finishing with a short press (linear scrub, no pin). The industries sit beside it.
 * The HTML holds the sealed bag; the micron figure counts up once when the bag arrives.
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
        if (!bag) return;

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

        // The industries rise into place once (24px and a fade over 0.6s); nothing else moves them.
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

        // The figure is in the HTML at its final value; with motion it counts up once, on arrival.
        const figure = root.current?.querySelector<HTMLElement>("[data-count]");
        if (!figure) return;
        const end = figure.dataset.count ?? figure.textContent ?? "";
        const n = { v: 0 };
        figure.textContent = "0";
        gsap.to(n, {
          v: Number(end),
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            figure.textContent = String(Math.round(n.v));
          },
          scrollTrigger: { trigger: figure, start: "top 85%", once: true },
        });
        return () => {
          figure.textContent = end;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="polybags-seal-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="polybags-seal-title" title={polybags?.offeringsTitle ?? "Our offering"} />

        <div className="page-grid gap-y-[var(--stack)]">
          <div className="col-span-full sm:col-[1/5] lg:col-[1/7]">
            <div className="relative w-full max-w-[280px] pt-14 sm:max-w-[26rem] xl:max-w-[29rem]">
              <p aria-hidden className="hand absolute right-2 top-1 -rotate-2 text-note text-crimson">
                up to{" "}
                <span data-count="120" className="tabular">
                  120
                </span>{" "}
                micron
              </p>

              <div data-bag className="relative overflow-hidden rounded-[var(--radius-xs)] [--seal:1rem] sm:[--seal:1.25rem]">
                {/* The open top: the back panel shows above the front panel's dipped edge. */}
                <svg aria-hidden viewBox="0 0 100 24" preserveAspectRatio="none" className="block h-6 w-full">
                  <rect width="100" height="24" fill={FOIL2} />
                  <path d="M0 24V10Q50 22 100 10V24Z" fill={FOIL} />
                  <path d="M0 10Q50 22 100 10" fill="none" stroke={FOIL3} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>

                <div className="relative bg-foil px-[calc(var(--seal)+1.25rem)] pb-[calc(var(--seal)+1.5rem)] pt-4 sm:px-[calc(var(--seal)+1.75rem)]">
                  {/* Gloss on clear film */}
                  <span aria-hidden className="absolute inset-y-0 left-[16%] w-[11%] bg-white/50" />
                  <span aria-hidden className="absolute inset-y-0 left-[31%] w-[3%] bg-white/50" />
                  <div className="relative">
                    <p aria-hidden className="display text-d3 text-crimson">
                      {polybags?.name ?? "Polybags"}
                    </p>
                    <ul className="mt-5 grid gap-y-3 font-semibold leading-snug text-crimson max-sm:text-small">
                      {offering.map((line) => (
                        <li key={line} className="flex gap-2.5">
                          <svg aria-hidden viewBox="0 0 16 16" className="mt-[0.2em] size-[1em] shrink-0">
                            <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
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

          <div data-industries className="col-span-full sm:col-[5/9] sm:pt-14 lg:col-[8/13]">
            <h3 className="display text-d3 text-ink">{polybags?.extraTitle ?? "Industries catered to"}</h3>
            <ul className="mt-8 grid gap-x-[clamp(1.25rem,1.8vw,1.5rem)] gap-y-5 lg:grid-cols-2">
              {industries.map((industry, k) => (
                <li key={industry} data-industry className="flex gap-3 text-lead font-medium leading-snug text-ink">
                  <span aria-hidden className="display tabular w-[1.6em] shrink-0 text-crimson">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
