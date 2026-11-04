import type { Metadata } from "next";
import { ProductsHero } from "@/components/products/ProductsHero";
import { TearStrip } from "@/components/system/TearStrip";
import { SectionHeader } from "@/components/system/SectionHeader";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Slitter } from "@/components/products/Slitter";

import { TONES } from "@/components/system/tones";
import { industries } from "@/content/products";

const description =
  "Laminates, pouches, films, inks, gravure cylinders and polybags for food, pharma, FMCG and more, made on one campus near Kanpur.";

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: "/products/" },
  openGraph: { url: "/products/", title: "Products | Aditya Flexipack", description },
};

/**
 * Products index. Sequence and fields, so no neighbours repeat: hero (crimson-wash), The Slitter (white),
 * industries (wine panel), the recycling pledge (white, the only place the product section carries it),
 * tear strip to Laminates (crimson).
 */
export default function ProductsPage() {
  return (
    <>
      <ProductsHero
        lead={<p>Innovative packaging for every industry: food, pharma, FMCG and more.</p>}
        spec={[
          { value: "6 lines", label: "laminates, pouches, films, inks, cylinders, polybags" },
          { value: "4,000 MT", label: "laminates production capacity every month" },
          { value: "18 acres", label: "one campus on NH-2, 15 km from Kanpur" },
          { value: "BRCGS", label: "Issue 7, Grade A certified" },
        ]}
        actions={
          <>
            <ButtonLink href="/contact-us/">Get in touch</ButtonLink>
            <TextLink href="/packaging-partnership/">Packaging partnership</TextLink>
          </>
        }
      />

      <Slitter />

      <section aria-labelledby="industry-title" className="pt-[var(--frame)]">
        <div className="panel bg-wine py-[calc(var(--section-y)*0.7)] text-white">
          <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 800 V520 C 240 430, 470 640, 730 540 S 1060 420, 1200 480 V800 Z" fill={TONES.wine.contour} />
          </svg>
          <div className="shell relative">
            <SectionHeader
              id="industry-title"
              title="Solutions for your industry"
              standfirst="Solvent-based lamination gives strong adhesion and durability."
              dark
            />
            <ul className="grid gap-x-[clamp(1.25rem,1.8vw,1.5rem)] gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {industries.map((name) => (
                <li key={name} className="display text-d3">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="recycle-title" className="py-[var(--section-y)]">
        <div className="shell page-grid items-center gap-y-[var(--stack)]">
          <div className="span-text">
            <h2 id="recycle-title" className="display text-d2 text-ink">
              Recycling maximised. Forests sustained.
            </h2>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">
              We make the most of the resources we use. It is our commitment to the future.
            </p>
            <ButtonLink href="/sustainability/" tone="ink" className="mt-8">
              Our sustainability work
            </ButtonLink>
          </div>
          <PhotoFrame
            className="span-side"
            src="/media/old/home/photo-eco-pouch-shopping-basket.webp"
            alt="Hands holding a printed kraft pouch with the Aditya Flexipack mark over a basket of fresh produce"
            caption="A printed kraft pouch over a basket of fresh produce."
            ratio="4:3"
            sizes="(min-width: 1024px) 38vw, 92vw"
          />
        </div>
      </section>

      <TearStrip from="/products/" />
    </>
  );
}
