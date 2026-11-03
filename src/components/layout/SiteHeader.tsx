"use client";

import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site, type NavGroup } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

const tab =
  "flex min-h-10 items-center gap-1 rounded-[var(--radius-sm)] bg-white/90 px-3.5 text-[0.95rem] font-semibold text-ink backdrop-blur transition-[background-color,transform] duration-300 ease-[var(--ease-back)] hover:-translate-y-0.5 hover:bg-white";

function Dropdown({ group, open, onToggle, onClose }: { group: NavGroup; open: boolean; onToggle: () => void; onClose: () => void }) {
  const id = useId();
  return (
    <li className="relative" onMouseEnter={() => !open && onToggle()} onMouseLeave={() => open && onClose()}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className={tab}>
        {group.label}
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2.4} />
      </button>
      <div
        id={id}
        className={`absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 pt-2.5 transition-[opacity,translate] duration-300 ease-out-expo ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-[var(--radius-lg)] bg-white p-2 ring-1 ring-foil-2">
          {group.children?.map((c) => (
            <li key={c.href + c.label}>
              <Link href={c.href} onClick={onClose} className="group/item flex flex-col rounded-[var(--radius-md)] px-4 py-3 transition-colors hover:bg-crimson-wash">
                <span className="font-semibold text-ink group-hover/item:text-crimson">{c.label}</span>
                {c.note && <span className="text-[0.88rem] text-ink-soft">{c.note}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Logo left, soft nav tabs in the centre, split call to action right: no bar behind them. */
// Before scripts run only one page is in the DOM, so :has() can read its hero. After that, Next keeps visited
// pages hidden in the DOM, so the header writes the visible hero's tone onto <html> and that wins.
const ON_DARK_HIDE =
  "[html:not([data-hero-tone])_body:has([data-hero=dark])_&]:invisible [html[data-hero-tone=dark]_&]:invisible";
const ON_DARK_SHOW =
  "[html:not([data-hero-tone])_body:has([data-hero=dark])_&]:visible [html[data-hero-tone=dark]_&]:visible";

export function SiteHeader() {
  const pathname = usePathname();
  // Menus remember which route they were opened on, so a navigation closes them without an effect.
  const [open, setOpen] = useState<{ key: string | null; path: string }>({ key: null, path: "" });
  const [sheetPath, setSheetPath] = useState<string | null>(null);
  const openKey = open.path === pathname ? open.key : null;
  const sheet = sheetPath === pathname;
  const setOpenKey = (k: string | null | ((cur: string | null) => string | null)) =>
    setOpen((cur) => ({ key: typeof k === "function" ? k(cur.path === pathname ? cur.key : null) : k, path: pathname }));
  const setSheet = (v: boolean | ((cur: boolean) => boolean)) =>
    setSheetPath((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Read the hero of the page actually on screen; hidden, previously visited pages have no layout box.
  useEffect(() => {
    const pick = () => {
      const hero = [...document.querySelectorAll<HTMLElement>("main [data-hero]")].find((h) => h.getClientRects().length > 0);
      document.documentElement.dataset.heroTone = hero?.dataset.hero ?? "light";
    };
    pick();
    const id = requestAnimationFrame(pick);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen({ key: null, path: "" });
        setSheetPath(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (sheet) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      sheetRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [sheet]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="shell flex h-[var(--header-h)] items-center gap-3 pt-[var(--frame)]">
        {/* The logo sits on the page itself and slips away once you scroll, leaving the tabs. */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          tabIndex={scrolled && !sheet ? -1 : undefined}
          className={`pointer-events-auto shrink-0 rounded-[var(--radius-sm)] transition-[opacity,translate] duration-500 ease-out-expo ${
            scrolled && !sheet ? "pointer-events-none -translate-y-6 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {/* Pages that open on a dark hero (data-hero="dark") get the white mark, with no tile behind it */}
          <span className="relative block h-8 w-[195px] sm:h-9 sm:w-[219px]">
            <Logo className={`absolute inset-0 h-full w-full ${sheet ? "" : ON_DARK_HIDE}`} />
            <Logo tone="white" className={`absolute inset-0 h-full w-full invisible ${sheet ? "" : ON_DARK_SHOW}`} />
          </span>
        </Link>

        <nav aria-label="Primary" className="pointer-events-auto mx-auto hidden lg:block">
          <ul className="flex items-center gap-1.5">
            {nav.map((g) =>
              g.children ? (
                <Dropdown
                  key={g.label}
                  group={g}
                  open={openKey === g.label}
                  onToggle={() => setOpenKey((k) => (k === g.label ? null : g.label))}
                  onClose={() => setOpenKey(null)}
                />
              ) : (
                <li key={g.label}>
                  <Link href={g.href} className={tab}>
                    {g.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="pointer-events-auto hidden lg:block">
          <ButtonLink href="/contact-us/" tone="ink" className="!min-h-10">
            Contact us
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setSheet((s) => !s)}
          aria-expanded={sheet}
          aria-controls="mobile-sheet"
          aria-label={sheet ? "Close menu" : "Open menu"}
          className="pointer-events-auto ml-auto grid size-11 place-items-center rounded-[var(--radius-sm)] bg-ink text-white lg:hidden"
        >
          {sheet ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-sheet"
        ref={sheetRef}
        hidden={!sheet}
        className="pointer-events-auto mx-[var(--frame)] mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[var(--radius-xl)] bg-white p-3 shadow-[var(--shadow-card)] lg:hidden"
      >
        <ul className="grid gap-1.5">
          {nav.map((g) => (
            <li key={g.label} className="rounded-[var(--radius-lg)] bg-foil p-2">
              <Link href={g.href} onClick={() => setSheet(false)} className="display block rounded-[var(--radius-md)] px-3 py-2 text-3xl text-ink">
                {g.label}
              </Link>
              {g.children && (
                <ul className="grid gap-0.5 pb-1">
                  {g.children.map((c) => (
                    <li key={c.href + c.label}>
                      <Link href={c.href} onClick={() => setSheet(false)} className="block rounded-[var(--radius-sm)] px-3 py-2 font-medium text-ink-soft hover:bg-white">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ButtonLink href="/contact-us/" onClick={() => setSheet(false)} className="mt-3 w-full [&>span:first-child]:flex-1">
          Contact us
        </ButtonLink>
      </div>
    </header>
  );
}
