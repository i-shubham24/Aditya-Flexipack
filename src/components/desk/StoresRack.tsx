"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VENDOR_PRODUCTS } from "@/content/forms";
import { BinFace, BINS, type BinColour } from "@/components/desk/StoresBin";

/** Six palette colours, ordered so no two neighbouring bins match in the 4-wide or 2-wide rack. */
const ORDER: BinColour[] = ["crimson", "wine", "blush", "ink", "foil", "deep"];

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The Stores Rack: one labelled bin for each product the plant sources. Picking a bin chooses that product in the
 * vendor form, says so to screen readers, and brings the field into view with focus on it.
 */
export function StoresRack({ formId }: { formId: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [said, setSaid] = useState("");

  const field = () => document.getElementById(formId)?.querySelector<HTMLSelectElement>('select[name="product"]') ?? null;

  // Keep the rack in step when the visitor changes the field in the form itself.
  useEffect(() => {
    const select = document.getElementById(formId)?.querySelector<HTMLSelectElement>('select[name="product"]');
    if (!select) return;
    const sync = () => setPicked(select.value || null);
    const onReset = () => requestAnimationFrame(sync);
    select.addEventListener("change", sync);
    select.form?.addEventListener("reset", onReset);
    return () => {
      select.removeEventListener("change", sync);
      select.form?.removeEventListener("reset", onReset);
    };
  }, [formId]);

  // Stock being racked: each row slides in from the right, one row after another.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-bin]");
        gsap.set(items, { x: 40, autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const rows = new Map<number, HTMLElement[]>();
            items.forEach((el) => rows.set(el.offsetTop, [...(rows.get(el.offsetTop) ?? []), el]));
            [...rows.keys()]
              .sort((a, b) => a - b)
              .forEach((top, i) => gsap.to(rows.get(top)!, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", delay: i * 0.12 }));
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  function pick(product: string) {
    const select = field();
    if (!select) return;
    select.value = product;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    setPicked(product);
    setSaid(`${product} selected in the form`);
    const target = select.closest("div") ?? select;
    const focus = () => select.focus({ preventScroll: true });
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -128, onComplete: focus });
    else {
      target.scrollIntoView({ block: "center" });
      focus();
    }
  }

  return (
    <div ref={root}>
      <ul className="page-grid gap-y-[clamp(1.25rem,2.4vw,2rem)]">
        {VENDOR_PRODUCTS.map((p, i) => {
          const colour = ORDER[i % ORDER.length];
          return (
          <li key={p} data-bin className="col-span-2 lg:col-span-3">
            <button
              type="button"
              aria-pressed={picked === p}
              onClick={() => pick(p)}
              className="group block w-full cursor-pointer rounded-[var(--radius-lg)] text-left"
            >
              <BinFace colour={colour}>
                <span
                  className={`flex min-h-[4.25rem] items-center rounded-[var(--radius-md)] bg-white px-3 py-3 text-ink transition-[translate,background-color,color] duration-300 ease-[var(--ease-back)] group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-aria-pressed:-translate-y-1 group-aria-pressed:text-white sm:min-h-[5rem] sm:px-4 ${BINS[colour].pressed}`}
                >
                  <span className="display text-d4 hyphens-auto">{p}</span>
                </span>
              </BinFace>
            </button>
          </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="sr-only">
        {said}
      </p>
    </div>
  );
}
