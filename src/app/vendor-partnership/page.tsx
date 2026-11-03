import type { Metadata } from "next";
import Image from "next/image";
import { PartnerHero } from "@/components/heroes/PartnerHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/system/SectionHeader";
import { NumberedList } from "@/components/system/NumberedList";
import { TearStrip } from "@/components/system/TearStrip";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Rise } from "@/components/desk/Rise";
import { BinStack } from "@/components/desk/StoresBin";
import { StoresRack } from "@/components/desk/StoresRack";
import { VendorRoute } from "@/components/desk/VendorRoute";

export const metadata: Metadata = {
  title: "Vendor partnership",
  description:
    "Supply raw materials, machinery or logistics to Aditya Flexipack. Join a trusted supply chain with transparent practices, strict quality controls and long-term growth.",
  alternates: { canonical: "/vendor-partnership/" },
};

const REASONS = [
  { title: "Join a market leader", body: "Partner with an industry leader known for reliability and high-performance solutions." },
  { title: "Transparent practices", body: "Our clear communication and well-defined processes ensure an efficient and transparent partnership." },
  { title: "Consistent growth", body: "Form long-term partnerships that foster mutual growth and shared success." },
  { title: "Commitment to quality", body: "We uphold strict quality controls and certifications, ensuring a reliable supply chain." },
  { title: "Our integrity", body: "We value vendor relationships, honouring our commitments with integrity and respect." },
  { title: "Shared sustainability", body: "Collaborate with a partner dedicated to eco-friendly practices and a healthier planet." },
];

const STREAMS = [
  {
    title: "Raw materials",
    body: "We seek vendors offering top-grade materials that meet stringent global standards.",
    src: "/media/old/products-polybags/photo-polybag-film-roll.webp",
    alt: "A large wound roll of clear polyethylene film on a pallet in a factory",
    caption: "A wound roll of clear PE film",
  },
  {
    title: "Machinery and equipment",
    body: "We need advanced, scalable equipment to support high-volume manufacturing.",
    src: "/media/old/home/plant-grey-enclosed-machine.webp",
    alt: "A large grey enclosed production machine with an operator touchscreen and a wall-mounted monitor",
    caption: "An enclosed production machine at our plant",
  },
  {
    title: "Logistics and distribution",
    body: "We require agile, tech-driven logistics for smart, efficient and sustainable delivery.",
    src: "/media/old/home/photo-stretch-film-wrapping.webp",
    alt: "A worker's hand wrapping stretch film around a cardboard box",
    caption: "Stretch film wrapped round a carton",
  },
];

const STEPS = [
  { title: "Send your application", body: "Share your company profile, product range and key certifications." },
  { title: "Application review", body: "We assess your submission for quality, capacity and industry compliance." },
  { title: "Vendor evaluation", body: "Shortlisted vendors are asked to provide samples and essential documentation." },
  { title: "Approval and onboarding", body: "Once approved, you receive confirmation and begin onboarding as an official partner." },
];

export default function VendorPartnershipPage() {
  return (
    <>
      <PartnerHero
        tone="wine"
        title="Partner with a leader. Join a trusted supply chain."
        actions={
          <ButtonLink href="#vendor-form" tone="white">
            Fill the form
          </ButtonLink>
        }
        teaser={<BinStack />}
      />

      <section aria-labelledby="vendor-why-title" className="py-[var(--section-y)]">
        <Rise className="shell">
          <div data-rise>
            <SectionHeader id="vendor-why-title" title="Why join our vendor network?" />
          </div>
          <div data-rise>
            <NumberedList cols={2} items={REASONS} />
          </div>
        </Rise>
      </section>

      <section aria-labelledby="network-title" className="panel bg-crimson-wash py-[var(--section-y)]">
        <Rise className="shell">
          <div data-rise>
            <SectionHeader
              id="network-title"
              title="Join our trusted network"
              standfirst="We are actively seeking vendor partners who share our commitment to quality and innovation. We invite suppliers who support our evolving needs in food, pharma, personal care and beyond."
            />
          </div>
          <ul className="page-grid gap-y-14">
            {STREAMS.map((s) => (
              <li key={s.title} data-rise className="col-span-full sm:col-span-4">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 text-caption text-ink-soft">{s.caption}</figcaption>
                </figure>
                <h3 className="display mt-7 text-d3 text-wine">{s.title}</h3>
                <p className="mt-3 max-w-[24rem] text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ul>
        </Rise>
      </section>

      <section aria-labelledby="rack-title" className="py-[var(--section-y)]">
        <div className="shell">
          <SectionHeader id="rack-title" title="Products we source" standfirst="Pick what you supply. We add it to the form for you." />
          <StoresRack formId="vendor-form" />
        </div>
      </section>

      <section aria-labelledby="route-title" className="panel bg-crimson py-[calc(var(--section-y)*0.75)]">
        <div className="shell">
          <SectionHeader
            id="route-title"
            dark
            title="Our vendor application process"
            standfirst="We welcome partners who support our commitment to premium-quality materials. Our process keeps collaboration smooth and aligned with our quality, innovation and compliance standards."
          />
          <VendorRoute steps={STEPS} />
        </div>
      </section>

      <section id="vendor-form" aria-labelledby="vendor-form-title" className="scroll-mt-24 pt-[var(--frame)]">
        <div className="panel bg-foil py-[var(--section-y)]">
          <Rise className="shell page-grid gap-y-10">
            <div data-rise className="col-span-full lg:col-[1/5]">
              <h2 id="vendor-form-title" className="display text-d2 text-ink">
                Fill the form
              </h2>
              <p className="mt-5 max-w-[22rem] text-lead text-ink-soft">Register as a vendor. You can attach up to two catalogues.</p>
            </div>
            <div className="col-span-full lg:col-[5/13]">
              <EnquiryForm form="vendor" tone="wash" />
            </div>
          </Rise>
        </div>
      </section>

      <TearStrip from="/vendor-partnership/" />
    </>
  );
}
