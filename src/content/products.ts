export type ProductSlug = "laminates" | "pouches" | "films" | "inks" | "cylinders" | "polybags";

export type Feature = { title: string; body?: string };

export type FilmLine = {
  id: string;
  name: string;
  intro: string[];
  offerings: string[];
  featuresTitle?: string;
  features?: string[];
  advantages: Feature[];
};

/** One cell of a range hero's spec strip: a short value and what it means, both taken from the product's own copy. */
export type GlanceFact = { value: string; label: string };

export type Product = {
  slug: ProductSlug;
  name: string;
  lead: string;
  summary: string;
  headline: string;
  body: string[];
  offeringsTitle: string;
  offerings: string[];
  solutionsTitle?: string;
  solutions?: Feature[];
  extraTitle?: string;
  extra?: string[];
  photo: { src: string; alt: string };
  films?: FilmLine[];
  /** Four key facts for the hero spec strip, each drawn from this product's copy on the old site. */
  glance: GlanceFact[];
};

export const products: Product[] = [
  {
    slug: "laminates",
    name: "Laminates",
    lead: "Engineered multi-layer laminates that protect, preserve, and elevate your brand story.",
    summary:
      "Multi-layer structures that deliver barrier performance, product longevity and a powerful canvas for your brand.",
    headline: "Premium laminates for durable, versatile packaging",
    body: [
      "Our laminates are designed as a strategic asset for your brand. We engineer multi-layer structures that deliver more than protection: unparalleled barrier performance, product longevity, and a powerful canvas for brand storytelling.",
    ],
    offeringsTitle: "Our offering",
    offerings: [
      "High-dart laminates",
      "Micro-perforation laminates",
      "High-puncture-resistant laminates",
      "High-barrier laminates",
      "Extrusion-based laminates",
      "Paper-based laminates",
      "Foil-based laminates",
      "Adhesive-based laminates",
      "Single-layer surface-printed products",
      "Mono-structured laminates",
    ],
    solutionsTitle: "Our laminate solutions",
    solutions: [
      { title: "High dart laminated films", body: "Ultimate impact resistance for products requiring maximum protection." },
      { title: "Micro perforation laminates", body: "Designed for optimal breathability, maintaining product freshness and quality." },
      { title: "High puncture resistant laminates", body: "Engineered for heavy-duty contents, offering unmatched durability and product integrity." },
      { title: "High barrier laminates", body: "Superior aroma retention that extends product shelf life for maximum freshness." },
      { title: "Extrusion based laminates", body: "A lightweight yet robust solution offering exceptional strength and flexibility." },
      { title: "Paper and foil based laminates", body: "A sustainable choice that provides a high-end feel with excellent barrier properties." },
      { title: "Adhesive based laminates", body: "Custom-engineered for seamless application and a strong, lasting bond." },
      { title: "Single layer surface printed products", body: "High-impact graphics and a clean, modern aesthetic." },
      { title: "Mono structured", body: "Ideal for recycling." },
    ],
    glance: [
      { value: "10", label: "laminate structures, from high-dart to mono-structured" },
      { value: "High barrier", label: "superior aroma retention for a longer shelf life" },
      { value: "Mono", label: "structured laminates, ideal for recycling" },
      { value: "4,000 MT", label: "laminates production capacity every month" },
    ],
    photo: { src: "/media/plant/laminator-unwind.webp", alt: "Printed film rolls on a laminator unwind stand at the Aditya Flexipack plant" },
  },
  {
    slug: "pouches",
    name: "Pouches",
    lead: "Customisable pouches engineered to provide superior protection while creating a powerful brand presence.",
    summary: "A blend of robust engineering and modern style that gives your product a commanding presence on the shelf.",
    headline: "Packaging that protects and promotes",
    body: [
      "Our pouches are a custom-designed blend of robust engineering and modern style. More than a protective layer, they provide a sleek, high-impact surface for your brand, guaranteeing your product a commanding presence on the shelf.",
    ],
    offeringsTitle: "Our offering",
    offerings: [
      "Shaped pouches",
      "Liquid pouches",
      "Centre seal pouches",
      "Side seal pouches",
      "Three side seal pouches",
      "Stand-up pouches",
      "High barrier pouches",
    ],
    extraTitle: "Our machines' capabilities include",
    extra: [
      "An auto detection system that minimises errors and waste",
      "High-speed production without compromising seal strength",
      "Superior pouch consistency with perfect shape and finish",
      "Reliable operation with minimal downtime",
    ],
    glance: [
      { value: "7", label: "pouch formats, from shaped to stand-up" },
      { value: "Auto detection", label: "a system that minimises errors and waste" },
      { value: "High speed", label: "production without compromising seal strength" },
      { value: "Liquid", label: "pouches, alongside shaped and high-barrier formats" },
    ],
    photo: { src: "/media/plant/pouch-machine.webp", alt: "Pouch-making machine on the Aditya Flexipack production floor" },
  },
  {
    slug: "films",
    name: "Films",
    lead: "A blend of versatility and advanced science, crafted for superior strength, clarity and barrier protection.",
    summary: "CPP, metallised and 3, 5 and 7-layer blown films: the foundation of every structure we build.",
    headline: "The foundation of our packaging",
    body: [
      "Our films are a blend of versatility and advanced science, crafted to provide superior strength, clarity, and barrier protection for your products.",
    ],
    offeringsTitle: "Three film lines",
    offerings: ["CPP film", "Metallised film", "Blown film"],
    glance: [
      { value: "3 lines", label: "CPP, metallised and blown film" },
      { value: "7, 5 and 3", label: "layer blown films on multiple lines" },
      { value: "Hawk-Eye", label: "inspection on our metalliser" },
      { value: "OD", label: "optical density measurement for precise barrier control" },
    ],
    photo: { src: "/media/plant/blown-film-tower.webp", alt: "Blown film tower at the Aditya Flexipack plant" },
    films: [
      {
        id: "cpp",
        name: "CPP film",
        intro: [
          "Cast polypropylene (CPP) films are widely used in flexible packaging for their excellent heat sealability, high clarity and robust mechanical properties. Our CPP line lets us make custom solutions for different laminates.",
        ],
        offerings: [
          "High metal bond, high barrier metallised CPP",
          "Extrusion grade CPP with zero metal failure",
          "High dart CPP",
          "Opaque CPP",
          "Transparent CPP",
          "General grade CPP",
        ],
        featuresTitle: "Our CPP film features",
        features: [
          "Superior heat seal strength for efficient, high-speed packaging",
          "High optical clarity and gloss for enhanced product visibility",
          "Excellent impact and puncture resistance",
          "Recyclability for mono-material laminates",
        ],
        advantages: [
          { title: "Durability and strength", body: "Engineered to protect your products against punctures and tears." },
          { title: "Optical clarity", body: "Excellent transparency that enhances your product's visibility and appeal." },
          { title: "Exceptional barrier", body: "High-barrier properties that protect against moisture and oxygen." },
        ],
      },
      {
        id: "metallised",
        name: "Metallised film",
        intro: [
          "Our metallised film products are ideal for extending shelf life in high-performance packaging. Our metalliser is equipped with Hawk-Eye inspection to enhance product quality.",
        ],
        offerings: [
          "High barrier metallised CPP film",
          "High barrier metallised PE film",
          "General grade metallised CPP film",
          "General grade metallised PE film",
        ],
        featuresTitle: "Our metallised products",
        features: [
          "Enhanced barrier properties (moisture, oxygen, light) and visual appeal",
          "Strong metal adhesion",
          "Advanced technology for uniform aluminium deposition",
          "Optical density (OD) measurement for precise barrier control",
        ],
        advantages: [
          { title: "Durability and strength", body: "Engineered to protect your products against punctures and tears." },
          { title: "Exceptional barrier", body: "High-barrier properties that protect against moisture and oxygen." },
          { title: "High bare-metal bond adhesion", body: "Strong bare-metal bond adhesion in metallised film." },
        ],
      },
      {
        id: "blown",
        name: "Blown film",
        intro: [
          "Blown film is made by extruding molten polymer through a circular die and expanding it with air pressure into a bubble, which is cooled to set the film at the desired dimensions. Much of adhesive-laminated packaging depends on blown film for its shine.",
          "Ink makers send their inks through blown film trials too, so that the ink used in flexible packaging reflects well and looks attractive on the shelf.",
          "We run multiple blown film lines producing 7-layer, 5-layer and 3-layer films. Every machine has an auto gauge controller and automatic mixing and feeding with a Plast-Control system.",
        ],
        offerings: [
          "Transparent films and shrink films",
          "Transparent polyethylene films",
          "Opaque polyethylene films",
          "High-dart and high-puncture polyethylene films",
          "Metallised polyethylene films",
          "Label-grade easy-tear film",
          "Collation packs",
          "Overwraps",
        ],
        advantages: [
          { title: "Durability and strength", body: "Engineered to protect your products against punctures and tears." },
          { title: "Optical clarity", body: "Excellent transparency that enhances your product's visibility and appeal." },
          { title: "Exceptional barrier", body: "High-barrier properties that protect against moisture and oxygen." },
        ],
      },
    ],
  },
  {
    slug: "inks",
    name: "Inks",
    lead: "Advanced inks for flawless print quality, capturing your brand's vision with vibrancy and clarity.",
    summary: "PU, non-toluene non-ketone, ARSR and water-based inks from our ISO 22000:2018 certified sister concern.",
    headline: "Engineered for impact",
    body: [
      "Our ISO 22000:2018 certified sister concern manufactures high-performance inks designed for the flexible packaging industry. The portfolio covers PU, non-toluene, non-ketone, ARSR and water-based inks to serve a wide range of applications.",
    ],
    offeringsTitle: "Our offering",
    offerings: [
      "Inks engineered for print consistency and lamination integrity",
      "Compliance with regulatory standards",
      "Strong adhesion and high-speed press stability",
      "Vibrant colours for superior shelf appeal",
      "Advanced formulations with strict quality control",
      "Enhanced production efficiency and product reliability",
    ],
    extraTitle: "Key features",
    extra: [
      "Specialised non-toluene and non-ketone (NTNK) inks",
      "Gravure-optimised",
      "Compatible with all lamination processes, including solvent-free systems",
      "Superior bond strength",
    ],
    glance: [
      { value: "ISO 22000", label: "2018 certified sister concern manufactures our inks" },
      { value: "NTNK", label: "specialised non-toluene, non-ketone inks" },
      { value: "Gravure", label: "optimised, with high-speed press stability" },
      { value: "All lamination", label: "processes compatible, including solvent-free systems" },
    ],
    photo: { src: "/media/plant/printed-web-rewind.webp", alt: "Printed film rewinding on a press at the Aditya Flexipack plant" },
  },
  {
    slug: "cylinders",
    name: "Cylinders",
    lead: "High-precision engraved cylinders, the foundation of exceptional print quality.",
    summary: "Gravure cylinders engineered for precision, durability and repeatability, from prepress to re-engraving.",
    headline: "Engineered for flawless reproduction",
    body: [
      "Gravure cylinders are the backbone of high-quality flexible packaging. Ours are engineered for precision, durability, and repeatability, ensuring consistent reproduction across long production runs and diverse substrates.",
    ],
    offeringsTitle: "Our offering",
    offerings: [
      "A complete workflow, from prepress to production",
      "Precision in colour, tone and registration",
      "High-runnability, efficient printing cylinders",
      "Technical excellence for superior packaging",
    ],
    extraTitle: "Why our cylinders",
    extra: ["Micro-precision engraving", "Robust base construction", "Specialised coatings and geometry", "Re-engraving processes"],
    glance: [
      { value: "Prepress", label: "to production, one complete workflow" },
      { value: "Micro", label: "precision engraving for colour, tone and registration" },
      { value: "Coatings", label: "specialised coatings and geometry" },
      { value: "Re-engraving", label: "processes alongside micro-precision engraving" },
    ],
    photo: { src: "/media/plant/cylinder-engraver.webp", alt: "Copper gravure cylinder on an engraving machine at the Aditya Flexipack plant" },
  },
  {
    slug: "polybags",
    name: "Polybags",
    lead: "Strength and flexibility in a lightweight format: a smart, secure solution for a wide range of products.",
    summary: "3-side seal polybags in single and multi-coloured mono-layer film, customisable up to 120 micron.",
    headline: "Polybag solutions: precision, strength and custom manufacturing",
    body: [
      "Our polybags are engineered for quality, seal integrity and clarity, designed for the packaging needs of varied industries. Made from high-quality single and multi-coloured mono-layer film, these 3-side seal polybags can be customised up to 120 microns for superior strength and protection.",
      "With consistent sealing quality and an excellent print finish, our bags are trusted across industries for both primary and secondary packaging.",
    ],
    offeringsTitle: "Our offering",
    offerings: [
      "Single-colour and multi-coloured printing",
      "Up to 120-micron thickness",
      "High-strength mono-layer construction",
      "Excellent seal integrity and consistent quality",
      "Custom sizes available",
      "Food-safe material options",
      "Transparent and coloured opaque options",
      "Capacity for large-scale supply, fast lead times and dependable delivery",
    ],
    extraTitle: "Industries catered to",
    extra: [
      "Textile and garments",
      "Snacks, biscuits and bakery products",
      "Automobile components",
      "Cosmetics and personal care",
      "Pharmaceuticals and medical supplies",
      "Electronics and electrical accessories",
      "Home and household products",
      "Retail and general packaging",
    ],
    glance: [
      { value: "120 micron", label: "the thickness our polybags can be customised up to" },
      { value: "3-side seal", label: "high-strength mono-layer construction" },
      { value: "Multi-colour", label: "single and multi-coloured printing" },
      { value: "Large scale", label: "supply with fast lead times" },
    ],
    photo: { src: "/media/plant/production-shed.webp", alt: "Production shed interior at the Aditya Flexipack plant" },
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const industries = [
  "Food and beverages",
  "Personal care and hygiene",
  "Agriculture and seeds",
  "Retail and consumer goods",
  "Automotive and lubricants",
] as const;
