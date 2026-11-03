import { Plus } from "lucide-react";

const QA: { q: string; a: string }[] = [
  {
    q: "What does Aditya Flexipack make?",
    a: "Laminates, pouches, films (CPP, metallised, and 3, 5 and 7-layer blown), gravure cylinders and polybags. Inks come from our ISO 22000:2018 certified sister concern.",
  },
  {
    q: "Which products do you pack for?",
    a: "Biscuits and snacks, kitchen essentials, confectionery, cereals and oats, frozen food, home and personal care, pet food and meat, liquids, shrink and collation packs, laddi packs, foil wrappers and polybags.",
  },
  {
    q: "Which certifications does the plant hold?",
    a: "BRCGS Issue 7 Grade A, SEDEX / SMETA 7 (4-pillar) and HACCP, with ISO 22000:2018 for the ink unit. The unit also complies with fire safety regulations.",
  },
  {
    q: "Where is your plant?",
    a: "On an 18-acre campus at Rania, Kanpur Dehat, along the Kolkata to Delhi highway (NH-2), 15 km from Kanpur. The location gives efficient logistics to key markets across India.",
  },
  {
    q: "Can you make recyclable packaging?",
    a: "Yes. We make mono-structured laminates designed for recycling, CPP for mono-material laminates, and include post-industrial recycled material where clients require it. The plant runs partly on 1.35 MW of solar and recycles its own waste.",
  },
  {
    q: "How do we start working together?",
    a: "Share your brief through the contact form or the packaging partnership page. We review fit and compliance, run samples and trials, and then onboard you for production.",
  },
];

export type QA = { q: string; a: string };

export function Faq({ items = QA, title = "Common questions" }: { items?: QA[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-[var(--section-y)]">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="display text-[clamp(2.8rem,6vw,5.8rem)] lg:col-span-4">
          {title}
        </h2>
        <ul className="grid gap-3 lg:col-span-8">
          {items.map((x) => (
            <li key={x.q}>
              <details className="group rounded-[var(--radius-lg)] bg-foil open:bg-crimson-wash">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[1.15rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-white transition-transform duration-300 group-open:rotate-45 group-open:bg-crimson group-open:text-white">
                    <Plus className="size-5" />
                  </span>
                </summary>
                <p className="max-w-[46rem] px-6 pb-6 text-[1.04rem] leading-relaxed text-ink-soft">{x.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
