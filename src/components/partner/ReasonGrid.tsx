import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/page/Reveal";

export type Reason = { icon: LucideIcon; title: string; body: string };

// A checker of white cards with two accents, so six reasons read as a sheet rather than a wall.
const LOOKS = [
  { card: "bg-white text-ink", tile: "bg-crimson text-white", body: "text-ink-soft" },
  { card: "bg-white text-ink", tile: "bg-crimson text-white", body: "text-ink-soft" },
  { card: "bg-wine text-white", tile: "bg-white text-crimson", body: "text-white/80" },
  { card: "bg-crimson text-white", tile: "bg-white text-crimson", body: "text-white/90" },
  { card: "bg-white text-ink", tile: "bg-crimson text-white", body: "text-ink-soft" },
  { card: "bg-white text-ink", tile: "bg-crimson text-white", body: "text-ink-soft" },
];

/** Why-partner reasons from the old site, on a wash panel; each card lifts and its badge tips when pointed at. */
export function ReasonGrid({ id, title, note, reasons }: { id: string; title: string; note: string; reasons: Reason[] }) {
  return (
    <section aria-labelledby={id} className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 260 C 220 170, 400 360, 640 280 S 1000 120, 1200 210 V800 H0 Z" fill="#ffd9d3" />
          <path d="M0 620 C 260 540, 460 720, 720 640 S 1060 520, 1200 590 V800 H0 Z" fill="#ffcfc8" />
        </svg>
        <Reveal className="shell relative">
          <div className="max-w-[52rem]">
            <h2 id={id} data-reveal className="display text-[clamp(2.6rem,5.6vw,5.6rem)] text-wine">
              {title}
            </h2>
            <p data-reveal className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">
              {note}
            </p>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title: t, body }, i) => {
              const look = LOOKS[i % LOOKS.length];
              return (
                <li
                  key={t}
                  data-reveal
                  className={`group rounded-[var(--radius-xl)] p-7 transition-transform duration-500 ease-[var(--ease-back)] hover:-translate-y-2 ${look.card}`}
                >
                  <span
                    className={`grid size-14 place-items-center rounded-[var(--radius-md)] transition-transform duration-500 ease-[var(--ease-back)] group-hover:-rotate-[10deg] group-hover:scale-110 ${look.tile}`}
                  >
                    <Icon aria-hidden className="size-7" strokeWidth={1.8} />
                  </span>
                  <h3 className="display mt-8 text-[clamp(1.6rem,2.2vw,2rem)]">{t}</h3>
                  <p className={`mt-3 text-[1.02rem] leading-relaxed ${look.body}`}>{body}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
