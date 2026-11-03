"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Step = { icon: string; title: string; body: string };

// Paper folders in the logo palette; the last one, the agreement, is the crimson one.
const FOLDERS = ["bg-foil", "bg-crimson-wash", "bg-foil", "bg-crimson text-white"];
const TABS = [
  "bg-foil group-hover:bg-crimson group-hover:text-white",
  "bg-crimson-wash group-hover:bg-crimson group-hover:text-white",
  "bg-foil group-hover:bg-crimson group-hover:text-white",
  "bg-crimson text-white group-hover:bg-wine",
];

/**
 * An application process as four file folders. Each folder stands up off the desk as the row comes into view,
 * one after another, and its tab turns crimson when you point at it.
 */
export function PartnerSteps({
  id,
  title,
  note,
  intro,
  steps,
  panel = "white",
}: {
  id: string;
  title: string;
  note: string;
  intro: string;
  steps: Step[];
  /** "white" sits on the page; "blush" sets the row on its own panel when a white section precedes it. */
  panel?: "white" | "blush";
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-folder]", {
          rotateX: -78,
          y: 40,
          autoAlpha: 0,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          duration: 0.9,
          ease: "back.out(1.4)",
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-folders]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className={panel === "white" ? "py-[var(--section-y)]" : "pt-[var(--frame)]"}>
      <div className={panel === "white" ? "" : "panel bg-blush py-[var(--section-y)]"}>
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id={id} className="display text-[clamp(2.6rem,5.6vw,5.6rem)] text-ink">
            {title}
          </h2>
          <p className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">{note}</p>
        </div>
        <p className="text-[1.08rem] leading-relaxed text-ink-soft lg:col-span-5">{intro}</p>
      </div>

      <ol data-folders className="shell mt-16 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} data-folder className="group relative pt-10">
            <span
              className={`hand absolute left-0 top-0 flex h-11 items-center rounded-t-[var(--radius-md)] px-5 text-[1.5rem] transition-colors duration-300 ${TABS[i % TABS.length]}`}
            >
              Step {i + 1}
            </span>
            <div
              className={`relative h-full rounded-[var(--radius-xl)] rounded-tl-none p-7 transition-transform duration-500 ease-[var(--ease-back)] group-hover:-translate-y-2 ${
                FOLDERS[i % FOLDERS.length]
              }`}
            >
              <span className="grid size-24 place-items-center rounded-full bg-white">
                <Image src={s.icon} alt="" width={95} height={95} className="size-20" />
              </span>
              <h3 className="display mt-8 text-[clamp(1.6rem,2.2vw,2rem)]">{s.title}</h3>
              <p className={`mt-3 text-[1.02rem] leading-relaxed ${i === steps.length - 1 ? "text-white/90" : "text-ink-soft"}`}>{s.body}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight aria-hidden className="absolute -right-[1.15rem] top-1/2 z-10 hidden size-6 text-crimson lg:block" strokeWidth={2.4} />
            )}
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
