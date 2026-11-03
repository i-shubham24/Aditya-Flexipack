import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SplitRow } from "@/components/page/SplitRow";
import { CtaPanel } from "@/components/page/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Initiatives } from "@/components/about/Initiatives";
import { CeoMessage } from "@/components/about/CeoMessage";
import { ClosingLines } from "@/components/about/ClosingLines";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "1.35 MW of solar power, three rainwater harvesting systems, a recycling plant with three-stage pyrolysis and post-industrial recycled materials on request: sustainability at the core of Aditya Flexipack.",
  alternates: { canonical: "/sustainability/" },
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        tone="foil"
        title="Sustainability at the core of our packaging solutions"
        note="A lighter footprint for every pack"
        intro="As a responsible flexible packaging company, we believe innovation must go hand in hand with environmental responsibility. Our approach is built on actionable practices, clean energy and circular economy principles, so that every package has a lighter footprint on the planet."
        photos={[
          { src: "/media/old/home/photo-eco-pouch-shopping-basket.webp", alt: "Hands holding a printed kraft pouch over a shopping basket" },
          { src: "/media/old/sustainability/mockup-kraft-bag-eco-friendly.webp", alt: "Kraft paper bag printed Eco Friendly Packets with the Aditya Flexipack mark" },
        ]}
        actions={
          <>
            <ButtonLink href="/packaging-partnership/" tone="crimson">
              Talk to us about recyclable packs
            </ButtonLink>
          </>
        }
      />

      <Initiatives />

      <CeoMessage />

      <SplitRow
        title="Our eco-friendly approach"
        note="Moving towards a greener tomorrow"
        tile="wash"
        photo={{ src: "/media/old/about-us/photo-seedling-in-hand.webp", alt: "A hand holding a young seedling in soil", ratio: "aspect-[2000/672]" }}
      >
        <p>
          Sustainability is not a trend for us. It is a responsibility. From resource conservation to energy efficiency and
          responsible material usage, we are committed to redefining flexible packaging through greener practices that benefit both
          our clients and the environment.
        </p>
      </SplitRow>

      <ClosingLines />

      <CtaPanel />
    </>
  );
}
