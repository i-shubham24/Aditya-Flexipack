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
    default: "Aditya Flexipack | Flexible packaging manufacturer in Kanpur, India",
    template: "%s | Aditya Flexipack",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: "Aditya Flexipack | We make the part you tear open",
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ce0000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/media/brand/aditya-logo.png`,
  slogan: site.tagline,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gata No. 445 Kha, Rania, Fatehpur Roshnai",
    addressLocality: "Kanpur Dehat",
    addressRegion: "Uttar Pradesh",
    postalCode: "209304",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.plant.geo.lat, longitude: site.plant.geo.lng },
  sameAs: [site.social.facebook, site.social.linkedin],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
