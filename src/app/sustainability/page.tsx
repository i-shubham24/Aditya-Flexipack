import type { Metadata } from "next";
import Image from "next/image";
import { TearStrip } from "@/components/system/TearStrip";
import { ButtonLink } from "@/components/ui/Button";
import { Rise } from "@/components/company/common/Rise";
import { DriftPhoto } from "@/components/company/common/DriftPhoto";
import { SustainHero } from "@/components/company/sustainability/SustainHero";
import { MimicPanel } from "@/components/company/sustainability/MimicPanel";
import { pageOf } from "@/content/next";

const PATH = "/sustainability/";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "1.35 MW of solar power, three rainwater harvesting systems, a recycling plant with three-stage pyrolysis and post-industrial recycled materials on request: sustainability at the core of Aditya Flexipack.",
  alternates: { canonical: PATH },
};

const recyclable = (
  <ButtonLink href="/packaging-partnership/" tone="crimson">
    Talk to us about recyclable packs
  </ButtonLink>
);

export default function SustainabilityPage() {
  return (
    <>
      <SustainHero
        tone={pageOf(PATH).tone}
        title="Sustainability at the core of our packaging solutions"
        intro={
          <>
            <p>Innovation must go hand in hand with environmental responsibility.</p>
            <p className="mt-2">We build on clean energy, practical action and circular economy principles.</p>
            <p className="mt-2">Every pack should leave a lighter footprint.</p>
          </>
        }
        photo={{
          src: "/media/old/home/photo-eco-pouch-shopping-basket.webp",
          alt: "Hands holding a printed kraft eco pouch above a shopping basket of fresh produce",
        }}
        action={recyclable}
      />

      {/* 2. The centrepiece */}
      <MimicPanel />

      {/* 3. Message from our CEO, word for word */}
      <section aria-labelledby="ceo-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid gap-y-[var(--stack)]">
          <h2 id="ceo-title" data-rise className="display span-lead text-d2 text-ink">
            Message from our CEO
          </h2>
          <figure data-rise className="col-span-full lg:col-span-10">
            <blockquote>
              <p className="display text-d3 text-ink">
                <span aria-hidden className="text-crimson">
                  &ldquo;
                </span>
                At Aditya Flexipack, we are committed to innovation, quality and customer satisfaction. Our focus is on delivering
                advanced, sustainable and reliable packaging solutions. Strong partnerships and ethical business practices drive our
                success. Together, we shape the future of flexible packaging.
                <span aria-hidden className="text-crimson">
                  &rdquo;
                </span>
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-5">
              <Image
                src="/media/old/shared/af-emblem-tile.webp"
                alt=""
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-[var(--radius-md)]"
              />
              <span>
                <span className="hand inline-block -rotate-2 text-note text-crimson">Aditya Tondon</span>
                <span className="mt-1 block text-small text-ink-soft">Managing Director &amp; Global CEO</span>
              </span>
            </figcaption>
          </figure>
        </Rise>
      </section>

      {/* 4. Our eco-friendly approach, with the panorama straight on the panel */}
      <section aria-labelledby="eco-title" className="pt-[var(--frame)]">
        <div className="panel bg-crimson-wash py-[var(--section-y)]">
          <Rise className="shell page-grid gap-y-[var(--stack)]">
            <div data-rise className="col-span-full lg:col-span-6">
              <h2 id="eco-title" className="display text-d2 text-ink">
                Our eco-friendly approach
              </h2>
              <h3 className="display mt-6 text-d4 text-wine">Moving towards a greener tomorrow</h3>
              <ul className="mt-4 max-w-measure space-y-2 text-lead text-ink-soft">
                <li>Sustainability is not a trend for us. It is a responsibility.</li>
                <li>We conserve resources, save energy and use materials responsibly.</li>
                <li>These greener practices benefit our clients and the environment.</li>
              </ul>
            </div>
            <DriftPhoto
              src="/media/old/about-us/photo-seedling-in-hand.webp"
              alt="A hand holding a young sprouting seedling in soil, in golden light"
              ratio="21:9"
              caption="A young seedling held in soil"
              sizes="(min-width: 1472px) 1400px, 100vw"
              className="col-span-full"
            />
          </Rise>
        </div>
      </section>

      {/* 5. The closing line, straight, and the way to start */}
      <section aria-labelledby="closing-title" className="py-[var(--section-y)]">
        <Rise className="shell page-grid gap-y-[var(--stack)]">
          <h2 id="closing-title" className="display col-span-full text-d1">
            <span data-rise className="block text-crimson">
              Smart packaging.
            </span>
            <span data-rise className="block text-wine">
              Cleaner planet.
            </span>
            <span data-rise className="block text-ink">
              Sustainable future.
            </span>
          </h2>
          <div data-rise className="span-side">
            {recyclable}
          </div>
        </Rise>
      </section>

      <TearStrip from={PATH} />
    </>
  );
}
