"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Lenis owns scroll position, so reset it and re-measure triggers on every route change. */
export function RouteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
