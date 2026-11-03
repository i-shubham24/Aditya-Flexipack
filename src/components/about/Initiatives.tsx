import { CloudRain, Factory, Recycle, Sun } from "lucide-react";
import { Reveal } from "@/components/page/Reveal";

/** The four initiatives from the old Sustainability page, each with the figure that backs it. */
const ITEMS = [
  {
    icon: CloudRain,
    title: "Rainwater harvesting",
    figure: "3",
    unit: "harvesting systems",
    tile: "bg-crimson-wash text-wine",
    body: "Water conservation is a critical part of our operations. Our plant is equipped with three rainwater harvesting systems, enabling us to responsibly collect and reuse rainwater, reducing dependence on external water sources and promoting self-sustainability.",
  },
  {
    icon: Sun,
    title: "1.35 MW solar power",
    figure: "1.35",
    unit: "MW installed",
    tile: "bg-crimson text-white",
    body: "We actively move towards clean and renewable energy. With 1.35 MW of solar power installed, a significant portion of our plant's energy needs is met through solar, helping reduce carbon emissions and reliance on fossil fuels.",
  },
  {
    icon: Recycle,
    title: "Recycling and three-stage pyrolysis",
    figure: "3",
    unit: "stage pyrolysis",
    tile: "bg-foil text-ink",
    body: "We believe in closing the loop. Our pyrolysis system allows for efficient waste-to-energy conversion, and our recycling plant processes plastic waste to give it a second life, contributing to a more circular ecosystem.",
  },
  {
    icon: Factory,
    title: "Post-industrial recycled (PIR) materials",
    figure: "PIR",
    unit: "where clients require it",
    tile: "bg-wine text-white",
    body: "Where required by our clients, we incorporate post-industrial recycled waste into packaging solutions, helping brands meet their sustainability goals without compromising on quality or performance.",
  },
];

export function Initiatives() {
  return (
    <section aria-labelledby="initiatives-title" className="py-[var(--section-y)]">
      <Reveal className="shell">
        <h2 id="initiatives-title" data-reveal className="display max-w-[16ch] text-[clamp(2.6rem,5.8vw,6rem)] text-ink">
          Our key sustainability initiatives
        </h2>
        <ol className="mt-16 grid gap-14 lg:gap-20">
          {ITEMS.map(({ icon: Icon, title, figure, unit, tile, body }, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={title} data-reveal className="grid items-center gap-8 lg:grid-cols-12">
                <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <h3 className="display text-[clamp(2rem,3.4vw,3.4rem)] text-ink">{title}</h3>
                  <p className="mt-4 max-w-[36rem] text-[1.08rem] leading-relaxed text-ink-soft">{body}</p>
                </div>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <div
                    className={`group flex aspect-[5/3] flex-col justify-between rounded-[var(--radius-2xl)] p-7 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0 sm:p-9 ${tile} ${
                      flip ? "rotate-[2deg]" : "-rotate-[2deg]"
                    }`}
                  >
                    <Icon className="size-12 transition-[rotate] duration-700 ease-[var(--ease-back)] group-hover:rotate-[24deg]" strokeWidth={1.6} aria-hidden />
                    <p>
                      <span className="display tabular block text-[clamp(4rem,9vw,7.4rem)] leading-[0.85]">{figure}</span>
                      <span className="hand mt-1 block text-[1.9rem] opacity-90">{unit}</span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
