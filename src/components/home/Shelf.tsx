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

const ROWS: { format: PackFormat; ink: string; h: string; mobileHidden?: boolean }[][] = [
  [
    { format: "standup", ink: "#ce0000", h: "h-24 sm:h-32 lg:h-40" },
    { format: "gusset", ink: "#9e0404", h: "h-28 sm:h-36 lg:h-44" },
    { format: "pillow", ink: "#ce0000", h: "h-16 sm:h-20 lg:h-24" },
    { format: "spout", ink: "#1c1517", h: "h-24 sm:h-32 lg:h-40", mobileHidden: true },
    { format: "sachet", ink: "#ce0000", h: "h-18 sm:h-24 lg:h-28", mobileHidden: true },
  ],
  [
    { format: "laddi", ink: "#9e0404", h: "h-24 sm:h-32 lg:h-40" },
    { format: "wrapper", ink: "#ce0000", h: "h-12 sm:h-16 lg:h-20", mobileHidden: true },
    { format: "polybag", ink: "#ce0000", h: "h-20 sm:h-28 lg:h-36" },
    { format: "standup", ink: "#1c1517", h: "h-20 sm:h-28 lg:h-36", mobileHidden: true },
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
      <div className="panel bg-white py-12 sm:py-[var(--section-y)]">
        <div className="shell grid gap-6 sm:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="shelf-title" className="display text-[clamp(2.1rem,5.6vw,6rem)] text-ink">
              Let&apos;s build packaging <span className="text-crimson">together</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:self-end">
            <p className="max-w-[34rem] text-[0.98rem] sm:text-[1.1rem] leading-relaxed text-ink-soft">
              Our world-class facilities and advanced machinery deliver flexible packaging at a scale that meets the most
              demanding production requirements. We engineer for operational efficiency and consistent quality, so your brand
              succeeds with every run.
            </p>
          </div>
        </div>

        <div data-shelves className="shell mt-10 sm:mt-16 grid gap-8 sm:gap-10 overflow-hidden">
          {ROWS.map((row, r) => (
            <div key={r} className="relative">
              <ul className="flex items-end justify-around gap-2 px-1 sm:gap-6 sm:px-8">
                {row.map((p, i) => (
                  <li
                    key={i}
                    data-drop
                    className={`${p.mobileHidden ? "hidden sm:flex" : "flex"} ${p.h} max-w-[28%] sm:max-w-[18%] items-end shrink-0`}
                  >
                    <Pack format={p.format} ink={p.ink} className="h-full w-auto" />
                  </li>
                ))}
                {r === 1 && (
                  <li
                    data-slot
                    className="flex h-24 sm:h-32 lg:h-36 w-28 sm:w-36 lg:w-[18%] lg:min-w-[7.5rem] items-end shrink-0"
                  >
                    <Link
                      href="/contact-us/"
                      className="grid h-full w-full place-items-center content-center gap-1.5 sm:gap-2 rounded-[var(--radius-md)] sm:rounded-[var(--radius-lg)] bg-foil p-2 sm:p-3 text-center text-ink ring-2 ring-crimson/40 ring-inset transition-colors hover:bg-crimson-wash"
                    >
                      <span className="grid size-7 sm:size-10 place-items-center rounded-full sm:rounded-[var(--radius-sm)] bg-crimson text-white">
                        <Plus className="size-4 sm:size-5" />
                      </span>
                      <span className="text-[0.74rem] sm:text-[0.95rem] font-semibold leading-tight">
                        This slot is for your brand
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
              <div aria-hidden className="mt-0 h-2.5 sm:h-3 rounded-[var(--radius-xs)] bg-foil-2 border-t border-foil shadow-sm" />
            </div>
          ))}
        </div>

        <div className="shell mt-10 sm:mt-14 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact-us/">Start an enquiry</ButtonLink>
          <ButtonLink href="/packaging-partnership/" tone="ink" plain>
            Packaging partnership
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
