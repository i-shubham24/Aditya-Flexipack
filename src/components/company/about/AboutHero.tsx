"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { CountUp } from "@/components/company/common/CountUp";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { facts } from "@/content/site";

// The four published figures, each on its own colour block from the logo palette.
const BLOCKS = [
  { value: facts.years.value, label: "years in flexible packaging", look: "bg-crimson text-white" },
  { value: facts.team.value, label: "skilled people", look: "bg-blush text-wine" },
  { value: facts.capacity.value, label: "MT of laminates a month", look: "bg-foil text-ink" },
  { value: facts.acres.value, label: "acre campus near Kanpur", look: "bg-white text-wine" },
];

/**
 * About opener: the headline on the wine field beside a block grid, Aardvark style: one real photo of the plant and
 * the four figures that sum up the company, each counting up on its own colour block as the hero settles.
 */
export function AboutHero({ actions }: { actions?: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-photo]", { y: 36, scale: 0.94, autoAlpha: 0, duration: 0.7, ease: "back.out(1.5)", stagger: 0.08 }, 0.2);
  });

  return (
    <section ref={root} data-hero="dark" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-wine text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#3a040b" />
          <path d="M0 0 H560 C 520 120, 380 160, 260 120 S 60 140, 0 220 Z" fill="#520912" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center items-center gap-y-10 pb-[clamp(1.5rem,5svh,3rem)] pt-[calc(var(--header-h)+1.5rem)]">
          <div className="col-span-full lg:col-[1/7]">
            <h1 id="page-title" data-hero-title className="display text-[clamp(2.8rem,6vw,6rem)] leading-[0.9]">
              Pioneering flexible packaging for India&apos;s food brands
            </h1>
            <p data-hero-fade className="mt-5 max-w-[30rem] text-lead text-white/85">
              High-performance, sustainable packs, made on one campus near Kanpur.
            </p>
            {actions && (
              <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                {actions}
              </div>
            )}
          </div>

          <div className="col-span-full grid grid-cols-2 gap-[clamp(0.6rem,1.1vw,0.9rem)] lg:col-[7/13]">
            <div data-hero-photo className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/media/old/about-us/plant-exterior-wide.webp"
                alt="The Aditya Flexipack plant across its lawn under a hazy sun"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
            {BLOCKS.map((b) => (
              <div key={b.label} data-hero-photo className={`rounded-[var(--radius-xl)] p-[clamp(0.9rem,1.6vw,1.4rem)] ${b.look}`}>
                <p className="display tabular text-[clamp(2rem,3.6vw,3.4rem)] leading-none">
                  <CountUp value={b.value} />
                </p>
                <p className="mt-2 text-small leading-snug opacity-90">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
