"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { products, type ProductSlug } from "@/content/products";
import { productMeta } from "@/components/products/meta";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";

// Real photographs only on the hero tiles; the polybags cover elsewhere is a generated mockup.
const COVER_OVERRIDE: Partial<Record<ProductSlug, { src: string; alt: string }>> = {
  polybags: { src: "/media/old/products-polybags/photo-polybag-film-roll.webp", alt: "A roll of polybag film on the line" },
};

/**
 * Products opener: the title on the wash field and all six product lines as photo tiles, each with its name on a
 * band in the product's own colour. The tiles assemble on load and are the quickest way into each product.
 */
export function ProductsHero({ lead, actions, spec }: { lead: ReactNode; actions: ReactNode; spec: { value: string; label: string }[] }) {
  const root = useRef<HTMLElement>(null);

  useHeroIntro(root, (tl) => {
    tl.from("[data-hero-photo]", { y: 32, scale: 0.92, autoAlpha: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.07 }, 0.2);
  });

  return (
    <section ref={root} data-hero="light" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson-wash text-wine">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#ffd9d3" />
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#ffcfc8" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center items-center gap-y-8 pb-8 pt-[calc(var(--header-h)+1.5rem)]">
          <div className="col-span-full lg:col-[1/6]">
            <h1 id="page-title" data-hero-title className="display text-[clamp(3.5rem,8vw,7rem)] leading-[0.88]">
              Products
            </h1>
            <div data-hero-fade className="mt-5 max-w-[26rem] text-lead text-ink-soft">
              {lead}
            </div>
            <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {actions}
            </div>
          </div>

          <ul className="col-span-full grid grid-cols-2 gap-[clamp(0.6rem,1.2vw,1rem)] sm:grid-cols-3 lg:col-[6/13]">
            {products.map((p) => {
              const m = productMeta[p.slug];
              const cover = COVER_OVERRIDE[p.slug] ?? m.cover;
              return (
                <li key={p.slug} data-hero-photo>
                  <Link
                    href={`/products/${p.slug}/`}
                    className="group block overflow-hidden rounded-[var(--radius-lg)] transition-transform duration-300 ease-[var(--ease-back)] hover:-translate-y-1"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 14rem, (min-width: 640px) 30vw, 46vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </span>
                    <span className={`flex min-h-12 items-center justify-between gap-2 px-3 py-2 ${m.card.bg} ${m.card.ink}`}>
                      <span className="display text-[clamp(1.1rem,1.5vw,1.4rem)]">{p.name}</span>
                      <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative bg-blush">
          <dl className="shell page-grid gap-y-3 py-4">
            {spec.slice(0, 4).map((s) => (
              <div key={s.label} className="col-span-2 sm:col-span-4 lg:col-span-3">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display block text-[clamp(1.6rem,2.2vw,2.2rem)]">{s.value}</span>
                  <span className="mt-0.5 block text-small text-wine">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
