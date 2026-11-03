import Image from "next/image";

const RATIOS = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
} as const;

export type Ratio = keyof typeof RATIOS;

/** A real photograph in a white 8px frame, square to the grid, captioned with what it shows. Never rotated. */
export function PhotoFrame({
  src,
  alt,
  ratio = "4:3",
  caption,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  dark = false,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="rounded-[var(--radius-lg)] bg-white p-2">
        <div className={`relative overflow-hidden rounded-[var(--radius-md)] ${RATIOS[ratio]}`}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </div>
      </div>
      {caption && <figcaption className={`mt-3 text-caption ${dark ? "text-white/75" : "text-ink-soft"}`}>{caption}</figcaption>}
    </figure>
  );
}
