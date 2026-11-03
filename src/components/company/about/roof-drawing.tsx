/**
 * Line work for "Under One Roof" (docs/inner-pages-creative-direction.md 3.1): a cut-through elevation of one
 * saw-tooth shed, 1200 x 420 units. Six bays, each 200 units wide so it sits over two of the twelve grid columns.
 * Every glyph is drawn in its own bay's local space (x 0-200, floor at y 360), so the same glyph can stand in a
 * desktop bay or in a mobile storey.
 */

export const BAY_W = 200;
export const EAVE = 160;
export const RIDGE = 110;
export const FLOOR = 360;

export const CRIMSON = "#ce0000";
export const FOIL = "#eceef1";
export const FOIL_3 = "#c6cbd1";
export const BLUSH = "#ffc9c2";

/** The six capabilities from the old About list, in the old order: the line glyph each bay holds. */
export function BayGlyph({ index }: { index: number }) {
  switch (index) {
    case 0: // In-house ink manufacturing: a drum and stirrer
      return (
        <>
          <path d="M40 358 V218 H160 V358" />
          <rect x="86" y="196" width="28" height="22" rx="3" />
          <path d="M100 218 V332 M88 332 H112" />
          <path d="M58 292 V350 Q58 358 66 358 H134 Q142 358 142 350 V292" />
          <ellipse cx="100" cy="292" rx="42" ry="8" />
          <path d="M58 318 H142 M58 338 H142" />
        </>
      );
    case 1: // Cylinder making: a cylinder on stands, under the engraving head
      return (
        <>
          <path d="M30 284 V236 H170 V284" />
          <path d="M92 236 V246 L100 256 L108 246 V236" />
          <rect x="42" y="262" width="116" height="44" rx="8" />
          <path d="M52 274 H148" />
          <path d="M24 284 H42 M158 284 H176" />
          <path d="M24 284 L12 358 M24 284 L36 358 M176 284 L164 358 M176 284 L188 358" />
        </>
      );
    case 2: // CPP film processing: a flat die over a chill roll
      return (
        <>
          <path d="M100 170 V196" />
          <path d="M64 196 H136 L118 230 H82 Z" />
          <path d="M100 230 V270" />
          <circle cx="100" cy="298" r="28" />
          <circle cx="100" cy="298" r="5" />
          <path d="M126 309 L163 330" />
          <circle cx="172" cy="334" r="10" />
          <path d="M100 298 L82 358 M100 298 L118 358 M72 358 H128 M172 334 V358 M162 358 H182" />
        </>
      );
    case 3: // In-house metallising: a vacuum chamber with its reels
      return (
        <>
          <rect x="34" y="204" width="132" height="146" rx="16" />
          <path d="M46 350 V358 M154 350 V358" />
          <circle cx="70" cy="248" r="18" />
          <circle cx="70" cy="248" r="4" />
          <circle cx="130" cy="248" r="18" />
          <circle cx="130" cy="248" r="4" />
          <circle cx="100" cy="302" r="22" />
          <path d="M54 256 L80 310 M146 256 L120 310" />
          <path d="M86 338 H114" />
        </>
      );
    case 4: // Liquid and shaped pouching: a stand-up pouch outline
      return (
        <>
          <path
            transform="translate(50 220)"
            d="M8 4 H92 V12 L88 15 L92 18 V120 Q92 136 76 136 H24 Q8 136 8 120 V18 L12 15 L8 12 Z"
          />
          <path d="M62 242 H138" />
          <path d="M70 300 Q100 288 130 300" />
        </>
      );
    default: // Pyrolysis plant and waste recycling: a hopper feeding three chambers
      return (
        <>
          <path d="M14 204 H76 L58 238 H32 Z" />
          <path d="M45 238 V296" />
          <rect x="22" y="296" width="46" height="56" rx="5" />
          <rect x="78" y="296" width="46" height="56" rx="5" />
          <rect x="134" y="296" width="46" height="56" rx="5" />
          <path d="M68 324 H78 M124 324 H134" />
          <path d="M157 296 V234 M149 234 H165" />
          <rect x="16" y="352" width="170" height="6" rx="2" />
        </>
      );
  }
}

/** Solar panels laid along one roof slope, from (x0, y0) rising to (x1, y1). */
export function slopePanels(x0: number, y0: number, x1: number, y1: number, count: number, len: number, gap: number, start: number) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const l = Math.hypot(dx, dy);
  const u = [dx / l, dy / l];
  const n = [u[1], -u[0]]; // the normal pointing up, off the roof
  const at = (s: number, off: number) => `${(x0 + u[0] * s + n[0] * off).toFixed(1)},${(y0 + u[1] * s + n[1] * off).toFixed(1)}`;
  return Array.from({ length: count }, (_, k) => {
    const s = start + k * (len + gap);
    return [at(s, 3), at(s + len, 3), at(s + len, 10), at(s, 10)].join(" ");
  });
}

/** Three rainwater tanks under the ground line, with their water as separate shapes so they can fill. */
export function Tanks({ xs, top, w = 48, h = 46 }: { xs: number[]; top: number; w?: number; h?: number }) {
  return (
    <>
      {xs.map((x) => (
        <rect key={`w${x}`} data-water x={x + 5} y={top + 12} width={w - 10} height={h - 17} rx="4" fill={BLUSH} stroke="none" />
      ))}
      {xs.map((x) => (
        <rect key={`t${x}`} x={x} y={top} width={w} height={h} rx="8" />
      ))}
      <path d={xs.slice(1).map((x) => `M${x - (xs[1] - xs[0] - w)} ${top + 22} H${x}`).join(" ")} />
    </>
  );
}
