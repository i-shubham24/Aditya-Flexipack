import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { FallbackIcon } from "./meta";

/** The product's second list (machine capabilities, key features, industries) on the wine panel. */
export function ExtraPanel({
  title,
  items,
  icons = [],
  photo,
}: {
  title: string;
  items: string[];
  icons?: LucideIcon[];
  photo?: { src: string; alt: string };
}) {
  return (
    <section aria-labelledby="extra-title" className="pt-[var(--frame)]">
      <div className="panel bg-wine py-[calc(var(--section-y)*0.75)] text-white">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 0 H1200 V160 C 980 240, 820 80, 600 160 S 200 260, 0 140 Z" fill="#520912" />
        </svg>
        <div className="shell relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="extra-title" className="display text-[clamp(2.6rem,5vw,4.8rem)]">
              {title}
            </h2>
            {photo && (
              <div className="group mt-10 hidden -rotate-[2deg] rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0 lg:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="34vw" className="object-cover" />
                </div>
              </div>
            )}
          </div>
          <ul className={`grid content-start gap-4 sm:grid-cols-2 lg:col-span-7 ${items.length > 4 ? "xl:grid-cols-2" : ""}`}>
            {items.map((item, i) => {
              const Icon = icons[i] ?? FallbackIcon;
              return (
                <li key={item} className="flex min-h-[9rem] flex-col gap-5 rounded-[var(--radius-xl)] bg-wine-2 p-6">
                  <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-crimson text-white">
                    <Icon aria-hidden className="size-6" strokeWidth={1.8} />
                  </span>
                  <span className="text-[1.15rem] font-semibold leading-snug">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
