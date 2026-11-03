import { facts } from "@/content/site";

type FactKey = keyof typeof facts;

const LOOKS = [
  { bg: "bg-crimson", ink: "text-white", tilt: "sm:-rotate-[3deg]" },
  { bg: "bg-wine", ink: "text-white", tilt: "sm:rotate-[2deg]" },
  { bg: "bg-foil-2", ink: "text-ink", tilt: "sm:-rotate-[1deg]" },
  { bg: "bg-ink", ink: "text-white", tilt: "sm:rotate-[3deg]" },
  { bg: "bg-blush", ink: "text-wine", tilt: "sm:-rotate-[2deg]" },
];

// Written out in full so Tailwind can see them.
const COLS = ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"];

/** The client's own published figures as dealt cards; each squares up when you point at it. */
export function FactCards({ keys, className = "" }: { keys: FactKey[]; className?: string }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${COLS[Math.min(keys.length, 4)]} ${className}`}>
      {keys.map((k, i) => {
        const f = facts[k];
        const look = LOOKS[i % LOOKS.length];
        return (
          <li
            key={k}
            className={`rounded-[var(--radius-xl)] p-6 transition-[rotate,scale] duration-500 ease-[var(--ease-back)] hover:scale-[1.04] sm:hover:rotate-0 ${look.tilt} ${look.bg} ${look.ink}`}
          >
            <p className="display tabular text-[clamp(3rem,5vw,4.6rem)] leading-none">{f.value}</p>
            <p className="hand mt-1 text-[1.7rem] opacity-90">{f.unit}</p>
            <p className="mt-6 text-[1rem] leading-snug opacity-90">{f.label}</p>
          </li>
        );
      })}
    </ul>
  );
}
