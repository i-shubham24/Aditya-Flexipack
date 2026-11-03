import { Cylinder, Droplet, Layers, PaintBucket, Recycle, Sparkles, Sun } from "lucide-react";

/** The old About page's "integrated infrastructure" list, as a sheet of dealt spec cards. */
const ITEMS = [
  { icon: PaintBucket, title: "In-house ink manufacturing and cylinder making", tone: "bg-white text-ink", tilt: "lg:rotate-[2deg]" },
  { icon: Cylinder, title: "CPP film processing", tone: "bg-wine text-white", tilt: "lg:-rotate-[2deg]" },
  { icon: Sparkles, title: "In-house metallising capability", tone: "bg-foil-2 text-ink", tilt: "lg:rotate-[1deg]" },
  { icon: Droplet, title: "Liquid and shaped pouching capabilities", tone: "bg-ink text-white", tilt: "lg:-rotate-[3deg]" },
  { icon: Recycle, title: "Pyrolysis plant and waste recycling systems", tone: "bg-blush text-wine", tilt: "lg:rotate-[2deg]" },
  { icon: Sun, title: "Solar energy generation and rainwater harvesting", tone: "bg-white text-ink", tilt: "lg:-rotate-[1deg]" },
];

export function Capabilities() {
  return (
    <section aria-labelledby="infra-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson py-[calc(var(--section-y)*0.75)] text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 520 C 220 430, 380 620, 620 540 S 1000 360, 1200 450 V800 H0 Z" fill="#b80000" />
          <path d="M820 0 C 860 140, 1010 190, 1090 110 S 1170 30, 1200 50 V0 Z" fill="#e01810" />
        </svg>
        <div className="shell relative">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="infra-title" className="display text-[clamp(2.6rem,5.8vw,6rem)] lg:col-span-7">
              Our integrated infrastructure
            </h2>
            <p className="hand -rotate-2 text-[2.1rem] text-blush lg:col-span-5">Heavily backward integrated</p>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {/* The headline figure gets the big card */}
            <li className="rounded-[var(--radius-xl)] bg-white p-7 text-crimson transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:scale-[1.03] sm:col-span-2 lg:row-span-2 lg:-rotate-[2deg] lg:hover:rotate-0">
              <Layers className="size-10" strokeWidth={1.8} aria-hidden />
              <p className="display tabular mt-10 text-[clamp(4rem,9vw,8.4rem)] leading-[0.85]">4,000</p>
              <p className="hand mt-2 text-[2.2rem] text-wine">MT every month</p>
              <p className="mt-8 max-w-[24rem] text-[1.1rem] font-semibold leading-snug text-ink">Laminates production capacity</p>
            </li>
            {ITEMS.map(({ icon: Icon, title, tone, tilt }) => (
              <li
                key={title}
                className={`flex min-h-[13rem] flex-col justify-between rounded-[var(--radius-xl)] p-6 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:scale-[1.04] lg:hover:rotate-0 ${tone} ${tilt}`}
              >
                <Icon className="size-9" strokeWidth={1.8} aria-hidden />
                <p className="display mt-8 text-[clamp(1.35rem,1.8vw,1.7rem)] leading-[1.02]">{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
