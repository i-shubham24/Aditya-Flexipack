import type { Metadata } from "next";
import { TearStrip } from "@/components/system/TearStrip";
import { NumberedList } from "@/components/system/NumberedList";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Rise } from "@/components/company/common/Rise";
import { CareerHero } from "@/components/company/career/CareerHero";
import { RidingApply } from "@/components/company/career/RidingApply";
import { pageOf } from "@/content/next";

const PATH = "/career/";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Build a career with purpose at Aditya Flexipack. Join 500+ skilled professionals redefining flexible packaging, with a culture of continuous learning and mentorship.",
  alternates: { canonical: PATH },
};

const CULTURE = [
  { title: "We empower our people to lead with purpose" },
  { title: "A collaborative culture of continuous learning and mentorship" },
  { title: "The tools and support to build a career with impact" },
];

export default function CareerPage() {
  return (
    <>
      <CareerHero tone={pageOf(PATH).tone} />

      {/* 2. Join a team of visionaries */}
      <section aria-labelledby="team-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid items-center gap-y-12">
          <div data-rise className="col-span-full lg:col-span-5">
            <h2 id="team-title" className="display text-d2 text-ink">
              Join a team of visionaries
            </h2>
            <div className="mt-6 max-w-measure space-y-3 text-lead text-ink-soft">
              <p>We are a community of passionate thinkers and problem solvers.</p>
              <p>From day one, you will find support to grow and develop.</p>
              <p>We want leaders who act with integrity, push boundaries, and bring ideas to life.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#apply" tone="ink">
                View open positions
              </ButtonLink>
              <TextLink href="/about-us/">About us</TextLink>
            </div>
          </div>
          <PhotoFrame
            src="/media/plant/press-hall.webp"
            alt="The modern press hall at Rania: lines of roll stock on the right, high-speed machine hall in the centre"
            ratio="16:9"
            caption="The converting floor at the Rania campus"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="col-span-full lg:col-span-7"
          />
        </Rise>
      </section>

      {/* 3. Our culture */}
      <section id="culture" aria-labelledby="culture-title" className="py-[var(--section-y)]">
        <div className="shell page-grid gap-y-12">
          <div className="col-span-full lg:col-span-4">
            <h2 id="culture-title" className="display text-d2 text-ink">
              Our culture
            </h2>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">
              Integrity, continuous learning and purpose drive every shift across our 18-acre campus.
            </p>
          </div>
          <div className="col-span-full lg:col-span-8">
            <NumberedList items={CULTURE} cols={1} />
          </div>
        </div>
      </section>

      {/* 4. The application form */}
      <section id="apply" aria-labelledby="apply-title" className="py-[var(--section-y)]">
        <div className="shell">
          <Rise className="page-grid gap-y-12">
            <div data-rise className="col-span-full lg:col-span-4">
              <h2 id="apply-title" className="display text-d2 text-ink">
                Apply now
              </h2>
              <ul className="mt-6 max-w-measure space-y-2 text-lead text-ink-soft">
                <li>Tell us about yourself and where you work today.</li>
                <li>Attach your resume at the end.</li>
              </ul>
            </div>
            <div className="col-span-full lg:col-span-8 lg:col-start-5">
              <EnquiryForm form="career" />
            </div>
          </Rise>
        </div>
      </section>

      <TearStrip from={PATH} />

      <RidingApply target="#apply" />
    </>
  );
}
