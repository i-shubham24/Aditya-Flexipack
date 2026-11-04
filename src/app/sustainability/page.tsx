import type { Metadata } from "next";
import { TearStrip } from "@/components/system/TearStrip";
import { NumberedList } from "@/components/system/NumberedList";
import { PhotoFrame } from "@/components/system/PhotoFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Rise } from "@/components/company/common/Rise";
import { SustainHero } from "@/components/company/sustainability/SustainHero";
import { MimicPanel } from "@/components/company/sustainability/MimicPanel";
import { pageOf } from "@/content/next";

const PATH = "/sustainability/";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "1.35 MW of on-site solar power, three rainwater harvesting systems, a recycling plant with three-stage pyrolysis, and recycled materials on request, across our 18-acre campus near Kanpur.",
  alternates: { canonical: PATH },
};

const RESPONSIBILITY = [
  { title: "Raw materials from certified sustainable sources" },
  { title: "Energy-efficient machinery across all six bays" },
  { title: "Closed-loop solvent recovery and water treatment" },
];

export default function SustainabilityPage() {
  return (
    <>
      <SustainHero
        tone={pageOf(PATH).tone}
        title="Engineering a sustainable future"
        intro="1.35 MW of on-site solar power, closed-loop recycling and high-barrier recyclable mono-material packaging."
        photo={{
          src: "/media/plant/plant-exterior.webp",
          alt: "The 18-acre green campus at Rania with on-site solar installation",
        }}
        action={
          <ButtonLink href="/packaging-partnership/" tone="white">
            Talk to us
          </ButtonLink>
        }
      />

      {/* 2. Three pillars: solar, water, recycling */}
      <MimicPanel />

      {/* 3. Sustainable responsibility list */}
      <section aria-labelledby="resp-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid items-center gap-y-12">
          <div data-rise className="col-span-full lg:col-span-5">
            <h2 id="resp-title" className="display text-d2 text-ink">
              Responsible by principle
            </h2>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">
              Every process on our 18-acre campus is designed to conserve resources, minimize waste, and meet global environmental standards.
            </p>
          </div>
          <div data-rise className="col-span-full lg:col-span-7">
            <NumberedList items={RESPONSIBILITY} cols={1} />
          </div>
        </Rise>
      </section>

      {/* 4. Our eco-friendly approach, balanced side-by-side layout */}
      <section id="initiatives" aria-labelledby="eco-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson-wash py-[var(--section-y)]">
          <Rise className="shell page-grid items-center gap-y-10">
            <div data-rise className="col-span-full lg:col-span-6">
              <h2 id="eco-title" className="display text-d2 text-ink">
                Our eco-friendly approach
              </h2>
              <h3 className="display mt-4 text-d4 text-wine">Moving towards a greener tomorrow</h3>
              <div className="mt-4 max-w-measure space-y-2.5 text-lead text-ink-soft">
                <p>Sustainability is not a trend for us. It is a responsibility.</p>
                <p>We conserve resources, save energy and use materials responsibly across every shift.</p>
                <p>These greener practices benefit our brand partners, consumers, and the environment.</p>
              </div>
            </div>
            <div data-rise className="col-span-full lg:col-span-6 flex justify-center lg:justify-end">
              <PhotoFrame
                src="/media/old/about-us/photo-seedling-in-hand.webp"
                alt="A hand holding a young sprouting seedling in soil"
                ratio="4:3"
                caption="Sustainable packaging development at our campus"
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="w-full max-w-[28rem]"
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 5. The closing line: rich crimson panel with wavy contours */}
      <section aria-labelledby="closing-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson py-[calc(var(--section-y)*0.75)] text-white overflow-hidden">
          <svg
            aria-hidden
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z"
              fill="#dc0a05"
            />
            <path
              d="M760 800 C 720 680, 680 600, 760 500 S 960 420, 1010 300 S 1150 160, 1200 190 V800 Z"
              fill="#e81911"
            />
            <path
              d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z"
              fill="#b80000"
            />
          </svg>
          <Rise className="shell page-grid relative z-10 items-center gap-y-8">
            <div className="col-span-full lg:col-span-8">
              <h2 id="closing-title" className="display text-[clamp(2.8rem,6.2vw,6.2rem)] leading-[0.92] text-white">
                Smart packaging. <br />
                <span className="text-blush">Cleaner planet.</span> <br />
                Sustainable future.
              </h2>
            </div>
            <div data-rise className="col-span-full lg:col-span-4 lg:text-right">
              <ButtonLink href="/packaging-partnership/" tone="white">
                Talk to us
              </ButtonLink>
            </div>
          </Rise>
        </div>
      </section>

      <TearStrip from={PATH} />
    </>
  );
}
