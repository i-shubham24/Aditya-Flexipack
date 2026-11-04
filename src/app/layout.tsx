import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RouteScroll } from "@/components/layout/RouteScroll";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Loader } from "@/components/layout/Loader";
import { RouteCurtain } from "@/components/layout/RouteCurtain";

// Cabinet Grotesk and General Sans by the Indian Type Foundry (Fontshare, ITF Free Font License), self-hosted.
const cabinet = localFont({
  variable: "--font-cabinet",
  display: "swap",
  src: [
    { path: "../fonts/CabinetGrotesk-700.woff2", weight: "700" },
    { path: "../fonts/CabinetGrotesk-800.woff2", weight: "800" },
  ],
});
const general = localFont({
  variable: "--font-general",
  display: "swap",
  src: [
    { path: "../fonts/GeneralSans-400.woff2", weight: "400" },
    { path: "../fonts/GeneralSans-500.woff2", weight: "500" },
    { path: "../fonts/GeneralSans-600.woff2", weight: "600" },
  ],
});
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aditya Flexipack | Flexible Packaging Manufacturer in Kanpur, India",
    template: "%s | Aditya Flexipack",
  },
  description:
    "Aditya Flexipack is a premier flexible packaging manufacturer in Kanpur, India. 4,000 MT/month capacity, BRCGS A-Grade certified plant producing multi-layer laminates, stand-up pouches, CPP & barrier films, formulated inks, and gravure cylinders under one 18-acre roof.",
  keywords: [
    "flexible packaging manufacturer India",
    "rotogravure printing Kanpur",
    "barrier laminates manufacturer",
    "stand up pouches supplier India",
    "custom packaging pouches",
    "CPP films manufacturer",
    "metallised film converter",
    "sustainable packaging India",
    "food packaging supplier",
    "BRCGS certified packaging",
    "Aditya Flexipack",
    "flexible packaging Kanpur",
    "packaging converting plant Uttar Pradesh",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  applicationName: site.name,
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: "Aditya Flexipack | Quality is our Identity | Flexible Packaging Manufacturer",
    description:
      "Premier flexible packaging manufacturer in Kanpur, India: high-barrier laminates, stand-up pouches, CPP & blown films, inks and gravure cylinders made on one 18-acre campus.",
    images: [
      {
        url: "/media/brand/aditya-logo.png",
        width: 1200,
        height: 630,
        alt: "Aditya Flexipack - Premier Flexible Packaging Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Flexipack | Flexible Packaging Manufacturer",
    description:
      "High-performance laminates, stand-up pouches, films, inks and cylinders made on an 18-acre BRCGS A-Grade campus near Kanpur.",
    images: ["/media/brand/aditya-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ce0000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: [site.name, "Aditya Flexipack Kanpur"],
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/media/brand/aditya-logo.png`,
        caption: "Aditya Flexipack Logo",
      },
      image: `${site.url}/media/brand/aditya-logo.png`,
      slogan: site.tagline,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      foundingDate: "1999",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gata No. 445 Kha, Rania, Fatehpur Roshnai",
        addressLocality: "Kanpur Dehat",
        addressRegion: "Uttar Pradesh",
        postalCode: "209304",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.plant.geo.lat,
        longitude: site.plant.geo.lng,
      },
      hasMap: site.plant.mapUrl,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "$$",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Global / Export" },
      ],
      knowsAbout: [
        "Flexible Packaging",
        "Rotogravure Printing",
        "Barrier Laminates",
        "Stand-Up Pouches",
        "Spouted Pouches",
        "Blown Film Extrusion",
        "Cast Polypropylene CPP Films",
        "Vacuum Metallizing",
        "Gravure Cylinder Engraving",
        "Printing Ink Formulation",
        "Sustainable Packaging Solutions",
      ],
      award: [
        "BRCGS Issue 7 Packaging Materials Grade A",
        "ISO 22000:2018 Certified",
        "SEDEX SMETA 4-Pillar Audited",
        "HACCP Certified",
        "National Entrepreneur of the Year Award by Dr. A.P.J. Abdul Kalam",
        "Entrepreneur of the Year Award by Smt. Pratibha Patil",
        "Parle Certificate of Excellence Gold",
        "Britannia Best Partner Appreciation Award",
      ],
      sameAs: [site.social.facebook, site.social.linkedin],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: site.phone,
          contactType: "sales and customer service",
          email: site.email,
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

// Before first paint: every load starts at the top; full loader on the first visit of a session,
// a short one on later loads, none for reduced motion.
const NO_LOADER = `try{history.scrollRestoration="manual";scrollTo(0,0)}catch(e){}try{var h=document.documentElement;h.classList.add("js");if(matchMedia("(prefers-reduced-motion: reduce)").matches)h.setAttribute("data-noloader","");else if(sessionStorage.getItem("af-loader")==="1")h.setAttribute("data-loader-short","")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cabinet.variable} ${general.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_LOADER }} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-[var(--radius-sm)] bg-ink px-5 py-3 font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <RouteScroll />
        <Loader />
        <RouteCurtain />
        <div className="sheet pb-[var(--frame)]">
          <SiteHeader />
          <main id="main">{children}</main>
        </div>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
