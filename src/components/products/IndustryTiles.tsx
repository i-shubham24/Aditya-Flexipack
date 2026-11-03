import { industries } from "@/content/products";
import { FallbackIcon, industryIcons } from "./meta";

/** "Solutions for your industry" from the old products page, as icon tiles on the wash panel. */
export function IndustryTiles() {
  return (
    <section aria-labelledby="industry-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 380 C 240 300, 420 470, 660 390 S 1020 250, 1200 320 V600 H0 Z" fill="#ffd9d3" />
        </svg>
        <div className="shell relative">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="industry-title" className="display text-[clamp(2.6rem,5.4vw,5.2rem)] text-wine lg:col-span-7">
              Solutions for your industry
            </h2>
            <p className="text-[1.1rem] leading-relaxed text-ink-soft lg:col-span-5">
              Solvent-based lamination provides strong adhesion and durability, across every sector we serve.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((name, i) => {
              const Icon = industryIcons[name] ?? FallbackIcon;
              return (
                <li
                  key={name}
                  className={`group rounded-[var(--radius-xl)] bg-white p-6 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 lg:min-h-[15rem] ${
                    i % 2 ? "lg:rotate-[1.5deg]" : "lg:-rotate-[1.5deg]"
                  } lg:hover:rotate-0`}
                >
                  <span className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-crimson text-white">
                    <Icon aria-hidden className="size-7" strokeWidth={1.8} />
                  </span>
                  <h3 className="display mt-8 text-[1.75rem] leading-[1.02] text-ink">{name}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
