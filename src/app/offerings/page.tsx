import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaPanel } from "@/components/page/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Aisles } from "@/components/products/Aisles";
import { PackIndex } from "@/components/products/PackIndex";

const description =
  "Packaging for biscuits and snacks, kitchen essentials, confectionery, cereals, frozen food, home and personal care, pet food, liquids, shrink and collation packs, laddi packs, foil wrappers and polybags.";

export const metadata: Metadata = {
  title: "Offerings",
  description,
  alternates: { canonical: "/offerings/" },
  openGraph: { url: "/offerings/", title: "Offerings | Aditya Flexipack", description },
};

export default function OfferingsPage() {
  return (
    <>
      <PageHero
        tone="wash"
        title="Packaging that works as hard as the recipe"
        note="Our offerings"
        intro={
          <p>
            Great snacks deserve it. Our solutions combine high-barrier properties, superior sealing and freshness-lock
            technology to keep food crisp, flavours intact and products shelf-ready, delivering that oven-fresh bite every
            time.
          </p>
        }
        photos={[
          { src: "/media/old/home/mockup-snack-pouches-pink.webp", alt: "Printed stand-up pouches carrying the Aditya Flexipack mark, with cookies" },
          { src: "/media/old/home/mockup-pouches-supermarket-shelf.webp", alt: "Aditya Flexipack snack pouches on a supermarket shelf" },
        ]}
        actions={
          <>
            <ButtonLink href="/products/" tone="crimson">
              Explore products
            </ButtonLink>
            <Link href="/packaging-partnership/" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Partner with us
            </Link>
          </>
        }
      />
      <Aisles />
      <PackIndex />
      <CtaPanel />
    </>
  );
}
