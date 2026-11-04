"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QA: { q: string; a: string }[] = [
  {
    q: "What does Aditya Flexipack make?",
    a: "Laminates, pouches, films (CPP, metallised, and 3, 5 and 7-layer blown), gravure cylinders and polybags. Inks come from our ISO 22000:2018 certified sister concern.",
  },
  {
    q: "Which products do you pack for?",
    a: "Biscuits and snacks, kitchen essentials, confectionery, cereals and oats, frozen food, home and personal care, pet food and meat, liquids, shrink and collation packs, laddi packs, foil wrappers and polybags.",
  },
  {
    q: "Which certifications does the plant hold?",
    a: "BRCGS Issue 7 Grade A, SEDEX / SMETA 7 (4-pillar) and HACCP, with ISO 22000:2018 for the ink unit. The unit also complies with fire safety regulations.",
  },
  {
    q: "Where is your plant?",
    a: "On an 18-acre campus at Rania, Kanpur Dehat, along the Kolkata to Delhi highway (NH-2), 15 km from Kanpur. The location gives efficient logistics to key markets across India.",
  },
  {
    q: "Can you make recyclable packaging?",
    a: "Yes. We make mono-structured laminates designed for recycling, CPP for mono-material laminates, and include post-industrial recycled material where clients require it. The plant runs partly on 1.35 MW of solar and recycles its own waste.",
  },
  {
    q: "How do we start working together?",
    a: "Share your brief through the contact form or the packaging partnership page. We review fit and compliance, run samples and trials, and then onboard you for production.",
  },
];

export type QA = { q: string; a: string };

export function Faq({ items = QA, title = "Common questions" }: { items?: QA[]; title?: string }) {
  const root = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-faq-item]", {
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="faq-title" className="py-[var(--section-y)]">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="display text-[clamp(2.8rem,6vw,5.8rem)] lg:col-span-4">
          {title}
        </h2>
        <ul className="grid gap-3 lg:col-span-8">
          {items.map((x, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={x.q} data-faq-item>
                <div
                  className={`overflow-hidden rounded-[var(--radius-lg)] transition-colors duration-300 ${
                    isOpen ? "bg-crimson-wash" : "bg-foil hover:bg-foil/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left text-[1.15rem] font-semibold text-ink"
                  >
                    <span>{x.q}</span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-crimson text-white scale-105"
                          : "bg-white text-ink hover:text-crimson"
                      }`}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-350 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[46rem] px-6 pb-6 text-[1.04rem] leading-relaxed text-ink-soft">
                        {x.a}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
