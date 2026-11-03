"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Pack } from "@/components/ui/Pack";
import { SectionHeader } from "@/components/system/SectionHeader";
import { TONES } from "@/components/system/tones";
import { OFFERINGS } from "@/components/offerings/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ENQUIRY = "/packaging-partnership/#begin";

/**
 * Each strip is one print run, so each has its own flat colour: white, wine and blush on the crimson panel.
 * The seals are the same film one tone deeper. The arrow block pairs with the face the way the split buttons do.
 */
const STRIP = [
  { face: "bg-white", seal: "var(--color-foil-2)", name: "text-ink", items: "text-ink-soft", knob: "bg-ink text-white", ring: "" },
  { face: "bg-wine", seal: "var(--color-wine-2)", name: "text-white", items: "text-white/80", knob: "bg-crimson text-white", ring: "focus-visible:outline-white!" },
  { face: "bg-blush", seal: "#ffb4aa", name: "text-wine", items: "text-wine", knob: "bg-wine text-white", ring: "" },
] as const;

// The seal a sachet hangs from, with a V tear notch cut into its right edge.
const NOTCH = "polygon(0 0, 100% 0, 100% 22%, calc(100% - 9px) 50%, 100% 78%, 100% 100%, 0 100%)";
// The cut end of a strip, pinked along its bottom edge.
const TEETH = "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 16px 100%";

/**
 * Desktop sachet heights per strip, in 0.75rem grid rows (10.5, 9.75 and 9rem). Each strip is cut to its own
 * sachet size, as real strips are, so the three hang to different lengths and their seals never line up into
 * rows across the rail.
 */
const SPAN = [14, 13, 12];

/**
 * The Laddi: the thirteen offerings hang as sachets in three laddi strips from a wine rail, the way kirana shops
 * hang them. On phones the three strips run on as one.
 *
 * Motion (no pin, all scrubbed linear, one to one with scroll): the rail draws in from the left, then each sachet
 * drops out from behind the one above as its slot rises into the lower part of the screen, so the strips unroll
 * just ahead of the reader. Each strip on desktop starts a step after the one to its left.
 * Hover or focus tugs a sachet 4px down and stretches the seal it hangs from.
 *
 * Layers per sachet: the <li> is static and clips only above its own top edge (so a sachet appears from behind
 * its neighbour); [data-drop] carries the scroll drop; the seal and the face carry the CSS tug. The HTML holds
 * the strips hanging in full, which is what reduced-motion and no-JS visitors get.
 */
