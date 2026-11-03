import type { ReactNode } from "react";

export type NumberedItem = { title: string; body?: ReactNode };

/** Content lists set as type: a big number, a title and an optional line. Replaces icon-tile grids. */
export function NumberedList({
  items,
  cols = 1,
  dark = false,
  start = 1,
  className = "",
}: {
  items: NumberedItem[];
  cols?: 1 | 2;
  dark?: boolean;
  start?: number;
  className?: string;
}) {
  return (
    <ol className={`grid gap-x-[clamp(1.25rem,1.8vw,1.5rem)] gap-y-10 ${cols === 2 ? "md:grid-cols-2" : ""} ${className}`}>
      {items.map((it, i) => (
        <li key={it.title} className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
          <span aria-hidden className={`display tabular text-d3 ${dark ? "text-blush" : "text-crimson"}`}>
            {String(i + start).padStart(2, "0")}
          </span>
          <div>
            <h3 className={`display text-d4 ${dark ? "text-white" : "text-ink"}`}>{it.title}</h3>
            {it.body && <div className={`mt-2 max-w-measure leading-relaxed ${dark ? "text-white/80" : "text-ink-soft"}`}>{it.body}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
