import { TONES, type Tone } from "@/components/system/tones";

/** Soft tonal shapes, one per placement, so neighbouring panels never wear the same curve. */
const SHAPES = {
  low: "M0 560 C 220 470, 400 650, 660 560 S 1020 420, 1200 500 V800 H0 Z",
  high: "M0 0 H1200 V230 C 980 320, 820 150, 600 240 S 200 350, 0 210 Z",
  corner: "M820 0 C 860 170, 1010 230, 1100 140 S 1180 40, 1200 60 V0 Z M0 640 C 120 560, 260 700, 380 800 H0 Z",
  rise: "M0 800 V420 C 160 330, 300 520, 520 450 S 860 300, 1200 380 V800 Z",
} as const;

/**
 * The homepage's panel contour: a soft shape in a slightly deeper shade of the panel's own hue, behind the
 * content. Put it first inside a `.panel`, and give the content that follows `relative` so it sits on top.
 */
export function Contour({ tone, shape = "low" }: { tone: Tone; shape?: keyof typeof SHAPES }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <path d={SHAPES[shape]} fill={TONES[tone].contour} />
    </svg>
  );
}
