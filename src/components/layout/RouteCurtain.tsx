"use client";

import { Logo } from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TONES, type Tone } from "@/components/system/tones";

// A tear strip sets the destination's colour just before navigating; everything else gets wine.
let nextTone: Tone = "wine";
export function setCurtainTone(t: Tone) {
  nextTone = t;
}

/** Plays a lifting curtain each time the route changes; the first load belongs to the loader. */
export function RouteCurtain() {
  const pathname = usePathname();
  const [nav, setNav] = useState({ path: pathname, count: 0, tone: "wine" as Tone });
  if (nav.path !== pathname) setNav({ path: pathname, count: nav.count + 1, tone: nextTone });

  useEffect(() => {
    nextTone = "wine";
  }, [nav.count]);

  if (nav.count === 0) return null;
  const t = TONES[nav.tone];

  return (
    <div key={nav.count} aria-hidden className="route-curtain" style={{ background: t.hex }}>
      <div className="grid h-full place-items-center">
        <Logo tone={t.dark ? "white" : "colour"} className="route-curtain-mark h-10 w-auto sm:h-12" />
      </div>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-x-0 top-full h-[16vh] w-full">
        <path d="M0 0 H100 V8 C 76 22, 52 -4, 26 12 S 6 14, 0 9 Z" fill={t.hex} />
      </svg>
    </div>
  );
}
