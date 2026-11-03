import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productBySlug } from "@/content/products";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { SplitRow } from "@/components/page/SplitRow";
import { CtaPanel } from "@/components/page/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { productMeta } from "@/components/products/meta";
import { Glance } from "@/components/products/Glance";
import { OfferingList } from "@/components/products/OfferingList";
import { SolutionCards } from "@/components/products/SolutionCards";
import { ExtraPanel } from "@/components/products/ExtraPanel";
import { FilmIndex, FilmSection } from "@/components/products/FilmLines";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { RecycleBand } from "@/components/products/RecycleBand";

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
    openGraph: { url, title: `${p.name} | ${site.name}`, description: p.lead, images: [productMeta[p.slug].cover.src] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const m = productMeta[p.slug];
  const dark = m.tone === "crimson" || m.tone === "wine";

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products/` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/products/${p.slug}/` },
    ],
  };

  return (
    <>
      <PageHero
        tone={m.tone}
        title={p.name}
        note={p.headline}
        intro={<p>{p.lead}</p>}
        photos={m.hero}
        actions={
          <>
            <ButtonLink href="/packaging-partnership/" tone={dark ? "white" : "crimson"}>
              Inquire now
            </ButtonLink>
            <Link
              href="/products/"
              className={`font-semibold underline underline-offset-4 ${
                dark ? "text-white decoration-white/50 hover:decoration-white" : "text-ink decoration-ink/30 hover:decoration-ink"
              }`}
            >
              All products
            </Link>
          </>
        }
      />

      {/* Section fields alternate so no two neighbours share a colour: hero, glance panel, white, silver, ... */}
      <Glance items={m.glance} field={m.tone === "wash" ? "foil" : "wash"} />

      <SplitRow title={`About ${p.name.toLowerCase()}`} photo={m.about} tile="blush">
        {p.body.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}
      </SplitRow>

      {p.films ? (
        <>
          <FilmIndex films={p.films} />
          {p.films.map((f, i) => (
            <FilmSection key={f.id} film={f} onWash={i % 2 === 1} />
          ))}
        </>
      ) : (
        <OfferingList title={p.offeringsTitle} items={p.offerings} />
      )}

      {p.solutions && <SolutionCards title={p.solutionsTitle ?? "Our solutions"} items={p.solutions} note="Mono-structured options for recycling" />}

      {p.extra && <ExtraPanel title={p.extraTitle ?? "Key features"} items={p.extra} icons={m.extraIcons} photo={m.extraPhoto ?? m.hero[1]} />}

      <RelatedProducts current={p.slug} />
      <RecycleBand />
      <CtaPanel />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  );
}
