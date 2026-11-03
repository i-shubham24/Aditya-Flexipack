"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/content/products";

const CARD = [
  { bg: "bg-crimson", ink: "text-white", sub: "text-white/85" },
  { bg: "bg-foil", ink: "text-ink", sub: "text-ink-soft" },
  { bg: "bg-wine", ink: "text-white", sub: "text-white/80" },
  { bg: "bg-blush", ink: "text-ink", sub: "text-ink/75" },
  { bg: "bg-ink", ink: "text-white", sub: "text-white/75" },
  { bg: "bg-crimson-deep", ink: "text-white", sub: "text-white/85" },
];

export function ProductCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector("li");
    t.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="products-title" className="py-[var(--section-y)]">
      <div className="shell relative text-center">
        <p aria-hidden className="hand absolute left-[var(--gutter)] top-0 hidden max-w-[11rem] -rotate-[8deg] text-left text-[1.7rem] text-crimson lg:block">
          All made under one roof in Kanpur
        </p>
        <h2 id="products-title" className="display text-[clamp(2.8rem,6vw,5.8rem)]">
          Our products
        </h2>
        <p className="mx-auto mt-4 max-w-[34rem] text-[1.1rem] text-ink-soft">
          Six product lines for food, FMCG, pharma and more, each engineered for barrier, print and performance.
        </p>
      </div>

      <div className="shell mt-10 flex justify-end gap-2">
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous products" className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-transform hover:-translate-y-0.5">
          <ArrowLeft className="size-5" />
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="Next products" className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-ink text-white transition-transform hover:-translate-y-0.5">
          <ArrowRight className="size-5" />
        </button>
      </div>

      <ul
        ref={track}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p, i) => {
          const c = CARD[i % CARD.length];
          return (
            <li key={p.slug} className="w-[min(82vw,22rem)] shrink-0 snap-start">
              <Link
                href={`/products/${p.slug}/`}
                className={`group flex h-full flex-col rounded-[var(--radius-xl)] p-3 transition-transform duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 hover:-rotate-1 ${c.bg}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image src={p.photo.src} alt={p.photo.alt} fill sizes="22rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <span className={`display text-[2.2rem] ${c.ink}`}>{p.name}</span>
                  <span className={`mt-2 text-[0.98rem] leading-snug ${c.sub}`}>{p.summary}</span>
                  <span className={`mt-auto flex items-center gap-2 pt-5 font-semibold ${c.ink}`}>
                    See {p.name.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
