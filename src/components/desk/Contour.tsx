/**
 * Soft tonal contour shapes in a panel's own hue, the way the homepage panels carry them. Place it first inside
 * a `.panel` and give the panel's content `relative` so it sits above.
 */
const HUES = {
  foil: ["#e4e7eb", "#dadee3"],
  wash: ["#ffd9d3", "#ffcfc8"],
  crimson: ["#c40000", "#b80000"],
  wine: ["#4f0912", "#5c0b15"],
} as const;

const SHAPES = [
  ["M0 260 C 200 150, 380 380, 620 290 S 1000 110, 1200 210 V800 H0 Z", "M0 600 C 240 520, 430 700, 680 620 S 1030 470, 1200 540 V800 H0 Z"],
  ["M0 120 C 260 40, 420 260, 700 180 S 1060 20, 1200 90 V800 H0 Z", "M0 520 C 180 600, 420 430, 640 520 S 980 660, 1200 560 V800 H0 Z"],
  ["M0 380 C 160 300, 340 460, 560 380 S 940 240, 1200 330 V800 H0 Z", "M0 690 C 280 620, 520 760, 760 690 S 1080 600, 1200 640 V800 H0 Z"],
] as const;

export function Contour({ hue, shape = 0 }: { hue: keyof typeof HUES; shape?: 0 | 1 | 2 }) {
  const [a, b] = HUES[hue];
  const [p, q] = SHAPES[shape];
  return (
    <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <path d={p} fill={a} />
      <path d={q} fill={b} />
    </svg>
  );
}
