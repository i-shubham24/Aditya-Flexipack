"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CompanyHero } from "@/components/heroes/CompanyHero";
import { afterLoader } from "@/components/layout/Loader";
import type { Tone } from "@/components/system/tones";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

const PHOTO = {
  src: "/media/old/awards-recognitions/award-presentation-trophy-photo.webp",
  alt: "Dr. A.P.J. Abdul Kalam presenting the Entrepreneur of the Year award",
};

/**
 * The Awards opener: the company hero's pillow window holds the presentation photograph, and a silver nameplate
 * is fixed under it, as under a framed photograph in a hall. The plate is composed around CompanyHero on the
 * same page grid (Side span, with the window's 8% inset), sitting in the hero's bottom padding, so the shared
 * hero is not edited. It settles once the window's die line has drawn.
 */
export function AwardsHero({ tone }: { tone: Tone }) {
  const plate = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const settle = gsap.fromTo(
        plate.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1, paused: true, immediateRender: true },
      );
      return afterLoader(() => settle.play());
    });
    return () => mm.revert();
  });

  return (
    <div className="relative">
      <CompanyHero
        tone={tone}
        shape="pillow"
        title="Celebrating excellence in sustainable packaging"
        intro="Honoured by two Presidents of India, the U.P. Government and the brands we pack for."
        photo={PHOTO}
        actions={
          <ButtonLink href="/about-us/" tone="white">
            Our story
          </ButtonLink>
        }
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--section-y)*0.35_-_1.125rem)] sm:bottom-[calc(var(--section-y)*0.35_-_1.375rem)]">
        <div className="shell page-grid">
          <div className="span-side lg:pl-[8%]">
            <p
              ref={plate}
              className="flex min-h-9 max-w-[22rem] items-center rounded-[var(--radius-xs)] bg-foil px-3 text-small font-semibold text-ink sm:min-h-11 sm:px-4 lg:max-w-none"
            >
              Presented by Dr. A.P.J. Abdul Kalam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
