import { awards, moreRecognition, type Award } from "@/content/awards";

/** One photograph on a contact sheet: the file, its real pixel size, and the short object caption. */
export type SheetPhoto = Award["photos"][number] & { caption: string };

export type Tally = 1 | 2 | 3;

/** One row on the Honours Board, and the evidence block it jumps to. */
export type Honour = {
  id: string;
  /** The short name the board carries (docs/inner-pages-creative-direction.md 3.3). */
  board: string;
  /** The awarding body, as the board shows it. */
  from: string;
  tally: Tally;
  award: Award;
  photos: SheetPhoto[];
};

export type Field = "wash" | "white" | "foil";

export type HonourGroup = {
  id: string;
  title: string;
  standfirst: string;
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

function award(start: string): Award {
  const found = awards.find((a) => a.title.startsWith(start));
  if (!found) throw new Error(`No award starting "${start}" in src/content/awards.ts`);
  return found;
}

function extra(key: string) {
  const found = moreRecognition.find((m) => fileKey(m.src) === key);
  if (!found) throw new Error(`No recognition photo "${key}" in src/content/awards.ts`);
  return found;
}

function honour(id: string, board: string, from: string, tally: Tally, start: string, extras: string[] = []): Honour {
  const a = award(start);
  return { id, board, from, tally, award: a, photos: [...a.photos, ...extras.map(extra)].map(captioned) };
}

/**
 * The nine honours in the three groups the old page used. The plant-photographed U.P. honours stay beside the
 * U.P. and MSME awards, where the old page placed them.
 */
export const GROUPS: HonourGroup[] = [
  {
    id: "nation",
    title: "Honours from the nation and the state",
    standfirst: "Presidents of India and the U.P. Government",
    field: "wash",
    honours: [
      honour("eoy-india", "Entrepreneur of the Year (India)", "Government of India", 2, "Entrepreneur of the Year (India)"),
      honour("eoy-up", "Entrepreneur of the Year (U.P.)", "Government of Uttar Pradesh", 3, "Entrepreneur of the Year (U.P.)", [
        "up-ground-breaking-3-trophy",
        "up-ground-breaking-4-certificate",
        "up-star-category-certificate",
      ]),
      honour("export-up", "Highest export in plastics (U.P.)", "Government of Uttar Pradesh", 1, "Highest export"),
      honour("msme-2019", "MSME Excellence at Udyam Samaagam 2019", "Udyam Samaagam", 1, "MSME Excellence", ["crystal-award"]),
    ],
  },
  {
    id: "brands",
    title: "From the brands we pack for",
    standfirst: "Parle, ITC and Britannia",
    field: "white",
    honours: [
      honour("parle", "Parle Certificate of Excellence", "Parle Products", 2, "Parle"),
      honour("itc", "ITC Foods Division awards", "ITC Limited", 2, "ITC"),
      honour("britannia", "Britannia Certificate of Appreciation", "Britannia Industries", 1, "Certificate of Appreciation"),
    ],
  },
  {
    id: "industry",
    title: "From industry and the workplace",
    standfirst: "BCIC and Business Standard",
    field: "foil",
    honours: [
      honour("bcic", "BCIC awards", "Bangalore Chamber of Industry and Commerce", 2, "Bangalore Chamber"),
      honour("employer-2018", "Best Employer Brand 2018", "Business Standard", 1, "Best Employer"),
    ],
  },
];
