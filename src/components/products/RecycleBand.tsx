import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

/** The old product pages close on this pledge; kept, on the silver panel, with a real eco pouch. */
export function RecycleBand() {
  return (
    <section aria-labelledby="recycle-title" className="pt-[var(--frame)]">
      <div className="panel bg-foil py-[calc(var(--section-y)*0.8)]">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 140 C 260 60, 440 260, 700 170 S 1040 40, 1200 110 V0 H0 Z" fill="#e4e7eb" />
          <path d="M0 600 V470 C 300 400, 520 560, 820 480 S 1120 420, 1200 450 V600 Z" fill="#dadee3" />
        </svg>
        <div className="shell relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="recycle-title" className="display text-[clamp(2.6rem,5.2vw,5rem)] text-ink">
              Recycling maximised. Forests sustained.
            </h2>
            <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-relaxed text-ink-soft">
              Making the most of the resources we use is part of our commitment to the future.
            </p>
            <ButtonLink href="/sustainability/" tone="ink" className="mt-7">
              Our sustainability work
            </ButtonLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="group rotate-[2deg] rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src="/media/old/home/photo-eco-pouch-shopping-basket.webp"
                  alt="Hands holding a printed kraft pouch with the Aditya Flexipack mark over a basket of fresh produce"
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
