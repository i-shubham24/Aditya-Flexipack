import type { Tone } from "@/components/system/tones";

export type PageLink = { href: string; title: string; note: string; tone: Tone };

/**
 * Every inner page's own field colour and where its tear strip leads. Four loops, so a visitor always has a
 * next step in the part of the site they are in, and neighbouring pages never share a colour.
 */
const PAGES: Record<string, PageLink> = {
  "/about-us/": { href: "/about-us/", title: "Our story", note: "25+ years, one integrated campus", tone: "wine" },
  "/sustainability/": { href: "/sustainability/", title: "Sustainability", note: "Solar, water, recycling, pyrolysis", tone: "foil" },
  "/awards-recognitions/": { href: "/awards-recognitions/", title: "Awards and recognitions", note: "Certificates and honours", tone: "crimson" },
  "/gallery/": { href: "/gallery/", title: "Gallery", note: "Moments from the journey", tone: "ink" },
  "/career/": { href: "/career/", title: "Career", note: "Grow with 500+ skilled professionals", tone: "blush" },

  "/products/": { href: "/products/", title: "Products", note: "Six product lines, made under one roof", tone: "wash" },
  "/products/laminates/": { href: "/products/laminates/", title: "Laminates", note: "Multi-layer barrier structures", tone: "crimson" },
  "/products/pouches/": { href: "/products/pouches/", title: "Pouches", note: "Stand-up, shaped, liquid, seal types", tone: "foil" },
  "/products/films/": { href: "/products/films/", title: "Films", note: "CPP, metallised and blown films", tone: "wine" },
  "/products/inks/": { href: "/products/inks/", title: "Inks", note: "PU, NTNK, ARSR and water-based", tone: "blush" },
  "/products/cylinders/": { href: "/products/cylinders/", title: "Cylinders", note: "Gravure, prepress to engraving", tone: "ink" },
  "/products/polybags/": { href: "/products/polybags/", title: "Polybags", note: "3-side seal, up to 120 micron", tone: "deep" },
  "/offerings/": { href: "/offerings/", title: "Our offerings", note: "What we pack, aisle by aisle", tone: "foil" },

  "/packaging-partnership/": { href: "/packaging-partnership/", title: "Packaging partnership", note: "For brands that need packaging", tone: "ink" },
  "/vendor-partnership/": { href: "/vendor-partnership/", title: "Vendor partnership", note: "For suppliers to our plant", tone: "wine" },
  "/contact-us/": { href: "/contact-us/", title: "Contact us", note: "Plant at Rania, city office in Kanpur", tone: "crimson" },

  "/privacy-policy/": { href: "/privacy-policy/", title: "Privacy policy", note: "How we handle your information", tone: "foil" },
  "/terms-conditions/": { href: "/terms-conditions/", title: "Terms and conditions", note: "The terms of using this website", tone: "wash" },
};

const LOOPS = [
  ["/about-us/", "/sustainability/", "/awards-recognitions/", "/gallery/", "/career/"],
  ["/products/", "/products/laminates/", "/products/pouches/", "/products/films/", "/products/inks/", "/products/cylinders/", "/products/polybags/", "/offerings/"],
  ["/packaging-partnership/", "/vendor-partnership/", "/contact-us/"],
  ["/privacy-policy/", "/terms-conditions/"],
];

export const pageOf = (path: string) => PAGES[path];

export function nextPage(path: string): PageLink | undefined {
  for (const loop of LOOPS) {
    const i = loop.indexOf(path);
    if (i >= 0) return PAGES[loop[(i + 1) % loop.length]];
  }
}
