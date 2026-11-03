import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartnerHero } from "@/components/heroes/PartnerHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/system/SectionHeader";
import { TearStrip } from "@/components/system/TearStrip";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Rise } from "@/components/desk/Rise";
import { KilometreStone } from "@/components/desk/KilometreStone";
import { AddressCard } from "@/components/desk/AddressCard";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Aditya Flexipack: plant at Rania, Kanpur Dehat and city office at Dada Nagar, Kanpur. Call +91-512-2237156 or write to info@adityaflexipack.com.",
  alternates: { canonical: "/contact-us/" },
};

const cityMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.legalName}, ${site.cityOffice.lines.join(", ")}`)}`;

const social = "grid size-12 place-items-center rounded-[var(--radius-sm)] bg-wine text-white transition-colors duration-200 hover:bg-crimson";

export default function ContactPage() {
  return (
    <>
      <PartnerHero
        tone="crimson"
        title="Get in touch"
        intro={
          <>
            <p className="hand inline-block -rotate-2 text-note text-blush">Let&apos;s connect and collaborate</p>
            <p className="mt-4">
              We believe in strong, long-term partnerships. We work with vendors who share our commitment to quality, innovation and
              customer satisfaction.
            </p>
          </>
        }
        actions={
          <>
            <ButtonLink href="#contact-form" tone="white">
              Fill the form
            </ButtonLink>
            <ButtonLink href={site.phoneHref} tone="wine" plain>
              Call {site.phone}
            </ButtonLink>
          </>
        }
        teaser={<KilometreStone />}
      />

      <section aria-labelledby="reach-title" className="py-[var(--section-y)]">
        <Rise className="shell">
          <div data-rise>
            <SectionHeader id="reach-title" title="Contact us" />
          </div>

          <div className="page-grid gap-y-16">
            <div data-rise className="span-half-l grid gap-8 lg:grid-cols-subgrid">
              <div className="lg:col-[1/5]">
                <AddressCard title={site.plant.label} lines={[site.legalName, ...site.plant.lines]} mapUrl={site.plant.mapUrl} email={site.email} />
              </div>
              <figure className="max-w-[20rem] lg:col-[5/7] lg:max-w-none">
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/media/old/home/plant-exterior-building.webp"
                    alt="The plant building with a brown entrance block, flagpoles and a lawn"
                    fill
                    sizes="(min-width: 1024px) 15vw, 20rem"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-caption text-ink-soft">Our plant at Rania, Kanpur Dehat</figcaption>
              </figure>
            </div>

            <div data-rise className="span-half-r">
              <AddressCard
                title={site.cityOffice.label}
                lines={site.cityOffice.lines}
                mapUrl={cityMap}
                phone={{ label: site.phone, href: site.phoneHref }}
                email={site.emailAlt}
              />
            </div>

            <p data-rise className="display span-lead max-w-[36rem] text-d4 text-ink">
              Our 18-acre campus is 15 km from Kanpur, along the Kolkata to Delhi highway (NH-2).
            </p>

            <div data-rise className="span-side">
              <h3 className="display text-d4 text-ink">Follow us on</h3>
              <div className="mt-4 flex gap-3">
                <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Aditya Flexipack on Facebook" className={social}>
                  <FacebookIcon className="size-5" />
                </a>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label="Aditya Flexipack on LinkedIn" className={social}>
                  <LinkedInIcon className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </Rise>
      </section>

      <section id="contact-form" aria-labelledby="contact-form-title" className="panel scroll-mt-24 bg-foil py-[var(--section-y)]">
        <Rise className="shell page-grid gap-y-10">
          <div data-rise className="col-span-full lg:col-[1/5]">
            <h2 id="contact-form-title" className="display text-d2 text-ink">
              Fill the form
            </h2>
            <p className="mt-5 max-w-[22rem] text-lead text-ink-soft">You can reach us anytime.</p>
            <p className="mt-4 max-w-[22rem] text-ink-soft">
              Need packaging?{" "}
              <Link href="/packaging-partnership/#begin" className="inline-flex min-h-11 items-center font-semibold text-crimson underline underline-offset-4">
                Use the packaging partnership form
              </Link>
            </p>
          </div>
          <div className="col-span-full lg:col-[5/13]">
            <EnquiryForm form="contact" tone="wash" />
          </div>
        </Rise>
      </section>

      <TearStrip from="/contact-us/" />
    </>
  );
}
