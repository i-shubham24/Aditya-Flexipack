import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/content/products";
import { productMeta } from "./meta";

/**
 * The full range as large dealt cards in two staggered columns: each card leans a little,
 * then squares up and lifts when pointed at.
 */
export function ProductGrid() {
  return (
    <section aria-labelledby="range-title" className="py-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="range-title" className="display text-[clamp(2.8rem,6vw,5.8rem)] lg:col-span-7">
            Product offerings
          </h2>
          <div className="lg:col-span-5">
            <p className="hand -rotate-2 text-[2rem] text-crimson">All made under one roof</p>
            <p className="mt-2 text-[1.1rem] leading-relaxed text-ink-soft">
              Leading the future of flexible and sustainable packaging, from the film to the finished pouch.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-2 md:gap-x-10 md:pb-32">
          {products.map((p, i) => {
            const m = productMeta[p.slug];
            return (
              <li key={p.slug} className={i % 2 ? "md:translate-y-32" : ""}>
                <Link
                  href={`/products/${p.slug}/`}
                  className={`group block rounded-[var(--radius-xl)] p-3 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-2 md:hover:rotate-0 ${
                    i % 2 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"
                  } ${m.card.bg}`}
                >
                  <span className="relative block aspect-[5/4] overflow-hidden rounded-[var(--radius-lg)]">
                    <Image
                      src={m.cover.src}
                      alt={m.cover.alt}
                      fill
                      sizes="(min-width: 768px) 44vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-col gap-3 px-4 pb-4 pt-6 sm:px-5">
                    <span className={`display text-[clamp(2.6rem,4.4vw,4rem)] ${m.card.ink}`}>{p.name}</span>
                    <span className={`max-w-[32rem] text-[1.04rem] leading-snug ${m.card.sub}`}>{p.lead}</span>
                    <span className={`mt-3 inline-flex items-center gap-2 font-semibold ${m.card.ink}`}>
                      See {p.name.toLowerCase()}
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
