"use client";

import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { nav, site, type NavGroup } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { DanceText, danceHandlers } from "@/components/ui/dance";

// Aardvark's nav tab: a soft rounded tab whose letters dance on hover.
const tab =
  "flex h-11 items-center gap-1 rounded-[1.4rem] bg-white/90 px-4 text-[0.98rem] font-semibold text-ink backdrop-blur transition-[background-color,scale] duration-150 ease-out hover:bg-white active:scale-[0.96]";

function Dropdown({ group, open, onToggle, onClose }: { group: NavGroup; open: boolean; onToggle: () => void; onClose: () => void }) {
  const id = useId();
  return (
    <li className="relative" onMouseEnter={() => !open && onToggle()} onMouseLeave={() => open && onClose()}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className={tab} {...danceHandlers}>
        <DanceText text={group.label} />
        <ChevronDown aria-hidden className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2.4} />
      </button>
      <div
        id={id}
        className={`absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 pt-2.5 transition-[opacity,translate] duration-300 ease-out-expo ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-[var(--radius-xl)] bg-white p-2 ring-1 ring-foil-2">
          {group.children?.map((c) => (
            <li key={c.href + c.label}>
              <Link href={c.href} onClick={onClose} className="group/item flex flex-col rounded-[var(--radius-lg)] px-4 py-3 transition-colors hover:bg-crimson-wash">
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

/** Two offset strokes, crimson over ink, that turn into a cross when the menu is open. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-3.5 w-6">
      <span
        className={`absolute left-0 top-0 h-[3px] w-6 rounded-[2px] bg-crimson transition-[translate,rotate,width] duration-300 ease-[var(--ease-back)] ${
          open ? "translate-y-[5.5px] rotate-45" : "group-hover/menu:w-4"
        }`}
      />
      <span
        className={`absolute bottom-0 left-0 h-[3px] rounded-[2px] bg-ink transition-[translate,rotate,width] duration-300 ease-[var(--ease-back)] ${
          open ? "w-6 -translate-y-[5.5px] -rotate-45" : "w-3.5 group-hover/menu:w-6"
        }`}
      />
    </span>
  );
}

// Everything the desktop menus hold, regrouped for a thumb: big tabs first, then the quieter links.
const BIG = [
  { label: "Our story", href: "/about-us/" },
  { label: "Products", href: "/products/" },
  { label: "Sustainability", href: "/sustainability/" },
  { label: "Awards", href: "/awards-recognitions/" },
  { label: "Career", href: "/career/" },
  { label: "Partner with us", href: "/packaging-partnership/" },
];
const SMALL = [
  { title: "Products", links: nav.find((g) => g.label === "Products")?.children ?? [] },
  {
    title: "More",
    links: [
      { label: "Our offerings", href: "/offerings/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Vendor partnership", href: "/vendor-partnership/" },
    ],
  },
];

/** Logo left, soft nav tabs in the centre, split call to action right: no bar behind them. */
const ON_DARK_HIDE =
  "[html:not([data-hero-tone])_body:has([data-hero=dark])_&]:invisible [html[data-hero-tone=dark]_&]:invisible";
const ON_DARK_SHOW =
  "[html:not([data-hero-tone])_body:has([data-hero=dark])_&]:visible [html[data-hero-tone=dark]_&]:visible";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<{ key: string | null; path: string }>({ key: null, path: "" });
  const [sheetPath, setSheetPath] = useState<string | null>(null);
  const openKey = open.path === pathname ? open.key : null;
  const sheet = sheetPath === pathname;
  const setOpenKey = (k: string | null | ((cur: string | null) => string | null)) =>
    setOpen((cur) => ({ key: typeof k === "function" ? k(cur.path === pathname ? cur.key : null) : k, path: pathname }));
  const setSheet = (v: boolean) => setSheetPath(v ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

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

  // Opening the menu: stop the page, move focus in, and deal the tabs in one after another.
  useEffect(() => {
    const lenis = window.__lenis;
    const el = sheetRef.current;
    const opener = openerRef.current;
    if (!sheet || !el) {
      lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    // Wait a frame for the panel to become visible before moving focus into it.
    const focusId = window.setTimeout(() => el.querySelector<HTMLElement>("[data-sheet-close]")?.focus(), 60);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll("[data-sheet-tab]"),
        { x: -28, rotate: -4, autoAlpha: 0 },
        { x: 0, rotate: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(1.8)", stagger: 0.05, delay: 0.12 },
      );
      gsap.fromTo(el.querySelectorAll("[data-sheet-fade]"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.06, delay: 0.4 });
    });
    return () => {
      window.clearTimeout(focusId);
      mm.revert();
      // Hand focus back to the menu button the panel was opened from.
      if (el.contains(document.activeElement)) opener?.focus();
    };
  }, [sheet]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="shell flex h-[var(--header-h)] items-center gap-3 pt-[var(--frame)]">
          {/* The logo sits on the page itself and slips away once you scroll, leaving the tabs. */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            tabIndex={scrolled && !sheet ? -1 : undefined}
            className={`pointer-events-auto flex min-h-11 shrink-0 items-center rounded-[var(--radius-sm)] transition-[opacity,translate] duration-500 ease-out-expo ${
              scrolled && !sheet ? "pointer-events-none -translate-y-6 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <span className="relative block h-8 w-[195px] sm:h-9 sm:w-[219px]">
              <Logo className={`absolute inset-0 h-full w-full ${ON_DARK_HIDE}`} />
              <Logo tone="white" className={`invisible absolute inset-0 h-full w-full ${ON_DARK_SHOW}`} />
            </span>
          </Link>

          <nav aria-label="Primary" className="pointer-events-auto mx-auto hidden xl:block">
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
                    <Link href={g.href} className={tab} {...danceHandlers}>
                      <DanceText text={g.label} />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="pointer-events-auto hidden xl:block">
            <ButtonLink href="/contact-us/" tone="ink" className="!min-h-11">
              Contact us
            </ButtonLink>
          </div>

          <button
            ref={openerRef}
            type="button"
            onClick={() => setSheet(true)}
            aria-expanded={sheet}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="group/menu pointer-events-auto ml-auto grid size-12 place-items-center rounded-[var(--radius-sm)] bg-white/95 backdrop-blur transition-[scale] duration-150 ease-out active:scale-[0.94] xl:hidden"
          >
            <MenuIcon open={false} />
          </button>
        </div>
      </header>

      {/* Phone and tablet menu: a rounded crimson panel with tonal contours, big dancing tabs, then the quieter links */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        ref={sheetRef}
        data-lenis-prevent
        className={`fixed inset-[var(--frame)] z-[60] flex flex-col overflow-y-auto overflow-x-clip rounded-[var(--radius-2xl)] bg-crimson text-white transition-[opacity,translate,visibility] duration-500 ease-out-expo xl:hidden ${
          sheet ? "visible translate-y-0 opacity-100" : "invisible -translate-y-5 opacity-0"
        }`}
      >
        <svg aria-hidden viewBox="0 0 800 1200" preserveAspectRatio="xMaxYMax slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M0 0 H380 C 320 120, 200 170, 110 150 S 0 190, 0 280 Z" fill="#e01810" />
          <path d="M260 1200 C 280 990, 410 900, 520 760 S 700 520, 800 470 V1200 Z" fill="#dc0a05" />
          <path d="M410 1200 C 430 1040, 550 980, 630 880 S 760 720, 800 700 V1200 Z" fill="#b80000" />
          <path d="M560 1200 C 580 1100, 660 1060, 720 1000 S 790 940, 800 930 V1200 Z" fill="#a10000" />
        </svg>

        <div className="relative z-10 flex h-[var(--header-h)] shrink-0 items-center justify-between px-[calc(var(--gutter)-var(--frame))] pt-[var(--frame)]">
          <Link href="/" onClick={() => setSheet(false)} aria-label={`${site.name} home`} className="flex min-h-11 items-center">
            <Logo tone="white" className="h-8 w-[195px]" />
          </Link>
          <button
            type="button"
            data-sheet-close
            onClick={() => setSheet(false)}
            aria-label="Close menu"
            className="group/menu grid size-12 place-items-center rounded-[var(--radius-sm)] bg-white transition-[scale] duration-150 ease-out active:scale-[0.94]"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav aria-label="Menu" className="relative z-10 flex flex-1 flex-col justify-center gap-6 px-[calc(var(--gutter)-var(--frame))] py-3">
          <ul className="flex flex-col items-start gap-2">
            {BIG.map((l) => {
              const here = pathname === l.href;
              return (
                <li key={l.href} data-sheet-tab>
                  <Link
                    href={l.href}
                    onClick={() => setSheet(false)}
                    aria-current={here ? "page" : undefined}
                    className={`display inline-flex h-[3.25rem] items-center rounded-[1.625rem] px-5 text-[clamp(1.45rem,5.6vw,2.1rem)] sm:h-[3.6rem] sm:rounded-[1.8rem] sm:px-6 transition-[scale,background-color] duration-150 ease-out active:scale-[0.96] ${
                      here ? "bg-wine text-white" : "bg-white text-ink hover:bg-crimson-wash"
                    }`}
                    {...danceHandlers}
                  >
                    <DanceText text={l.label} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {SMALL.map((g) => (
              <div key={g.title} data-sheet-fade>
                <p className="hand -rotate-2 text-note text-blush">{g.title}</p>
                <ul className="mt-1 flex flex-wrap gap-x-5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setSheet(false)}
                        className="inline-flex min-h-11 items-center font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div data-sheet-fade className="relative z-10 flex flex-wrap items-center gap-3 px-[calc(var(--gutter)-var(--frame))] pb-4 pt-1">
          <ButtonLink href="/contact-us/" tone="white" onClick={() => setSheet(false)}>
            Contact us
          </ButtonLink>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aditya Flexipack on LinkedIn"
            className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-wine text-white transition-[scale] duration-150 active:scale-[0.94]"
          >
            <svg aria-hidden className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z" />
            </svg>
          </a>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aditya Flexipack on Facebook"
            className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-wine text-white transition-[scale] duration-150 active:scale-[0.94]"
          >
            <svg aria-hidden className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
