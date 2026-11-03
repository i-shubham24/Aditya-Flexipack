import type { ReactNode } from "react";

/** Bin colours from the logo palette: the body, its rim and the dark opening behind the scooped front. */
export const BINS = {
  crimson: { body: "#ce0000", bg: "bg-crimson", lip: "#b80000", inside: "#1c1517", pressed: "group-aria-pressed:bg-ink" },
  wine: { body: "#45060e", bg: "bg-wine", lip: "#5c0b15", inside: "#1c1517", pressed: "group-aria-pressed:bg-crimson" },
  blush: { body: "#ffc9c2", bg: "bg-blush", lip: "#ffb4aa", inside: "#a10000", pressed: "group-aria-pressed:bg-crimson" },
  ink: { body: "#1c1517", bg: "bg-ink", lip: "#2a2124", inside: "#141518", pressed: "group-aria-pressed:bg-crimson" },
  foil: { body: "#dfe2e6", bg: "bg-foil-2", lip: "#c6cbd1", inside: "#8b9198", pressed: "group-aria-pressed:bg-crimson" },
  deep: { body: "#a10000", bg: "bg-crimson-deep", lip: "#8c0000", inside: "#45060e", pressed: "group-aria-pressed:bg-ink" },
} as const;

export type BinColour = keyof typeof BINS;

/**
 * The front of a stores bin as one chunky colour block: the dark opening behind the scooped front, a rim, and a
 * body with soft lower corners. Whatever is passed in sits on the body as its label card.
 */
export function BinFace({ colour, children, className = "" }: { colour: BinColour; children: ReactNode; className?: string }) {
  const c = BINS[colour];
  return (
    <span className={`block ${className}`}>
      <svg aria-hidden viewBox="0 0 300 48" preserveAspectRatio="none" className="block h-9 w-full sm:h-11">
        <path d="M14 0 H286 Q300 0 300 14 V48 H0 V14 Q0 0 14 0 Z" fill={c.inside} />
        <path d="M0 14 C 70 14, 95 31, 150 31 S 230 14, 300 14 V48 H0 Z" fill={c.lip} />
        <path d="M0 24 C 70 24, 95 41, 150 41 S 230 24, 300 24 V48 H0 Z" fill={c.body} />
      </svg>
      <span className={`block rounded-b-[var(--radius-xl)] px-[8%] pb-[11%] pt-1 ${c.bg}`}>{children}</span>
    </span>
  );
}

/** Hero teaser for Vendor partnership: two bins stacked, the top one labelled by hand, the lower one still blank. */
export function BinStack() {
  return (
    <div className="w-full max-w-[15rem] sm:max-w-[17rem] lg:ml-auto lg:max-w-[19rem]">
      <BinFace colour="crimson">
        <span className="flex min-h-[4.75rem] items-center rounded-[var(--radius-md)] bg-white px-4 py-3">
          <span className="hand inline-block -rotate-2 text-note text-crimson">Vendor partnership</span>
        </span>
      </BinFace>
      <BinFace colour="blush" className="mt-3">
        <span aria-hidden className="flex min-h-[4.75rem] flex-col justify-center gap-2 rounded-[var(--radius-md)] bg-white px-4 py-3">
          <span className="block h-4 w-3/4 rounded-[var(--radius-xs)] bg-blush" />
          <span className="block h-4 w-1/2 rounded-[var(--radius-xs)] bg-blush" />
        </span>
      </BinFace>
    </div>
  );
}
