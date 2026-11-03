import type { Metadata } from "next";
import { BadgeCheck, Handshake, Leaf, Rocket, ShieldCheck, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ReasonGrid, type Reason } from "@/components/partner/ReasonGrid";
import { PartnerSteps, type Step } from "@/components/partner/PartnerSteps";
import { FormSection } from "@/components/partner/FormSection";

export const metadata: Metadata = {
  title: "Packaging partnership",
  description:
    "Partner with Aditya Flexipack for laminates, pouches, films, polybags, inks and cylinders. Share your requirement and our team will evaluate, sample and onboard you.",
  alternates: { canonical: "/packaging-partnership/" },
};

const REASONS: Reason[] = [
  { icon: Rocket, title: "Innovation at scale", body: "We deliver solutions custom-designed for performance and market leadership." },
  { icon: TrendingUp, title: "Business growth", body: "Our packaging drives customer reach and elevates your brand." },
  { icon: BadgeCheck, title: "Operational excellence", body: "Our precision-made products ensure unwavering reliability and consistent performance." },
  { icon: Handshake, title: "Trusted collaboration", body: "We build long-term relationships with a steadfast commitment to your success." },
  { icon: ShieldCheck, title: "Ethical leadership", body: "We uphold the highest standards of compliance, safety, and responsible practices." },
  { icon: Leaf, title: "Purposeful sustainability", body: "Our eco-friendly processes create a positive brand impact for our partners." },
];

const ICONS = "/media/old/packaging-partnership";
const STEPS: Step[] = [
  { icon: `${ICONS}/icon-document-upload.webp`, title: "Submit your application", body: "Share your company profile, product list, and certifications." },
  { icon: `${ICONS}/icon-checklist-thumbs-up.webp`, title: "Evaluation and review", body: "We assess your quality, compliance, and strategic fit." },
  { icon: `${ICONS}/icon-handshake.webp`, title: "Testing and approval", body: "Submit samples and documents for final review." },
  { icon: `${ICONS}/icon-clipboard-check.webp`, title: "Partnership agreement", body: "Receive onboarding confirmation and begin collaboration." },
];

export default function PackagingPartnershipPage() {
  return (
    <>
      <PageHero
        tone="crimson"
        title="Packaging partnership"
        note="Ready to innovate? Partner with the leaders."
        intro="Laminates, pouches, films, polybags, inks and cylinders for brands that share our commitment to quality and innovation."
        photos={[
          { src: "/media/old/home/mockup-pouches-teal.webp", alt: "Two printed snack pouches carrying the Aditya Flexipack mark" },
          { src: "/media/old/about-us/mockup-pouches-wood-table.webp", alt: "Three Aditya Flexipack printed pouches on a wooden table" },
        ]}
        actions={
          <ButtonLink href="#begin" tone="white">
            Begin your partnership
          </ButtonLink>
        }
      />

      <ReasonGrid id="why-partner" title="Why partner with Aditya Flexipack?" note="Our partnership differentiators" reasons={REASONS} />

      <PartnerSteps
        id="process"
        title="Our partnership process"
        note="Who can apply"
        intro="We welcome partners who share our commitment to quality and innovation. Our process is designed to find companies that align with our standards for performance, reliability, and print quality across industries like food, pharma, and personal care."
        steps={STEPS}
      />

      <FormSection
        id="begin"
        title="Begin your partnership"
        note="Partner with the leaders"
        form="packaging"
        panel="foil"
        photo={{ src: "/media/old/home/mockup-pouches-supermarket-shelf.webp", alt: "Aditya Flexipack printed pouches on a supermarket shelf" }}
      >
        <p>Tell us what you pack and the format you need. Choose a product requirement and add a short brief.</p>
      </FormSection>
    </>
  );
}
