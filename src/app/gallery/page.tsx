import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
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
      <PageHero
        tone="wash"
        title="Our plant & journey"
        note="Capturing excellence"
        intro="A visual walkthrough of our 18-acre integrated converting plant near Kanpur."
      />
      <GalleryWall />
      <CtaPanel />
    </>
  );
}
