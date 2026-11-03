"use client";

import { useEffect, useRef } from "react";

/** Prerendered with the launch year, then corrected in the browser without a re-render. */
export function Year() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return <span ref={ref}>2026</span>;
}
