"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = { name: string; left: string; right: string };

const P = (f: string) => `/media/products/${f}.webp`;
const PL = (f: string) => `/media/plant/${f}.webp`;

/** Every aisle we pack for, from the old Offerings page; each pairs a real pack photo with the line that makes it. */
const ITEMS: Item[] = [
  { name: "Biscuits and snacks", left: P("foil-pouch-zip"), right: PL("printed-web-rewind") },
  { name: "Namkeen and chips", left: P("foil-pouch-tall"), right: PL("proof-press-sleeves") },
  { name: "Flour, salt and spices", left: P("pouch-lineup"), right: PL("press-hall") },
  { name: "Confectionery", left: PL("laminator-unwind"), right: P("foil-pouch-flat") },
  { name: "Cereals and oats", left: P("foil-pouch-zip"), right: PL("slitter-rewinder") },
  { name: "Frozen food", left: P("foil-pouch-flat"), right: PL("blown-film-tower") },
  { name: "Home care", left: PL("pouch-machine"), right: P("foil-pouch-tall") },
  { name: "Personal care", left: P("pouch-lineup"), right: PL("cylinder-engraver") },
  { name: "Pet food and meat", left: P("foil-pouch-tall"), right: PL("production-shed") },
  { name: "Liquid pouches", left: PL("pouch-machine"), right: P("foil-pouch-zip") },
  { name: "Shrink and collation packs", left: PL("blown-film-tower"), right: PL("laminator-unwind") },
  { name: "Laddi packs and foil wrappers", left: PL("printed-web-rewind"), right: P("foil-pouch-flat") },
  { name: "Polybags", left: PL("production-shed"), right: P("pouch-lineup") },
];

function Card({ src, side, k }: { src: string; side: "left" | "right"; k: number }) {
  return (
    <div
      key={`${side}-${k}`}
      className={`pop-card w-full rounded-[var(--radius-lg)] bg-white p-2 ${side === "left" ? "[--tilt:-7deg]" : "[--tilt:6deg]"}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)]">
        <Image src={src} alt="" fill sizes="18vw" className="object-cover" />
      </div>
    </div>
  );
}

export function IndustryList() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const list = useRef<HTMLUListElement>(null);

  // Without a pointer on the list, the aisle crossing the middle of the screen is the active one.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (hovering) return;
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    // Only the aisles carry an index; the closing "and more" link must not become active.
    el.querySelectorAll("li[data-i]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [hovering]);

  const item = ITEMS[active] ?? ITEMS[0];

  return (
    <section aria-labelledby="aisles-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 210 C 240 120, 420 330, 640 250 S 1000 90, 1200 180 V900 H0 Z" fill="#ffd9d3" />
          <path d="M0 640 C 260 560, 460 760, 720 660 S 1060 520, 1200 600 V900 H0 Z" fill="#ffcfc8" />
        </svg>
        <div className="shell relative">
          <h2 id="aisles-title" className="hand text-center text-[2.2rem] text-crimson">
            What we pack
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,12rem)_1fr_minmax(0,12rem)] xl:grid-cols-[minmax(0,15rem)_1fr_minmax(0,15rem)]">
            <div className="hidden lg:block">
              <div className="sticky top-[24vh]">
                <Card src={item.left} side="left" k={active} />
              </div>
            </div>

            <ul ref={list} className="text-center" onMouseLeave={() => setHovering(false)}>
              {ITEMS.map((it, i) => (
                <li key={it.name} data-i={i}>
                  <Link
                    href="/offerings/"
                    onMouseEnter={() => {
                      setHovering(true);
                      setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    className={`display block py-2 text-[clamp(2rem,4.9vw,5.6rem)] leading-[1] transition-colors duration-300 ${
                      i === active ? "text-crimson" : "text-[#c26a62] hover:text-crimson"
                    }`}
                  >
                    {it.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/offerings/" className="hand mt-4 inline-flex min-h-11 items-center text-[2.4rem] text-wine underline decoration-wine/30 underline-offset-8 hover:decoration-wine">
                  and more
                </Link>
              </li>
            </ul>

            <div className="hidden lg:block">
              <div className="sticky top-[46vh]">
                <Card src={item.right} side="right" k={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
