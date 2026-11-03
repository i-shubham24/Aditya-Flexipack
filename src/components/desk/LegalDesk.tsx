import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

export type ClauseDef = { id: string; title: string; body: ReactNode };

/** Two-digit clause number, as set on the index and beside each clause. */
const no = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The clause index: every clause as a split row (number block and title block), 48px tall, jumping straight to
 * the clause. Not sticky; it sits beside the summary so a reader can go to the clause they need.
 */
export function ClauseIndex({ clauses, label }: { clauses: ClauseDef[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="grid gap-[3px]">
        {clauses.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className="group/idx flex min-h-12 items-stretch gap-[3px] font-semibold">
              <span
                aria-hidden
                className="display tabular grid w-12 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-ink text-[1rem] text-white transition-colors duration-200 group-hover/idx:bg-crimson"
              >
                {no(i)}
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-white px-4 py-2.5 leading-snug text-ink transition-transform duration-300 ease-[var(--ease-back)] group-hover/idx:-translate-y-0.5">
                {c.title}
                <ArrowDown aria-hidden className="size-4 shrink-0 text-crimson" strokeWidth={2.4} />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The clauses in full on the white sheet: the number in crimson on columns 1-2, the heading and text on the
 * document column (3-9) at the 42rem measure.
 */
export function Clauses({ clauses }: { clauses: ClauseDef[] }) {
  return (
    <div className="grid gap-y-[var(--stack)]">
      {clauses.map((c, i) => (
        <section key={c.id} id={c.id} data-rise aria-labelledby={`${c.id}-title`} className="page-grid scroll-mt-28 gap-y-4">
          <h2
            id={`${c.id}-title`}
            className="display col-span-full grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 text-d3 text-ink lg:col-[1/10] lg:grid-cols-subgrid lg:gap-x-[normal]"
          >
            <span className="tabular text-crimson lg:col-[1/3]">{no(i)}</span>
            <span className="lg:col-[3/10]">{c.title}</span>
          </h2>
          <div className="col-span-full max-w-doc space-y-4 leading-relaxed text-ink-soft lg:col-[3/10] [&_a]:font-semibold [&_a]:text-crimson [&_a]:underline [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-crimson">
            {c.body}
          </div>
        </section>
      ))}
    </div>
  );
}

export type Fact = { label: string; value: ReactNode; tone?: "white" | "crimson" | "wine" | "ink" | "blush"; wide?: boolean };

const FACT_TONES = {
  white: "bg-white text-ink [&_dd]:text-ink-soft",
  crimson: "bg-crimson text-white",
  wine: "bg-wine text-white [&_dd]:text-white/85",
  ink: "bg-ink text-white [&_dd]:text-white/85",
  blush: "bg-blush text-wine",
} as const;

/** Privacy at a glance: each fact a chunky rounded colour block, the one that matters most set large in crimson. */
export function FactBlocks({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid gap-[clamp(0.75rem,1.4vw,1rem)] sm:grid-cols-2">
      {facts.map((f) => (
        <div
          key={f.label}
          className={`flex flex-col rounded-[var(--radius-xl)] px-6 py-6 ${FACT_TONES[f.tone ?? "white"]} ${f.wide ? "sm:col-span-2" : ""}`}
        >
          <dt className="display text-d4">{f.label}</dt>
          <dd className={f.tone === "crimson" ? "display mt-2 text-d1 leading-none" : "mt-2 leading-relaxed"}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Terms at a glance: split rows, a colour label block beside a white value block, like the site's buttons. */
export function SplitFacts({ facts }: { facts: { label: string; value: ReactNode }[] }) {
  const labels = ["bg-crimson", "bg-wine", "bg-ink"];
  return (
    <dl className="grid gap-[3px]">
      {facts.map((f, i) => (
        <div key={f.label} className="grid gap-[3px] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <dt className={`display flex items-center rounded-[var(--radius-md)] px-5 py-4 text-d4 text-white ${labels[i % labels.length]}`}>{f.label}</dt>
          <dd className="flex items-center rounded-[var(--radius-md)] bg-white px-5 py-4 leading-relaxed text-ink">
            <span>{f.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
