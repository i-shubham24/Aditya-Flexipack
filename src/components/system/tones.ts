/** The seven page fields from the logo palette, with the text and accent pairings that pass contrast on each. */
export type Tone = "wine" | "foil" | "crimson" | "ink" | "blush" | "wash" | "deep";

export const TONES: Record<
  Tone,
  { bg: string; deeper: string; ink: string; sub: string; note: string; hex: string; contour: string; dark: boolean }
> = {
  wine: { bg: "bg-wine", deeper: "bg-wine-2", ink: "text-white", sub: "text-white/85", note: "text-blush", hex: "#45060e", contour: "#520912", dark: true },
  crimson: { bg: "bg-crimson", deeper: "bg-crimson-deep", ink: "text-white", sub: "text-white/90", note: "text-blush", hex: "#ce0000", contour: "#b80000", dark: true },
  deep: { bg: "bg-crimson-deep", deeper: "bg-wine-2", ink: "text-white", sub: "text-white/90", note: "text-blush", hex: "#a10000", contour: "#8c0000", dark: true },
  ink: { bg: "bg-ink", deeper: "bg-press", ink: "text-white", sub: "text-white/80", note: "text-blush", hex: "#1c1517", contour: "#2a2124", dark: true },
  foil: { bg: "bg-foil", deeper: "bg-foil-2", ink: "text-ink", sub: "text-ink-soft", note: "text-crimson", hex: "#eceef1", contour: "#e2e5e9", dark: false },
  blush: { bg: "bg-blush", deeper: "bg-[#ffb4aa]", ink: "text-wine", sub: "text-wine", note: "text-crimson-deep", hex: "#ffc9c2", contour: "#ffbdb5", dark: false },
  wash: { bg: "bg-crimson-wash", deeper: "bg-blush", ink: "text-wine", sub: "text-ink-soft", note: "text-crimson", hex: "#ffe3df", contour: "#ffd6d0", dark: false },
};
