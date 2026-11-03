import type { ReactNode } from "react";

export type ClauseDef = { id: string; title: string; body: ReactNode };

/** Two-digit clause number, as printed on the index and beside each clause. */
const no = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The clause index: every clause as a numbered jump link with a 44px row. Not sticky; it sits beside the summary
 * box so a reader can go straight to the clause they need.
 */
export function ClauseIndex({ clauses, label }: { clauses: ClauseDef[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="grid gap-[3px]">
        {clauses.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="group grid min-h-11 grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-ink transition-colors duration-200 hover:bg-white focus-visible:bg-white"
            >
              <span aria-hidden className="display tabular text-[1.05rem] text-crimson">
                {no(i)}
              </span>
              <span className="font-semibold leading-snug underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-crimson">
                {c.title}
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

/** Privacy summary, styled like a pack's nutrition information panel: rows alternate foil and white, no rules. */
export function InfoPanel({ id, title, rows }: { id: string; title: string; rows: { label: string; value: ReactNode; strong?: boolean }[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] bg-white">
      <h2 id={id} className="display bg-ink px-5 py-5 text-d3 text-white sm:px-7">
        {title}
      </h2>
      <dl>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid gap-1 px-5 py-4 sm:grid-cols-[40%_60%] sm:items-baseline sm:gap-4 sm:px-7 ${i % 2 ? "bg-white" : "bg-foil"}`}
          >
            <dt className="font-semibold text-ink">{r.label}</dt>
            <dd className={r.strong ? "display text-d3 text-crimson" : "text-ink-soft"}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Terms summary, styled like the declaration block on the back of a pack: a crimped seal along the top and
 * run-in bold labels, one line each.
 */
export function DeclarationPanel({ id, title, rows }: { id: string; title: string; rows: { label: string; value: ReactNode }[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] bg-white">
      <div aria-hidden className="h-6 bg-[repeating-linear-gradient(90deg,#c6cbd1_0_2px,#dfe2e6_2px_7px)]" />
      <div className="px-5 pb-8 pt-7 sm:px-8">
        <h2 id={id} className="display text-d3 text-ink">
          {title}
        </h2>
        <div className="mt-6 grid gap-5">
          {rows.map((r) => (
            <p key={r.label} className="leading-relaxed text-ink-soft">
              <strong className="display mr-2 text-d4 text-ink">{r.label}</strong>
              {r.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
