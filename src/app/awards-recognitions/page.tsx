import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaPanel } from "@/components/page/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { CertificateSeals } from "@/components/about/CertificateSeals";
import { AwardGroup, type Entry, type Print } from "@/components/about/AwardWall";
import { awards, moreRecognition, type Award } from "@/content/awards";

export const metadata: Metadata = {
  title: "Awards and recognitions",
  description:
    "Entrepreneur of the Year twice from two Presidents of India, Parle Gold, ITC Foods, Britannia and BCIC awards, U.P. Government honours, and BRC, HACCP, ISO, VRC and d2w certifications.",
  alternates: { canonical: "/awards-recognitions/" },
};

// Short handwritten captions for the prints; they only name what each object shows.
const CAPTIONS: Record<string, string> = {
  "award-apj-abdul-kalam": "With Dr. A.P.J. Abdul Kalam",
  "award-pratibha-patil": "With Smt. Pratibha Patil",
  "parle-excellence-2014": "Excellence, 2014",
  "parle-excellence-2011": "Excellence, 2011",
  "parle-trophy": "Polybags and wrappers",
  "itc-foods-appreciation": "Appreciation, 2021",
  "itc-enduring-value-trophy": "Enduring Value",
  "britannia-covid-appreciation": "COVID-19 partnership",
  "britannia-brit-best": "Brit Best, FY 2022-23",
  "britannia-innovation-day": "Innovation Day, 2018",
  "bcic-plaque": "BCIC, 2017",
  "bcic-plaque-framed": "BCIC plaque",
  "up-export-award": "Export award, 2009-10",
  "best-employer-brand-certificate": "Best Employer Brand 2018",
  "best-employer-brand-trophy": "The trophy",
  "up-ground-breaking-3-trophy": "Ground Breaking 3.0",
  "up-ground-breaking-4-certificate": "Ground Breaking 4.0, 2024",
  "up-star-category-certificate": "Star category",
  "crystal-award": "U.P. crystal",
};

const name = (src: string) => src.split("/").pop()!.replace(".webp", "");
const print = (p: Award["photos"][number]): Print => ({ ...p, caption: CAPTIONS[name(p.src)] ?? "" });
const find = (start: string) => awards.find((a) => a.title.startsWith(start))!;
const extra = (key: string) => moreRecognition.find((m) => name(m.src) === key)!;
const entry = (a: Award, add: Award["photos"] = []): Entry => ({ title: a.title, by: a.by, body: a.body, prints: [...a.photos, ...add].map(print) });

// The old page placed these plant-photographed honours beside the U.P. and MSME awards; they stay with them here.
const NATION: Entry[] = [
  entry(find("Entrepreneur of the Year (India)")),
  entry(find("Entrepreneur of the Year (U.P.)"), [extra("up-ground-breaking-3-trophy"), extra("up-ground-breaking-4-certificate"), extra("up-star-category-certificate")]),
  entry(find("Highest export")),
  entry(find("MSME Excellence"), [extra("crystal-award")]),
];
const BRANDS: Entry[] = [entry(find("Parle")), entry(find("ITC")), entry(find("Certificate of Appreciation"))];
const INDUSTRY: Entry[] = [entry(find("Bangalore Chamber")), entry(find("Best Employer"))];

export default function AwardsPage() {
  return (
    <>
      <PageHero
        tone="crimson"
        title="Celebrating excellence in sustainable packaging"
        note="Awards and achievements"
        intro="Accolades from leading clients, commendations from two Past Presidents of India and multiple awards from the Government of Uttar Pradesh, for entrepreneurial excellence and innovation."
        photos={[
          { src: "/media/awards/parle-trophy.webp", alt: "Parle trophy for printed wrappers and polybags supply" },
          { src: "/media/awards/award-apj-abdul-kalam.webp", alt: "Dr. A.P.J. Abdul Kalam presenting the Entrepreneur of the Year award" },
        ]}
        actions={
          <ButtonLink href="/about-us/" tone="white">
            Our story
          </ButtonLink>
        }
      />

      <CertificateSeals />

      <AwardGroup id="nation-title" title="Honours from the nation and the state" note="Presidents of India and the U.P. Government" entries={NATION} table="wash" />

      <AwardGroup id="brands-title" title="From the brands we pack for" note="Parle, ITC and Britannia" entries={BRANDS} panel="wash" table="foil" />

      <AwardGroup id="industry-title" title="From industry and the workplace" note="BCIC and Business Standard" entries={INDUSTRY} table="blush" />

      <CtaPanel />
    </>
  );
}
