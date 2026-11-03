"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HeroTone = "crimson" | "wine" | "wash" | "foil";

const TONES: Record<HeroTone, { bg: string; ink: string; note: string; sub: string; layers: [string, string, string]; dark: boolean }> = {
  crimson: { bg: "bg-crimson", ink: "text-white", note: "text-blush", sub: "text-white/90", layers: ["#dc0a05", "#e81911", "#b80000"], dark: true },
  wine: { bg: "bg-wine", ink: "text-white", note: "text-blush", sub: "text-white/80", layers: ["#520912", "#5c0b15", "#3a040b"], dark: true },
  wash: { bg: "bg-crimson-wash", ink: "text-wine", note: "text-crimson", sub: "text-ink-soft", layers: ["#ffd9d3", "#ffcfc8", "#ffece9"], dark: false },
  foil: { bg: "bg-foil", ink: "text-ink", note: "text-crimson", sub: "text-ink-soft", layers: ["#e4e7eb", "#dadee3", "#f4f5f7"], dark: false },
};

type Photo = { src: string; alt: string };

/**
 * Inner-page opener, full bleed like the home hero: a colour field with tonal contours, a chunky headline that
 * pops in word by word, a proof-pen note, and up to two real photographs dealt in as framed cards.
 * Without photos the headline is set large and centred.
 */
export function PageHero({
  title,
  note,
  intro,
  tone = "crimson",
  photos = [],
  actions,
  children,
}: {
  title: string;
  note?: string;
  intro?: ReactNode;
  tone?: HeroTone;
  photos?: Photo[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];
  const centred = photos.length === 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ paused: true, delay: 0.05 });
        intro
          .from("[data-word]", { yPercent: 60, rotate: () => gsap.utils.random(-7, 7), scale: 0.75, autoAlpha: 0, duration: 0.85, ease: "back.out(1.7)", stagger: 0.05 }, 0)
          .from("[data-photo]", { y: 140, rotate: (i) => (i ? -8 : 8), autoAlpha: 0, duration: 1, ease: "back.out(1.4)", stagger: 0.12 }, 0.15)
          .from("[data-hero-fade]", { y: 22, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.4);
        const release = afterLoader(() => intro.play());
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-photo]", { y: (i) => (i ? -140 : -70), rotate: (i) => (i ? 12 : -8), ease: "none", scrollTrigger: scrub });
        gsap.to("[data-layer]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });
        return release;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path data-layer d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill={t.layers[0]} />
          <path data-layer d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z" fill={t.layers[1]} />
          <path data-layer d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill={t.layers[2]} />
        </svg>

        <div
          className={`shell relative z-10 grid min-h-[min(86svh,54rem)] items-center gap-10 pb-[calc(var(--section-y)*0.6)] pt-[calc(var(--header-h)+3rem)] ${
            centred ? "" : "lg:grid-cols-12"
          }`}
        >
          <div className={centred ? "mx-auto max-w-[62rem] text-center" : "lg:col-span-7"}>
            <h1 id="page-title" className={`display leading-[0.88] ${centred ? "text-[clamp(3.2rem,8.4vw,8.6rem)]" : "text-[clamp(3rem,7vw,7rem)]"}`}>
              {title.split(" ").map((w, i) => (
                <span key={i} data-word className="inline-block pr-[0.2em]">
                  {w}
                </span>
              ))}
            </h1>
            {note && (
              <p data-hero-fade className={`hand mt-4 inline-block -rotate-2 text-[clamp(1.8rem,2.6vw,2.4rem)] ${t.note}`}>
                {note}
              </p>
            )}
            {intro && (
              <div data-hero-fade className={`mt-5 max-w-[36rem] text-[1.12rem] leading-relaxed ${t.sub} ${centred ? "mx-auto" : ""}`}>
                {intro}
              </div>
            )}
            {actions && (
              <div data-hero-fade className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 ${centred ? "justify-center" : ""}`}>
                {actions}
              </div>
            )}
          </div>

          {!centred && (
            <div className="relative mx-auto w-[min(78vw,26rem)] lg:col-span-5 lg:w-full lg:max-w-[28rem]">
              {photos[1] && (
                <div data-photo className="absolute inset-0 translate-x-[30%] translate-y-[-10%] rotate-[8deg] rounded-[var(--radius-lg)] bg-white p-2">
                  <div className="relative h-full overflow-hidden rounded-[var(--radius-md)]">
                    <Image src={photos[1].src} alt={photos[1].alt} fill sizes="28rem" className="object-cover" />
                  </div>
                </div>
              )}
              <div data-photo className="relative -rotate-[4deg] rounded-[var(--radius-lg)] bg-white p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={photos[0].src} alt={photos[0].alt} fill priority sizes="(min-width: 1024px) 28rem, 78vw" className="object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>
        {children && <div className="shell relative z-10 pb-[calc(var(--section-y)*0.6)]">{children}</div>}
      </div>
    </section>
  );
}
