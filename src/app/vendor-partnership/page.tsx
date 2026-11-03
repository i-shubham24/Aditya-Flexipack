import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Eye, Leaf, ShieldCheck, Sprout, Trophy } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/page/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ReasonGrid, type Reason } from "@/components/partner/ReasonGrid";
import { PartnerSteps, type Step } from "@/components/partner/PartnerSteps";
import { FormSection } from "@/components/partner/FormSection";
import { VENDOR_PRODUCTS } from "@/content/forms";

export const metadata: Metadata = {
  title: "Vendor partnership",
  description:
    "Supply raw materials, machinery or logistics to Aditya Flexipack. Join a trusted supply chain with transparent practices, strict quality controls and long-term growth.",
  alternates: { canonical: "/vendor-partnership/" },
};

const REASONS: Reason[] = [
  { icon: Trophy, title: "Join a market leader", body: "Partner with an industry leader known for reliability and high-performance solutions." },
  { icon: Eye, title: "Transparent practices", body: "Our clear communication and well-defined processes ensure an efficient and transparent partnership." },
  { icon: Sprout, title: "Consistent growth", body: "Form long-term partnerships that foster mutual growth and shared success." },
  { icon: BadgeCheck, title: "Commitment to quality", body: "We uphold strict quality controls and certifications, ensuring a reliable supply chain." },
  { icon: ShieldCheck, title: "Our integrity", body: "We value vendor relationships, honoring our commitments with integrity and respect." },
  { icon: Leaf, title: "Shared sustainability", body: "Collaborate with a partner dedicated to eco-friendly practices and a healthier planet." },
];

const SUPPLY = [
  {
    title: "Raw materials",
    body: "We seek vendors offering top-grade materials that meet stringent global standards.",
    photo: { src: "/media/old/products-polybags/photo-polybag-film-roll.webp", alt: "A wound roll of clear polyethylene film on a pallet" },
    tilt: "sm:-rotate-[3deg]",
  },
  {
    title: "Machinery and equipment",
    body: "We need advanced, scalable equipment to support high-volume manufacturing.",
    photo: { src: "/media/old/home/plant-grey-enclosed-machine.webp", alt: "An enclosed production machine with an operator touchscreen at the plant" },
    tilt: "sm:rotate-[2deg]",
  },
  {
    title: "Logistics and distribution",
    body: "We require agile, tech-driven logistics for smart, efficient, and sustainable delivery.",
    photo: { src: "/media/old/home/photo-stretch-film-wrapping.webp", alt: "Stretch film being wrapped around a carton for dispatch" },
    tilt: "sm:-rotate-[2deg]",
  },
];

const ICONS = "/media/old/packaging-partnership";
const STEPS: Step[] = [
  { icon: `${ICONS}/icon-document-upload.webp`, title: "Submit your application", body: "Share your company profile, product range, and key certifications." },
  { icon: `${ICONS}/icon-checklist-thumbs-up.webp`, title: "Application review", body: "We assess your submission for quality, capacity, and industry compliance." },
  { icon: `${ICONS}/icon-handshake.webp`, title: "Vendor evaluation", body: "Shortlisted vendors are asked to provide samples and essential documentation." },
  {
    icon: `${ICONS}/icon-clipboard-check.webp`,
    title: "Approval and onboarding",
    body: "Once approved, you'll receive confirmation and begin the onboarding process as an official partner.",
  },
];

export default function VendorPartnershipPage() {
  return (
    <>
      <PageHero
        tone="wine"
        title="Partner with a leader. Join a trusted supply chain."
        note="Vendor partnership"
        photos={[
          { src: "/media/old/products-films/photo-clear-film-roll-on-machine.webp", alt: "A large roll of clear film on an unwinder" },
          { src: "/media/old/home/plant-laminator-unwind-s575.webp", alt: "Laminator unwind stand with a roll of white film at the plant" },
        ]}
        actions={
          <ButtonLink href="#apply" tone="white">
            Fill the form
          </ButtonLink>
        }
      />

      <ReasonGrid id="why-vendor" title="Why partner with Aditya Flexipack?" note="Why join our vendor network?" reasons={REASONS} />

      <section aria-labelledby="who-title" className="py-[var(--section-y)]">
        <Reveal className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="who-title" data-reveal className="display text-[clamp(2.6rem,5.6vw,5.6rem)] text-ink">
                Join our trusted network
              </h2>
              <p data-reveal className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">
                Who can apply
              </p>
            </div>
            <p data-reveal className="text-[1.08rem] leading-relaxed text-ink-soft lg:col-span-5">
              We are actively seeking vendor partners who share our commitment to quality and innovation. We invite suppliers who can
              support our evolving needs in industries like food, pharma, personal care, and beyond.
            </p>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
            {SUPPLY.map((s) => (
              <li key={s.title} data-reveal className="group">
                <div
                  className={`rounded-[var(--radius-lg)] bg-foil p-2 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] group-hover:scale-[1.03] sm:group-hover:rotate-0 ${s.tilt}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                  </div>
                </div>
                <h3 className="display mt-7 text-[clamp(1.7rem,2.4vw,2.2rem)] text-ink">{s.title}</h3>
                <p className="mt-2 text-[1.04rem] leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-20 rounded-[var(--radius-xl)] bg-crimson-wash p-[clamp(1.5rem,4vw,3rem)]">
            <h3 className="display text-[clamp(1.9rem,3vw,2.8rem)] text-wine">Products we source</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 text-[1.08rem] font-semibold text-ink sm:grid-cols-2 lg:grid-cols-4">
              {VENDOR_PRODUCTS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span aria-hidden className="size-2.5 shrink-0 rotate-45 rounded-[2px] bg-crimson" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <PartnerSteps
        id="vendor-process"
        title="Our vendor application process"
        note="How to apply"
        intro="We welcome partners who can support our commitment to premium-quality materials. Our process is designed for seamless collaboration and alignment with our quality, innovation, and compliance standards."
        steps={STEPS}
        panel="blush"
      />

      <FormSection
        id="apply"
        title="Fill the form"
        note="Register as a vendor"
        form="vendor"
        panel="foil"
        photo={{ src: "/media/old/home/plant-production-hall-floor.webp", alt: "The production hall at the Aditya Flexipack plant" }}
      >
        <p>Share your company details, the products you deal in and your catalogue. Fields marked with a star are required.</p>
      </FormSection>
    </>
  );
}
