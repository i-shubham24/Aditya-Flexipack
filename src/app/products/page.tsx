import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaPanel } from "@/components/page/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { IndustryTiles } from "@/components/products/IndustryTiles";
import { RecycleBand } from "@/components/products/RecycleBand";

const description =
  "Laminates, pouches, films, inks, gravure cylinders and polybags for food, pharma, FMCG and more, combining innovation, quality and performance.";

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: "/products/" },
  openGraph: { url: "/products/", title: "Products | Aditya Flexipack", description },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        tone="crimson"
        title="Innovative packaging solutions for every industry"
        note="For food, pharma, FMCG and more"
        intro={
          <p>
            Discover our full range of flexible packaging products, designed to meet the diverse needs of every industry we
            serve, combining innovation, quality and performance.
          </p>
        }
        photos={[
          { src: "/media/products/branded-pouches.webp", alt: "Printed snack pouches carrying the Aditya Flexipack mark" },
          { src: "/media/process/metallised-rolls.webp", alt: "Rolls of metallised film on a rewinding shaft" },
        ]}
        actions={
          <>
            <ButtonLink href="/contact-us/" tone="white">
              Get in touch
            </ButtonLink>
            <Link href="/packaging-partnership/" className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
              Packaging partnership
            </Link>
          </>
        }
      />
      <ProductGrid />
      <IndustryTiles />
      <RecycleBand />
      <CtaPanel />
    </>
  );
}
