/**
 * Shapes for "Under One Roof": one long saw-tooth shed, 1200 x 430 units, drawn as flat, rounded colour blocks.
 * Six bays, each 200 units wide so it sits over two of the twelve grid columns. Every glyph is drawn in its own
 * bay's local space (x 0-200, the room from y 172 to 352) in `currentColor`, so lighting a bay is one colour change
 * and the same glyph can stand in a desktop bay or a mobile storey.
 */

export const BAY_W = 200;
export const ROOM_Y = 172;
export const ROOM_H = 180;

export const CRIMSON = "#ce0000";
export const CRIMSON_LIGHT = "#ff4b3e";
export const WINE = "#45060e";
export const FOIL_2 = "#dfe2e6";
export const FOIL_3 = "#c6cbd1";
export const WHITE = "#ffffff";

const round = { stroke: "currentColor", strokeLinejoin: "round", strokeLinecap: "round" } as const;

/** The six capabilities from the old About list, in the old order: the chunky glyph each bay holds. */
export function BayGlyph({ index }: { index: number }) {
  switch (index) {
    case 0: // In-house ink manufacturing: a drum and its stirrer
      return (
        <>
          <rect x="80" y="192" width="40" height="28" rx="8" />
          <rect x="95" y="216" width="10" height="50" rx="5" />
          <rect x="50" y="258" width="100" height="16" rx="8" />
          <rect x="58" y="270" width="84" height="72" rx="14" />
          <rect x="58" y="292" width="84" height="7" fill={WHITE} />
          <rect x="58" y="314" width="84" height="7" fill={WHITE} />
        </>
      );
    case 1: // Cylinder making: a gravure cylinder on its stands, under the engraving head
      return (
        <>
          <rect x="86" y="190" width="28" height="30" rx="8" />
          <polygon points="91,220 109,220 100,234" {...round} strokeWidth="6" />
          <rect x="30" y="242" width="140" height="58" rx="29" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <circle key={k} cx={55 + k * 18} cy="271" r="4.5" fill={WHITE} />
          ))}
          <rect x="12" y="264" width="24" height="14" rx="7" />
          <rect x="164" y="264" width="24" height="14" rx="7" />
          <rect x="18" y="276" width="12" height="60" rx="6" />
          <rect x="170" y="276" width="12" height="60" rx="6" />
          <rect x="6" y="332" width="36" height="12" rx="6" />
          <rect x="158" y="332" width="36" height="12" rx="6" />
        </>
      );
    case 2: // CPP film processing: a flat die over a chill roll, film running off to the right
      return (
        <>
          <rect x="94" y="184" width="12" height="24" rx="6" />
          <polygon points="58,204 142,204 124,236 76,236" {...round} strokeWidth="8" />
          <rect x="96" y="234" width="8" height="30" rx="4" />
          <circle cx="98" cy="296" r="34" />
          <circle cx="98" cy="296" r="10" fill={WHITE} />
          <path d="M128 316 L164 334" {...round} strokeWidth="10" fill="none" />
          <circle cx="172" cy="336" r="15" />
          <circle cx="172" cy="336" r="5" fill={WHITE} />
          <rect x="68" y="332" width="60" height="12" rx="6" />
        </>
      );
    case 3: // In-house metallising: a vacuum chamber with its reels and drum
      return (
        <>
          <rect x="34" y="194" width="132" height="148" rx="28" />
          <path d="M62 262 L86 304 M138 262 L114 304" stroke={WHITE} strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="72" cy="244" r="21" fill={WHITE} />
          <circle cx="128" cy="244" r="21" fill={WHITE} />
          <circle cx="72" cy="244" r="7" />
          <circle cx="128" cy="244" r="7" />
          <circle cx="100" cy="302" r="24" fill={WHITE} />
        </>
      );
    case 4: // Liquid and shaped pouching: a stand-up pouch
      return (
        <>
          <path d="M60 200 H140 V312 Q140 330 122 330 H78 Q60 330 60 312 Z" />
          <rect x="66" y="214" width="68" height="7" rx="3.5" fill={WHITE} />
          <ellipse cx="100" cy="252" rx="22" ry="14" fill={WHITE} />
          <rect x="72" y="284" width="46" height="8" rx="4" fill={WHITE} />
          <rect x="72" y="298" width="30" height="8" rx="4" fill={WHITE} />
        </>
      );
    default: // Pyrolysis plant and waste recycling: a hopper feeding three chambers in series
      return (
        <>
          <polygon points="14,198 78,198 60,228 32,228" {...round} strokeWidth="8" />
          <rect x="40" y="226" width="12" height="48" rx="6" />
          <rect x="20" y="268" width="46" height="62" rx="12" />
          <rect x="78" y="268" width="46" height="62" rx="12" />
          <rect x="136" y="268" width="46" height="62" rx="12" />
          <rect x="62" y="292" width="20" height="12" rx="6" />
          <rect x="120" y="292" width="20" height="12" rx="6" />
          <rect x="153" y="222" width="12" height="50" rx="6" />
          <rect x="145" y="214" width="28" height="12" rx="6" />
          <rect x="12" y="334" width="176" height="12" rx="6" />
        </>
      );
  }
}

/** Solar panels laid along one roof slope, from (x0, y0) rising to (x1, y1), standing `lift` units off it. */
export function slopePanels(x0: number, y0: number, x1: number, y1: number, count: number, len: number, gap: number, start: number, lift = [8, 20]) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const l = Math.hypot(dx, dy);
  const u = [dx / l, dy / l];
  const n = [u[1], -u[0]]; // the normal pointing up, off the roof
  const at = (s: number, off: number) => `${(x0 + u[0] * s + n[0] * off).toFixed(1)},${(y0 + u[1] * s + n[1] * off).toFixed(1)}`;
  return Array.from({ length: count }, (_, k) => {
    const s = start + k * (len + gap);
    return [at(s, lift[0]), at(s + len, lift[0]), at(s + len, lift[1]), at(s, lift[1])].join(" ");
  });
}

/** Three rainwater tanks below ground: white rounded tanks whose water can rise. */
export function Tanks({ xs, top, w = 50, h = 48 }: { xs: number[]; top: number; w?: number; h?: number }) {
  return (
    <>
      {xs.map((x) => (
        <rect key={`t${x}`} x={x} y={top} width={w} height={h} rx="14" fill={WHITE} />
      ))}
      {xs.map((x) => (
        <rect key={`w${x}`} data-water x={x + 8} y={top + 14} width={w - 16} height={h - 22} rx="7" fill={CRIMSON_LIGHT} />
      ))}
    </>
  );
}
