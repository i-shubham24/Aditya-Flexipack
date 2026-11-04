import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AboutHero } from "@/components/company/about/AboutHero";
import { TearStrip } from "@/components/system/TearStrip";
import { SectionHeader } from "@/components/system/SectionHeader";
import { NumberedList } from "@/components/system/NumberedList";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Pack, type PackFormat } from "@/components/ui/Pack";
import { Rise } from "@/components/company/common/Rise";
import { DriftPhoto } from "@/components/company/common/DriftPhoto";
import { UnderOneRoof } from "@/components/company/about/UnderOneRoof";
import { compliance } from "@/content/site";

const PATH = "/about-us/";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Over 25 years of flexible packaging for India's leading FMCG brands: 4,000 MT a month of laminates, in-house inks, cylinders and metallising, on an 18-acre BRC A Grade campus near Kanpur.",
  alternates: { canonical: PATH },
};

const REASONS = ["Benchmarked quality", "Rapid turnaround time", "Heavily backward integrated", "Customer satisfaction", "Ethical practices"];

const QUALITY = [
  { title: "Raw materials inspected on arrival" },
  { title: "Processes monitored in real time" },
  { title: "Finished products validated" },
  { title: "Computer-regulated systems keep every run consistent" },
  { title: "Retained samples and data for full traceability" },
  { title: "Standards set to client needs and international norms" },
];

