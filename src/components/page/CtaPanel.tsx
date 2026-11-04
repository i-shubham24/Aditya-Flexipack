import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

/** Closing panel for inner pages: clean white backdrop directly above footer with crisp contrast. */
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
      <div className="panel bg-white py-[calc(var(--section-y)*0.8)] text-ink ">
        <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="display text-[clamp(2.6rem,6vw,6rem)] text-ink">
              {title}
            </h2>
            {note && <p className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">{note}</p>}
          </div>
          <div className="lg:col-span-5">
            <div className="max-w-[30rem] text-[1.1rem] leading-relaxed text-ink-soft">
              {children ?? "Tell us about your product, format and volumes. Our team will come back with the right structure and a plan for samples."}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {actions ?? (
                <>
                  <ButtonLink href="/contact-us/" tone="crimson">
                    Contact us
                  </ButtonLink>
                  <ButtonLink href="/packaging-partnership/" tone="ink" plain>
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
