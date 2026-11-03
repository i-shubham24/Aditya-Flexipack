import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, type ProductSlug } from "@/content/products";
import { productMeta } from "./meta";

/** The rest of the range, on the blush panel, so every product page leads on to the next. */
export function RelatedProducts({ current }: { current: ProductSlug }) {
  const rest = products.filter((p) => p.slug !== current);
  return (
    <section aria-labelledby="related-title" className="pt-[var(--frame)]">
      <div className="panel bg-blush py-[calc(var(--section-y)*0.8)]">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-title" className="display text-[clamp(2.4rem,5vw,4.6rem)] text-wine">
              More from the plant
            </h2>
            <Link href="/products/" className="font-semibold text-wine underline decoration-wine/40 underline-offset-4 hover:decoration-wine">
              All products
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {rest.map((p) => {
              const m = productMeta[p.slug];
              // The blush card would vanish on the blush panel, so it turns white here.
              const bg = m.card.bg === "bg-blush" ? "bg-white" : m.card.bg;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}/`}
                    className={`group flex h-full flex-col rounded-[var(--radius-lg)] p-2 transition-[translate,rotate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 hover:-rotate-1 ${bg}`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                      <Image src={m.cover.src} alt="" fill sizes="(min-width: 1024px) 18vw, 46vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </span>
                    <span className={`flex items-center justify-between gap-3 px-3 pb-2 pt-4 ${m.card.ink}`}>
                      <span className="display text-[1.7rem]">{p.name}</span>
                      <ArrowRight aria-hidden className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
