import type { ReactNode } from "react";

/** Long-form text (policies, terms, letters) set for reading: one measure, clear heading steps. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="shell py-[var(--section-y)]">
      <div className="mx-auto max-w-[46rem] text-[1.08rem] leading-[1.75] text-ink-soft [&_a]:font-semibold [&_a]:text-crimson [&_a]:underline [&_h2]:mb-4 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:font-extrabold [&_h2]:leading-[0.95] [&_h2]:tracking-[-0.02em] [&_h2]:mt-14 [&_h2]:text-[clamp(1.9rem,3vw,2.6rem)] [&_h2]:text-ink [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}
