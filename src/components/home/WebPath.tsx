"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { Pack } from "@/components/ui/Pack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Station = {
  id: string;
  title: string;
  body: string;
  photo: { src: string; alt: string };
  swatch: "pellet" | "film" | "metal" | "copper" | "ink" | "print" | "laminate" | "slit" | "pouch";
};

const STATIONS: Station[] = [
  {
    id: "film",
    title: "Film, blown and cast",
    body: "Multiple blown film lines make 3, 5 and 7-layer films with auto gauge control and Plast-Control feeding. Our CPP line casts the sealant layers our laminates are built on.",
    photo: { src: "/media/plant/blown-film-tower.webp", alt: "Blown film tower at the Aditya Flexipack plant" },
    swatch: "film",
  },
  {
    id: "metallise",
    title: "Metallising",
    body: "India's first Bobst Vision K5 1,650 mm metalliser with AluBond lays a uniform aluminium layer on CPP and PE, with Hawk-Eye inspection and optical density measurement for precise barrier control.",
    photo: { src: "/media/process/metallised-rolls.webp", alt: "Rolls of metallised film on a rewinding shaft" },
    swatch: "metal",
  },
  {
    id: "cylinders",
    title: "Gravure cylinders",
    body: "Cylinders engraved in house, from prepress to production, with micro-precision engraving, specialised coatings and re-engraving.",
    photo: { src: "/media/plant/cylinder-engraver.webp", alt: "Copper gravure cylinder on an engraving machine" },
    swatch: "copper",
  },
  {
    id: "inks",
    title: "Inks",
    body: "Our ISO 22000:2018 certified sister concern formulates PU, non-toluene non-ketone, ARSR and water-based inks, gravure-optimised and compatible with solvent-free lamination.",
    photo: { src: "/media/process/ink-roller.webp", alt: "Yellow gravure ink running onto a press roller" },
    swatch: "ink",
  },
  {
    id: "print",
    title: "Rotogravure printing",
    body: "High-speed rotogravure printing with precision in colour, tone and registration, consistent across long production runs.",
    photo: { src: "/media/plant/press-hall.webp", alt: "Rotogravure press hall at the Aditya Flexipack plant" },
    swatch: "print",
  },
  {
    id: "laminate",
    title: "Lamination",
    body: "Adhesive and extrusion lamination marry the printed film to barrier and sealant layers, for structures from high-dart to high-barrier to mono-material.",
    photo: { src: "/media/plant/laminator-unwind.webp", alt: "Printed rolls on a laminator unwind stand" },
    swatch: "laminate",
  },
  {
    id: "slit",
    title: "Slitting and rewinding",
    body: "Master rolls are slit to the width your packing line runs and rewound into reels ready for form, fill and seal.",
    photo: { src: "/media/plant/slitter-rewinder.webp", alt: "Slitter rewinder cutting master rolls at the plant" },
    swatch: "slit",
  },
  {
    id: "pouch",
    title: "Pouching",
    body: "Centre seal, side seal, three side seal, stand-up, shaped and liquid pouches, made at speed with an auto detection system that minimises errors and waste.",
    photo: { src: "/media/process/foil-pouches.webp", alt: "Finished aluminium foil stand-up pouches" },
    swatch: "pouch",
  },
];

function Swatch({ kind }: { kind: Station["swatch"] }) {
  if (kind === "pouch") return <Pack format="standup" className="h-full w-full" />;
  const looks: Record<Exclude<Station["swatch"], "pouch">, string> = {
    pellet: "bg-white",
    film: "bg-[linear-gradient(135deg,rgb(255_255_255/.95),rgb(220_228_236/.7))]",
    metal: "bg-[linear-gradient(135deg,#f4f5f7,#aab0b8_45%,#eef0f3_70%,#9aa0a7)]",
    copper: "bg-[linear-gradient(135deg,#f0b48c,#9a5232_55%,#e2a07a)]",
    ink: "bg-crimson",
    print: "bg-[linear-gradient(135deg,var(--color-crimson)_0_50%,var(--color-ink)_50%)]",
    laminate: "bg-[linear-gradient(180deg,var(--color-crimson)_0_45%,#c9cdd2_45%_70%,#f4f5f7_70%)]",
    slit: "bg-[repeating-linear-gradient(90deg,var(--color-crimson)_0_8px,transparent_8px_11px)]",
  };
  return <span className={`block h-full w-full rounded-[0.6rem] ${looks[kind]}`} />;
}

