import type { Feature } from "@/content/products";

const LOOKS = [
  { bg: "bg-crimson", ink: "text-white", tilt: "md:-rotate-[2deg]" },
  { bg: "bg-wine", ink: "text-white", tilt: "md:rotate-[1.5deg]" },
  { bg: "bg-foil-2", ink: "text-ink", tilt: "md:-rotate-[1deg]" },
  { bg: "bg-ink", ink: "text-white", tilt: "md:rotate-[2deg]" },
  { bg: "bg-blush", ink: "text-wine", tilt: "md:-rotate-[1.5deg]" },
];

/** Feature cards dealt in the logo palette; each squares up and lifts when pointed at. */
export function SolutionCards({ title, items, note }: { title: string; items: Feature[]; note?: string }) {
  return (
    <section aria-labelledby="solutions-title" className="py-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="solutions-title" className="display text-[clamp(2.6rem,5.4vw,5.2rem)] text-ink lg:col-span-8">
            {title}
          </h2>
          {note && <p className="hand -rotate-2 text-[2rem] text-crimson lg:col-span-4">{note}</p>}
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => {
            const look = LOOKS[i % LOOKS.length];
            return (
              <li
                key={f.title}
                className={`flex min-h-[14rem] flex-col rounded-[var(--radius-xl)] p-7 transition-[rotate,translate,scale] duration-500 ease-[var(--ease-back)] hover:-translate-y-2 hover:scale-[1.03] md:hover:rotate-0 ${look.tilt} ${look.bg} ${look.ink}`}
              >
                <span aria-hidden className="hand text-[1.8rem] opacity-80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-auto pt-8 text-[clamp(1.7rem,2.2vw,2.1rem)] leading-[1]">{f.title}</h3>
                {f.body && <p className="mt-3 text-[1rem] leading-snug opacity-90">{f.body}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
