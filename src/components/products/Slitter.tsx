"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products, type ProductSlug } from "@/content/products";
import { pageOf } from "@/content/next";
import { TONES } from "@/components/system/tones";
import { SectionHeader } from "@/components/system/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COVERS: Record<ProductSlug, string> = {
  laminates: "/media/old/home/photo-laminate-film-roller.webp",
  pouches: "/media/old/products-pouches/photo-pouch-range-autumn.webp",
  films: "/media/old/products-films/banner-film-slitting-rolls.webp",
  inks: "/media/old/products-inks/photo-ink-pots-printing-unit.webp",
  cylinders: "/media/old/products-cylinders/photo-cylinders-printed-film-close.webp",
  polybags: "/media/old/products-polybags/photo-polybag-film-roll.webp",
};

const NAMES = products.map((p) => p.name);

/** Each lane's print: the six names, starting with its own, so the web's first row reads the whole range. */
const printRun = (i: number) => Array.from({ length: 24 }, (_, k) => NAMES[(i + k) % NAMES.length]);

/**
 * Where a lane's print layer bleeds into the gap so the six layers read as one unbroken web. Phones stack the
 * lanes (one web, cut across), tablets set two webs of three, desktops one web of six.
 */
function bleed(i: number) {
  return [
    i > 0 ? "top-[calc(var(--lane-gap)/-2)]" : "top-0",
    i < 5 ? "bottom-[calc(var(--lane-gap)/-2)]" : "bottom-0",
    "left-0 right-0 sm:top-0 sm:bottom-0",
    i % 3 ? "sm:left-[calc(var(--lane-gap)/-2)]" : "sm:left-0",
    i % 3 !== 2 ? "sm:right-[calc(var(--lane-gap)/-2)]" : "sm:right-0",
    i > 0 ? "xl:left-[calc(var(--lane-gap)/-2)]" : "xl:left-0",
    i < 5 ? "xl:right-[calc(var(--lane-gap)/-2)]" : "xl:right-0",
  ].join(" ");
}

/** Which cuts carry a knife: tablets cut between lanes 1-2, 2-3, 4-5 and 5-6; desktops add the cut 3-4. */
const KNIFE_V: Record<number, string> = { 0: "hidden sm:block", 1: "hidden sm:block", 2: "hidden xl:block", 3: "hidden sm:block", 4: "hidden sm:block" };

/**
 * The Slitter. One master web printed with the six product names is slit into six lanes, and each lane is one
 * product. As the web scrolls in, V-knives run down the cuts (across them on phones) and the print clears behind
 * them to show each lane's card. The HTML holds the cut state: six lane cards and no print, which is what
 * reduced-motion and no-JS visitors get.
 */
