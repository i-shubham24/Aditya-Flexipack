"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Award } from "@/content/awards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Print = Award["photos"][number] & { caption: string };
export type Entry = Pick<Award, "title" | "by" | "body"> & { prints: Print[] };

const TILTS = ["-rotate-[5deg]", "rotate-[4deg]", "-rotate-[2deg]", "rotate-[6deg]"];
const TABLES = { wash: "bg-crimson-wash", foil: "bg-foil", blush: "bg-blush", white: "bg-white" } as const;

/**
 * One group of awards as a wall of prints. Each award's photographs are dealt onto a coloured table as they
 * scroll in, then sit at an angle until pointed at, when they square up and come forward.
 */
export function AwardGroup({
  id,
  title,
  note,
  entries,
  panel,
  table,
}: {
  id: string;
  title: string;
  note: string;
  entries: Entry[];
  panel?: "wash";
  table: keyof typeof TABLES;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
          gsap.from(entry.querySelectorAll("[data-deal]"), {
            y: 90,
            rotate: () => gsap.utils.random(-16, 16),
            autoAlpha: 0,
            duration: 0.9,
            ease: "back.out(1.5)",
            stagger: 0.12,
            scrollTrigger: { trigger: entry, start: "top 78%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const body = (
    <div className="shell">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id={id} className="display text-[clamp(2.6rem,5.6vw,5.8rem)] text-ink lg:col-span-7">
          {title}
        </h2>
        <p className="hand -rotate-2 text-[2rem] text-crimson lg:col-span-5">{note}</p>
      </div>

      <ol className="mt-16 grid gap-16 lg:gap-24">
        {entries.map((e, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={e.title} data-entry className="grid items-center gap-8 lg:grid-cols-12">
              <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                <h3 className="display text-[clamp(1.9rem,3vw,3rem)] leading-[1] text-ink">{e.title}</h3>
                <p className="hand mt-2 text-[1.8rem] text-crimson">{e.by}</p>
                <p className="mt-4 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-soft">{e.body}</p>
              </div>
              <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                <ul
                  className={`flex min-h-[18rem] flex-wrap items-center justify-center gap-x-2 gap-y-6 rounded-[var(--radius-2xl)] px-4 py-10 sm:px-8 ${TABLES[table]}`}
                >
                  {e.prints.map((p, k) => {
                    const portrait = p.h > p.w;
                    return (
                      <li
                        key={p.src}
                        data-deal
                        className={`relative bg-white p-2 pb-0 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:z-10 hover:rotate-0 hover:scale-[1.06] ${
                          portrait ? "w-[min(40vw,12.5rem)]" : "w-[min(70vw,18rem)]"
                        } ${TILTS[(i + k) % TILTS.length]} ${e.prints.length > 1 ? "sm:-mx-3" : ""} rounded-[var(--radius-sm)]`}
                      >
                        <div className="relative overflow-hidden rounded-[var(--radius-xs)]" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                          <Image src={p.src} alt={p.alt} fill sizes={portrait ? "13rem" : "19rem"} className="object-cover" />
                        </div>
                        <p className="hand px-1 pb-2 pt-1.5 text-center text-[1.25rem] leading-tight text-ink-soft">{p.caption}</p>
                      </li>
                    );
                  })}
                  {e.prints.length === 0 && <li className="display text-center text-[2rem] text-wine">{e.by}</li>}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );

  return panel === "wash" ? (
    <section ref={root} aria-labelledby={id} className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">{body}</div>
    </section>
  ) : (
    <section ref={root} aria-labelledby={id} className="py-[var(--section-y)]">
      {body}
    </section>
  );
}