export function Laddi() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desk: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const { desk, motion } = ctx.conditions as { desk: boolean; motion: boolean };
        if (!motion) return;
        const scope = root.current;
        if (!scope) return;

        gsap.from("[data-laddi-head]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-laddi-head]", start: "top 88%", once: true },
        });

        gsap.fromTo(
          "[data-rail]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: "[data-rail]", start: "top 100%", end: "top 86%", scrub: true } },
        );

        const drops = gsap.utils.toArray<HTMLElement>("[data-sachet]", scope).map((li) => {
          const step = desk ? Number(li.dataset.strip) * 4 : 0;
          return gsap.fromTo(
            li.querySelector("[data-drop]"),
            { yPercent: -100 },
            { yPercent: 0, ease: "none", scrollTrigger: { trigger: li, start: `top ${96 - step}%`, end: `top ${74 - step}%`, scrub: true } },
          );
        });

        // Keyboard users get every sachet hung at once, so focus never lands on one still rolled up.
        const list = scope.querySelector("[data-laddi]");
        const hangAll = () => {
          drops.forEach((d) => {
            d.scrollTrigger?.kill();
            d.progress(1);
          });
        };
        list?.addEventListener("focusin", hangAll, { once: true });
        return () => list?.removeEventListener("focusin", hangAll);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="laddi-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson py-[calc(var(--section-y)*0.75)] text-white">
        {/* Soft tonal contours, as on every colour panel */}
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M0 0 H1200 V170 C 1010 260, 860 110, 640 190 S 230 300, 0 200 Z" fill={TONES.crimson.contour} />
          <path d="M0 640 C 240 560, 420 720, 660 650 S 1020 520, 1200 600 V800 H0 Z" fill={TONES.crimson.contour} />
        </svg>

        <div className="shell relative">
          <div data-laddi-head>
            <SectionHeader id="laddi-title" title="Packaging, from our plant to yours" standfirst="Choose a pack to start an enquiry." dark />
          </div>

          <div aria-hidden data-rail className="relative z-30 h-5 rounded-[var(--radius-sm)] bg-wine" />

          <ol
            role="list"
            data-laddi
            className="page-grid relative -mt-[2px] pb-[var(--seal)] lg:auto-rows-[minmax(0.75rem,auto)]"
            style={{ "--seal": "1rem" } as CSSProperties}
          >
            {OFFERINGS.map((o, i) => {
              const s = STRIP[o.strip];
              return (
                <li
                  key={o.name}
                  data-sachet
                  data-strip={o.strip}
                  className="relative col-span-full min-h-[6.5rem] [clip-path:inset(-1px_-100vw_-100vh_-100vw)] lg:col-[var(--col)] lg:row-[var(--row)] lg:min-h-0"
                  style={
                    {
                      zIndex: 20 - i,
                      "--col": `${o.strip * 4 + 1} / span 4`,
                      "--row": `${o.row * SPAN[o.strip] + 1} / span ${SPAN[o.strip]}`,
                    } as CSSProperties
                  }
                >
                  <div data-drop className="h-full">
                    <Link href={ENQUIRY} className={`group relative flex h-full min-h-11 flex-col focus-visible:outline-offset-[-5px]! ${s.ring}`}>
                      <span
                        aria-hidden
                        style={{ backgroundColor: s.seal, clipPath: NOTCH }}
                        className="-mt-px block h-[calc(var(--seal)+1px)] shrink-0 origin-top transition-transform duration-300 ease-[var(--ease-back)] motion-safe:group-hover:scale-y-[1.25] motion-safe:group-focus-visible:scale-y-[1.25]"
                      />
                      <span
                        className={`relative grid flex-1 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-start gap-x-4 px-6 py-4 transition-transform duration-300 ease-[var(--ease-back)] motion-safe:group-hover:translate-y-1 motion-safe:group-focus-visible:translate-y-1 sm:px-7 lg:py-5 ${s.face}`}
                      >
                        <span aria-hidden style={{ backgroundColor: s.seal }} className="absolute inset-y-0 left-0 w-2.5" />
                        <span aria-hidden style={{ backgroundColor: s.seal }} className="absolute inset-y-0 right-0 w-2.5" />
                        <Pack format={o.pack} className="h-14 w-11" />
                        <span className="min-w-0 self-center lg:self-start">
                          <span className={`display block text-d4 ${s.name}`}>{o.name}</span>
                          {o.items && <span className={`mt-1.5 block text-small leading-snug ${s.items}`}>{o.items}</span>}
                          <span className="sr-only">, start an enquiry</span>
                        </span>
                        <span
                          aria-hidden
                          className={`grid size-10 place-items-center self-end rounded-[var(--radius-sm)] transition-transform duration-300 ease-[var(--ease-back)] group-hover:translate-x-0.5 ${s.knob}`}
                        >
                          <ArrowRight className="size-[1.15rem]" strokeWidth={2.4} />
                        </span>
                        {o.end && (
                          <span
                            aria-hidden
                            style={{ backgroundColor: s.seal, WebkitMask: TEETH, mask: TEETH }}
                            className={`absolute inset-x-0 top-[calc(100%-1px)] h-[calc(var(--seal)+1px)] ${o.end === "desk" ? "hidden lg:block" : "block"}`}
                          />
                        )}
                      </span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
