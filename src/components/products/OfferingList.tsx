/** "Our offering": every item from the old page, numbered in proof-pen on silver cards. */
export function OfferingList({ title, items, id = "offering-title" }: { title: string; items: string[]; id?: string }) {
  return (
    <section aria-labelledby={id} className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[var(--section-y)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id={id} className="display text-[clamp(2.6rem,5vw,4.8rem)] text-ink lg:col-span-4">
            {title}
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {items.map((item, i) => (
              <li
                key={item}
                className="group flex min-h-[5.5rem] items-center gap-5 rounded-[var(--radius-lg)] bg-white px-5 py-4 transition-[translate] duration-300 ease-[var(--ease-back)] hover:-translate-y-1"
              >
                <span aria-hidden className="hand w-9 shrink-0 text-center text-[2rem] text-crimson">
                  {i + 1}
                </span>
                <span className="text-[1.12rem] font-semibold leading-snug text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
