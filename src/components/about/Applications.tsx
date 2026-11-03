import Link from "next/link";
import { Pack, type PackFormat } from "@/components/ui/Pack";

/** The old About page's application areas, each shown with the pack format it typically runs in. */
const AREAS: { name: string; format: PackFormat; tone: string; ink?: string }[] = [
  { name: "Biscuits and cakes", format: "pillow", tone: "bg-crimson text-white", ink: "#45060e" },
  { name: "Confectionery", format: "wrapper", tone: "bg-white text-ink" },
  { name: "Shrink films and collation packs", format: "polybag", tone: "bg-wine text-white", ink: "#ce0000" },
  { name: "Atta, salt and oil", format: "gusset", tone: "bg-foil text-ink" },
  { name: "Pouches", format: "standup", tone: "bg-ink text-white" },
  { name: "Home, personal and healthcare", format: "sachet", tone: "bg-white text-ink", ink: "#45060e" },
  { name: "Aluminium foil based wrappers", format: "laddi", tone: "bg-crimson text-white", ink: "#45060e" },
  { name: "Pet food and meat packaging", format: "spout", tone: "bg-foil text-ink" },
];

export function Applications() {
  return (
    <section aria-labelledby="apps-title" className="pt-[var(--frame)]">
      <div className="panel bg-blush py-[var(--section-y)]">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="apps-title" className="display text-[clamp(2.6rem,5.8vw,6rem)] text-wine lg:col-span-7">
              Application areas
            </h2>
            <div className="lg:col-span-5">
              <p className="text-[1.1rem] leading-relaxed text-ink">From the biscuit aisle to the pet food shelf, the same plant prints, laminates and converts for each.</p>
              <Link href="/offerings/" className="hand mt-3 inline-block text-[2rem] text-crimson underline decoration-crimson/30 underline-offset-8 hover:decoration-crimson">
                See every aisle we pack for
              </Link>
            </div>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {AREAS.map((a, i) => (
              <li
                key={a.name}
                className={`group flex flex-col rounded-[var(--radius-xl)] p-4 sm:p-6 ${a.tone} ${i % 2 ? "lg:translate-y-8" : ""}`}
              >
                <span className="grid h-32 place-items-center sm:h-40">
                  <Pack
                    format={a.format}
                    ink={a.ink}
                    className="h-full w-auto transition-[rotate,translate] duration-500 ease-[var(--ease-back)] group-hover:-translate-y-2 group-hover:-rotate-6"
                  />
                </span>
                <h3 className="display mt-5 text-[clamp(1.25rem,2vw,1.8rem)] leading-[1.02]">{a.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
