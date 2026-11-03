import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section data-hero="dark" aria-labelledby="nf-title">
      <div className="relative overflow-clip rounded-b-[var(--radius-2xl)] bg-wine text-white">
        <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <path d="M640 800 C 610 640, 520 560, 600 430 S 860 300, 900 170 S 1080 -20, 1200 40 V800 Z" fill="#520912" />
          <path d="M0 800 C 80 740, 190 760, 250 700 S 330 600, 420 640 S 520 760, 560 800 Z" fill="#3a040b" />
        </svg>
        <div className="shell relative grid min-h-[min(86svh,52rem)] place-items-center pb-[var(--section-y)] pt-[calc(var(--header-h)+3rem)] text-center">
          <div className="max-w-[54rem]">
            <p className="display text-[clamp(6rem,20vw,16rem)] leading-none text-crimson-light">404</p>
            <h1 id="nf-title" className="display mt-2 text-[clamp(2.4rem,5.6vw,5rem)]">
              This pack is not on our shelf
            </h1>
            <p className="hand mt-4 inline-block -rotate-2 text-[2rem] text-blush">The page may have moved when we rebuilt the site</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/" tone="white">
                Back to home
              </ButtonLink>
              <ButtonLink href="/products/" tone="crimson" plain>
                See our products
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
