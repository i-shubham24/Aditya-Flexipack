"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products } from "@/content/products";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARD = [
  { bg: "bg-crimson", ink: "text-white", sub: "text-white/85" },
  { bg: "bg-foil", ink: "text-ink", sub: "text-ink-soft" },
  { bg: "bg-wine", ink: "text-white", sub: "text-white/80" },
  { bg: "bg-blush", ink: "text-ink", sub: "text-ink/75" },
  { bg: "bg-ink", ink: "text-white", sub: "text-white/75" },
  { bg: "bg-crimson-deep", ink: "text-white", sub: "text-white/85" },
];

export function ProductCarousel() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    const t = track.current;
    if (!t) return;
    const maxScroll = t.scrollWidth - t.clientWidth;
    setCanScrollLeft(t.scrollLeft > 10);
    setCanScrollRight(t.scrollLeft < maxScroll - 10);
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, t.scrollLeft / maxScroll)));
    }
  };

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    checkScroll();
    t.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      t.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector("li");
    t.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance animation for header and cards
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.from("[data-carousel-header] > *", {
          y: 25,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        })
          .from(
            "[data-hand-note]",
            {
              scale: 0.8,
              rotate: -20,
              duration: 0.6,
              ease: "back.out(2)",
            },
            "-=0.4",
          )
          .from(
            "[data-card-item]",
            {
              y: 40,
              duration: 0.7,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.3",
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="products-title" className="py-[var(--section-y)] overflow-hidden">
      <div data-carousel-header className="shell relative text-center">
        <p
          data-hand-note
          aria-hidden
          className="hand absolute left-[var(--gutter)] top-0 hidden max-w-[11rem] -rotate-[8deg] text-left text-[1.7rem] text-crimson lg:block"
        >
          All made under one roof in Kanpur
        </p>
        <h2 id="products-title" className="display text-[clamp(2.8rem,6vw,5.8rem)]">
          Our products
        </h2>
        <p className="mx-auto mt-4 max-w-[34rem] text-[1.1rem] text-ink-soft">
          Six product lines for food, FMCG, pharma and more, each engineered for barrier, print and performance.
        </p>
      </div>

      <div className="shell mt-10 flex items-center justify-between gap-4">
        {/* Subtle scroll progress bar */}
        <div className="relative h-1.5 w-32 sm:w-48 overflow-hidden rounded-full bg-foil">
          <div
            className="h-full rounded-full bg-crimson transition-all duration-150 ease-out"
            style={{ width: `${Math.max(16, scrollProgress * 100)}%` }}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous products"
            className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={!canScrollRight}
            aria-label="Next products"
            className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pt-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
      >
        {products.map((p, i) => {
          const c = CARD[i % CARD.length];
          return (
            <li
              key={p.slug}
              data-card-item
              className="w-[min(82vw,22rem)] shrink-0 snap-start py-1"
            >
              <Link
                href={`/products/${p.slug}/`}
                className={`group flex h-full flex-col rounded-[var(--radius-xl)] p-3 transition-all duration-500 ease-[var(--ease-back)] hover:-translate-y-2 hover:-rotate-1 hover:shadow-xl ${c.bg}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src={p.photo.src}
                    alt={p.photo.alt}
                    fill
                    sizes="22rem"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </span>
                <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <span className={`display text-[2.2rem] ${c.ink}`}>{p.name}</span>
                  <span className={`mt-2 text-[0.98rem] leading-snug ${c.sub}`}>{p.summary}</span>
                  <span className={`mt-auto flex items-center gap-2 pt-5 font-semibold ${c.ink}`}>
                    See {p.name.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