export function Slitter() {
  const list = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = list.current;
      if (!el) return;
      const lanes = gsap.utils.toArray<HTMLElement>("[data-lane]", el);
      const knivesIn = (scope: HTMLElement[], kind: "v" | "h") => scope.flatMap((l) => gsap.utils.toArray<HTMLElement>(`[data-knife="${kind}"]`, l));

      const slit = (targets: HTMLElement[], trigger: Element, start: string, end: string, knives: HTMLElement[]) => {
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger, start, end, scrub: true } });
        tl.fromTo(targets, { "--cut": "0%" }, { "--cut": "100%", duration: 1 }, 0);
        if (knives.length) tl.fromTo(knives, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.06 }, 0.94);
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1280px) and (prefers-reduced-motion: no-preference)", () => {
        slit(lanes, el, "top 80%", "top 20%", knivesIn(lanes, "v"));
      });
      mm.add("(min-width: 640px) and (max-width: 1279.98px) and (prefers-reduced-motion: no-preference)", () => {
        [lanes.slice(0, 3), lanes.slice(3)].forEach((row) => slit(row, row[0], "top 85%", "top 30%", knivesIn(row, "v")));
      });
      mm.add("(max-width: 639.98px) and (prefers-reduced-motion: no-preference)", () => {
        slit(lanes, el, "top 75%", "bottom 85%", knivesIn(lanes, "h"));
      });
      return () => mm.revert();
    },
    { scope: list },
  );

  return (
    <section aria-labelledby="slitter-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="slitter-title" title="Product offerings" standfirst="Flexible, sustainable packaging in six product lines." />

        <div className="relative">
          <p className="hand absolute -top-9 right-1 -rotate-2 text-note text-crimson sm:-top-11">one web, six products</p>
        <ul
          ref={list}
          className="grid grid-cols-1 gap-[var(--lane-gap)] [--lane-gap:1rem] sm:grid-cols-3 sm:[--lane-gap:1.25rem] lg:[--lane-gap:clamp(1.25rem,1.8vw,1.5rem)] xl:grid-cols-6"
        >
          {products.map((p, i) => {
            const href = `/products/${p.slug}/`;
            const t = TONES[pageOf(href).tone];
            return (
              <li key={p.slug} data-lane className="relative" style={{ "--cut": "100%" } as CSSProperties}>
                <Link
                  href={href}
                  className={`group grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-[var(--lane-gap)] overflow-hidden rounded-[var(--radius-lg)] transition-transform duration-500 ease-[var(--ease-back)] hover:-translate-y-1 focus-visible:-translate-y-1 sm:flex sm:flex-col ${t.bg} ${t.ink}`}
                >
                  <span className="relative block aspect-square self-stretch overflow-hidden sm:aspect-[4/5] sm:self-auto">
                    <Image
                      src={COVERS[p.slug]}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 15vw, (min-width: 640px) 31vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="flex flex-col gap-2 py-4 pr-4 sm:flex-1 sm:p-4 xl:p-3.5">
                    <span className="display text-d3 xl:text-d4">{p.name}</span>
                    <span className={`text-small leading-snug ${t.sub}`}>{p.short}</span>
                    {/* The split button's two blocks, drawn inside the card: the whole card is the one link. */}
                    <span className="mt-auto flex min-h-11 items-stretch gap-[3px] pt-2 text-small font-semibold">
                      <span
                        className={`flex flex-1 items-center rounded-[var(--radius-sm)] px-3 py-2 leading-tight transition-transform duration-300 ease-[var(--ease-back)] group-hover:-translate-y-0.5 sm:flex-none xl:flex-1 ${
                          t.dark ? "bg-white text-ink" : "bg-ink text-white"
                        }`}
                      >
                        See {p.name.toLowerCase()}
                      </span>
                      <span
                        aria-hidden
                        className={`grid w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] transition-transform duration-300 ease-[var(--ease-back)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          !t.dark ? "bg-press text-white" : t.bg === "bg-ink" ? "bg-crimson text-white" : "bg-ink text-white"
                        }`}
                      >
                        <ArrowRight className="size-[1.15rem]" strokeWidth={2.4} />
                      </span>
                    </span>
                  </span>
                </Link>

                {/* The printed web over this lane, cleared by the knives (clip only; the card itself never moves). */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute z-10 overflow-hidden bg-foil [clip-path:inset(0_0_0_var(--cut))] sm:[clip-path:inset(var(--cut)_0_0_0)] ${bleed(i)}`}
                >
                  <div className="display flex flex-wrap content-start gap-x-[0.35em] gap-y-1 p-3 text-d3 text-crimson">
                    {printRun(i).map((n, k) => (
                      <span key={k}>{n}</span>
                    ))}
                  </div>
                </div>

                {i < 5 && (
                  <>
                    {/* Phones: the knife runs left to right along the cut under this strip. */}
                    <span
                      aria-hidden
                      data-knife="h"
                      className="pointer-events-none absolute left-[var(--cut)] top-[calc(100%_+_var(--lane-gap)/2)] z-20 -translate-x-full -translate-y-1/2 opacity-0 sm:hidden"
                    >
                      <svg width="30" height="18" viewBox="0 0 30 18" className="block">
                        <rect x="0" y="3" width="11" height="12" rx="2.5" fill="#1c1517" />
                        <path d="M13 1 V17 L30 9 Z" fill="#1c1517" />
                      </svg>
                    </span>
                    {/* Tablets and desktops: the knife runs down the cut to this lane's right. */}
                    <span
                      aria-hidden
                      data-knife="v"
                      className={`pointer-events-none absolute left-[calc(100%_+_var(--lane-gap)/2)] top-[var(--cut)] z-20 -translate-x-1/2 -translate-y-full opacity-0 ${KNIFE_V[i]}`}
                    >
                      <svg width="18" height="30" viewBox="0 0 18 30" className="block">
                        <rect x="3" y="0" width="12" height="11" rx="2.5" fill="#1c1517" />
                        <path d="M1 13 H17 L9 30 Z" fill="#1c1517" />
                      </svg>
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
}
