import { Bath, Boxes, Candy, Cookie, Droplets, Layers, Package, PawPrint, Rows3, Snowflake, WashingMachine, Wheat, CookingPot } from "lucide-react";

/** Every line of the old Offerings list, with what it covers, as icon tiles. */
const PACKS = [
  { icon: Cookie, name: "Biscuits and snacks", items: "Cookies, sandwich biscuits, rusk, chips, namkeen, puffs and more" },
  { icon: CookingPot, name: "Kitchen essentials", items: "Flour, salt, spices, taste makers and more" },
  { icon: Candy, name: "Confectionery", items: "Candies, toffees, cakes and more" },
  { icon: Wheat, name: "Cereals and oats" },
  { icon: Snowflake, name: "Frozen food" },
  { icon: WashingMachine, name: "Home care", items: "Detergent powder, detergent cake, oil" },
  { icon: Bath, name: "Personal care", items: "Soap, hair oil, shampoo" },
  { icon: PawPrint, name: "Pet food and meat packaging" },
  { icon: Droplets, name: "Liquid pouching", items: "Juice, soap" },
  { icon: Boxes, name: "Shrink film and collation packs" },
  { icon: Rows3, name: "Laddi packs" },
  { icon: Layers, name: "Aluminium-based foil wrappers and liners" },
  { icon: Package, name: "Polybags" },
];

export function PackIndex() {
  return (
    <section aria-labelledby="packs-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 0 H1200 V120 C 960 200, 780 60, 560 140 S 180 220, 0 110 Z" fill="#e4e7eb" />
        </svg>
        <div className="shell relative">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="packs-title" className="display text-[clamp(2.6rem,5.4vw,5.2rem)] text-ink lg:col-span-7">
              Packaging, from our plant to yours
            </h2>
            <p className="hand -rotate-2 text-[2rem] text-crimson lg:col-span-5">Thirteen kinds of pack, one campus</p>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PACKS.map(({ icon: Icon, name, items }) => (
              <li
                key={name}
                className="flex gap-4 rounded-[var(--radius-lg)] bg-white p-5 transition-[translate] duration-300 ease-[var(--ease-back)] hover:-translate-y-1"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[var(--radius-md)] bg-crimson-wash text-crimson">
                  <Icon aria-hidden className="size-6" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[1.1rem] font-semibold leading-snug text-ink">{name}</span>
                  {items && <span className="mt-1 block text-[0.95rem] leading-snug text-ink-soft">{items}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
