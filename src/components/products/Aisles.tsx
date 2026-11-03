"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Aisle = { name: string; items: string; note: string; photo: { src: string; alt: string }; field: string };

// Fields stay inside the logo palette: wash, silver, blush and silver-2, in turn.
const AISLES: Aisle[] = [
  {
    name: "Biscuits and snacks",
    items: "Cookies, sandwich biscuits, rusk, chips, namkeen, puffs and more",
    note: "High-barrier properties, superior sealing and freshness-lock technology keep snacks crisp and flavours intact, delivering that oven-fresh bite every time.",
    photo: { src: "/media/old/home/mockup-pouches-supermarket-shelf.webp", alt: "Aditya Flexipack snack pouches for fries, sweets and biscuits on a supermarket shelf" },
    field: "#ffe3df",
  },
  {
    name: "Kitchen essentials",
    items: "Flour, salt, spices, taste makers and more",
    note: "Tough, puncture-resistant structures for heavy and fine fills, printed to stand out on a crowded aisle.",
    photo: { src: "/media/old/about-us/mockup-pouches-wood-table.webp", alt: "Aditya Flexipack pouches for chakki atta, lollipops and papad on a wooden table" },
    field: "#eceef1",
  },
  {
    name: "Confectionery, cereals and frozen",
    items: "Candies, toffees, cakes, cereals, oats and frozen food",
    note: "Wrappers and laminates made for high-speed lines, with excellent dart impact and burst strength.",
    photo: { src: "/media/products/branded-pouches.webp", alt: "Printed pillow packs carrying the Aditya Flexipack mark" },
    field: "#ffc9c2",
  },
  {
    name: "Home and personal care",
    items: "Detergent powder and cakes, oil, soap, hair oil and shampoo",
    note: "Our barrier coating machine, high-barrier laminates and seal-through contamination technology ensure leak-proof performance on high-speed multi-track lines.",
    photo: { src: "/media/old/products-pouches/photo-pouch-range-autumn.webp", alt: "Spout, stand-up, flat-bottom, foil and kraft pouches" },
    field: "#dfe2e6",
  },
  {
    name: "Pet food and meat",
    items: "Pet food and meat packaging",
    note: "Stand-up and high-barrier formats for dense, heavy and aroma-rich fills.",
    photo: { src: "/media/process/foil-pouches.webp", alt: "Silver foil zip pouches in several sizes" },
    field: "#ffe3df",
  },
  {
    name: "Liquids, shrink and collation",
    items: "Juice and soap in liquid pouches, shrink film and collation packs",
    note: "Liquid and shaped pouches alongside shrink films and collation packs for secondary packaging.",
    photo: { src: "/media/old/home/photo-stretch-film-wrapping.webp", alt: "Film being wrapped round a carton" },
    field: "#eceef1",
  },
  {
    name: "Laddi packs, foil wrappers and polybags",
    items: "Laddi packs, aluminium-based foil wrappers and liners, polybags",
    note: "From strip-hung laddi packs to foil wrappers and 3-side seal polybags up to 120 micron.",
    photo: { src: "/media/products/foil-pouch-flat.webp", alt: "Flat aluminium foil pouches" },
    field: "#ffc9c2",
  },
];

const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function AisleCopy({ a }: { a: Aisle }) {
  return (
    <>
      <h3 className="display text-[clamp(2.2rem,4.2vw,4.4rem)] text-ink">{a.name}</h3>
      <p className="mt-4 text-[1.15rem] font-semibold text-ink">{a.items}</p>
      <p className="mt-3 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-soft">{a.note}</p>
    </>
  );
}

