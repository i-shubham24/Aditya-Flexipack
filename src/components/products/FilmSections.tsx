import type { FilmLine } from "@/content/products";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { SectionHeader } from "@/components/system/SectionHeader";
import { NumberedList } from "@/components/system/NumberedList";
import { Panel } from "./ProductBlocks";
import { filmPhotos } from "./sheet";

/**
 * Fields after the white Three Dies, so neighbours never match: CPP on the wash panel, metallised on the sheet,
 * blown on the foil panel, then the shared advantages on the sheet before the tear strip.
 */
const FIELDS = { cpp: "wash", metallised: "white", blown: "foil" } as const;

function FilmBody({ film }: { film: FilmLine }) {
  const photos = filmPhotos[film.id] ?? [];
  const lines = film.brief ?? film.intro;
  return (
    <>
      <div className="page-grid gap-y-[var(--stack)]">
        <div className={photos.length ? "span-text" : "span-lead"}>
          <h2 id={`${film.id}-title`} className="display text-d2 text-ink">
            {film.name}
          </h2>
          <div className="mt-8 grid max-w-measure gap-3 text-lead text-ink-soft">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
        {photos.length === 1 && (
          <PhotoFrame
            className="span-quarter w-full max-w-[27rem] lg:max-w-none"
            src={photos[0].src}
            alt={photos[0].alt}
            caption={photos[0].caption}
            ratio="1:1"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 27rem, 92vw"
          />
        )}
        {photos.length > 1 && (
          <div className="span-side grid grid-cols-2 content-start gap-4">
            {photos.map((ph) => (
              <PhotoFrame key={ph.src} src={ph.src} alt={ph.alt} caption={ph.caption} ratio="4:5" sizes="(min-width: 1024px) 19vw, 46vw" />
            ))}
          </div>
        )}
      </div>

      <div className="page-grid mt-[var(--stack)] gap-y-[var(--stack)]">
        <div className={film.features ? "span-half-l" : "span-full"}>
          <h3 className="display text-d3 text-ink">Our offerings</h3>
          <NumberedList className="mt-8" cols={film.features ? 1 : 2} items={film.offerings.map((title) => ({ title }))} />
        </div>
        {film.features && (
          <div className="span-half-r">
            <h3 className="display text-d3 text-ink">{film.featuresTitle ?? "Features"}</h3>
            <NumberedList className="mt-8" items={film.features.map((title) => ({ title }))} />
          </div>
        )}
      </div>
    </>
  );
}

/** The three film lines in full, each with its own anchor for the Three Dies windows. */
export function FilmSections({ films }: { films: FilmLine[] }) {
  return (
    <>
      {films.map((f) => {
        const field = FIELDS[f.id as keyof typeof FIELDS] ?? "white";
        return field === "white" ? (
          <section key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className="scroll-mt-24 py-[var(--section-y)]">
            <div className="shell">
              <FilmBody film={f} />
            </div>
          </section>
        ) : (
          <Panel key={f.id} id={f.id} field={field} labelledBy={`${f.id}-title`} contour={f.id === "cpp" ? 2 : 1}>
            <FilmBody film={f} />
          </Panel>
        );
      })}
    </>
  );
}

const lower = (name: string) => name.replace(/ film$/i, "").replace(/^(?!CPP)\w/, (c) => c.toLowerCase());

/**
 * "The film advantage". The old page repeated it under each line, nearly word for word; it is set once here,
 * with the lines each advantage belongs to, so no claim is lost and nothing is said three times.
 */
export function FilmAdvantages({ films }: { films: FilmLine[] }) {
  const merged = new Map<string, { body?: string; lines: string[] }>();
  films.forEach((f) =>
    f.advantages.forEach((a) => {
      const row = merged.get(a.title) ?? { body: a.body, lines: [] };
      row.lines.push(lower(f.name));
      merged.set(a.title, row);
    }),
  );
  const rows = [...merged.entries()];
  const list = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" });

  return (
    <section aria-labelledby="advantage-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="advantage-title" title="The film advantage" />
        <ul className="grid gap-x-[clamp(1.25rem,1.8vw,1.5rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(([title, r]) => (
            <li key={title}>
              <h3 className="display text-d4 text-ink">{title}</h3>
              {r.body && <p className="mt-3 max-w-measure text-ink-soft">{r.body}</p>}
              <p className="mt-4 text-small font-semibold text-crimson">
                {r.lines.length === films.length ? "All three lines" : `${list.format(r.lines)} film`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
