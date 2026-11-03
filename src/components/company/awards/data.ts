import { awards, certificates, moreRecognition, type Award } from "@/content/awards";

/** One photograph on a contact sheet: the file, its real pixel size, and the short object caption. */
export type SheetPhoto = Award["photos"][number] & { caption: string };

export type Tally = 1 | 2 | 3;

/** One row on the Honours Board, and the evidence block it jumps to. */
export type Honour = {
  id: string;
  /** Short name, used on the board and over the evidence. */
  title: string;
  /** The awarding body. */
  from: string;
  /** The old page's paragraph, condensed to one short line. Every claim is kept. */
  line: string;
  tally: Tally;
  photos: SheetPhoto[];
};

export type Field = "wash" | "white" | "foil";

export type HonourGroup = {
  id: string;
  /** Evidence section heading. */
  title: string;
  /** The same group's short name on the board. */
  short: string;
  field: Field;
  honours: Honour[];
};

/** What a screen reader hears in place of the tally glyph. */
export const TALLY_WORD: Record<Tally, string> = {
  1: "Awarded once",
  2: "Awarded twice",
  3: "Awarded three times",
};

// Short captions for the photographs; they only name what each object shows.
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

const fileKey = (src: string) => src.split("/").pop()!.replace(".webp", "");
const captioned = (p: Award["photos"][number]): SheetPhoto => ({ ...p, caption: CAPTIONS[fileKey(p.src)] ?? "" });

function photosOf(start: string, extras: string[] = []): SheetPhoto[] {
  const award = awards.find((a) => a.title.startsWith(start));
  if (!award) throw new Error(`No award starting "${start}" in src/content/awards.ts`);
  const more = extras.map((key) => {
    const found = moreRecognition.find((m) => fileKey(m.src) === key);
    if (!found) throw new Error(`No recognition photo "${key}" in src/content/awards.ts`);
    return found;
  });
  return [...award.photos, ...more].map(captioned);
}

/**
 * The nine honours from the old page, in its three groups. The plant-photographed U.P. honours stay beside the
 * U.P. and MSME awards, where the old page placed them.
 */
export const GROUPS: HonourGroup[] = [
  {
    id: "nation",
    title: "From the nation and the state",
    short: "Nation and state",
    field: "wash",
    honours: [
      {
        id: "eoy-india",
        title: "Entrepreneur of the Year (India)",
        from: "Government of India",
        line: "Presented by Presidents Dr. A.P.J. Abdul Kalam and Smt. Pratibha Patil, for outstanding national-level performance.",
        tally: 2,
        photos: photosOf("Entrepreneur of the Year (India)"),
      },
      {
        id: "eoy-up",
        title: "Entrepreneur of the Year (U.P.)",
        from: "Government of Uttar Pradesh",
        line: "Three times, for excellence in entrepreneurship and industrial leadership.",
        tally: 3,
        photos: photosOf("Entrepreneur of the Year (U.P.)", [
          "up-ground-breaking-3-trophy",
          "up-ground-breaking-4-certificate",
          "up-star-category-certificate",
        ]),
      },
      {
        id: "export-up",
        title: "Highest export in plastics (U.P.)",
        from: "Government of Uttar Pradesh",
        line: "From the U.P. State Industry Minister, for the highest export volume in plastics.",
        tally: 1,
        photos: photosOf("Highest export"),
      },
      {
        id: "msme-2019",
        title: "MSME Excellence at Udyam Samaagam 2019",
        from: "Udyam Samaagam",
        line: "Named a Pioneer MSME Supplier in Uttar Pradesh, for contributions to the MSME sector.",
        tally: 1,
        photos: photosOf("MSME Excellence", ["crystal-award"]),
      },
    ],
  },
  {
    id: "brands",
    title: "From the brands we pack for",
    short: "Brands",
    field: "white",
    honours: [
      {
        id: "parle",
        title: "Parle Certificate of Excellence",
        from: "Parle Products",
        line: "Gold category, twice, for consistent high-quality wrappers and polybags.",
        tally: 2,
        photos: photosOf("Parle"),
      },
      {
        id: "itc",
        title: "ITC Foods Division awards",
        from: "ITC Limited",
        line: "Innovation and Contribution awards, twice, for packaging innovation and service delivery.",
        tally: 2,
        photos: photosOf("ITC"),
      },
      {
        id: "britannia",
        title: "Britannia Certificate of Appreciation",
        from: "Britannia Industries",
        line: "COVID-19 support and best partner, for rapid, reliable supply through the pandemic.",
        tally: 1,
        photos: photosOf("Certificate of Appreciation"),
      },
    ],
  },
  {
    id: "industry",
    title: "From industry and the workplace",
    short: "Industry and workplace",
    field: "foil",
    honours: [
      {
        id: "bcic",
        title: "BCIC awards",
        from: "Bangalore Chamber of Industry and Commerce",
        line: "Two awards, for support and collaboration in flexible packaging.",
        tally: 2,
        photos: photosOf("Bangalore Chamber"),
      },
      {
        id: "employer-2018",
        title: "Best Employer Brand 2018",
        from: "Business Standard",
        line: "A top employer, for a positive, high-performance workplace culture.",
        tally: 1,
        photos: photosOf("Best Employer"),
      },
    ],
  },
];

// The five certificates from the old page, each claim cut to one short line.
const CERT_LINES: Record<string, string> = {
  "BRC Global Standards": "Food safety, packaging quality and legal compliance.",
  "VRC Quality Excellence": "Consistent quality and robust operations.",
  d2w: "Oxo-biodegradable packaging that supports sustainability.",
  "HACCP certified": "Hazard analysis and critical control points for safe production.",
  "ISO certified company": "Global management and quality system standards.",
};

export const CERTS = certificates.map((c) => ({ ...c, line: CERT_LINES[c.name] ?? c.body }));

export const tallyGlyph = (n: number) => `×${n}`;
