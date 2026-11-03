import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, productBySlug } from "@/content/products";
import { pageOf } from "@/content/next";
import { site } from "@/content/site";
import { RangeHero } from "@/components/heroes/RangeHero";
import { TearStrip } from "@/components/system/TearStrip";
import { TONES } from "@/components/system/tones";
import { ButtonLink } from "@/components/ui/Button";
import { sheets } from "@/components/products/sheet";
import { ProductAbout, ProductList } from "@/components/products/ProductBlocks";
import { FilmAdvantages, FilmSections } from "@/components/products/FilmSections";
import { Centrepiece } from "@/components/products/centrepieces";

type Props = { params: Promise<{ slug: string }> };

// All six slugs are prerendered from generateStaticParams; reading params at the top keeps a real 404 for unknown ones.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  const url = `/products/${p.slug}/`;
  return {
    title: p.name,
    description: p.lead,
    alternates: { canonical: url },
    openGraph: { url, title: `${p.name} | ${site.name}`, description: p.lead, images: [sheets[p.slug].hero.src] },
  };
}

/**
 * One template for the six products: spec-sheet hero in the product's field, the About panel, the product's own
 * centrepiece on the white sheet, its other list on a panel, and the tear strip to the next product. No
 * neighbours share a field (see `sheets` for each page's order). Inquire now lives in the hero.
 */
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const s = sheets[p.slug];
  const path = `/products/${p.slug}/`;
  const tone = pageOf(path).tone;
  const t = TONES[tone];

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products/` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}${path}` },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.lead,
    image: `${site.url}${s.hero.src}`,
    category: "Flexible Packaging Materials",
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${site.url}${path}`,
    },
  };

  const listItems = s.list ? (s.list.source === "extra" ? p.extra : p.offerings) : undefined;

  return (
    <>
      <RangeHero
        name={p.name}
        tone={tone}
        lead={<p>{p.short}</p>}
        photo={s.hero}
        spec={p.glance}
        actions={
          <>
            <ButtonLink href={`/packaging-partnership/?product=${encodeURIComponent(s.need)}#begin`} tone={t.dark ? "white" : "crimson"}>
              Inquire now
            </ButtonLink>
            <ButtonLink href="/products/" tone={tone === "ink" || tone === "wine" ? "crimson" : "ink"} plain>
              All products
            </ButtonLink>
          </>
        }
      />

      {s.about && <ProductAbout title={p.headline} lines={p.brief} slot={s.about} />}

      <Centrepiece slug={p.slug} />

      {p.films ? (
        <>
          <FilmSections films={p.films} />
          <FilmAdvantages films={p.films} />
        </>
      ) : (
        s.list && listItems && <ProductList title={s.list.title} items={listItems} slot={s.list} />
      )}

      <TearStrip from={path} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}
