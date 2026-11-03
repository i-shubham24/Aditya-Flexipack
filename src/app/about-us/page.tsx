import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { CompanyHero } from "@/components/heroes/CompanyHero";
import { SplitRow } from "@/components/page/SplitRow";
import { FactCards } from "@/components/page/FactCards";
import { TearStrip } from "@/components/system/TearStrip";
import { Reveal } from "@/components/page/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Capabilities } from "@/components/about/Capabilities";
import { ReasonTags } from "@/components/about/ReasonTags";
import { Applications } from "@/components/about/Applications";
import { PlantStrip } from "@/components/about/PlantStrip";
import { compliance } from "@/content/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Over 25 years of flexible packaging for India's leading FMCG brands: 4,000 MT a month of laminates, in-house inks, cylinders and metallising, on an 18-acre BRC A Grade campus near Kanpur.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <CompanyHero
        tone="wine"
        shape="standup"
        title="Pioneering flexible packaging for India's leading food brands"
        note="25+ years, one campus"
        intro="Aditya Flexipack engineers high-performance, sustainable packaging solutions. We empower your brand to protect products, elevate market presence and drive the future of food packaging in India."
        photo={{ src: "/media/old/about-us/plant-exterior-wide.webp", alt: "The Aditya Flexipack plant across its lawn under a hazy sun" }}
        actions={
          <>
            <ButtonLink href="/contact-us/" tone="white">
              Contact us
            </ButtonLink>
            <ButtonLink href="/products/" tone="crimson" plain>
              Our products
            </ButtonLink>
          </>
        }
      />

      <Reveal>
        <section aria-labelledby="story-title" className="py-[var(--section-y)]">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <h2 id="story-title" data-reveal className="display text-[clamp(2.4rem,5vw,5rem)] text-ink lg:col-span-6">
              A trusted partner to top-tier FMCG brands for over <span className="text-crimson">25 years</span>
            </h2>
            <div data-reveal className="space-y-5 text-[1.1rem] leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8">
              <p>
                Aditya Flexipack is a key player in India&apos;s flexible packaging industry, recognised for its unwavering focus on
                innovation, quality and ethical practices. With over 25 years of expertise, we serve as trusted partners to top-tier
                FMCG brands, delivering packaging solutions that meet the highest global standards.
              </p>
              <p>
                Driven by a team of 500+ skilled professionals, we combine technical expertise, operational scale and a
                customer-first approach to deliver packaging that not only protects and preserves, but also enhances brand value.
              </p>
              <p className="font-semibold text-ink">
                At Aditya Flexipack, we don&apos;t just manufacture packaging. We engineer solutions that shape the future of
                sustainable consumer goods.
              </p>
            </div>
          </div>
          <div data-reveal className="shell mt-16">
            <FactCards keys={["years", "team", "capacity", "acres"]} />
          </div>
        </section>
      </Reveal>

      <Capabilities />

      <ReasonTags />

      <SplitRow
        title="Infrastructure"
        note="On the Kolkata to Delhi highway"
        photo={{ src: "/media/old/home/plant-exterior-building.webp", alt: "The plant building with its entrance block, flagpoles and lawn", ratio: "aspect-square" }}
        tile="foil"
      >
        <p>
          Our infrastructure is spread over 18 acres just 15 km from Kanpur, Uttar Pradesh. The plant is strategically located
          along the Kolkata to Delhi highway (NH-2), enabling efficient logistics and rapid delivery across key markets in India.
        </p>
        <p className="font-semibold text-ink">Our unit is compliant with:</p>
        <ul className="grid gap-2">
          {compliance.map((c) => (
            <li key={c} className="flex items-start gap-3 text-ink">
              <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-[var(--radius-xs)] bg-crimson text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              {c}
            </li>
          ))}
        </ul>
        <p>The unit is partially run on solar energy and has pyrolysis and rainwater harvesting facilities.</p>
      </SplitRow>

      <div className="pt-[var(--frame)]">
        <div className="panel bg-foil">
          <SplitRow
            title="Quality"
            note="Checked from resin to reel"
            flip
            tile="wash"
            photo={{ src: "/media/old/gallery/plant-proof-press-wide.webp", alt: "Proof printing press with a printed sleeve on the cylinder and ink cups on the bench", ratio: "aspect-square" }}
          >
            <p>
              Our Quality Control laboratory is fully equipped to deliver stringent oversight across all phases of production, from
              the inspection of incoming raw materials to real-time process monitoring and finished product validation. Automated,
              computer-regulated systems ensure uniform and repeatable reaction parameters, guaranteeing consistent product quality.
            </p>
            <p>
              We maintain a comprehensive archive of retained samples and analytical data, enabling complete traceability and
              long-term quality assurance. Our internal standards are precisely calibrated to meet client requirements and comply
              with international standards, so we consistently supply reliable, high-performance products tailored to our
              customers&apos; exacting standards.
            </p>
          </SplitRow>
        </div>
      </div>

      <SplitRow
        title="Recognised by clients and the nation"
        note="Two past Presidents of India"
        tile="blush"
        photo={{ src: "/media/awards/award-pratibha-patil.webp", alt: "Smt. Pratibha Devisingh Patil presenting the Entrepreneur of the Year award", ratio: "aspect-[16/11]" }}
      >
        <p>
          Over the years, we&apos;ve earned accolades from leading clients, commendations from two Past Presidents of India, and
          multiple awards from the Government of Uttar Pradesh for our entrepreneurial excellence and innovation.
        </p>
        <p>
          Certified with BRC A Grade, our operations adhere to the most stringent international food safety and quality standards.
          We are deeply committed to environmental responsibility, offering sustainable packaging options and continuously
          investing in eco-conscious technologies.
        </p>
        <ButtonLink href="/awards-recognitions/" tone="ink" className="mt-2">
          Awards and recognitions
        </ButtonLink>
      </SplitRow>

      <section aria-labelledby="circular-title" className="pt-[var(--frame)]">
        <div className="panel bg-wine py-[var(--section-y)] text-white">
          <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 0 H1200 V230 C 980 320, 820 150, 600 240 S 200 350, 0 210 Z" fill="#520912" />
          </svg>
          <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 id="circular-title" className="display text-[clamp(2.4rem,4.8vw,4.8rem)]">
                Pioneering sustainable packaging for a better future
              </h2>
              <p className="hand mt-3 -rotate-2 text-[2rem] text-blush">Circular economy focus</p>
              <h3 className="mt-8 text-[1.3rem] font-semibold">Sustainable solutions. Real-world impact.</h3>
              <p className="mt-3 max-w-[32rem] text-[1.08rem] leading-relaxed text-white/80">
                At Aditya Flexipack, we engineer packaging to reduce waste, optimise resources and champion recyclability. Our
                commitment ensures high-performance solutions that actively build a cleaner, greener tomorrow.
              </p>
              <ButtonLink href="/sustainability/" tone="white" className="mt-8">
                Our sustainability work
              </ButtonLink>
            </div>
            <div className="lg:col-span-7">
              <div className="-rotate-[2deg] rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0">
                <div className="relative aspect-[2000/885] overflow-hidden rounded-[var(--radius-md)]">
                  <Image
                    src="/media/old/about-us/mockup-pouches-wood-table.webp"
                    alt="Three printed pouches carrying the Aditya Flexipack mark, with a milk bottle and oranges on a wooden table"
                    fill
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlantStrip />

      <Applications />

      <TearStrip from="/about-us/" />
    </>
  );
}
