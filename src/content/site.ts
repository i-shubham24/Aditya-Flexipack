export const site = {
  name: "Aditya Flexipack",
  legalName: "Aditya Flexipack Private Limited",
  tagline: "Quality is our Identity",
  url: "https://www.adityaflexipack.com",
  description:
    "Aditya Flexipack engineers high-performance, sustainable flexible packaging for India's leading food and FMCG brands: laminates, pouches, films, inks, gravure cylinders and polybags, made on one 18-acre campus near Kanpur.",
  footerLine:
    "Engineering a greener future with performance-driven and sustainable packaging solutions for India's leading food brands.",
  email: "info@adityaflexipack.com",
  emailAlt: "adityaflexipack@adityaflexipack.com",
  phone: "+91-512-2237156",
  phoneHref: "tel:+915122237156",
  plant: {
    label: "Plant and registered office",
    lines: ["Gata No. 445 Kha, Rania", "Fatehpur Roshnai, Kanpur Dehat", "Uttar Pradesh 209304, India"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Aditya+Flexipack+Private+Limited&query_place_id=ChIJEfFGUqRLnDkR-vcVebvogvQ",
    geo: { lat: 26.416043, lng: 80.1188684 },
  },
  cityOffice: {
    label: "City office",
    lines: ["22-B-1, Dada Nagar", "Kanpur 208022, India"],
  },
  social: {
    facebook: "https://www.facebook.com/adityaflexipack",
    linkedin: "https://www.linkedin.com/company/aditya-flexipack-pvt-ltd/",
  },
  cin: "U21095UP2019PTC123405",
} as const;

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { label: string; href: string; children?: NavLink[] };

export const nav: NavGroup[] = [
  {
    label: "About",
    href: "/about-us/",
    children: [
      { label: "Our story", href: "/about-us/", note: "25+ years, one integrated campus" },
      { label: "Our offerings", href: "/offerings/", note: "What we pack, aisle by aisle" },
      { label: "Awards & recognitions", href: "/awards-recognitions/", note: "Certificates and honours" },
      { label: "Sustainability", href: "/sustainability/", note: "Solar, water, recycling, pyrolysis" },
      { label: "Gallery", href: "/gallery/", note: "Moments from the journey" },
    ],
  },
  {
    label: "Products",
    href: "/products/",
    children: [
      { label: "Laminates", href: "/products/laminates/", note: "Multi-layer barrier structures" },
      { label: "Pouches", href: "/products/pouches/", note: "Stand-up, shaped, liquid, seal types" },
      { label: "Films", href: "/products/films/", note: "CPP, metallised and blown films" },
      { label: "Inks", href: "/products/inks/", note: "PU, NTNK, ARSR and water-based" },
      { label: "Cylinders", href: "/products/cylinders/", note: "Gravure, prepress to engraving" },
      { label: "Polybags", href: "/products/polybags/", note: "3-side seal, up to 120 micron" },
    ],
  },
  { label: "Career", href: "/career/" },
  {
    label: "Partner",
    href: "/packaging-partnership/",
    children: [
      { label: "Packaging partnership", href: "/packaging-partnership/", note: "For brands that need packaging" },
      { label: "Vendor partnership", href: "/vendor-partnership/", note: "For suppliers to our plant" },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Organisation",
    links: [
      { label: "Our story", href: "/about-us/" },
      { label: "Our offerings", href: "/offerings/" },
      { label: "Sustainability", href: "/sustainability/" },
      { label: "Awards & recognitions", href: "/awards-recognitions/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Career", href: "/career/" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Laminates", href: "/products/laminates/" },
      { label: "Pouches", href: "/products/pouches/" },
      { label: "Films", href: "/products/films/" },
      { label: "Inks", href: "/products/inks/" },
      { label: "Cylinders", href: "/products/cylinders/" },
      { label: "Polybags", href: "/products/polybags/" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Contact us", href: "/contact-us/" },
      { label: "Packaging partnership", href: "/packaging-partnership/" },
      { label: "Vendor partnership", href: "/vendor-partnership/" },
      { label: "Terms & conditions", href: "/terms-conditions/" },
      { label: "Privacy policy", href: "/privacy-policy/" },
    ],
  },
];

/** Figures the client publishes on its own site today (kept for parity). */
export const facts = {
  capacity: { value: "4,000", unit: "MT / month", label: "Laminates production capacity" },
  annual: { value: "48,000", unit: "tons / year", label: "Annual production capacity" },
  acres: { value: "18", unit: "acres", label: "Campus on the Kolkata to Delhi highway (NH-2), 15 km from Kanpur" },
  team: { value: "500+", unit: "people", label: "Skilled professionals" },
  years: { value: "25+", unit: "years", label: "Of flexible packaging expertise" },
  solar: { value: "1.35", unit: "MW", label: "Solar power installed" },
  rainwater: { value: "3", unit: "systems", label: "Rainwater harvesting" },
  partners: { value: "10+", unit: "FMCG firms", label: "Trusted partners from FMCG firms" },
} as const;

export const compliance = [
  "BRCGS Issue 7, Grade A",
  "SEDEX / SMETA 7 (4-pillar)",
  "HACCP certified",
  "ISO 22000:2018 (ink unit)",
  "Fire safety regulations",
] as const;
