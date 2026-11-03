import Image from "next/image";
import { SectionHeader } from "@/components/system/SectionHeader";
import { Appear } from "./Appear";
import { CERTS } from "./data";

/** The five certificates in one straight row: the mark straight on white, its name, and one short line. */
export function Certificates() {
  return (
    <section aria-labelledby="certs-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeader id="certs-title" title="Our certificates" standfirst="Recognised excellence with industry-leading certifications." />
        <Appear>
          <ul data-appear className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 lg:gap-x-[clamp(1.25rem,1.8vw,1.5rem)]">
            {CERTS.map((c) => (
              <li key={c.name}>
                <Image src={c.mark} alt="" width={120} height={120} className="size-20 object-contain lg:size-24" />
                <h3 className="display mt-5 text-d4 text-ink">{c.name}</h3>
                <p className="mt-2 max-w-[16rem] text-small text-ink-soft">{c.line}</p>
              </li>
            ))}
          </ul>
        </Appear>
      </div>
    </section>
  );
}
