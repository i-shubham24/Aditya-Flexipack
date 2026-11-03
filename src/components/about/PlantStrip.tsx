import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const O = (f: string) => `/media/old/home/${f}.webp`;

/** The plant photographs the old About page carried, small originals, so they sit as framed prints. */
const SHOTS = [
  { src: O("plant-press-hall-overview"), alt: "Elevated view of the press hall with a gravure press line and workers", tilt: "-rotate-[3deg]" },
  { src: O("plant-blown-film-tower-close"), alt: "Blown film tower seen from below with blue handrails", tilt: "rotate-[2deg]" },
  { src: O("plant-copper-cylinder-engraver-wide"), alt: "Cylinder engraving machine with a copper cylinder and operator monitor", tilt: "-rotate-[1deg]" },
  { src: O("plant-laminator-unwind-s575"), alt: "Laminator unwind stand with a touchscreen and a roll of white film", tilt: "rotate-[3deg]" },
  { src: O("plant-super-perfast-machine"), alt: "Red and steel Super Perfast machine with a touchscreen", tilt: "rotate-[2deg]" },
  { src: O("plant-grey-enclosed-machine"), alt: "Large enclosed production machine with an operator touchscreen", tilt: "-rotate-[3deg]" },
  { src: O("plant-production-hall-floor"), alt: "Wide production hall with roll stock in the background", tilt: "rotate-[1deg]" },
  { src: O("plant-copper-cylinder-engraver"), alt: "Copper-plated gravure cylinder mounted on an engraving machine", tilt: "-rotate-[2deg]" },
];

export function PlantStrip() {
  return (
    <section aria-labelledby="plant-title" className="py-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="plant-title" className="display text-[clamp(2.6rem,5.8vw,6rem)] text-ink lg:col-span-7">
            Inside the plant
          </h2>
          <div className="lg:col-span-5">
            <p className="hand -rotate-2 text-[2rem] text-crimson">18 acres off NH-2, 15 km from Kanpur</p>
          </div>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
          {SHOTS.map((s, i) => (
            <li
              key={s.src}
              className={`rounded-[var(--radius-lg)] bg-foil p-2 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:rotate-0 hover:scale-[1.04] ${s.tilt} ${i % 4 === 1 || i % 4 === 3 ? "md:translate-y-10" : ""}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)]">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 22vw, 46vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-20 flex justify-center">
          <ButtonLink href="/gallery/" tone="ink">
            Visit the gallery
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
