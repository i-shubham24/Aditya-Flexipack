import { TONES } from "@/components/system/tones";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { SectionHeader } from "@/components/system/SectionHeader";
import { NumberedList } from "@/components/system/NumberedList";
import type { PhotoSlot } from "./sheet";
import type { Tone } from "@/components/system/tones";
import type { ReactNode } from "react";

const FIT: Record<PhotoSlot["fit"], { cls: string; sizes: string }> = {
  // 648 px plant photos: never wider than four columns (or 27rem when the grid stacks).
  quarter: { cls: "span-quarter w-full max-w-[27rem] lg:max-w-none", sizes: "(min-width: 1024px) 30vw, (min-width: 640px) 27rem, 92vw" },
  side: { cls: "span-side", sizes: "(min-width: 1024px) 38vw, 92vw" },
  wide: { cls: "span-full", sizes: "(min-width: 1472px) 1376px, 92vw" },
};

function Photo({ slot, dark }: { slot: PhotoSlot; dark: boolean }) {
  const f = FIT[slot.fit];
  return (
    <PhotoFrame
      className={f.cls}
      src={slot.photo.src}
      alt={slot.photo.alt}
      caption={slot.photo.caption}
      ratio={slot.ratio}
      sizes={f.sizes}
      dark={dark}
    />
  );
}

/** Soft tonal contours, one shade off the panel's own field, as on the homepage panels. */
const CONTOURS = [
  "M0 0 H1200 V230 C 980 320, 820 150, 600 240 S 200 350, 0 210 Z",
  "M0 800 V560 C 260 480, 460 650, 720 560 S 1080 470, 1200 520 V800 Z",
  "M1200 0 V330 C 1060 400, 960 210, 830 160 S 700 60, 740 0 Z",
];

/** A colour panel, inset by the frame seam; its content keeps the page's left line through `.panel .shell`. */
export function Panel({
  field,
  labelledBy,
  id,
  contour = 0,
  children,
}: {
  field: Tone;
  labelledBy: string;
  id?: string;
  contour?: number;
  children: ReactNode;
}) {
  const t = TONES[field];
  return (
    <section id={id} aria-labelledby={labelledBy} className="scroll-mt-24 pt-[var(--frame)]">
      <div className={`panel py-[var(--section-y)] ${t.bg}`}>
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d={CONTOURS[contour % CONTOURS.length]} fill={t.contour} />
        </svg>
        <div className="shell relative">{children}</div>
      </div>
    </section>
  );
}

/** Section 2 of every product page: the old headline as H2, the copy as short lines, and one photo on the panel. */
export function ProductAbout({ title, lines, slot }: { title: string; lines: string[]; slot: PhotoSlot & { field: Tone } }) {
  const t = TONES[slot.field];
  return (
    <Panel field={slot.field} labelledBy="about-title" contour={0}>
      <div className="page-grid gap-y-[var(--stack)]">
        <div className="span-text">
          <h2 id="about-title" className={`display text-d2 ${t.ink}`}>
            {title}
          </h2>
          <div className={`mt-8 grid max-w-measure gap-3 text-lead ${t.sub}`}>
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
        <Photo slot={slot} dark={t.dark} />
      </div>
    </Panel>
  );
}

/** The product's other list after its centrepiece: numbered rows in Lead, a photo in 9-12. */
export function ProductList({ title, items, slot }: { title: string; items: string[]; slot: PhotoSlot & { field: Tone } }) {
  const t = TONES[slot.field];
  return (
    <Panel field={slot.field} labelledBy="list-title" contour={1}>
      <SectionHeader id="list-title" title={title} dark={t.dark} />
      <div className="page-grid gap-y-[var(--stack)]">
        <NumberedList className="span-lead" items={items.map((title) => ({ title }))} dark={t.dark} />
        <Photo slot={slot} dark={t.dark} />
      </div>
    </Panel>
  );
}
