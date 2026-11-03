import Image from "next/image";
import { certificates } from "@/content/awards";

const TILTS = ["sm:-rotate-[3deg]", "sm:rotate-[2deg]", "sm:-rotate-[1deg]", "sm:rotate-[3deg]", "sm:-rotate-[2deg]"];

/** The five certifications from the old page, each mark set on a round seal card. */
export function CertificateSeals() {
  return (
    <section aria-labelledby="certs-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[var(--section-y)]">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 520 C 220 430, 400 620, 640 540 S 1000 380, 1200 460 V800 H0 Z" fill="#e4e7eb" />
        </svg>
        <div className="shell relative">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="certs-title" className="display text-[clamp(2.6rem,5.8vw,6rem)] text-ink lg:col-span-6">
              Our certificates
            </h2>
            <p className="hand -rotate-2 text-[2rem] text-crimson lg:col-span-6">Recognised excellence with industry-leading certifications</p>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {certificates.map((c, i) => (
              <li
                key={c.name}
                className={`flex flex-col items-center rounded-[var(--radius-xl)] bg-white p-6 text-center transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:scale-[1.04] sm:hover:rotate-0 ${TILTS[i]}`}
              >
                <span className="relative grid size-28 place-items-center rounded-full bg-foil ring-[6px] ring-crimson-wash">
                  <Image src={c.mark} alt="" width={120} height={120} className="size-20 object-contain" />
                </span>
                <h3 className="display mt-6 text-[1.55rem] leading-[1.02] text-ink">{c.name}</h3>
                <p className="mt-3 text-[0.98rem] leading-snug text-ink-soft">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
