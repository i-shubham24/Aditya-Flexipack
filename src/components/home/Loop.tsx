import { Droplets, Factory, Recycle, Sun } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProofMark } from "@/components/ui/ProofMark";

const INITIATIVES = [
  {
    icon: Sun,
    figure: "1.35 MW",
    title: "Solar power",
    body: "A significant portion of our plant's energy comes from solar, cutting carbon emissions and reliance on fossil fuels.",
  },
  {
    icon: Droplets,
    figure: "3 systems",
    title: "Rainwater harvesting",
    body: "Three rainwater harvesting systems collect and reuse rainwater, reducing dependence on external water sources.",
  },
  {
    icon: Recycle,
    figure: "3 stages",
    title: "Recycling and pyrolysis",
    body: "Our recycling plant gives plastic waste a second life, and a three-stage pyrolysis system converts waste to energy.",
  },
  {
    icon: Factory,
    figure: "PIR",
    title: "Post-industrial recycled materials",
    body: "Where clients require it, we incorporate post-industrial recycled material without compromising quality or performance.",
  },
];

export function Loop() {
  return (
    <section aria-labelledby="loop-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path d="M0 560 C 200 460, 360 640, 600 560 S 980 380, 1200 470 V800 H0 Z" fill="#e2e5e9" />
          <path d="M0 680 C 240 610, 420 760, 680 700 S 1020 600, 1200 650 V800 H0 Z" fill="#d7dbe0" />
        </svg>
        <div className="shell relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="loop-title" className="display text-[clamp(2.6rem,5.6vw,6rem)] text-ink">
              Engineering a{" "}
              <ProofMark>
                <span className="text-crimson">circular</span>
              </ProofMark>{" "}
              economy
            </h2>
            <p className="mt-6 max-w-[32rem] text-[1.1rem] leading-relaxed text-ink">
              By pioneering sustainable materials and advanced engineering, we help brands reduce waste and foster a healthier
              environment. Every choice, from material to design, makes a difference: we are committed to recyclable and reusable
              packaging that keeps materials in the value chain and out of landfills.
            </p>
            <ButtonLink href="/sustainability/" tone="ink" className="mt-8">
              Our sustainability work
            </ButtonLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {INITIATIVES.map(({ icon: Icon, figure, title, body }, i) => (
              <li
                key={title}
                className={`rounded-[var(--radius-xl)] bg-white p-7  ${i % 2 ? "sm:translate-y-12" : ""}`}
              >
                <span className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-white text-crimson">
                  <Icon className="size-6" strokeWidth={1.8} />
                </span>
                <p className="display mt-6 text-[3.2rem] text-ink">{figure}</p>
                <h3 className="mt-1 text-[1.15rem] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
