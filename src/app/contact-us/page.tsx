import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Aditya Flexipack: plant at Rania, Kanpur Dehat and city office at Dada Nagar, Kanpur. Call +91-512-2237156 or write to info@adityaflexipack.com.",
  alternates: { canonical: "/contact-us/" },
};

// Address cards dealt at slight angles; each one squares up under the pointer.
const card = "rounded-[var(--radius-xl)] p-7 transition-[rotate,translate] duration-500 ease-[var(--ease-back)] hover:-translate-y-1 sm:hover:rotate-0";

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="wine"
        title="Get in touch"
        note="Let's connect and collaborate"
        intro="At Aditya Flexipack, we believe in building strong, long-term partnerships with vendors who share our commitment to quality, innovation, and customer satisfaction."
        photos={[
          { src: "/media/old/home/plant-exterior-building.webp", alt: "The Aditya Flexipack plant building at Rania, Kanpur Dehat" },
          { src: "/media/old/about-us/plant-exterior-wide.webp", alt: "The plant campus seen across its lawn" },
        ]}
        actions={
          <>
            <ButtonLink href="#write" tone="white">
              Fill the form
            </ButtonLink>
            <a href={site.phoneHref} className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
              Call {site.phone}
            </a>
          </>
        }
      />

      <section aria-labelledby="reach-title" className="py-[var(--section-y)]">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="reach-title" className="display text-[clamp(2.4rem,4.6vw,4.4rem)] text-ink">
              Contact us
            </h2>
            <p className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">You can reach us anytime</p>

            <ul className="mt-10 grid gap-5">
              <li className={`${card} bg-crimson text-white sm:-rotate-[2deg]`}>
                <MapPin aria-hidden className="size-7" strokeWidth={1.8} />
                <h3 className="display mt-5 text-[1.9rem]">{site.plant.label}</h3>
                <address className="mt-2 not-italic leading-relaxed text-white/90">
                  {site.legalName}
                  {site.plant.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a
                  href={site.plant.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
                >
                  Open in Google Maps
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              </li>

              <li className={`${card} bg-wine text-white sm:rotate-[1.5deg]`}>
                <MapPin aria-hidden className="size-7" strokeWidth={1.8} />
                <h3 className="display mt-5 text-[1.9rem]">{site.cityOffice.label}</h3>
                <address className="mt-2 not-italic leading-relaxed text-white/85">
                  {site.cityOffice.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </li>

              <li className={`${card} bg-foil text-ink sm:-rotate-[1deg]`}>
                <div className="flex gap-3">
                  <Phone aria-hidden className="size-7 text-crimson" strokeWidth={1.8} />
                  <Mail aria-hidden className="size-7 text-crimson" strokeWidth={1.8} />
                </div>
                <h3 className="display mt-5 text-[1.9rem]">Call or write</h3>
                <ul className="mt-3 grid gap-1 text-[1.05rem]">
                  <li>
                    <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-crimson">
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-crimson">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.emailAlt}`} className="inline-flex min-h-11 items-center break-all font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-crimson">
                      {site.emailAlt}
                    </a>
                  </li>
                </ul>
              </li>

              <li className={`${card} bg-blush text-wine sm:rotate-[2deg]`}>
                <h3 className="display text-[1.9rem]">Follow us on</h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Aditya Flexipack on Facebook"
                    className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-wine text-white transition-colors hover:bg-crimson"
                  >
                    <FacebookIcon className="size-5" />
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Aditya Flexipack on LinkedIn"
                    className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-wine text-white transition-colors hover:bg-crimson"
                  >
                    <LinkedInIcon className="size-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div id="write" className="scroll-mt-24 lg:col-span-7">
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.4rem)] text-ink">Fill the form</h2>
            <p className="mt-3 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-soft">
              Tell us who you are and what you need. For packaging requirements, the{" "}
              <Link href="/packaging-partnership/#begin" className="font-semibold text-crimson underline underline-offset-4">
                packaging partnership form
              </Link>{" "}
              takes your product details too.
            </p>
            <div className="mt-8">
              <EnquiryForm form="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
