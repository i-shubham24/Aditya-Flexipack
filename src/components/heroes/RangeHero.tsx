"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { TONES, type Tone } from "@/components/system/tones";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

export type Spec = { value: string; label: string };

/**
 * Range-page opener (Products, the six product pages, Offerings), set like a spec sheet: the name at the largest
 * display step, a photo column in 9-12 bleeding off the top and right edge, and four facts along the foot on a
 * deeper tone. The name snaps into register: two offset ink copies slide onto it, the way a press settles.
 */
export function RangeHero({
  name,
  lead,
  note,
  tone,
  photo,
  spec,
  actions,
}: {
  name: string;
  lead?: ReactNode;
  note?: string;
  tone: Tone;
  photo: { src: string; alt: string };
  spec?: Spec[];
  actions?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const t = TONES[tone];

  useHeroIntro(root, (tl) => {
    tl.fromTo('[data-register="a"]', { x: -6, y: 6, autoAlpha: 1 }, { x: 0, y: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, 0.15)
      .fromTo('[data-register="b"]', { x: 6, y: -6, autoAlpha: 1 }, { x: 0, y: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, 0.15)
      .from("[data-range-photo]", { yPercent: -6, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0.1)
      .from("[data-spec] > *", { y: 18, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }, 0.45);
  });

  return (
    <section ref={root} data-hero={t.dark ? "dark" : "light"} aria-labelledby="page-title">
      <div className={`relative overflow-clip rounded-b-[var(--radius-2xl)] ${t.bg} ${t.ink}`}>
        <div className="shell page-grid relative min-h-[min(84svh,50rem)] items-end gap-y-8 pt-[calc(var(--header-h)+2.5rem)]">
          <div className="span-lead relative z-10 pb-[calc(var(--section-y)*0.6)]">
            <div className="relative isolate">
              <span aria-hidden data-register="a" className="display invisible absolute inset-0 -z-10 text-d0 text-crimson-light">
                {name}
              </span>
              <span aria-hidden data-register="b" className={`display invisible absolute inset-0 -z-10 text-d0 ${t.dark ? "text-ink" : "text-wine"}`}>
                {name}
              </span>
              <h1 id="page-title" className="display text-d0">
                {name}
              </h1>
            </div>
            {note && (
              <p data-hero-fade className={`hand mt-3 inline-block -rotate-2 text-note ${t.note}`}>
                {note}
              </p>
            )}
            {lead && (
              <div data-hero-fade className={`mt-5 max-w-measure text-lead ${t.sub}`}>
                {lead}
              </div>
            )}
            {actions && (
              <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {actions}
              </div>
            )}
          </div>

          {/* Photo column: columns 9-12, bleeding off the top and the right edge, clipped by the hero's corners */}
          <div
            data-range-photo
            className="relative -mx-[var(--gutter)] aspect-[16/10] lg:col-[9/13] lg:mx-0 lg:-mt-[calc(var(--header-h)+2.5rem)] lg:mr-[calc(-1*(var(--gutter)+max(0px,(100vw-92rem)/2)))] lg:aspect-auto lg:self-stretch"
          >
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
          </div>
        </div>

        {spec && spec.length > 0 && (
          <div className={t.deeper}>
            <dl data-spec className="shell page-grid gap-y-6 py-7">
              {spec.slice(0, 4).map((s) => (
                <div key={s.label} className="col-span-2 sm:col-span-4 lg:col-span-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-d3">{s.value}</span>
                    <span className={`mt-1 block text-small ${t.sub}`}>{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
