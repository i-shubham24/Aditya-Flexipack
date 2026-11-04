import type { Metadata } from "next";
import { GalleryHero } from "@/components/company/gallery/GalleryHero";
import { CtaPanel } from "@/components/page/CtaPanel";
import { GalleryWall } from "@/components/about/GalleryWall";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from the Aditya Flexipack plant near Kanpur: the press hall, cylinder engraving, blown film towers, converting lines and the 18-acre campus.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryWall />
      <CtaPanel />
    </>
  );
}
