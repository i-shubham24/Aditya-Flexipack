"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/company/common/CountUp";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { certificates } from "@/content/awards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Where each seal lands in the square stage, as percentages; sizes vary so the cluster reads like a stamped crate.
const PLACES = [
  { left: 4, top: 6, size: 42 },
  { left: 52, top: 0, size: 34 },
  { left: 40, top: 38, size: 40 },
  { left: 0, top: 54, size: 33 },
  { left: 70, top: 62, size: 28 },
];

const STATS = [
  { value: "2", label: "Presidents of India honoured us" },
  { value: String(certificates.length), label: "certifications held" },
  { value: "3", label: "FMCG clients' awards: Parle, ITC, Britannia" },
];

/**
 * Awards and certifications opener: the five certification seals stamp down one after another on the crimson
 * field, and the honours count up along the foot. The cluster (outer) drifts with the scroll; each seal (inner)
 * plays its own stamp, so no element is moved by two animations.
 */
export function AwardsHero({ tone }: { tone?: string } = {}) {
  const root = useRef<HTMLElement>(null);
  void tone;

  useHeroIntro(root, (tl) => {
    tl.from(
      "[data-hero-photo]",
      { scale: 1.7, rotate: -12, autoAlpha: 0, duration: 0.55, ease: "back.out(2.2)", stagger: 0.14 },
      0.2,
    );
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-seals]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="dark" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#dc0a05" />
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#b80000" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center items-center gap-y-10 pb-8 pt-[calc(var(--header-h)+1.5rem)]">
          <div className="span-lead">
            <h1 id="page-title" data-hero-title className="display text-d1">
              Recognised by Presidents.
            </h1>
            <p data-hero-fade className="mt-5 max-w-[30rem] text-lead text-white/90">
              Twice Entrepreneur of the Year, and certified for safe, quality packaging.
            </p>
            <div data-hero-fade className="mt-7">
              <ButtonLink href="/about-us/" tone="white">
                Our story
              </ButtonLink>
            </div>
          </div>

          <div className="span-side flex justify-center lg:justify-end">
            <ul data-seals aria-label="Our certifications" className="relative aspect-square w-[min(72vw,19rem)] lg:w-[min(28vw,24rem)]">
              {certificates.map((c, i) => {
                const p = PLACES[i % PLACES.length];
                return (
                  <li
                    key={c.name}
                    className="absolute"
                    style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}%` }}
                  >
                    <div
                      data-hero-photo
                      className="group relative aspect-square rounded-full bg-white p-[17%] ring-[6px] ring-crimson transition-transform duration-300 ease-[var(--ease-back)] hover:scale-[1.06]"
                    >
                      <Image src={c.mark} alt={c.name} fill priority sizes="12rem" className="object-contain p-[17%]" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative bg-crimson-deep">
          <dl className="shell page-grid gap-y-4 py-5">
            {STATS.map((s) => (
              <div key={s.label} className="col-span-full sm:col-span-4 lg:col-span-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="flex items-baseline gap-3">
                  <span className="display tabular text-[clamp(2rem,3.4vw,3.2rem)] leading-none">
                    <CountUp value={s.value} />
                  </span>
                  <span className="text-small leading-snug text-white/85">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
