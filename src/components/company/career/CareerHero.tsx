"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

gsap.registerPlugin(useGSAP);

// The work that happens on the campus, from the old site's product and plant pages.
const TEAMS = ["printing", "lamination", "film making", "cylinder", "ink", "quality", "pouching"];

/**
 * Career opener: the headline on the blush field, and on the right a crimson card that says "Join our ___ team",
 * the blank turning through the plant's departments, above a real photo of the press hall.
 * Reduced motion shows the first team and stays still.
 */
export function CareerHero({ tone }: { tone?: string } = {}) {
  const root = useRef<HTMLElement>(null);
  void tone;

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-photo]", { y: 36, scale: 0.95, autoAlpha: 0, duration: 0.75, ease: "back.out(1.5)", stagger: 0.12 }, 0.2);
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One word slides up out of the slot as the next slides in; the list repeats its first word at the end.
        const tl = gsap.timeline({ repeat: -1, delay: 2.2 });
        TEAMS.forEach((_, i) => {
          tl.to("[data-team-reel]", { yPercent: -(100 / (TEAMS.length + 1)) * (i + 1), duration: 0.55, ease: "back.inOut(1.6)" }, `+=${i ? 1.6 : 0}`);
        });
        tl.set("[data-team-reel]", { yPercent: 0 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="light" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-blush text-wine">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#ffbdb5" />
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#ffb4aa" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center items-center gap-y-10 pb-[clamp(1.5rem,5svh,3rem)] pt-[calc(var(--header-h)+1.5rem)]">
          <div className="col-span-full lg:col-[1/7]">
            <h1 id="page-title" data-hero-title className="display text-[clamp(3rem,6.6vw,6.8rem)] leading-[0.88]">
              Build the future of packaging.
            </h1>
            <p data-hero-fade className="mt-5 max-w-[30rem] text-lead">
              Join 500+ makers, engineers and creators on our 18-acre campus.
            </p>
            <div data-hero-fade className="mt-7">
              <ButtonLink href="#apply" tone="wine">
                Apply now
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-full grid gap-[clamp(0.6rem,1.1vw,0.9rem)] lg:col-[8/13]">
            <div data-hero-photo className="rounded-[var(--radius-xl)] bg-crimson p-[clamp(1.25rem,2.4vw,2rem)] text-white">
              <p className="hand -rotate-2 text-note text-blush">Your next role</p>
              <p className="display mt-3 text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.95]">
                <span className="sr-only">Join our {TEAMS.join(", ")} teams</span>
                <span aria-hidden>
                  Join our
                  <span className="block h-[1.05em] overflow-hidden">
                    <span data-team-reel className="block">
                      {[...TEAMS, TEAMS[0]].map((t, i) => (
                        <span key={i} className="block h-[1.05em] text-white">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  team
                </span>
              </p>
            </div>
            <div data-hero-photo className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)]">
              <Image src="/media/plant/press-hall.webp" alt="The press hall at the Rania campus" fill priority sizes="(min-width: 1024px) 36vw, 92vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
