import Image from "next/image";
import { CountUp } from "@/components/company/common/CountUp";
import { facts } from "@/content/site";

const COUNTS = [
  { value: facts.years.value, label: "years in packaging" },
  { value: facts.partners.value, label: "FMCG partners" },
  { value: facts.capacity.value, label: "MT of laminates a month" },
];

/**
 * Packaging partnership hero object: the client's own branded pouches on a shelf, and three published figures that
 * count up as the hero settles. Straight on the ink field, no frame.
 */
export function PartnerCounts() {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-xl">
        <Image
          src="/media/old/home/mockup-pouches-supermarket-shelf.webp"
          alt="Pouches printed with the Aditya Flexipack mark on a supermarket shelf"
          fill
          priority
          sizes="(min-width: 1024px) 26rem, 92vw"
          className="object-cover"
        />
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-3.5">
        {COUNTS.map((c) => (
          <div key={c.label}>
            <dt className="sr-only">{c.label}</dt>
            <dd>
              <CountUp value={c.value} className="display tabular block text-[clamp(2.2rem,3.4vw,3.2rem)] leading-none text-white" />
              <span className="mt-2 block text-[0.95rem] leading-snug text-white/80">{c.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
