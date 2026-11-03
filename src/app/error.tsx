"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Keeps the header and footer standing if a section fails, instead of leaving an empty page. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="error-title" className="pt-[calc(var(--header-h)+var(--frame))]">
      <div className="panel bg-crimson-wash py-[var(--section-y)]">
        <div className="shell max-w-[48rem] text-center">
          <p className="hand -rotate-2 text-[2rem] text-crimson">A misprint on our side</p>
          <h1 id="error-title" className="display mt-2 text-[clamp(2.6rem,6vw,5rem)] text-wine">
            This page did not load properly
          </h1>
          <p className="mx-auto mt-5 max-w-[34rem] text-[1.08rem] leading-relaxed text-ink-soft">
            Try it once more. If it keeps happening, write to us and we will look into it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button tone="crimson" onClick={() => retry()}>
              Try again
            </Button>
            <ButtonLink href="/" tone="ink" plain>
              Back to home
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
