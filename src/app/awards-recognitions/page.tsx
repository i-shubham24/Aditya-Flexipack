import type { Metadata } from "next";
import { TearStrip } from "@/components/system/TearStrip";
import { AwardsHero } from "@/components/company/awards/AwardsHero";
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

export default function AwardsPage() {
  return (
    <>
      <AwardsHero tone={pageOf(PATH).tone} />
      {GROUPS.map((group) => (
        <ContactSheet key={group.id} group={group} />
      ))}
      <TearStrip from={PATH} />
    </>
  );
}
