"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { afterLoader } from "@/components/layout/Loader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORDS = ["We", "make", "the", "part", "you", "tear", "open."];

/** Tonal contour layers in the logo's crimson. */
function Contours() {
  return (
    <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <path data-contour d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#dc0a05" />
      <path data-contour d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z" fill="#e81911" />
      <path data-contour d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#b80000" />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Built paused so the start state paints at once, then played when the loader hands over.
        const intro = gsap.timeline({ paused: true, delay: 0.1 });
        intro
          .from("[data-word]", { yPercent: 60, rotate: () => gsap.utils.random(-8, 8), scale: 0.7, autoAlpha: 0, duration: 0.9, ease: "back.out(1.7)", stagger: 0.06 }, 0)
          .from("[data-card-back]", { y: 160, rotate: -6, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)" }, 0.1)
          .from("[data-card-front]", { y: 140, rotate: 8, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)" }, 0.25)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.5);
        const release = afterLoader(() => intro.play());
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-scrub-front]", { y: -70, rotate: -4, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-scrub-back]", { y: -150, x: 40, rotate: 5, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-contour]", { yPercent: (i) => [-8, -14, 10][i], ease: "none", scrollTrigger: scrub });
        return release;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero="dark" aria-labelledby="hero-title" className="h-[100svh] min-h-[640px]">
      {/* Full bleed, like the reference: edge to edge and up under the header, rounded only where it meets the page */}
      <div className="relative h-full overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson text-white">
        <Contours />
        <div className="shell relative z-10 flex h-full flex-col justify-center pb-[34svh] pt-[var(--header-h)] lg:pb-0">
          <div className="max-w-[44rem]">
            <h1 id="hero-title" className="display text-[clamp(3.4rem,8.2vw,8.2rem)] leading-[0.86]">
              {WORDS.map((w, i) => (
                <span key={i} data-word className="inline-block pr-[0.22em]">
                  {w}
                </span>
              ))}
            </h1>
            <p data-hero-fade className="mt-6 max-w-[30rem] text-[1.1rem] leading-relaxed text-white/90">
              Packaging that powers performance for India&apos;s leading brands: laminates, pouches, films, inks and cylinders,
              made under one roof near Kanpur.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/products/" tone="white">
                Explore solutions
              </ButtonLink>
              <Link href="/packaging-partnership/" className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
                Partner with us
              </Link>
            </div>
          </div>
        </div>

        {/* Real bags from the old site, dealt like two photo cards */}
        <div data-pouches className="pointer-events-none absolute bottom-[2.5svh] right-[4%] w-[min(44vw,12.5rem)] sm:bottom-[3svh] sm:right-[6%] sm:w-[min(40vw,18rem)] lg:bottom-auto lg:right-[7%] lg:top-1/2 lg:w-[min(30vw,27rem)] lg:-translate-y-[44%]">
          {/* Two layers per card: the outer one follows the scroll, the inner one plays the entrance, so they never fight */}
          <div data-scrub-back className="absolute inset-0">
            <div data-card-back className="h-full translate-x-[34%] translate-y-[-8%] rotate-[9deg] rounded-[var(--radius-lg)] bg-white p-2">
              <div className="relative h-full overflow-hidden rounded-[var(--radius-md)]">
                <Image src="/media/products/foil-pouch-zip.webp" alt="Aluminium foil zipper pouches made by Aditya Flexipack" fill sizes="27rem" className="object-cover" />
              </div>
            </div>
          </div>
          <div data-scrub-front className="relative">
            <div data-card-front className="relative -rotate-[5deg] rounded-[var(--radius-lg)] bg-white p-2">
              <div className="relative aspect-[1100/1456] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src="/media/products/branded-pouches.webp"
                  alt="Printed pillow packs carrying the Aditya Flexipack mark"
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, 54vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
