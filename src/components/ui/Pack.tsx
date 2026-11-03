import { useId } from "react";

export type PackFormat = "standup" | "pillow" | "gusset" | "spout" | "sachet" | "wrapper" | "polybag" | "laddi";

type Props = {
  format: PackFormat;
  className?: string;
  /** Main print colour; the silver is the bare metallised film. */
  ink?: string;
  label?: string;
};

/**
 * Flat, exact pack silhouettes for each format we convert.
 * Crimson print over bare foil, with crimped seals, the way the real laminate reads.
 */
export function Pack({ format, className = "", ink = "#ce0000", label }: Props) {
  const id = useId().replace(/[:]/g, "");
  const foil = `foil-${id}`;
  const shade = `shade-${id}`;
  const defs = (
    <defs>
      <linearGradient id={foil} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3f4f6" />
        <stop offset="0.45" stopColor="#c6cbd2" />
        <stop offset="0.7" stopColor="#eef0f3" />
        <stop offset="1" stopColor="#b9bec6" />
      </linearGradient>
      <linearGradient id={shade} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.2" />
        <stop offset="0.18" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.72" stopColor="#000" stopOpacity="0" />
        <stop offset="0.86" stopColor="#fff" stopOpacity="0.1" />
        <stop offset="1" stopColor="#000" stopOpacity="0.22" />
      </linearGradient>
    </defs>
  );
  const crimp = (x: number, y: number, w: number, h: number, vertical = false) => (
    <g opacity="0.22" fill="#1c1517">
      {vertical
        ? Array.from({ length: Math.floor(h / 3) }, (_, i) => <rect key={i} x={x} y={y + i * 3} width={w} height="1.1" />)
        : Array.from({ length: Math.floor(w / 3) }, (_, i) => <rect key={i} x={x + i * 3} y={y} width="1.1" height={h} />)}
    </g>
  );

  // Generic copy bars standing in for a brand's print, never a real brand.
  const copy = (x: number, y: number, w: number, color = "#fff") => (
    <g fill={color}>
      <rect x={x} y={y} width={w} height="5" rx="1" />
      <rect x={x} y={y + 8} width={w * 0.72} height="5" rx="1" />
      <rect x={x} y={y + 18} width={w * 0.46} height="2.4" rx="1" opacity="0.8" />
      <rect x={x} y={y + 22.5} width={w * 0.38} height="2.4" rx="1" opacity="0.8" />
    </g>
  );

  const common = { className, role: label ? "img" : undefined, "aria-label": label, "aria-hidden": label ? undefined : true } as const;

  switch (format) {
    case "standup":
      return (
        <svg viewBox="0 0 100 140" {...common}>
          {defs}
          <path d="M8 4 H92 V120 Q92 136 76 136 H24 Q8 136 8 120 Z" fill={`url(#${foil})`} />
          <path d="M8 66 Q35 56 58 70 T92 62 V120 Q92 136 76 136 H24 Q8 136 8 120 Z" fill={ink} />
          <ellipse cx="50" cy="38" rx="17" ry="10" fill={ink} />
          <ellipse cx="50" cy="38" rx="9" ry="5" fill="#fff" opacity="0.9" />
          {copy(18, 86, 46)}
          <rect x="8" y="4" width="84" height="11" fill="#000" opacity="0.06" />
          {crimp(8, 4, 84, 11)}
          <rect x="12" y="19" width="76" height="1.4" fill="#1c1517" opacity="0.35" />
          <path d="M8 4 H92 V120 Q92 136 76 136 H24 Q8 136 8 120 Z" fill={`url(#${shade})`} />
        </svg>
      );
    case "pillow":
      return (
        <svg viewBox="0 0 160 100" {...common}>
          {defs}
          <path d="M4 10 H156 V90 H4 Z" fill={`url(#${foil})`} />
          <path d="M18 14 Q80 6 142 14 V86 Q80 94 18 86 Z" fill={ink} />
          <rect x="30" y="30" width="56" height="40" rx="5" fill="#fff" opacity="0.94" />
          {copy(36, 37, 40, ink)}
          <circle cx="114" cy="50" r="15" fill="#fff" opacity="0.18" />
          {crimp(4, 10, 14, 80, true)}
          {crimp(142, 10, 14, 80, true)}
          <path d="M4 10 H156 V90 H4 Z" fill={`url(#${shade})`} />
        </svg>
      );
    case "gusset":
      return (
        <svg viewBox="0 0 100 150" {...common}>
          {defs}
          <path d="M14 4 H86 L92 18 V140 Q92 146 86 146 H14 Q8 146 8 140 V18 Z" fill={`url(#${foil})`} />
          <path d="M8 58 H92 V140 Q92 146 86 146 H14 Q8 146 8 140 Z" fill={ink} />
          <path d="M8 18 L22 26 V146 H14 Q8 146 8 140 Z M92 18 L78 26 V146 H86 Q92 146 92 140 Z" fill="#000" opacity="0.1" />
          <rect x="30" y="26" width="40" height="22" rx="4" fill="#fff" opacity="0.85" />
          {copy(28, 76, 44)}
          {crimp(14, 4, 72, 9)}
          <path d="M14 4 H86 L92 18 V140 Q92 146 86 146 H14 Q8 146 8 140 V18 Z" fill={`url(#${shade})`} />
        </svg>
      );
    case "spout":
      return (
        <svg viewBox="0 0 100 150" {...common}>
          {defs}
          <rect x="40" y="2" width="20" height="16" rx="5" fill={ink} />
          <rect x="44" y="16" width="12" height="10" fill="#c9cdd2" />
          <path d="M14 24 Q50 20 86 24 L92 132 Q92 146 78 146 H22 Q8 146 8 132 Z" fill={`url(#${foil})`} />
          <path d="M10 80 Q50 66 91 80 L92 132 Q92 146 78 146 H22 Q8 146 8 132 Z" fill={ink} />
          {copy(22, 96, 46)}
          <path d="M14 24 Q50 20 86 24 L92 132 Q92 146 78 146 H22 Q8 146 8 132 Z" fill={`url(#${shade})`} />
        </svg>
      );
    case "sachet":
      return (
        <svg viewBox="0 0 80 110" {...common}>
          {defs}
          <rect x="4" y="4" width="72" height="102" rx="3" fill={`url(#${foil})`} />
          <rect x="12" y="44" width="56" height="54" rx="6" fill={ink} />
          {copy(18, 54, 40)}
          {crimp(4, 4, 72, 10)}
          {crimp(4, 96, 72, 10)}
          <rect x="4" y="4" width="72" height="102" rx="3" fill={`url(#${shade})`} />
        </svg>
      );
    case "wrapper":
      return (
        <svg viewBox="0 0 170 80" {...common}>
          {defs}
          <path d="M4 14 L20 8 H150 L166 14 V66 L150 72 H20 L4 66 Z" fill={`url(#${foil})`} />
          <rect x="22" y="12" width="126" height="56" rx="10" fill={ink} />
          <rect x="40" y="24" width="64" height="32" rx="4" fill="#fff" opacity="0.94" />
          {copy(46, 28, 48, ink)}
          {crimp(4, 14, 16, 52, true)}
          {crimp(150, 14, 16, 52, true)}
        </svg>
      );
    case "polybag":
      return (
        <svg viewBox="0 0 110 140" {...common}>
          <rect x="4" y="4" width="102" height="132" rx="4" fill="#eef3f7" opacity="0.9" />
          <rect x="4" y="4" width="102" height="132" rx="4" fill="none" stroke="#b9c3cc" strokeWidth="1.5" />
          <rect x="18" y="40" width="74" height="54" rx="10" fill={ink} opacity="0.9" />
          <rect x="4" y="4" width="102" height="10" fill="#b9c3cc" opacity="0.6" />
          <path d="M20 22 Q55 30 90 20" stroke="#fff" strokeWidth="3" fill="none" opacity="0.8" />
        </svg>
      );
    case "laddi":
      return (
        <svg viewBox="0 0 120 150" {...common}>
          {defs}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${i * 48})`}>
              <rect x="6" y="4" width="108" height="44" rx="3" fill={`url(#${foil})`} />
              <rect x="20" y="10" width="80" height="32" rx="5" fill={ink} />
              {copy(30, 14, 50)}
              {crimp(6, 4, 14, 44, true)}
              {crimp(100, 4, 14, 44, true)}
            </g>
          ))}
        </svg>
      );
  }
}
