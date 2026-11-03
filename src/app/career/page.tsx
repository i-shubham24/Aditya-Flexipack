import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SplitRow } from "@/components/page/SplitRow";
import { FactCards } from "@/components/page/FactCards";
import { Reveal } from "@/components/page/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FormSection } from "@/components/partner/FormSection";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Build a career with purpose at Aditya Flexipack. Join a team of visionaries redefining flexible packaging, with a culture of continuous learning and mentorship.",
  alternates: { canonical: "/career/" },
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        tone="crimson"
        title="A career with purpose. A company with impact."
        note="Our team"
        intro="At Aditya Flexipack, we believe that the future of packaging is a shared vision. We're seeking passionate professionals who are ready to push boundaries and redefine what's possible, creating solutions that benefit both our partners and our planet."
        photos={[
          { src: "/media/old/home/plant-press-hall-overview.webp", alt: "Team at work in the gravure press hall" },
          { src: "/media/old/home/plant-production-hall-floor.webp", alt: "A colleague walking through the production hall" },
        ]}
        actions={
          <ButtonLink href="#apply" tone="white">
            Apply now
          </ButtonLink>
        }
      />

      <SplitRow
        title="Join a team of visionaries"
        note="Lead with purpose"
        tile="wash"
        photo={{ src: "/media/old/about-us/plant-exterior-wide.webp", alt: "The Aditya Flexipack plant across its lawn near Kanpur" }}
      >
        <p>
          We empower our people to lead with purpose. Our collaborative culture is built on a foundation of continuous learning and
          mentorship, providing you with the tools and support needed to build a career that truly makes an impact.
        </p>
      </SplitRow>

      <section aria-labelledby="life-title" className="pt-[var(--frame)]">
        <div className="panel bg-foil py-[var(--section-y)]">
          <Reveal className="shell">
            <h2 id="life-title" data-reveal className="display max-w-[46rem] text-[clamp(2.6rem,5.6vw,5.6rem)] text-ink">
              Where you would work
            </h2>
            <p data-reveal className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">
              One campus, every layer of the pack
            </p>
            <div data-reveal className="mt-14">
              <FactCards keys={["team", "years", "acres", "solar"]} />
            </div>
          </Reveal>
        </div>
      </section>

      <FormSection
        id="apply"
        title="Apply now"
        note="Attach your resume at the end"
        form="career"
        panel="wash"
        photo={{ src: "/media/old/home/plant-copper-cylinder-engraver.webp", alt: "A copper gravure cylinder on the engraving machine" }}
      >
        <p>Tell us where you work today, the department that interests you and a little about yourself.</p>
      </FormSection>
    </>
  );
}
