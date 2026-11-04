import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactHero } from "@/components/heroes/ContactHero";
import { SectionHeader } from "@/components/system/SectionHeader";
import { TearStrip } from "@/components/system/TearStrip";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Rise } from "@/components/desk/Rise";
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
      <ContactHero />

      <section aria-labelledby="reach-title" className="py-[var(--section-y)]">
        <Rise className="shell">
          <div data-rise>
            <SectionHeader id="reach-title" title="Contact us" />
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Plant and Registered Office + Campus Photo */}
            <div data-rise className="space-y-8 lg:col-span-6">
              <AddressCard
                title={site.plant.label}
                lines={[site.legalName, ...site.plant.lines]}
                mapUrl={site.plant.mapUrl}
                email={site.email}
              />

              <figure className="max-w-[28rem] overflow-hidden rounded-[var(--radius-xl)] bg-white p-2.5  ring-1 ring-black/5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ink/5">
                  <Image
                    src="/media/plant/plant-exterior.webp"
                    alt="The plant building with a brown entrance block, flagpoles and a lawn"
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 px-2 pb-1 text-caption text-ink-soft">
                  Our 18-acre manufacturing plant at Rania, Kanpur Dehat
                </figcaption>
              </figure>
            </div>

            {/* Right Column: City Office (positioned on right) + Highway Connectivity & Follow Us */}
            <div data-rise className="space-y-8 lg:col-span-6 lg:pl-4">
              <AddressCard
                title={site.cityOffice.label}
                lines={site.cityOffice.lines}
                mapUrl={cityMap}
                phone={{ label: site.phone, href: site.phoneHref }}
                email={site.emailAlt}
              />

              <div className="max-w-[28rem] rounded-[var(--radius-xl)] bg-foil p-6 sm:p-7">
                <h4 className="display text-d4 text-ink">Highway connectivity</h4>
                <p className="mt-2.5 text-lead text-ink-soft">
                  Our 18-acre campus is located 15 km from Kanpur, directly along the Kolkata to Delhi highway (NH-2).
                </p>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <h5 className="text-sm font-bold text-ink">Follow us on</h5>
                  <div className="mt-3 flex gap-3">
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Aditya Flexipack on Facebook"
                      className={social}
                    >
                      <FacebookIcon className="size-5" />
                    </a>
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Aditya Flexipack on LinkedIn"
                      className={social}
                    >
                      <LinkedInIcon className="size-5" />
                    </a>
                  </div>
                </div>
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
