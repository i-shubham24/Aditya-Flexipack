"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Pack, type PackFormat } from "@/components/ui/Pack";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Aisle = { name: string; items: string; note: string; format: PackFormat; field: string };

const AISLES: Aisle[] = [
  {
    name: "Biscuits and snacks",
    items: "Cookies, sandwich biscuits, rusk, chips, namkeen, puffs and more",
    note: "High-barrier properties, superior sealing and freshness-lock technology keep snacks crisp and flavours intact, delivering that oven-fresh bite every time.",
    format: "pillow",
    field: "#ffe98a",
  },
  {
    name: "Kitchen essentials",
    items: "Flour, salt, spices, taste makers and more",
    note: "Tough, puncture-resistant structures for heavy and fine fills, printed to stand out on a crowded aisle.",
    format: "gusset",
    field: "#ffd2cb",
  },
  {
    name: "Confectionery, cereals and frozen",
    items: "Candies, toffees, cakes, cereals, oats and frozen food",
    note: "Wrappers and laminates made for high-speed lines, with excellent dart impact and burst strength.",
    format: "wrapper",
    field: "#c8ecfb",
  },
  {
    name: "Home and personal care",
    items: "Detergent powder and cakes, oil, soap, hair oil and shampoo",
    note: "Our barrier coating machine, high-barrier laminates and seal-through contamination technology ensure leak-proof performance on high-speed multi-track lines.",
    format: "sachet",
    field: "#ffd1ec",
  },
  {
    name: "Pet food and meat",
    items: "Pet food and meat packaging",
    note: "Stand-up and high-barrier formats for dense, heavy and aroma-rich fills.",
    format: "standup",
    field: "#eceef1",
  },
  {
    name: "Liquids, shrink and collation",
    items: "Juice and soap in liquid pouches, shrink film and collation packs",
    note: "Liquid and shaped pouches alongside shrink films and collation packs for secondary packaging.",
    format: "spout",
    field: "#ffe3df",
  },
  {
    name: "Laddi packs, foil wrappers and polybags",
    items: "Laddi packs, aluminium-based foil wrappers and liners, polybags",
    note: "From strip-hung laddi packs to foil wrappers and 3-side seal polybags up to 120 micron.",
    format: "laddi",
    field: "#fff3b8",
  },
];

function Intro() {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <h2 id="aisles-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] text-ink lg:col-span-7">
        From our plant to <span className="text-crimson">your aisle</span>
      </h2>
      <p className="text-[1.12rem] leading-relaxed text-ink-soft lg:col-span-5 lg:self-end">
        Great snacks deserve packaging that works as hard as the recipe. We also pack leading home care and personal care
        products with precision-engineered solutions.
      </p>
    </div>
  );
}

function AisleCopy({ a }: { a: Aisle }) {
  return (
    <>
      <h3 className="display text-[clamp(2.2rem,4.2vw,4.4rem)] text-ink">{a.name}</h3>
      <p className="mt-4 text-[1.15rem] font-semibold text-ink">{a.items}</p>
      <p className="mt-3 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-soft">{a.note}</p>
    </>
  );
}

export function Appetites() {
  const root = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
          .to(`[data-pack="${i - 1}"]`, { xPercent: -70, yPercent: -18, rotation: -16, autoAlpha: 0 }, at)
          .fromTo(`[data-pack="${i}"]`, { xPercent: 70, yPercent: 24, rotation: 14, autoAlpha: 0 }, { xPercent: 0, yPercent: 0, rotation: 0, autoAlpha: 1 }, at + 0.1)
          .to("[data-aisle-field]", { backgroundColor: AISLES[i].field }, at);
      }
      tl.to({}, { duration: 0.35 });
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  );

  return (
    <section ref={root} aria-labelledby="aisles-title" className="py-[var(--section-y)]">
      <div className="shell">
        <Intro />
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
                <div key={a.name} data-pack={i} className={`absolute inset-0 grid place-items-center ${i ? "invisible" : ""}`}>
                  <Pack format={a.format} className="h-full w-full " />
                </div>
              ))}
            </div>
            <ol className="absolute bottom-8 left-[4vw] right-[4vw] flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
              {AISLES.map((a, i) => (
                <li key={a.name} className={`transition-colors duration-300 ${i === idx ? "font-semibold text-ink" : "text-ink-soft/70"}`}>
                  {a.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <ul className="shell mt-14 grid gap-[var(--frame)]">
          {AISLES.map((a) => (
            <li key={a.name} className="grid items-center gap-6 rounded-[var(--radius-xl)] p-7 sm:grid-cols-[1fr_12rem] sm:p-10" style={{ backgroundColor: a.field }}>
              <div>
                <AisleCopy a={a} />
              </div>
              <Pack format={a.format} className="mx-auto h-44 max-w-[12rem]" />
            </li>
          ))}
        </ul>
      )}

      <div className="shell mt-12 flex justify-center">
        <ButtonLink href="/offerings/" tone="ink">
          See all offerings
        </ButtonLink>
      </div>
    </section>
  );
}
