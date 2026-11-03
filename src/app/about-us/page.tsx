import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CompanyHero } from "@/components/heroes/CompanyHero";
import { TearStrip } from "@/components/system/TearStrip";
import { SectionHeader } from "@/components/system/SectionHeader";
import { NumberedList } from "@/components/system/NumberedList";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Pack, type PackFormat } from "@/components/ui/Pack";
import { Rise } from "@/components/company/common/Rise";
import { CountUp } from "@/components/company/common/CountUp";
import { DriftPhoto } from "@/components/company/common/DriftPhoto";
import { UnderOneRoof } from "@/components/company/about/UnderOneRoof";
import { compliance, facts } from "@/content/site";
import { pageOf } from "@/content/next";

const PATH = "/about-us/";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Over 25 years of flexible packaging for India's leading FMCG brands: 4,000 MT a month of laminates, in-house inks, cylinders and metallising, on an 18-acre BRC A Grade campus near Kanpur.",
  alternates: { canonical: PATH },
};

/** The four published figures, as type only. */
const IDENTITY = [
  { value: facts.years.value, unit: "years", label: "Of flexible packaging expertise" },
  { value: facts.team.value, unit: "people", label: "Skilled professionals" },
  { value: facts.capacity.value, unit: "MT / month", label: "Laminates production capacity" },
  { value: facts.acres.value, unit: "acres", label: "Campus near Kanpur, Uttar Pradesh" },
];

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
      <CompanyHero
        tone={pageOf(PATH).tone}
        shape="standup"
        title="Pioneering flexible packaging for India's leading food brands"
        intro="We engineer high-performance, sustainable packaging. It protects your product and raises your brand's market presence."
        photo={{ src: "/media/old/home/plant-exterior-building.webp", alt: "The plant: a grey factory building with a brown entrance block, flagpoles and a lawn" }}
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
          <dl className="col-span-full mt-[var(--stack)] grid grid-cols-subgrid gap-y-10">
            {IDENTITY.map((f) => (
              <div key={f.unit} data-rise className="col-span-2 flex flex-col-reverse lg:col-span-3">
                <dt className="mt-3 text-small">
                  <span className="block font-semibold text-ink">{f.unit}</span>
                  <span className="block text-ink-soft">{f.label}</span>
                </dt>
                <dd className="display tabular text-d2 text-crimson">
                  <CountUp value={f.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Rise>
      </section>

      {/* 3. The centrepiece */}
      <UnderOneRoof />

      {/* 4. Why us: five reasons, typeset */}
      <section aria-labelledby="why-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson py-[var(--section-y)] text-white">
          <Rise className="shell page-grid gap-y-10">
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