function PhotoCard({ a, tilt }: { a: Aisle; tilt: string }) {
  return (
    <div className={`w-full rounded-[var(--radius-lg)] bg-white p-2 ${tilt}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
        <Image src={a.photo.src} alt={a.photo.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
      </div>
    </div>
  );
}

/**
 * The liked scroll-and-switch, in v3: on large screens one aisle at a time is pinned on a coloured field and
 * swaps for the next as you scroll, its real pack photo dealt out and the next one dealt in.
 */
export function Aisles() {
  const root = useRef<HTMLElement>(null);
  const pinned = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [idx, setIdx] = useState(0);

  useGSAP(
    () => {
      if (!pinned) return;
      const n = AISLES.length;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.5 },
        scrollTrigger: {
          trigger: "[data-aisle-stage]",
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 0.4) * 0.75}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setIdx(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
        },
      });
      for (let i = 1; i < n; i++) {
        const at = i - 1 + 0.25;
        tl.to(`[data-copy="${i - 1}"]`, { autoAlpha: 0, y: -50 }, at)
          .fromTo(`[data-copy="${i}"]`, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, at + 0.15)
          .to(`[data-photo-card="${i - 1}"]`, { xPercent: -60, yPercent: -16, rotation: -14, autoAlpha: 0 }, at)
          .fromTo(
            `[data-photo-card="${i}"]`,
            { xPercent: 60, yPercent: 22, rotation: 12, autoAlpha: 0 },
            { xPercent: 0, yPercent: 0, rotation: 0, autoAlpha: 1 },
            at + 0.1,
          )
          .to("[data-aisle-field]", { backgroundColor: AISLES[i].field }, at);
      }
      tl.to({}, { duration: 0.35 });
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  );

  return (
    <section ref={root} aria-labelledby="aisles-title" className="py-[var(--section-y)]">
      <div className="shell grid gap-8 lg:grid-cols-12">
        <h2 id="aisles-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] text-ink lg:col-span-7">
          From our plant to <span className="text-crimson">your aisle</span>
        </h2>
        <p className="text-[1.12rem] leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">
          We also package leading home care and personal care products with precision-engineered solutions, with wrappers
          offering excellent dart impact and burst strength.
        </p>
      </div>

      {pinned ? (
        <div data-aisle-stage className="mt-16 h-[100svh] px-[var(--frame)] py-[var(--frame)]">
          <div
            data-aisle-field
            className="relative grid h-full grid-cols-12 items-center overflow-hidden rounded-[var(--radius-2xl)] px-[4vw]"
            style={{ backgroundColor: AISLES[0].field }}
          >
            <div className="relative col-span-6 h-[60%]">
              {AISLES.map((a, i) => (
                <div key={a.name} data-copy={i} className={`absolute inset-0 flex flex-col justify-center ${i ? "invisible" : ""}`}>
                  <AisleCopy a={a} />
                </div>
              ))}
            </div>
            <div className="relative col-span-5 col-start-8 grid h-[72%] place-items-center">
              {AISLES.map((a, i) => (
                <div key={a.name} data-photo-card={i} className={`absolute inset-0 grid place-items-center ${i ? "invisible" : ""}`}>
                  <PhotoCard a={a} tilt={i % 2 ? "rotate-[3deg]" : "-rotate-[3deg]"} />
                </div>
              ))}
            </div>
            <ol className="absolute bottom-8 left-[4vw] right-[4vw] flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
              {AISLES.map((a, i) => (
                <li key={a.name} aria-current={i === idx ? "step" : undefined} className={`transition-colors duration-300 ${i === idx ? "font-semibold text-ink" : "text-ink-soft"}`}>
                  {a.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <ul className="shell mt-14 grid gap-[var(--frame)]">
          {AISLES.map((a, i) => (
            <li key={a.name} className="grid items-center gap-8 rounded-[var(--radius-xl)] p-6 sm:p-10 md:grid-cols-2" style={{ backgroundColor: a.field }}>
              <div>
                <AisleCopy a={a} />
              </div>
              <PhotoCard a={a} tilt={i % 2 ? "rotate-[2deg]" : "-rotate-[2deg]"} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
