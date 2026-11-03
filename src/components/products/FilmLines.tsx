import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import type { FilmLine } from "@/content/products";

const PHOTOS: Record<string, { src: string; alt: string }> = {
  cpp: { src: "/media/old/products-films/photo-clear-film-roll-on-machine.webp", alt: "Large roll of clear film on an unwinder" },
  metallised: { src: "/media/old/products-films/banner-film-slitting-rolls.webp", alt: "Narrow rolls of metallised film on a slitter rewinder shaft" },
  blown: { src: "/media/old/gallery/plant-blown-film-tower-stairs.webp", alt: "Blown film extrusion tower with its stairways at the Aditya Flexipack plant" },
};

const ADVANTAGE = [
  { bg: "bg-crimson", ink: "text-white" },
  { bg: "bg-wine", ink: "text-white" },
  { bg: "bg-ink", ink: "text-white" },
];

/** Index of the three film lines: big jump tiles, each with its own photograph. */
export function FilmIndex({ films }: { films: FilmLine[] }) {
  return (
    <section aria-labelledby="lines-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[calc(var(--section-y)*0.75)]">
        <div className="shell">
          <h2 id="lines-title" className="display text-[clamp(2.6rem,5.4vw,5.2rem)] text-ink">
            Three film lines
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {films.map((f, i) => (
              <li key={f.id}>
                <a
                  href={`#${f.id}`}
                  className={`group flex h-full flex-col rounded-[var(--radius-xl)] bg-white p-2 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 md:hover:rotate-0 ${
                    i === 1 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"
                  }`}
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)]">
                    <Image src={PHOTOS[f.id].src} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="flex items-center justify-between gap-4 px-4 pb-3 pt-5">
                    <span className="display text-[clamp(1.8rem,2.6vw,2.4rem)] text-ink">{f.name}</span>
                    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-crimson text-white transition-transform duration-300 group-hover:translate-y-0.5">
                      <ArrowDown className="size-5" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** One film line in full: introduction, offerings, features and the advantages, word for word from the old page. */
export function FilmSection({ film, onWash }: { film: FilmLine; onWash: boolean }) {
  const photo = PHOTOS[film.id];
  const tile = onWash ? "bg-white" : "bg-foil";
  const body = (
    <div className="shell">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id={`${film.id}-title`} className="display text-[clamp(2.8rem,6vw,5.6rem)] text-ink">
            {film.name}
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-ink-soft">
            {film.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="group rotate-[2deg] rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-16 grid gap-10 ${film.features ? "lg:grid-cols-2" : ""}`}>
        <div>
          <h3 className="display text-[clamp(1.9rem,2.8vw,2.6rem)] text-ink">Our offerings</h3>
          <ol className={`mt-6 grid gap-3 ${film.features ? "" : "sm:grid-cols-2"}`}>
            {film.offerings.map((o, i) => (
              <li key={o} className={`flex min-h-16 items-center gap-4 rounded-[var(--radius-lg)] px-5 py-3 ${tile}`}>
                <span aria-hidden className="hand w-8 shrink-0 text-center text-[1.8rem] text-crimson">
                  {i + 1}
                </span>
                <span className="text-[1.06rem] font-semibold leading-snug text-ink">{o}</span>
              </li>
            ))}
          </ol>
        </div>
        {film.features && (
          <div>
            <h3 className="display text-[clamp(1.9rem,2.8vw,2.6rem)] text-ink">{film.featuresTitle}</h3>
            <ul className="mt-6 grid gap-3">
              {film.features.map((f) => (
                <li key={f} className={`flex min-h-16 items-center gap-4 rounded-[var(--radius-lg)] px-5 py-3 ${tile}`}>
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-xs)] bg-crimson text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-[1.06rem] leading-snug text-ink">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h3 className="display mt-16 text-[clamp(1.9rem,2.8vw,2.6rem)] text-ink">The film advantage</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {film.advantages.map((a, i) => (
          <li
            key={a.title}
            className={`rounded-[var(--radius-xl)] p-7 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1.5 md:hover:rotate-0 ${
              i === 1 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"
            } ${ADVANTAGE[i % ADVANTAGE.length].bg} ${ADVANTAGE[i % ADVANTAGE.length].ink}`}
          >
            <h4 className="display text-[1.9rem] leading-[1]">{a.title}</h4>
            {a.body && <p className="mt-3 text-[1rem] leading-snug opacity-90">{a.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  );

  return onWash ? (
    <section id={film.id} aria-labelledby={`${film.id}-title`} className="scroll-mt-24 pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">{body}</div>
    </section>
  ) : (
    <section id={film.id} aria-labelledby={`${film.id}-title`} className="scroll-mt-24 py-[var(--section-y)]">
      {body}
    </section>
  );
}
