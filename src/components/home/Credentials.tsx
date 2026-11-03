"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { certificates } from "@/content/awards";
import { compliance } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRINTS = [
  { src: "/media/awards/award-apj-abdul-kalam.webp", alt: "Dr. A.P.J. Abdul Kalam presenting the Entrepreneur of the Year award", w: 1600, h: 1057, caption: "Entrepreneur of the Year, presented by Dr. A.P.J. Abdul Kalam" },
  { src: "/media/awards/parle-excellence-2014.webp", alt: "Parle Certificate of Excellence 2014", w: 1600, h: 1174, caption: "Parle Certificate of Excellence, Gold" },
  { src: "/media/awards/britannia-covid-appreciation.webp", alt: "Britannia certificate of appreciation for COVID-19 support", w: 1600, h: 1137, caption: "Britannia, COVID-19 support and best partner" },
  { src: "/media/awards/itc-foods-appreciation.webp", alt: "ITC Foods Division certificate of appreciation", w: 1600, h: 1201, caption: "ITC Foods, innovation and contribution" },
  { src: "/media/awards/award-pratibha-patil.webp", alt: "Smt. Pratibha Patil presenting the Entrepreneur of the Year award", w: 1600, h: 1097, caption: "Entrepreneur of the Year, presented by Smt. Pratibha Patil" },
  { src: "/media/awards/up-export-award.webp", alt: "Uttar Pradesh export award for plastic products", w: 1600, h: 1204, caption: "Highest export in plastics, Uttar Pradesh" },
];

// Where each print lies when it lands on the table, before it is squared up.
const SCATTER = [
  { x: 9, y: 45, r: -10 },
  { x: -5, y: -30, r: 8 },
  { x: 10, y: 22, r: -5 },
  { x: -12, y: 50, r: 11 },
  { x: 6, y: -40, r: -8 },
  { x: -9, y: 18, r: 6 },
];

export function Credentials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-print]").forEach((el, i) => {
          const s = SCATTER[i % SCATTER.length];
          gsap.fromTo(
            el,
            { xPercent: s.x, yPercent: s.y, rotation: s.r },
            {
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              ease: "none",
              scrollTrigger: { trigger: "[data-table]", start: "top 95%", end: "center 55%", scrub: 0.8 },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cred-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="cred-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] text-ink">
              Our credentials. <span className="text-crimson">Your assurance.</span>
            </h2>
            <p className="mt-6 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-soft">
              Aditya Flexipack upholds the most rigorous global standards. Our certifications are a testament to our unwavering
              commitment to quality, innovation, and the precision your brand demands.
            </p>
            <ButtonLink href="/awards-recognitions/" tone="crimson" className="mt-8">
              View awards
            </ButtonLink>
          </div>
          <div className="grid content-start gap-3 lg:col-span-6">
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
              {certificates.map((c) => (
                <li key={c.name} className="grid place-items-center rounded-[var(--radius-lg)] bg-paper p-2 sm:p-3">
                  <Image src={c.mark} alt={c.name} width={120} height={120} className="size-12 object-contain sm:size-20" />
                </li>
              ))}
            </ul>
            <ul className="grid gap-2 rounded-[var(--radius-lg)] bg-paper p-6 sm:grid-cols-2">
              {compliance.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[1.02rem] font-medium text-ink">
                  <span className="size-2.5 shrink-0 rounded-full bg-crimson" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The light table: real award photographs, squared up as they slide in */}
        <div data-table className="shell mt-16 lg:mt-24">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {PRINTS.map((p) => (
              <li key={p.src} data-print className="will-change-transform">
                <figure>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 48vw"
                    className="aspect-[4/3] w-full rounded-[var(--radius-sm)] bg-white object-cover p-2 shadow-[var(--shadow-card)]"
                  />
                  <figcaption className="mt-3 text-[0.92rem] leading-snug text-ink-soft">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
