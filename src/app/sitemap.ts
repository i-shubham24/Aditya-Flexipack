import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";

// Same URLs as the WordPress site, trailing slash included, so search rankings carry over.
const PAGES = [
  "/",
  "/about-us/",
  "/offerings/",
  "/products/",
  ...products.map((p) => `/products/${p.slug}/`),
  "/awards-recognitions/",
  "/sustainability/",
  "/gallery/",
  "/career/",
  "/packaging-partnership/",
  "/vendor-partnership/",
  "/contact-us/",
  "/privacy-policy/",
  "/terms-conditions/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" || path.startsWith("/products") ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/products") ? 0.9 : 0.6,
  }));
}
