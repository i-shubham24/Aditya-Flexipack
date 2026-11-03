import type { Metadata } from "next";
import Link from "next/link";
import { TearStrip } from "@/components/system/TearStrip";
import { NumberedList } from "@/components/system/NumberedList";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Rise } from "@/components/company/common/Rise";
import { CareerHero } from "@/components/company/career/CareerHero";
import { HeadcountPrint } from "@/components/company/career/HeadcountPrint";
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
      <CareerHero
        tone={pageOf(PATH).tone}
        title="A career with purpose. A company with impact."
        note="Our team"
        intro={
          <>
            <p>The future of packaging is a shared vision.</p>
            <p className="mt-2">We want passionate people who push boundaries and redefine what is possible.</p>
            <p className="mt-2">Our work should benefit our partners and our planet.</p>
          </>
        }
        photo={{
          src: "/media/old/home/plant-production-hall-floor.webp",
          alt: "A wide production hall with red floor-edge markings, roll stock behind and a colleague walking through",
        }}
        action={
          <ButtonLink href="#apply" tone="wine">
            Apply now
          </ButtonLink>
        }
      />

      {/* 2. Join a team of visionaries */}
      <section aria-labelledby="team-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid items-end gap-y-12">
          <div data-rise className="col-span-full lg:col-span-6">
            <h2 id="team-title" className="display text-d2 text-ink">
              Join a team of visionaries
            </h2>
            <NumberedList items={CULTURE} className="mt-[var(--stack)]" />
            <p className="mt-10 max-w-measure text-ink-soft">
              Business Standard gave us its Best Employer Brand Award in 2018.{" "}
              <Link
                href="/awards-recognitions/"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-crimson decoration-2 underline-offset-[0.25em] hover:text-crimson"
              >
                See our awards
              </Link>
            </p>
          </div>
          <PhotoFrame
            src="/media/old/home/plant-press-hall-overview.webp"
            alt="Elevated view of the press hall: a gravure press line, a yellow guard tube, colleagues at work and ink drums"
            ratio="4:5"
            caption="Colleagues at work in the gravure press hall"
            sizes="(min-width: 640px) 30vw, 100vw"
            className="col-span-full sm:col-span-4 lg:col-start-9"
          />
        </Rise>
      </section>

      {/* 3. The centrepiece */}
      <HeadcountPrint />

      {/* 4. The application form */}
      <section id="apply" aria-labelledby="apply-title" className="scroll-mt-24 pt-[var(--frame)]">
        <div className="panel bg-foil py-[var(--section-y)]">
          <Rise className="shell page-grid gap-y-10">
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
