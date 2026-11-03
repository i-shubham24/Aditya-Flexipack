import Image from "next/image";
import { Fragment } from "react";
import { SectionHeader } from "@/components/system/SectionHeader";
import { Appear } from "./Appear";
import { TALLY_WORD, tallyGlyph, type HonourGroup, type SheetPhoto } from "./data";

const PANELS = { wash: "bg-crimson-wash", foil: "bg-foil" } as const;

// Greedy row breaks by width: a row closes before its photographs' summed ratios would pass the target.
function breaksFor(photos: SheetPhoto[], target: number) {
  const breaks = new Set<number>();
  let sum = 0;
  photos.forEach((p, i) => {
    const r = p.w / p.h;
    if (i > 0 && sum + r > target) {
      breaks.add(i);
      sum = 0;
    }
    sum += r;
  });
  return breaks;
}

/**
 * A justified row: every photograph the same height, each as wide as its real ratio, set straight on the
 * section's background. Rows break by width (narrow on phones, wider up to 1280px, one row above), and a lone
 * photograph stops at a set height instead of filling the row.
 */
function JustifiedRow({ photos }: { photos: SheetPhoto[] }) {
  const phone = breaksFor(photos, 1.6);
  const mid = breaksFor(photos, 3);
  return (
    <div className="flex flex-wrap items-start gap-x-3 [--max-h:14rem] sm:gap-x-4 sm:[--max-h:19rem] xl:[--max-h:21rem]">
      {photos.map((p, i) => {
        const ratio = p.w / p.h;
        const onPhone = phone.has(i);
        const onMid = mid.has(i);
        const cut = onPhone && onMid ? "xl:hidden" : onPhone ? "sm:hidden" : onMid ? "hidden sm:block xl:hidden" : "";
        return (
          <Fragment key={p.src}>
            {cut && <div aria-hidden className={`basis-full ${cut}`} />}
            <figure className="mb-6 min-w-0" style={{ flex: `${ratio} 1 0%`, maxWidth: `calc(${ratio.toFixed(4)} * var(--max-h))` }}>
              <div className="relative overflow-hidden rounded-[var(--radius-md)]" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1280px) 26vw, (min-width: 640px) 44vw, 92vw" className="object-cover" />
              </div>
              {p.caption && <figcaption className="mt-2 text-caption text-ink-soft">{p.caption}</figcaption>}
            </figure>
          </Fragment>
        );
      })}
    </div>
  );
}

/**
 * The evidence under the board: one group of honours, each as a label block (tally, title, awarding body, one
 * line) in columns 1-4 beside its photographs in 5-12. Every block is the target of a board row's "See it".
 */
export function ContactSheet({ group }: { group: HonourGroup }) {
  const titleId = `${group.id}-title`;
  const body = (
    <div className="shell">
      <SectionHeader id={titleId} title={group.title} />
      <Appear className="grid gap-y-[var(--stack)]">
        {group.honours.map((h) => (
          <article key={h.id} id={h.id} aria-labelledby={`${h.id}-title`} data-appear className="page-grid scroll-mt-28 gap-y-6">
            <div className="col-span-full lg:col-[1/5]">
              <p className="display tabular text-d3 text-crimson">
                <span aria-hidden>{tallyGlyph(h.tally)}</span>
                <span className="sr-only">{TALLY_WORD[h.tally]}</span>
              </p>
              <h3 id={`${h.id}-title`} tabIndex={-1} className="display mt-3 text-d4 text-ink">
                {h.title}
              </h3>
              <p className="mt-2 text-small font-semibold text-ink">{h.from}</p>
              <p className="mt-3 max-w-measure text-ink-soft">{h.line}</p>
            </div>
            <div className="col-span-full lg:col-[5/13]">
              <JustifiedRow photos={h.photos} />
            </div>
          </article>
        ))}
      </Appear>
    </div>
  );

  if (group.field === "white") {
    return (
      <section aria-labelledby={titleId} className="py-[var(--section-y)]">
        {body}
      </section>
    );
  }
  return (
    <section aria-labelledby={titleId} className="pt-[var(--frame)]">
      <div className={`panel py-[var(--section-y)] ${PANELS[group.field]}`}>{body}</div>
    </section>
  );
}
