"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Sections that open with an entrance (the hero) wait for the loader to clear first.
let done = false;
const waiting = new Set<() => void>();

export function afterLoader(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  return () => {
    waiting.delete(cb);
  };
}

function finish() {
  done = true;
  waiting.forEach((cb) => cb());
  waiting.clear();
}

// Four overlapping blobs, one per corner, each reaching well past the middle so together they cover the screen.
const BLOBS = [
  { d: "M-12 -12 H 70 C 74 10, 60 18, 66 34 S 74 60, 58 66 C 44 72, 36 60, 22 68 S -6 76, -12 66 Z", origin: "0% 0%", turn: "-14deg" },
  { d: "M112 -12 V 64 C 92 70, 84 56, 70 62 S 40 70, 36 54 C 32 40, 46 30, 38 16 S 30 -6, 34 -12 Z", origin: "100% 0%", turn: "12deg" },
  { d: "M112 112 H 34 C 30 92, 44 84, 38 70 S 30 44, 46 38 C 60 32, 68 44, 82 36 S 106 28, 112 36 Z", origin: "100% 100%", turn: "-10deg" },
  { d: "M-12 112 V 38 C 10 30, 18 46, 32 40 S 60 30, 64 46 C 68 60, 54 70, 62 84 S 70 106, 66 112 Z", origin: "0% 100%", turn: "16deg" },
];

/**
 * Every load opens on the wine field: the AF mark pops in inside a turning ring of the tagline, then the field
 * breaks into four blobs that shrink back to the corners, letting the page through the gaps.
 * The first visit of a session plays it in full; later loads play a short cut.
 * It runs on CSS alone, so it plays from the first paint and always clears, however late the scripts arrive.
 * An inline script in the layout picks the version before paint and hides it for reduced motion.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.hasAttribute("data-noloader")) {
      finish();
      return;
    }
    try {
      sessionStorage.setItem("af-loader", "1");
    } catch {}
    // The CSS clock started at first paint; only wait for whatever is left of it (the short version starts sooner).
    const out = el.getAnimations?.().find((a) => (a as CSSAnimation).animationName === "loader-out");
    const outAt = Number(out?.effect?.getTiming().delay ?? 0);
    const left = out ? Math.max(0, outAt - Number(out.currentTime ?? outAt)) : 0;
    if (left > 0) window.__lenis?.stop();
    const handOver = window.setTimeout(() => {
      window.__lenis?.start();
      finish();
    }, left);
    const remove = window.setTimeout(() => {
      el.hidden = true;
    }, left + 700);
    return () => {
      window.clearTimeout(handOver);
      window.clearTimeout(remove);
      window.__lenis?.start();
    };
  }, []);

  return (
    <div ref={root} data-loader aria-hidden className="loader fixed inset-0 z-[80] overflow-hidden">
      <div className="loader-field absolute inset-0 bg-wine" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {BLOBS.map((b, i) => (
          <path
            key={b.origin}
            d={b.d}
            fill="#45060e"
            className="loader-blob"
            style={{ transformOrigin: b.origin, ["--i" as string]: i, ["--turn" as string]: b.turn }}
          />
        ))}
      </svg>
      <div className="relative grid h-full place-items-center">
        <div className="relative grid size-[min(52vw,15rem)] place-items-center">
          <svg viewBox="0 0 200 200" className="loader-ring absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <path id="loader-ring" d="M100 100 m-80 0 a80 80 0 1 1 160 0 a80 80 0 1 1 -160 0" />
            </defs>
            <text className="display" fontSize="15" fill="#ffc9c2" textLength="500" lengthAdjust="spacing">
              <textPath href="#loader-ring">Quality is our identity &#8226; Aditya Flexipack &#8226;</textPath>
            </text>
          </svg>
          <Image src="/media/brand/af-mark-white.webp" alt="" width={266} height={326} priority unoptimized className="loader-af h-auto w-[34%]" />
        </div>
      </div>
    </div>
  );
}
