import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Text beside a photograph that sits straight on the section background.
 * Rows alternate sides with `flip`. Headings are h2 unless `as` says otherwise.
 */
export function SplitRow({
  title,
  note,
  children,
  photo,
  flip = false,
  as: Heading = "h2",
  id,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  photo: { src: string; alt: string; ratio?: string };
  flip?: boolean;
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <section id={id} className="py-[calc(var(--section-y)*0.55)]">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <Heading className="display text-[clamp(2.3rem,4.4vw,4.4rem)] text-ink">{title}</Heading>
          {note && <p className="hand mt-3 inline-block -rotate-2 text-[1.9rem] text-crimson">{note}</p>}
          <div className="mt-5 space-y-4 text-[1.08rem] leading-relaxed text-ink-soft">{children}</div>
        </div>
        <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
          {/* Straight on the section's own background: no tile, no frame, no tilt */}
          <div className={`relative overflow-hidden rounded-[var(--radius-xl)] ${photo.ratio ?? "aspect-[4/3]"}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
