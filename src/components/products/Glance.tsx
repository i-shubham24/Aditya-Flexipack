import type { ProductMeta } from "./meta";

/** "At a glance": four facts from the product's own copy, set as icon tiles on a panel. */
export function Glance({ items, field }: { items: ProductMeta["glance"]; field: "wash" | "foil" }) {
  return (
    <section aria-labelledby="glance-title" className="pt-[var(--frame)]">
      <div className={`panel py-[calc(var(--section-y)*0.7)] ${field === "wash" ? "bg-crimson-wash" : "bg-foil"}`}>
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <h2 id="glance-title" className="display text-[clamp(2.4rem,4.4vw,4.2rem)] text-wine lg:col-span-3">
            At a glance
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
            {items.map(({ icon: Icon, value, label }) => (
              <li key={value} className="flex flex-col rounded-[var(--radius-xl)] bg-white p-6">
                <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-crimson text-white">
                  <Icon aria-hidden className="size-6" strokeWidth={1.8} />
                </span>
                <p className="display mt-6 text-[clamp(1.8rem,2.4vw,2.3rem)] leading-none text-ink">{value}</p>
                <p className="mt-2 text-[0.98rem] leading-snug text-ink-soft">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