export function WebPath() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const runner = useRef<HTMLDivElement>(null);
  const [d, setD] = useState("");
  const [current, setCurrent] = useState(0);
  const [h, setH] = useState(1000);

  // Build the web path through each station's roller, in page pixels.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const build = () => {
      const box = el.getBoundingClientRect();
      const rollers = [...el.querySelectorAll<HTMLElement>("[data-roller]")].filter((r) => r.offsetWidth > 0);
      if (!rollers.length) {
        setD("");
        return;
      }
      const pts = rollers.map((r) => {
        const b = r.getBoundingClientRect();
        return { x: b.left - box.left + b.width / 2, y: b.top - box.top + b.height / 2 };
      });
      const start = { x: pts[0].x, y: pts[0].y - 160 };
      let p = `M ${start.x} ${start.y} L ${pts[0].x} ${pts[0].y}`;
      // S-wraps between rollers, swinging toward the photo side the way a web wraps an idler.
      const swing = Math.min(150, box.width * 0.1);
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dx = i % 2 ? swing : -swing;
        const third = (b.y - a.y) / 3;
        p += ` C ${a.x + dx} ${a.y + third}, ${b.x + dx} ${b.y - third}, ${b.x} ${b.y}`;
      }
      const last = pts[pts.length - 1];
      p += ` L ${last.x} ${last.y + 140}`;
      setD(p);
      setH(box.height);
      if (svg.current) {
        svg.current.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      }
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const p = path.current;
      if (!p || !d) return;
      const len = p.getTotalLength();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
      if (reduce) return;
      const rollers = gsap.utils.toArray<HTMLElement>("[data-roller]");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 60%",
        end: "bottom 70%",
        scrub: 0.5,
        onUpdate: (self) => {
          const at = len * self.progress;
          p.style.strokeDashoffset = String(len - at);
          const pt = p.getPointAtLength(at);
          if (runner.current) runner.current.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%)`;
          const idx = Math.min(STATIONS.length - 1, Math.floor(self.progress * STATIONS.length * 0.999));
          setCurrent((c) => (c === idx ? c : idx));
          rollers.forEach((r, i) => r.style.setProperty("--spin", `${self.progress * 1440 * (i % 2 ? -1 : 1)}deg`));
        },
      });
    },
    { scope: root, dependencies: [d] },
  );

  return (
    <section aria-labelledby="web-title" className="pt-[var(--frame)]">
      <div ref={root} className="panel bg-wine py-[var(--section-y)] text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[42rem] w-full">
          <path d="M0 0 H1200 V250 C 980 330, 820 160, 600 250 S 200 360, 0 220 Z" fill="#520912" />
        </svg>

        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="web-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] lg:col-span-7">
              Every layer, under <span className="text-crimson-light">one roof</span>
            </h2>
            <div className="lg:col-span-5 lg:self-end">
              <p className="hand -rotate-2 text-[2rem] text-blush">Follow one web of film</p>
              <p className="mt-3 text-[1.1rem] leading-relaxed text-white/80">
                Our state-of-the-art machinery is the engine of our innovation. From polymer to pouch, the film never leaves our
                campus.
              </p>
            </div>
          </div>
        </div>

        <svg ref={svg} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="web-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={h}>
              <stop offset="0" stopColor="#eceef1" />
              <stop offset="0.3" stopColor="#c6cbd1" />
              <stop offset="0.55" stopColor="#ff4b3e" />
              <stop offset="1" stopColor="#ce0000" />
            </linearGradient>
          </defs>
          {d && (
            <>
              <path d={d} fill="none" stroke="#5c0b15" strokeWidth="22" strokeLinecap="round" />
              <path ref={path} d={d} fill="none" stroke="url(#web-ink)" strokeWidth="22" strokeLinecap="round" />
            </>
          )}
        </svg>
        <div
          ref={runner}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden size-16 rounded-[var(--radius-sm)] bg-white p-1.5 md:block"
          style={{ transform: "translate(-200px,-200px)" }}
        >
          <Swatch kind={STATIONS[current].swatch} />
        </div>

        <ol className="shell relative mt-20 grid gap-16 lg:mt-28 lg:gap-24">
          {STATIONS.map((s, i) => {
            const flip = i % 2 === 1;
            const on = i === current;
            return (
              <li key={s.id} data-active={on || undefined} className="group grid items-center gap-6 md:grid-cols-12">
                <div className={`md:col-span-5 ${flip ? "md:order-3" : ""}`}>
                  {/* Photo cards sit tilted until the web reaches them, then square up */}
                  <div
                    className={`rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate,scale] duration-700 ease-[var(--ease-back)] md:group-data-[active]:rotate-0 md:group-data-[active]:scale-[1.04] ${
                      flip ? "md:rotate-[3deg]" : "md:-rotate-[3deg]"
                    }`}
                  >
                    <Image
                      src={s.photo.src}
                      alt={s.photo.alt}
                      width={720}
                      height={540}
                      sizes="(min-width: 768px) 38vw, 100vw"
                      className="aspect-[4/3] w-full rounded-[var(--radius-md)] object-cover"
                    />
                  </div>
                </div>
                <div className="relative hidden h-full md:col-span-2 md:order-2 md:grid md:place-items-center">
                  <span
                    data-roller
                    aria-hidden
                    className="roller grid size-16 place-items-center rounded-full bg-white ring-0 ring-crimson-light transition-[box-shadow] duration-300 group-data-[active]:ring-[6px]"
                  >
                    <span className="size-10 rounded-full bg-[conic-gradient(var(--color-crimson)_0_25%,var(--color-wine)_0_50%,var(--color-crimson)_0_75%,var(--color-wine)_0)]" />
                  </span>
                </div>
                <div
                  className={`transition-opacity duration-500 md:col-span-5 md:opacity-50 md:group-data-[active]:opacity-100 ${
                    flip ? "md:order-1 md:text-right" : "md:order-3"
                  }`}
                >
                  <p className="hand text-[1.8rem] text-blush">Station {i + 1}</p>
                  <h3 className="display mt-1 text-[clamp(1.9rem,2.8vw,2.8rem)]">{s.title}</h3>
                  <p className={`mt-3 max-w-[30rem] text-[1.06rem] leading-relaxed text-white/80 ${flip ? "md:ml-auto" : ""}`}>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="shell relative mt-24 flex flex-wrap items-center justify-center gap-3 text-center">
          <ButtonLink href="/products/" tone="white">
            Explore our capabilities
          </ButtonLink>
          <ButtonLink href="/sustainability/" tone="foil" plain>
            And what happens to the scrap
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
