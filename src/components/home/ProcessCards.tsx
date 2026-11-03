"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ClipboardList, FlaskConical, Handshake, SearchCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Four steps in the logo palette: crimson, wine, silver and ink.
const STEPS = [
  { icon: ClipboardList, title: "Share your brief", body: "Tell us about your product, format, volumes and the certifications you need.", bg: "bg-crimson", ink: "text-white", tilt: -7 },
  { icon: SearchCheck, title: "Evaluation and review", body: "We assess the structure, quality, compliance and fit with your filling line.", bg: "bg-wine", ink: "text-white", tilt: -2 },
  { icon: FlaskConical, title: "Testing and approval", body: "Samples and documents go through trials and final review before approval.", bg: "bg-foil-2", ink: "text-ink", tilt: 3 },
  { icon: Handshake, title: "Partnership agreement", body: "You receive onboarding confirmation and production begins.", bg: "bg-ink", ink: "text-white", tilt: 8 },
];

export function ProcessCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step]");
        cards.forEach((card, i) => {
          const fromCentre = (1.5 - i) * 100;
          gsap.fromTo(
            card,
            { xPercent: fromCentre, yPercent: 30, rotate: 0 },
            {
              xPercent: 0,
              yPercent: 0,
              rotate: STEPS[i].tilt,
              ease: "none",
              scrollTrigger: { trigger: "[data-deck]", start: "top 90%", end: "center 60%", scrub: 0.8 },
            },
          );
        });
      });
      mm.add("(prefers-reduced-motion: reduce) and (min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((card, i) => gsap.set(card, { rotate: STEPS[i].tilt }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="process-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson-wash pb-[var(--section-y)] pt-[calc(var(--section-y)*0.8)]">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-x-0 top-[20%] h-[80%] w-full">
          <path d="M0 260 C 180 160, 300 380, 520 300 S 860 90, 1200 200 V600 H0 Z" fill="#ffd2cb" />
        </svg>
        <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="process-title" className="display text-[clamp(2.8rem,6vw,5.8rem)] lg:col-span-7">
            How we work together
          </h2>
          <div className="lg:col-span-5">
            <p className="text-[1.08rem] leading-relaxed text-ink-soft">
              We welcome partners who share our commitment to quality and innovation, across food, pharma and personal care.
            </p>
            <ButtonLink href="/packaging-partnership/" className="mt-6">
              Begin your partnership
            </ButtonLink>
          </div>
        </div>

        <ol data-deck className="shell relative mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 md:grid-cols-4 md:gap-0">
          {STEPS.map(({ icon: Icon, title, body, bg, ink, tilt }, i) => (
            <li
              key={title}
              data-step
              className="group relative z-[var(--z)] hover:z-30 md:-mx-2"
              style={{ ["--z" as string]: i + 1, ["--tilt" as string]: `${tilt}deg` }}
            >
              {/* GSAP deals the card; this layer straightens and lifts it on hover */}
              <div
                className={`h-full rounded-[var(--radius-xl)] p-6 transition-[rotate,scale,translate] duration-500 ease-[var(--ease-back)] group-hover:-translate-y-4 group-hover:scale-[1.06] md:min-h-[22rem] md:group-hover:[rotate:calc(var(--tilt)*-1)] ${bg} ${ink}`}
              >
                <span className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-white text-ink">
                    <Icon className="size-7" strokeWidth={1.8} />
                  </span>
                  <span className="hand text-[1.9rem] opacity-90">Step {i + 1}</span>
                </span>
                <h3 className="display mt-10 text-[clamp(1.8rem,2.4vw,2.3rem)]">{title}</h3>
                <p className="mt-3 text-[1rem] leading-snug opacity-90">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
