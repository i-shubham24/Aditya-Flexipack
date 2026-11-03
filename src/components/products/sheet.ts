import type { ProductSlug } from "@/content/products";
import type { Tone } from "@/components/system/tones";
import type { Ratio } from "@/components/system/PhotoFrame";

/** A real photograph, with the caption that says what it shows (docs/old-site-media.md). */
export type Photo = { src: string; alt: string; caption: string };

/**
 * Where a photo sits beside its copy. 648 px plant photos never go wider than four columns (`quarter`, 9-12);
 * larger sources may take `side` (8-12); wide banners run `wide` under the copy at 21:9.
 */
export type PhotoSlot = { photo: Photo; ratio: Ratio; fit: "quarter" | "side" | "wide" };

/**
 * The page sequence around each product's centrepiece. Centrepieces sit on the white sheet, so the block before
 * them (the About panel, or the hero on Films) and the block after them (a list panel, or the tear strip) are
 * colour fields, and no two neighbours share one.
 */
export type ProductSheet = {
  hero: Omit<Photo, "caption">;
  /** Films has none: its copy is the Three Dies' header, so the centrepiece follows the hero. */
  about?: PhotoSlot & { field: Tone };
  /** The product's other list after the centrepiece (Films has its three film lines instead). */
  list?: PhotoSlot & { field: Tone; source: "extra" | "offerings"; title: string };
  /** The matching "Product requirement" option on the packaging partnership form. */
  need: string;
};

const P = {
  laminateRoller: {
    src: "/media/old/home/photo-laminate-film-roller.webp",
    alt: "Clear laminate film wound round a roller, with blurred blue machinery behind",
  },
  laminatorUnwind: {
    src: "/media/old/home/plant-laminator-unwind-s575.webp",
    alt: "Laminator unwind stand labelled S-575, with its touchscreen and a roll of white film",
    caption: "The S-575 laminator unwind stand at our plant, with a roll of white film.",
  },
  pouchRange: {
    src: "/media/old/products-pouches/photo-pouch-range-autumn.webp",
    alt: "White, silver foil and kraft pouches, spouted, stand-up and flat-bottom, on a round wooden stand",
  },
  foilPouches: {
    src: "/media/products/pouch-lineup.webp",
    alt: "Flexible stand-up and zipper pouches engineered for food barrier protection",
    caption: "Stand-up, side-gusset and zipper barrier pouches.",
  },
  perfast: {
    src: "/media/old/home/plant-super-perfast-machine.webp",
    alt: "Red and steel machine labelled SUPER PERFAST, with a touchscreen, in a white tiled room",
    caption: "The machine labelled SUPER PERFAST, in a white tiled room at our plant.",
  },
  slittingRolls: {
    src: "/media/old/products-films/banner-film-slitting-rolls.webp",
    alt: "Narrow rolls of metallised film on a slitter rewinder shaft",
  },
  inkRoller: {
    src: "/media/old/products-inks/banner-yellow-ink-roller.webp",
    alt: "Yellow ink being fed onto a printing roller, close up",
  },
  inkStirring: {
    src: "/media/old/home/photo-blue-ink-stirring.webp",
    alt: "Blue ink swirled with a yellow streak by a metal stirring rod",
    caption: "Blue ink swirled with yellow by a stirring rod.",
  },
  inkPots: {
    src: "/media/old/products-inks/photo-ink-pots-printing-unit.webp",
    alt: "Blue, red and yellow ink pots sitting in the inking unit of a printing press",
    caption: "Blue, red and yellow ink pots in the inking unit of a press.",
  },
  engraver: {
    src: "/media/old/home/plant-copper-cylinder-engraver.webp",
    alt: "Copper-plated gravure cylinder mounted on an engraving machine",
  },
  cylindersClose: {
    src: "/media/old/products-cylinders/photo-cylinders-printed-film-close.webp",
    alt: "Close-up of chrome cylinders carrying printed film strips with green and yellow labels",
    caption: "Chrome cylinders carrying printed film.",
  },
  engraverWide: {
    src: "/media/old/home/plant-copper-cylinder-engraver-wide.webp",
    alt: "Cylinder engraving machine with a copper cylinder, the operator's monitor and bright windows",
    caption: "The cylinder engraving machine at our plant, with a copper cylinder in place.",
  },
  polybagRoll: {
    src: "/media/old/products-polybags/photo-polybag-film-roll.webp",
    alt: "Large wound roll of clear polyethylene film on a pallet in the factory",
  },
  polybagRolls: {
    src: "/media/old/products-polybags/banner-film-rolls-blue-tint.webp",
    alt: "Clear polyethylene film rolls and rollers on a converting machine, in blue light",
    caption: "Clear polyethylene film rolls on a converting machine.",
  },
} as const;

export const sheets: Record<ProductSlug, ProductSheet> = {
  laminates: {
    hero: P.laminateRoller,
    about: { photo: P.laminatorUnwind, ratio: "1:1", fit: "quarter", field: "foil" },
    need: "Laminate",
  },
  pouches: {
    hero: P.pouchRange,
    about: { photo: P.foilPouches, ratio: "4:3", fit: "side", field: "wash" },
    list: { photo: P.perfast, ratio: "4:5", fit: "quarter", field: "foil", source: "extra", title: "Our machines' capabilities" },
    need: "Pouches",
  },
  films: {
    hero: P.slittingRolls,
    need: "CPP films",
  },
  inks: {
    hero: P.inkRoller,
    about: { photo: P.inkStirring, ratio: "4:5", fit: "side", field: "foil" },
    list: { photo: P.inkPots, ratio: "4:3", fit: "quarter", field: "wash", source: "extra", title: "Key features" },
    need: "Inks",
  },
  cylinders: {
    hero: P.engraver,
    about: { photo: P.cylindersClose, ratio: "4:3", fit: "side", field: "foil" },
    list: { photo: P.engraverWide, ratio: "1:1", fit: "quarter", field: "wash", source: "offerings", title: "Our offering" },
    need: "Cylinders",
  },
  polybags: {
    hero: P.polybagRoll,
    about: { photo: P.polybagRolls, ratio: "16:9", fit: "side", field: "foil" },
    need: "Laddi pack / polybag",
  },
};

/** The film lines' own photographs (Films page). */
export const filmPhotos: Record<string, Photo[]> = {
  cpp: [P.laminatorUnwind],
  metallised: [{ ...P.slittingRolls, caption: "Narrow rolls of metallised film on a slitter rewinder shaft." }],
  blown: [
    {
      src: "/media/old/gallery/plant-blown-film-tower-stairs.webp",
      alt: "Blown film extrusion tower with blue and cream stairways and a plastic curtain",
      caption: "A blown film tower at our plant, with its stairways.",
    },
    {
      src: "/media/old/home/plant-blown-film-tower-close.webp",
      alt: "Blown film tower seen from below, with blue handrails and a MAGNATE nameplate",
      caption: "A blown film tower seen from below, with its MAGNATE nameplate.",
    },
  ],
};
