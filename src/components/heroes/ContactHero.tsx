"use client";

import { useRef } from "react";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { useHeroIntro } from "@/components/heroes/useHeroIntro";
import { site } from "@/content/site";

// The drive from the city office to the plant, drawn as one road in a 400 x 300 box.
const ROAD = "M 34 248 C 120 250, 118 160, 200 156 S 300 70, 366 62";
const START = { x: 34, y: 248 };
const END = { x: 366, y: 62 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Contact opener, "the road to Rania": the road from our Kanpur city office draws itself to the plant at Rania,
 * a marker drives along it while the distance counts up to 15 km. The finished map is in the HTML, so reduced
 * motion and no-JS visitors see the whole route at once.
 */
export function ContactHero() {
  const root = useRef<HTMLElement>(null);

  useHeroIntro(root, (tl) => {
    const road = root.current?.querySelector<SVGPathElement>("[data-road]");
    const car = root.current?.querySelector<SVGGElement>("[data-car]");
    const km = root.current?.querySelector<HTMLElement>("[data-km]");
    if (!road || !car || !km) return;
    const len = road.getTotalLength();
    const trip = { p: 0 };
    tl.fromTo(road, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.15)
      .from("[data-lane]", { autoAlpha: 0, duration: 0.4 }, 1.1)
      .from("[data-pin]", { scale: 0, transformOrigin: "50% 100%", duration: 0.5, ease: "back.out(2.4)", stagger: 0.5 }, 0.2)
      .fromTo(
        trip,
        { p: 0 },
        {
          p: 1,
          duration: 1.6,
          ease: "power1.inOut",
          onUpdate: () => {
            const pt = road.getPointAtLength(len * trip.p);
            car.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
            km.textContent = String(Math.round(15 * trip.p));
          },
        },
        1.1,
      );
  });

  return (
    <section ref={root} data-hero="dark" aria-labelledby="page-title" className="hero-h">
      <div className="relative flex h-full flex-col overflow-clip rounded-b-[var(--radius-2xl)] bg-crimson text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#dc0a05" />
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#b80000" />
        </svg>

        <div className="shell page-grid relative flex-1 content-center items-center gap-y-10 pb-[clamp(1.5rem,5svh,3rem)] pt-[calc(var(--header-h)+1.5rem)]">
          <div className="col-span-full lg:col-[1/7]">
            <h1 id="page-title" data-hero-title className="display text-d1">
              Get in touch.
            </h1>
            <p data-hero-fade className="mt-5 max-w-[28rem] text-lead text-white/90">
              Call, write or visit our plant near Kanpur.
            </p>
            <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
              <ButtonLink href="#contact-form" tone="white">
                Fill the form
              </ButtonLink>
              <TextLink href={site.phoneHref} tone="white">
                {site.phone}
              </TextLink>
              <TextLink href={`mailto:${site.email}`} tone="white">
                {site.email}
              </TextLink>
            </div>
          </div>

          <figure className="col-span-full lg:col-[7/13]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[34rem]">
              <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Map: the road from our city office in Kanpur to our plant at Rania, 15 km away">
                {/* Road, then its centre line */}
                <path data-road d={ROAD} fill="none" stroke="#45060e" strokeWidth="26" strokeLinecap="round" />
                <path data-lane d={ROAD} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="9 9" strokeLinecap="round" />
                {/* Pins */}
                <g data-pin transform={`translate(${START.x} ${START.y - 4})`}>
                  <path d="M0 0 C -9 -10, -14 -18, -14 -26 A 14 14 0 1 1 14 -26 C 14 -18, 9 -10, 0 0 Z" fill="#ffffff" />
                  <circle cx="0" cy="-26" r="6" fill="#ce0000" />
                </g>
                <g data-pin transform={`translate(${END.x} ${END.y - 4})`}>
                  <path d="M0 0 C -12 -13, -19 -24, -19 -35 A 19 19 0 1 1 19 -35 C 19 -24, 12 -13, 0 0 Z" fill="#ffffff" />
                  <circle cx="0" cy="-35" r="8" fill="#45060e" />
                </g>
                {/* The marker that drives the route; it rests at the plant */}
                <g data-car transform={`translate(${END.x} ${END.y})`}>
                  <circle r="11" fill="#ffffff" />
                  <circle r="5" fill="#ce0000" />
                </g>
              </svg>

              {/* Labels in HTML so they stay crisp and readable at every size */}
              <p className="absolute text-small leading-snug" style={{ left: pct(START.x - 20, 400), top: pct(START.y + 14, 300) }}>
                <span className="display block text-[1.15rem]">City office</span>
                <span className="text-white/80">Dada Nagar, Kanpur</span>
              </p>
              <p className="absolute text-right text-small leading-snug" style={{ right: pct(400 - END.x - 18, 400), top: pct(END.y + 12, 300) }}>
                <span className="display block text-[1.15rem]">Plant</span>
                <span className="text-white/80">Rania, Kanpur Dehat</span>
              </p>
              <p className="absolute left-[46%] top-[63%] leading-none">
                <span className="display tabular text-[clamp(2.4rem,4.4vw,3.6rem)]">
                  <span data-km>15</span> km
                </span>
                <span className="hand mt-1 block -rotate-2 text-note text-blush">on the Kolkata to Delhi highway</span>
              </p>
            </div>
            <figcaption className="sr-only">Our plant is about 15 km from Kanpur, on the Kolkata to Delhi highway.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
