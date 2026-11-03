import type { ProductSlug } from "@/content/products";
import { LaminatesCentrepiece } from "./Laminates";
import { PouchesCentrepiece } from "./Pouches";
import { FilmsCentrepiece } from "./Films";
import { InksCentrepiece } from "./Inks";
import { CylindersCentrepiece } from "./Cylinders";
import { PolybagsCentrepiece } from "./Polybags";

/**
 * One centrepiece per product page. Each renders one complete <section> on the plain white sheet (no panel),
 * so the product template sets a colour panel (or the tear strip) on both sides of it.
 */
export function Centrepiece({ slug }: { slug: ProductSlug }) {
  switch (slug) {
    case "laminates":
      return <LaminatesCentrepiece />;
    case "pouches":
      return <PouchesCentrepiece />;
    case "films":
      return <FilmsCentrepiece />;
    case "inks":
      return <InksCentrepiece />;
    case "cylinders":
      return <CylindersCentrepiece />;
    case "polybags":
      return <PolybagsCentrepiece />;
  }
}
