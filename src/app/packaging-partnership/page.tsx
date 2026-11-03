import type { Metadata } from "next";
import { PartnerHero } from "@/components/heroes/PartnerHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/system/SectionHeader";
import { TearStrip } from "@/components/system/TearStrip";
import { Rise } from "@/components/desk/Rise";
import { TicketPeek } from "@/components/desk/TicketPeek";
import { JobTicket } from "@/components/desk/JobTicket";

export const metadata: Metadata = {
  title: "Packaging partnership",
  description:
    "Partner with Aditya Flexipack for laminates, pouches, films, polybags, inks and cylinders. Share your requirement and our team will evaluate, sample and onboard you.",
  alternates: { canonical: "/packaging-partnership/" },
};

/** Our partnership differentiators, as published. */
const REASONS = [
  { title: "Innovation at scale", body: "We deliver solutions custom-designed for performance and market leadership." },
  { title: "Business growth", body: "Our packaging drives customer reach and elevates your brand." },
  { title: "Operational excellence", body: "Our precision-made products ensure unwavering reliability and consistent performance." },
  { title: "Trusted collaboration", body: "We build long-term relationships with a steadfast commitment to your success." },
  { title: "Ethical leadership", body: "We uphold the highest standards of compliance, safety and responsible practices." },
  { title: "Purposeful sustainability", body: "Our eco-friendly processes create a positive brand impact for our partners." },
];

export default function PackagingPartnershipPage() {
  return (
    <>
      <PartnerHero
        tone="ink"
        title="Packaging partnership"
        intro={<p className="hand inline-block -rotate-2 text-note text-blush">Ready to innovate? Partner with the leaders.</p>}
        actions={
          <ButtonLink href="#begin" tone="white">
            Begin your partnership
          </ButtonLink>
        }
        teaser={<TicketPeek />}
      />

      <section aria-labelledby="why-title" className="py-[var(--section-y)]">
        <Rise className="shell">
          <div data-rise>
            <SectionHeader id="why-title" title="Why partner with Aditya Flexipack?" />
          </div>
          <ol className="page-grid gap-y-[var(--stack)]">
            {REASONS.map((r, i) => (
              <li key={r.title} data-rise className="col-span-full sm:col-span-4">
                <span aria-hidden className="display tabular block text-d3 text-crimson">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-4 text-d4 text-ink">{r.title}</h3>
                <p className="mt-2 max-w-[24rem] text-ink-soft">{r.body}</p>
              </li>
            ))}
          </ol>
        </Rise>
      </section>

      <section id="begin" aria-labelledby="begin-title" className="scroll-mt-24">
        <div className="panel bg-foil py-[var(--section-y)]">
          <div className="shell">
            <SectionHeader
              id="begin-title"
              title="Begin your partnership"
              standfirst="We welcome partners who share our commitment to quality and innovation. Across food, pharma and personal care, we look for high performance, reliability and print quality."
            />
            <JobTicket />
          </div>
        </div>
      </section>

      <TearStrip from="/packaging-partnership/" />
    </>
  );
}