/** The old About page's application areas, each drawn as the pack format it typically runs in. */
const AREAS: { name: string; format: PackFormat }[] = [
  { name: "Biscuits and cakes", format: "pillow" },
  { name: "Confectionery", format: "wrapper" },
  { name: "Shrink films and collation packs", format: "polybag" },
  { name: "Atta, salt and oil", format: "gusset" },
  { name: "Pouches", format: "standup" },
  { name: "Home, personal and healthcare", format: "sachet" },
  { name: "Aluminium foil based wrappers", format: "laddi" },
  { name: "Pet food and meat packaging", format: "spout" },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero
        actions={
          <>
            <ButtonLink href="/contact-us/" tone="white">
              Contact us
            </ButtonLink>
            <TextLink href="/products/" tone="white">
              Our products
            </TextLink>
          </>
        }
      />

      {/* 2. The story, then the four published figures as type */}
      <section aria-labelledby="story-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid gap-y-8">
          <h2 id="story-title" data-rise className="display span-lead text-d2 text-ink">
            A trusted partner to top-tier FMCG brands
          </h2>
          <div data-rise className="span-side max-w-measure space-y-3 self-end text-lead text-ink-soft">
            <p>We are a key player in India&apos;s flexible packaging industry.</p>
            <p>We are known for innovation, quality and ethical practice.</p>
            <p>Our packs meet the highest global standards. They protect, preserve and add brand value.</p>
            <p className="font-semibold text-ink">We don&apos;t just make packaging. We engineer solutions for sustainable consumer goods.</p>
          </div>
        </Rise>
      </section>

      {/* 3. The centrepiece */}
      <UnderOneRoof />

      {/* 4. Why us: five reasons, typeset */}
      <section aria-labelledby="why-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson py-[calc(var(--section-y)*0.65)] text-white">
          <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
            <path d="M0 520 C 220 430, 380 620, 620 540 S 1000 360, 1200 450 V800 H0 Z" fill="#b80000" />
            <path d="M820 0 C 860 140, 1010 190, 1090 110 S 1170 30, 1200 50 V0 Z" fill="#e01810" />
          </svg>
          <Rise className="shell page-grid gap-y-6 sm:gap-y-8">
            <h2 id="why-title" data-rise className="display span-lead text-d2">
              Why us
            </h2>
            <ul className="span-lead space-y-3 lg:row-start-2">
              {REASONS.map((r) => (
                <li key={r} data-rise className="display text-d3">
                  {r}
                </li>
              ))}
            </ul>
            <ul data-rise className="span-side max-w-measure space-y-3 self-end text-lead text-white/90 lg:row-start-2">
              <li>We are family-owned and managed. We pair experience with professionalism.</li>
              <li>Stable leadership and open communication mean quick decisions.</li>
              <li>That builds lasting partnerships and steady growth.</li>
              <li>We treat every challenge as a chance to excel.</li>
            </ul>
          </Rise>
        </div>
      </section>

      {/* 5. Infrastructure */}
      <section aria-labelledby="infra-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid items-center gap-y-12">
          <div data-rise className="col-span-full lg:col-span-6">
            <h2 id="infra-title" className="display text-d2 text-ink">
              Infrastructure
            </h2>
            <div className="mt-6 max-w-measure space-y-3 text-lead text-ink-soft">
              <p>Our campus is 15 km from Kanpur, Uttar Pradesh.</p>
              <p>It sits on the Kolkata to Delhi highway (NH-2), for fast delivery across India.</p>
              <p>We meet strict international food safety and quality standards. Our unit complies with:</p>
            </div>
            <ul className="mt-6 max-w-measure">
              {compliance.map((c, i) => (
                <li
                  key={c}
                  className={`flex min-h-12 items-center gap-3 rounded-[var(--radius-sm)] px-4 py-2 font-semibold text-ink ${i % 2 === 0 ? "bg-foil" : "bg-white"}`}
                >
                  <Check aria-hidden className="size-5 shrink-0 text-crimson" strokeWidth={3} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <DriftPhoto
            src="/media/old/about-us/plant-exterior-wide.webp"
            alt="Wide view of the plant across its lawn under a hazy sun, with a tall mast"
            ratio="16:9"
            caption="The plant across its lawn, near Kanpur"
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="col-span-full lg:col-span-6 lg:col-start-7"
          />
        </Rise>
      </section>

      {/* 6. Quality */}
      <section aria-labelledby="quality-title" className="pt-[var(--frame)]">
        <div className="panel bg-foil py-[var(--section-y)]">
          <Rise className="shell">
            <div data-rise>
              <SectionHeader id="quality-title" title="Quality" standfirst="Our fully equipped QC laboratory checks every stage of production." />
            </div>
            <div className="page-grid gap-y-12">
              <div data-rise className="col-span-full lg:col-span-8">
                <NumberedList items={QUALITY} cols={2} />
              </div>
              <PhotoFrame
                src="/media/old/gallery/plant-proof-press-sleeve-close.webp"
                alt="The proof press with a blue printed sleeve on the cylinder and cleaning cloths"
                ratio="4:5"
                caption="The proof press, with a printed sleeve on the cylinder"
                sizes="(min-width: 640px) 30vw, 100vw"
                className="col-span-full sm:col-span-4 lg:col-start-9"
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 7. Recognition, in short; the evidence lives on the Awards page */}
      <section aria-labelledby="recognition-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid gap-y-8">
          <h2 id="recognition-title" data-rise className="display span-lead text-d2 text-ink">
            Recognised by clients and the nation
          </h2>
          <div data-rise className="span-side self-end">
            <ul className="max-w-measure space-y-3 text-lead text-ink-soft">
              <li>Accolades from leading clients.</li>
              <li>Commendations from two past Presidents of India.</li>
              <li>Multiple awards from the Uttar Pradesh government for entrepreneurship and innovation.</li>
            </ul>
            <ButtonLink href="/awards-recognitions/" tone="ink" className="mt-8">
              Awards and recognitions
            </ButtonLink>
          </div>
        </Rise>
      </section>

      {/* 8. Application areas, as pack silhouettes on the panel */}
      <section aria-labelledby="apps-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson-wash py-[var(--section-y)]">
          <Rise className="shell page-grid gap-y-12">
            <h2 id="apps-title" data-rise className="display span-lead text-d2 text-ink">
              Application areas
            </h2>
            <div data-rise className="span-side self-end lg:justify-self-end">
              <ButtonLink href="/offerings/" tone="ink">
                Our offerings
              </ButtonLink>
            </div>
            <ul className="col-span-full grid grid-cols-subgrid gap-y-12">
              {AREAS.map((a, i) => (
                <li key={a.name} data-rise className="col-span-2 lg:col-span-3">
                  <span className="flex h-28 items-end sm:h-36">
                    <Pack format={a.format} ink={i % 2 ? "#45060e" : "#ce0000"} className="h-full w-auto max-w-full" />
                  </span>
                  <h3 className="display mt-5 text-d4 text-ink">{a.name}</h3>
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      <TearStrip from={PATH} />
    </>
  );
}
