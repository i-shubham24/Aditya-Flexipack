import type { Metadata } from "next";
import { TearStrip } from "@/components/system/TearStrip";
import { ButtonLink } from "@/components/ui/Button";
import { Pack, type PackFormat } from "@/components/ui/Pack";
import { pageOf } from "@/content/next";
import { OfferingsHero } from "@/components/offerings/OfferingsHero";
import { Laddi } from "@/components/offerings/Laddi";
import { Rise } from "@/components/offerings/Rise";

const description =
  "Packaging for biscuits and snacks, kitchen essentials, confectionery, cereals, frozen food, home and personal care, pet food, liquids, shrink and collation packs, laddi packs, foil wrappers and polybags.";

export const metadata: Metadata = {
  title: "Offerings",
  description,
  alternates: { canonical: "/offerings/" },
  openGraph: { url: "/offerings/", title: "Offerings | Aditya Flexipack", description },
};

/** The two aisles from the old copy, each cut to a few short lines: what the pack does, then what does it. */
const AISLES: { id: string; pack: PackFormat; title: string; field: string; lines: string[]; parts: string[]; last: string }[] = [
  {
    id: "food",
    pack: "pillow",
    title: "Food",
    field: "bg-crimson-wash",
    lines: ["We keep food crisp, flavours intact and products shelf-ready."],
    parts: ["High-barrier properties", "Superior sealing", "Freshness-lock technology"],
    last: "That oven-fresh bite, every time.",
  },
  {
    id: "care",
    pack: "spout",
    title: "Home and personal care",
    field: "bg-foil",
    lines: ["We also package leading home care and personal care products.", "Packs stay leak-proof on high-speed multi-track lines."],
    parts: ["Barrier coating machine", "High-barrier laminates", "Seal-through contamination technology"],
    last: "Our wrappers offer excellent dart impact and burst strength.",
  },
];

export default function OfferingsPage() {
  return (
    <>
      <OfferingsHero
        tone={pageOf("/offerings/").tone}
        title="Offerings"
        note="what we pack, aisle by aisle"
        lead={<p>Great snacks deserve packaging that works as hard as the recipe.</p>}
        photo={{ src: "/media/old/products-pouches/banner-foil-pouches-red.webp", alt: "Plain silver foil zip pouches in several sizes against a dark red background" }}
        actions={
          <ButtonLink href="/products/" tone="crimson">
            Explore products
          </ButtonLink>
        }
      />

      <section aria-labelledby="aisles-title" className="py-[var(--section-y)]">
        <Rise className="shell">
          <div className="page-grid">
            <h2 id="aisles-title" data-rise className="display span-lead text-d2 text-ink">
              What our packs do
            </h2>
          </div>
          <div className="page-grid mt-[var(--stack)] gap-y-[var(--frame)]">
            {AISLES.map((a, i) => (
              <article
                key={a.id}
                data-rise
                aria-labelledby={`aisle-${a.id}`}
                className={`relative overflow-clip rounded-[var(--radius-xl)] p-7 sm:p-10 ${a.field} ${i === 0 ? "span-half-l" : "span-half-r"}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 id={`aisle-${a.id}`} className="display text-d3 text-ink">
                    {a.title}
                  </h3>
                  <Pack format={a.pack} className="h-20 w-auto shrink-0" />
                </div>
                <div className="mt-5 max-w-measure space-y-1 text-lead text-ink-soft">
                  {a.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <ul className="mt-7 grid gap-2.5">
                  {a.parts.map((p) => (
                    <li key={p} className="display text-d4 text-crimson">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 max-w-measure font-medium text-ink">{a.last}</p>
              </article>
            ))}
          </div>
        </Rise>
      </section>

      <Laddi />

      <TearStrip from="/offerings/" />
    </>
  );
}
