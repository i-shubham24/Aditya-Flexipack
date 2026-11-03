import Image from "next/image";

const RATIOS = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
} as const;

export type Ratio = keyof typeof RATIOS;

/**
 * A real photograph set straight on its section's background: rounded corners, square to the grid, captioned with
 * what it shows. No frame or colour tile behind it, and never rotated.
 */
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
      <div className={`relative overflow-hidden rounded-[var(--radius-lg)] ${RATIOS[ratio]}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && (
        <figcaption className={`mt-3 text-caption leading-snug ${dark ? "text-white/85" : "text-ink/80 font-medium"}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
