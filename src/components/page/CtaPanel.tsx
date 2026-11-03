import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

/** Closing panel for inner pages: one clear next step on the crimson field. */
export function CtaPanel({
  title = "Have a pack in mind?",
  note = "We reply within a working day",
  children,
  actions,
}: {
  title?: string;
  note?: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section aria-labelledby="cta-title" className="pt-[var(--frame)]">
      <div className="panel bg-crimson py-[calc(var(--section-y)*0.8)] text-white">
        <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 420 C 220 330, 380 520, 620 430 S 1000 260, 1200 360 V600 H0 Z" fill="#b80000" />
          <path d="M760 0 C 820 120, 980 160, 1060 90 S 1160 20, 1200 40 V0 Z" fill="#e01810" />
        </svg>
        <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="display text-[clamp(2.6rem,6vw,6rem)]">
              {title}
            </h2>
            {note && <p className="hand mt-3 inline-block -rotate-2 text-[2rem] text-blush">{note}</p>}
          </div>
          <div className="lg:col-span-5">
            <div className="max-w-[30rem] text-[1.1rem] leading-relaxed text-white/90">
              {children ?? "Tell us about your product, format and volumes. Our team will come back with the right structure and a plan for samples."}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {actions ?? (
                <>
                  <ButtonLink href="/contact-us/" tone="white">
                    Contact us
                  </ButtonLink>
                  <ButtonLink href="/packaging-partnership/" tone="wine" plain>
                    Packaging partnership
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
