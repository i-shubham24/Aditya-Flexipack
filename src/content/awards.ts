export type Certificate = { name: string; body: string; mark: string };

export const certificates: Certificate[] = [
  { name: "BRC Global Standards", body: "World-class food safety, packaging quality and legal compliance in manufacturing.", mark: "/media/certs/brc.png" },
  { name: "VRC Quality Excellence", body: "Recognised for consistent quality excellence and robust operational standards.", mark: "/media/certs/vrc.png" },
  { name: "d2w", body: "Certified for producing oxo-biodegradable packaging that supports environmental sustainability.", mark: "/media/certs/d2w.png" },
  { name: "HACCP certified", body: "Strict hazard analysis and critical control points for safe production.", mark: "/media/certs/haccp.png" },
  { name: "ISO certified company", body: "Compliance with globally recognised management and quality system standards.", mark: "/media/certs/iso.png" },
];

export type Award = {
  title: string;
  body: string;
  by: string;
  photos: { src: string; alt: string; w: number; h: number }[];
};

const p = (src: string, alt: string, w: number, h: number) => ({ src: `/media/awards/${src}.webp`, alt, w, h });

export const awards: Award[] = [
  {
    title: "Entrepreneur of the Year (India), twice awarded",
    by: "Government of India",
    body: "Honoured twice with the Entrepreneur of the Year award, presented by President Dr. A.P.J. Abdul Kalam and President Smt. Pratibha Patil, for outstanding national-level performance.",
    photos: [
      p("award-apj-abdul-kalam", "Dr. A.P.J. Abdul Kalam presenting the Entrepreneur of the Year award", 1600, 1057),
      p("award-pratibha-patil", "Smt. Pratibha Devisingh Patil presenting the Entrepreneur of the Year award", 1600, 1097),
    ],
  },
  {
    title: "Parle Certificate of Excellence, two-time Gold category winner",
    by: "Parle Products",
    body: "Awarded by Parle for consistent, high-quality supply of wrappers and polybags to its manufacturing units.",
    photos: [
      p("parle-excellence-2014", "Parle Certificate of Excellence 2014 for BOPP wrappers and polybags", 1600, 1174),
      p("parle-excellence-2011", "Parle Certificate of Excellence for wrappers and polybags", 1195, 1600),
      p("parle-trophy", "Parle trophy for printed wrappers and polybags supply", 985, 1600),
    ],
  },
  {
    title: "ITC Foods Division, Innovation and Contribution awards",
    by: "ITC Limited",
    body: "Recognised twice by ITC Foods for innovation in packaging and outstanding service delivery.",
    photos: [
      p("itc-foods-appreciation", "ITC Foods Division certificate of appreciation", 1600, 1201),
      p("itc-enduring-value-trophy", "ITC Enduring Value trophy", 1004, 1600),
    ],
  },
  {
    title: "Certificate of Appreciation, COVID-19 support and best partner",
    by: "Britannia Industries",
    body: "Awarded by Britannia Industries for rapid and reliable support during the COVID-19 pandemic, highlighting our resilience and supply chain agility.",
    photos: [
      p("britannia-covid-appreciation", "Britannia certificate of appreciation for COVID-19 support", 1600, 1137),
      p("britannia-brit-best", "Britannia Brit Best award, India partner in progress", 1225, 1600),
      p("britannia-innovation-day", "Britannia Innovation Day certificate of participation", 1600, 1215),
    ],
  },
  {
    title: "Bangalore Chamber of Industry and Commerce (BCIC)",
    by: "BCIC",
    body: "Two awards from BCIC for excellent support and collaboration in the flexible packaging sector.",
    photos: [
      p("bcic-plaque", "Bangalore Chamber of Industry and Commerce plaque", 1600, 1505),
      p("bcic-plaque-framed", "Framed BCIC plaque", 1439, 1600),
    ],
  },
  {
    title: "Highest export in plastics (U.P.)",
    by: "Government of Uttar Pradesh",
    body: "Awarded by the U.P. State Industry Minister for achieving the highest export volume in the plastics category.",
    photos: [p("up-export-award", "Uttar Pradesh export award certificate for plastic products", 1600, 1204)],
  },
  {
    title: "Entrepreneur of the Year (U.P.), three-time awardee",
    by: "Government of Uttar Pradesh",
    body: "Recognised three times by the U.P. Government for excellence in entrepreneurship and industrial leadership.",
    photos: [],
  },
  {
    title: "MSME Excellence at Udyam Samaagam 2019",
    by: "Udyam Samaagam",
    body: "Awarded as a Pioneer MSME Supplier in Uttar Pradesh at Udyam Samaagam for our contributions to the MSME sector.",
    photos: [],
  },
  {
    title: "Best Employer Brand Award (2018)",
    by: "Business Standard",
    body: "Presented by Business Standard, recognising Aditya Flexipack as a top employer fostering a positive, high-performance workplace culture.",
    photos: [
      p("best-employer-brand-certificate", "National Best Employer Brand 2018 certificate", 871, 1600),
      p("best-employer-brand-trophy", "National Best Employer Brands 2018 trophy", 1042, 1600),
    ],
  },
];

/** Physical recognitions photographed at the plant, captioned only with what the object itself shows. */
export const moreRecognition = [
  p("up-ground-breaking-4-certificate", "UP Ground Breaking Ceremony 4.0 certificate of achievement for excellent entrepreneurial contribution in Kanpur", 1600, 1106),
  p("up-ground-breaking-3-trophy", "UP Ground Breaking Ceremony 3.0 trophy from Udyog Vibhag, Kanpur Dehat", 1281, 1600),
  p("up-star-category-certificate", "Directorate of Industries, Uttar Pradesh star category certificate", 1600, 1277),
  p("crystal-award", "Crystal recognition displayed at the plant", 981, 1024),
];

export const allAwardPhotos = [
  ...awards.flatMap((a) => a.photos.map((ph) => ({ ...ph, award: a.title }))),
  ...moreRecognition.map((ph) => ({ ...ph, award: "More recognition" })),
];
