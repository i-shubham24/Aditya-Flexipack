"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { Pack, type PackFormat } from "@/components/ui/Pack";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROWS: { format: PackFormat; ink: string; h: string }[][] = [
  [
    { format: "standup", ink: "#ce0000", h: "h-40" },
    { format: "gusset", ink: "#9e0404", h: "h-44" },
    { format: "pillow", ink: "#ce0000", h: "h-24" },
    { format: "spout", ink: "#1c1517", h: "h-40" },
    { format: "sachet", ink: "#ce0000", h: "h-28" },
  ],
  [
    { format: "laddi", ink: "#9e0404", h: "h-40" },
    { format: "wrapper", ink: "#ce0000", h: "h-20" },
    { format: "polybag", ink: "#ce0000", h: "h-36" },
    { format: "standup", ink: "#1c1517", h: "h-36" },
  ],
];

/** The page closes where every pack ends up: on a shelf. One slot is still empty. */
export function Shelf() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-drop]", {
          yPercent: -140,
          rotation: () => gsap.utils.random(-14, 14),
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          stagger: { each: 0.07, from: "random" },
          scrollTrigger: { trigger: "[data-shelves]", start: "top 72%", once: true },
        });
        gsap.from("[data-slot]", {
          scale: 0.85,
          autoAlpha: 0,
          duration: 0.8,
          ease: "back.out(1.8)",
          delay: 0.8,
          scrollTrigger: { trigger: "[data-shelves]", start: "top 72%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="shelf-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[var(--section-y)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="shelf-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] text-ink">
              Let&apos;s build packaging <span className="text-crimson">together</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:self-end">
            <p className="max-w-[34rem] text-[1.1rem] leading-relaxed text-ink-soft">
              Our world-class facilities and advanced machinery deliver flexible packaging at a scale that meets the most
              demanding production requirements. We engineer for operational efficiency and consistent quality, so your brand
              succeeds with every run.
            </p>
          </div>
        </div>

        <div data-shelves className="shell mt-16 grid gap-10">
          {ROWS.map((row, r) => (
            <div key={r} className="relative">
              <ul className="flex items-end justify-around gap-3 px-2 sm:gap-6 sm:px-8">
                {row.map((p, i) => (
                  <li key={i} data-drop className={`flex ${p.h} max-w-[18%] items-end`}>
                    <Pack format={p.format} ink={p.ink} className="h-full w-auto" />
                  </li>
                ))}
                {r === 1 && (
                  <li data-slot className="flex h-36 w-[18%] min-w-[7.5rem] items-end">
                    <Link
                      href="/contact-us/"
                      className="grid h-full w-full place-items-center content-center gap-2 rounded-[var(--radius-lg)] bg-white/70 p-3 text-center text-ink ring-2 ring-crimson/40 ring-inset transition-colors hover:bg-white"
                    >
                      <span className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-crimson text-white">
                        <Plus className="size-5" />
                      </span>
                      <span className="text-[0.95rem] font-semibold leading-tight">This slot is for your brand</span>
                    </Link>
                  </li>
                )}
              </ul>
              <div aria-hidden className="mt-0 h-4 rounded-[var(--radius-xs)] bg-white" />
            </div>
          ))}
        </div>

        <div className="shell mt-14 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact-us/">Start an enquiry</ButtonLink>
          <ButtonLink href="/packaging-partnership/" tone="white" plain>
            Packaging partnership
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
