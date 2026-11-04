"use client";

import { VENDOR_PRODUCTS } from "@/content/forms";

const LOOKS = ["bg-crimson text-white", "bg-blush text-wine", "bg-white text-wine", "bg-ink text-white"];

/**
 * Vendor hero object: everything the plant buys, as chunky colour tags. Picking one jumps to the form with
 * "Product you supply" already chosen.
 */
export function SupplyTags({ form = "#vendor-form" }: { form?: string }) {
  const pick = (product: string) => {
    const select = document.querySelector<HTMLSelectElement>(`${form} select[name="product"], select#f-vendor-product, select[name="product"]`);
    if (!select) return;
    select.value = product;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <div>
      <p className="hand -rotate-2 text-note text-blush">What we buy</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {VENDOR_PRODUCTS.map((p, i) => (
          <li key={p}>
            <a
              href={form}
              onClick={() => pick(p)}
              className={`display inline-flex min-h-11 items-center rounded-[var(--radius-sm)] px-3.5 text-[clamp(1rem,1.3vw,1.2rem)] transition-transform duration-300 ease-[var(--ease-back)] hover:-translate-y-0.5 ${LOOKS[i % LOOKS.length]}`}
            >
              {p}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
