"use client";

import Image from "next/image";
import { useState } from "react";

type Area = "Printing" | "Cylinders" | "Film" | "Converting" | "Campus";

const G = (f: string) => `/media/old/gallery/${f}.webp`;
const H = (f: string) => `/media/old/home/${f}.webp`;

/** Every plant photograph the old site carried. Captions only say what is in the frame. */
const SHOTS: { src: string; alt: string; area: Area; shape: string; w: number; h: number }[] = [
  { src: H("plant-press-hall-overview"), alt: "The press hall from above, with a gravure press line and ink drums", area: "Printing", shape: "aspect-[4/5]", w: 648, h: 648 },
  { src: G("plant-blown-film-tower-stairs"), alt: "Blown film tower with its blue and cream stairways", area: "Film", shape: "aspect-square", w: 648, h: 648 },
  { src: H("plant-copper-cylinder-engraver"), alt: "Copper-plated gravure cylinder on the engraving machine", area: "Cylinders", shape: "aspect-[4/3]", w: 648, h: 648 },
  { src: G("plant-proof-press-wide"), alt: "Proof press with a printed sleeve on the cylinder and ink cups on the bench", area: "Printing", shape: "aspect-square", w: 630, h: 630 },
  { src: H("plant-super-perfast-machine"), alt: "Red and steel Super Perfast machine in a white tiled room", area: "Converting", shape: "aspect-[4/5]", w: 648, h: 648 },
  { src: H("plant-exterior-building"), alt: "The plant building with its entrance block, flagpoles and lawn", area: "Campus", shape: "aspect-[4/3]", w: 648, h: 648 },
  { src: G("plant-printed-film-rewinder"), alt: "Blue printed film running on a rewinder", area: "Printing", shape: "aspect-[4/5]", w: 648, h: 647 },
  { src: H("plant-copper-cylinder-engraver-wide"), alt: "Cylinder engraving machine with the operator monitor and bright windows", area: "Cylinders", shape: "aspect-square", w: 648, h: 648 },
  { src: H("plant-laminator-unwind-s575"), alt: "Laminator unwind stand with a roll of white film", area: "Converting", shape: "aspect-[4/3]", w: 647, h: 648 },
  { src: H("plant-blown-film-tower-close"), alt: "Blown film tower seen from below, with its nameplate", area: "Film", shape: "aspect-[4/5]", w: 648, h: 648 },
  { src: G("plant-printed-web-rewind"), alt: "Striped printed film web running over rollers", area: "Printing", shape: "aspect-square", w: 648, h: 647 },
  { src: H("plant-grey-enclosed-machine"), alt: "Enclosed production machine with an operator touchscreen", area: "Converting", shape: "aspect-[4/3]", w: 647, h: 648 },
  { src: G("plant-proof-press-sleeve-close"), alt: "Close view of a printed sleeve on the proof press", area: "Printing", shape: "aspect-[4/5]", w: 648, h: 648 },
  { src: H("plant-production-hall-floor"), alt: "Production hall with roll stock along the walls", area: "Campus", shape: "aspect-square", w: 648, h: 648 },
  { src: G("plant-enclosed-line-cabinets"), alt: "A line of enclosed machine cabinets in a large hall", area: "Converting", shape: "aspect-[4/3]", w: 647, h: 648 },
  { src: G("plant-control-cabinet-c1"), alt: "Control cabinet with a touch panel beside a safety bollard", area: "Converting", shape: "aspect-[4/5]", w: 647, h: 647 },
  { src: "/media/old/about-us/plant-exterior-wide.webp", alt: "The plant across its lawn under a hazy sun", area: "Campus", shape: "aspect-[16/10]", w: 1280, h: 720 },
];

const AREAS: ("All" | Area)[] = ["All", "Printing", "Cylinders", "Film", "Converting", "Campus"];
const TILTS = ["-2deg", "1.5deg", "-1deg", "2.5deg", "-2.5deg", "1deg"];

/**
 * The gallery as a wall of framed prints in three loose columns. Filters re-deal the wall; prints square up on
 * hover. No lightbox: every caption is on the card, and the filters are plain buttons for keyboard use.
 */
export function GalleryWall() {
  const [area, setArea] = useState<(typeof AREAS)[number]>("All");
  const shown = SHOTS.filter((s) => area === "All" || s.area === area);

  return (
    <section aria-labelledby="gallery-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[calc(var(--section-y)*0.8)]">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="gallery-title" className="display text-[clamp(2.4rem,5vw,5rem)] text-ink lg:col-span-6">
              Around the plant
            </h2>
            <div className="lg:col-span-6">
              <div role="group" aria-label="Filter photographs by area" className="flex flex-wrap gap-2 lg:justify-end">
                {AREAS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={area === a}
                    onClick={() => setArea(a)}
                    className="min-h-11 rounded-[var(--radius-sm)] bg-white px-4 text-[0.98rem] font-semibold text-ink transition-[background-color,color,translate] duration-300 ease-[var(--ease-back)] hover:-translate-y-0.5 aria-pressed:bg-crimson aria-pressed:text-white"
                  >
                    {a}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="mt-3 text-[0.95rem] text-ink-soft lg:text-right">
                Showing {shown.length} {shown.length === 1 ? "photograph" : "photographs"}
                {area === "All" ? "" : ` from ${area.toLowerCase()}`}
              </p>
            </div>
          </div>

          {/* Keyed by filter so the prints are dealt again each time */}
          <ul key={area} className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {shown.map((s, i) => (
              <li key={s.src} className="mb-6 break-inside-avoid">
                <figure
                  className="pop-card rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:scale-[1.03] hover:[--tilt:0deg]"
                  style={{ ["--tilt" as string]: TILTS[i % TILTS.length], animationDelay: `${Math.min(i, 8) * 60}ms` }}
                >
                  <div className={`relative overflow-hidden rounded-[var(--radius-md)] ${s.shape}`}>
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" className="object-cover" />
                  </div>
                  <figcaption className="flex items-baseline justify-between gap-3 px-2 pb-1 pt-3">
                    <span className="text-[0.98rem] leading-snug text-ink-soft">{s.alt}</span>
                    <span className="hand shrink-0 text-[1.4rem] text-crimson">{s.area}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
