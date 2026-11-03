"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { productBySlug } from "@/content/products";
import { SectionHeader } from "@/components/system/SectionHeader";
import { Count } from "@/components/products/Count";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Band fills, top to bottom, with the text colours that pass contrast on each. The two white layers of the
 * spec are foil here because the Lay-up sits on the white sheet, where a white band would lose its edges.
 */
const FILLS = [
  { bg: "bg-crimson", ink: "text-white", sub: "text-white/90" },
  { bg: "bg-foil", ink: "text-ink", sub: "text-ink-soft" },
  { bg: "bg-wine", ink: "text-white", sub: "text-white/85" },
  { bg: "bg-foil-2", ink: "text-ink", sub: "text-ink-soft" },
  { bg: "bg-crimson-deep", ink: "text-white", sub: "text-white/90" },
  { bg: "bg-blush", ink: "text-wine", sub: "text-wine" },
  { bg: "bg-ink", ink: "text-white", sub: "text-white/80" },
  { bg: "bg-foil", ink: "text-ink", sub: "text-ink-soft" },
  { bg: "bg-crimson-wash", ink: "text-wine", sub: "text-ink-soft" },
  { bg: "bg-foil-3", ink: "text-ink", sub: "text-ink" },
] as const;

/**
 * Laminates, "The Lay-up". The ten laminate types are ten layers of one laminate, each carrying its solution
 * line. Scrolling presses the exploded layers together (linear scrub, no pin) until the gaps close and only the
 * stack's outer corners stay round, then the capacity plate appears. The HTML holds the laminated stack.
 */
export function LaminatesCentrepiece() {
  const root = useRef<HTMLElement>(null);
  const p = productBySlug("laminates");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", phone: "(max-width: 639.98px)" },
        (ctx) => {
          const { motion, phone } = ctx.conditions as { motion: boolean; phone: boolean };
          if (!motion) return;
          const bands = gsap.utils.toArray<HTMLElement>("[data-band]", root.current);
          const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          const gap = (phone ? 1.5 : 2) * rem;
          const corner = 0.875 * rem;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 80%", scrub: true },
          });
          // Bands only travel: they never scale, so every line stays readable at every point.
          tl.from(
            bands,
            {
              y: (i: number) => i * gap,
              borderTopLeftRadius: corner,
              borderTopRightRadius: corner,
              borderBottomLeftRadius: corner,
              borderBottomRightRadius: corner,
              duration: 1,
            },
            0,
          ).from("[data-plate]", { autoAlpha: 0, y: 24, duration: 0.12 }, 0.88);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  if (!p) return null;
  const lines = p.layup ?? [];

  return (
    <section ref={root} aria-labelledby="layup-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="layup-title" title={p.solutionsTitle ?? "Our laminate solutions"} standfirst="Ten structures, laid up as one laminate." />

        <ol className="grid">
          {p.offerings.map((name, i) => {
            const f = FILLS[i % FILLS.length];
            const edge = i === 0 ? "rounded-t-[var(--radius-xl)]" : i === p.offerings.length - 1 ? "rounded-b-[var(--radius-xl)]" : "";
            return (
              <li
                key={name}
                data-band
                className={`grid min-h-[5.5rem] items-center gap-x-[clamp(1.25rem,1.8vw,1.5rem)] gap-y-1.5 px-5 py-4 sm:px-7 lg:grid-cols-12 ${edge} ${f.bg}`}
              >
                <h3 className={`display text-d3 lg:col-span-5 ${f.ink}`}>{name}</h3>
                {lines[i] && <p className={`leading-snug lg:col-span-6 lg:col-start-7 ${f.sub}`}>{lines[i]}</p>}
              </li>
            );
          })}
        </ol>

        {/* The capacity plate, fixed to the stack's left edge once the layers are pressed. */}
        <p data-plate className="mt-[var(--stack)] inline-grid gap-1 rounded-[var(--radius-md)] bg-ink px-6 py-5 text-white">
          <span className="text-small text-white/80">Laminates production capacity</span>
          <span className="display text-d3">
            <Count value="4,000" /> MT/month
          </span>
        </p>
      </div>
    </section>
  );
}
