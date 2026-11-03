import type { Metadata } from "next";
import { TearStrip } from "@/components/system/TearStrip";
import { AwardsHero } from "@/components/company/awards/AwardsHero";
import { HonoursBoard } from "@/components/company/awards/HonoursBoard";
import { Certificates } from "@/components/company/awards/Certificates";
import { ContactSheet } from "@/components/company/awards/ContactSheet";
import { GROUPS } from "@/components/company/awards/data";
import { pageOf } from "@/content/next";

const PATH = "/awards-recognitions/";

export const metadata: Metadata = {
  title: "Awards and recognitions",
  description:
    "Entrepreneur of the Year twice from two Presidents of India, Parle Gold, ITC Foods, Britannia and BCIC awards, U.P. Government honours, and BRC, HACCP, ISO, VRC and d2w certifications.",
  alternates: { canonical: PATH },
};

/**
 * Awards, "The Honours Board" (docs/inner-pages-creative-direction.md 3.3).
 * Crimson hero, wine board, white certificates, then the evidence on crimson-wash, white and foil, and the ink
 * tear strip to the Gallery. No two neighbours share a field.
 */
export default function AwardsPage() {
  return (
    <>
      <AwardsHero tone={pageOf(PATH).tone} />
      <HonoursBoard />
      <Certificates />
      {GROUPS.map((group) => (
        <ContactSheet key={group.id} group={group} />
      ))}
      <TearStrip from={PATH} />
    </>
  );
}
