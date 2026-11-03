"use client";

import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { nav, site, type NavGroup } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { gsap } from "gsap";

const tab =
  "flex min-h-10 items-center gap-1 rounded-[var(--radius-sm)] bg-white/90 px-3.5 text-[0.95rem] font-semibold text-ink backdrop-blur transition-[background-color,transform] duration-300 ease-[var(--ease-back)] hover:-translate-y-0.5 hover:bg-white";

function Dropdown({
  group,
  open,
  onToggle,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
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
        <ul className="rounded-[var(--radius-lg)] bg-white p-2 ring-1 ring-foil-2 shadow-lg">
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

/**
 * Dancing text: splits text into individual characters that animate on hover with the
 * exact Aardvark Book Club elastic wave animation (yPercent 55, scaleY 0.3, rotate 17deg -> elastic bounce).
 */
function DancingText({ text }: { text: string }) {
  return (
    <span className="inline-flex select-none pointer-events-none">
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          className="inline-block transform-gpu will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function animateCharDance(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>("[data-char]");
  if (!chars.length) return;
  gsap.killTweensOf(chars);
  gsap.fromTo(
    chars,
    { yPercent: 0, scaleY: 1, rotate: 0 },
    {
      keyframes: {
        "0%": { yPercent: 0, scaleY: 1, rotate: 0 },
        "20%": { yPercent: 55, scaleY: 0.3, rotate: 17, ease: "power2.in" },
        "100%": { yPercent: 0, scaleY: 1, rotate: 0, ease: "elastic.out(1, 0.4)" },
      },
      duration: 0.725,
      stagger: 0.025,
    },
  );
}

function resetCharDance(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>("[data-char]");
  if (!chars.length) return;
  gsap.to(chars, {
    yPercent: 0,
    scaleY: 1,
    rotate: 0,
    duration: 0.2,
    ease: "power2.out",
    overwrite: "auto",
  });
}

/**
 * Aardvark-style organic pill button: chunky rounded-full shape with elastic hover bounce
 * and dancing text animation.
 */
function AardvarkPillButton({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const rootRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={rootRef}
      href={href}
      onClick={onClick}
      onMouseEnter={(e) => animateCharDance(e.currentTarget)}
      onMouseLeave={(e) => resetCharDance(e.currentTarget)}
      className="display group relative flex h-[3.8rem] w-[min(84vw,20.5rem)] items-center justify-center rounded-full bg-white px-8 text-center text-[1.32rem] font-bold text-ink shadow-xl ring-1 ring-black/5 transition-transform duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] hover:scale-105 active:scale-95 hover:text-crimson sm:h-[4.2rem] sm:text-[1.45rem]"
    >
      <DancingText text={label} />
    </Link>
  );
}

/**
 * Aardvark-style signature split button (like "Log-in / Sign-up ->"):
 * Two connected rounded blocks with an animated rotating arrow block and dancing text.
 */
function AardvarkSplitButton({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={(e) => animateCharDance(e.currentTarget)}
      onMouseLeave={(e) => resetCharDance(e.currentTarget)}
      className="group inline-flex items-center gap-2.5 transition-transform duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] active:scale-95"
    >
      {/* Block 1: Main Text Block with subtle tilt */}
      <div className="flex h-[3.4rem] items-center justify-center rounded-2xl bg-white px-6 text-center font-bold text-ink shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] -rotate-[1deg] group-hover:-rotate-[2.5deg] group-hover:scale-[1.04] group-hover:text-crimson">
        <span className="text-[1.18rem] sm:text-[1.25rem]">
          <DancingText text={label} />
        </span>
      </div>

      {/* Block 2: Distinct attached arrow box that spins/bounces on hover */}
      <div className="grid size-[3.4rem] place-items-center rounded-2xl bg-white text-ink shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] rotate-[3deg] group-hover:rotate-[18deg] group-hover:scale-110 group-hover:text-crimson">
        <ArrowRight className="size-5 stroke-[2.6]" />
      </div>
    </Link>
  );
}

/** Core destinations rendered in the mobile menu */
const MOBILE_PILL_LINKS = [
  { label: "Our story", href: "/about-us/" },
  { label: "Products", href: "/products/" },
  { label: "Sustainability", href: "/sustainability/" },
  { label: "Awards & Honours", href: "/awards-recognitions/" },
  { label: "Career", href: "/career/" },
  { label: "Packaging Partner", href: "/packaging-partnership/" },
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
      document.body.style.overflow = "hidden";
      sheetRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [sheet]);

  return (
    <>
      {/* Header bar: transparent overlay with floating pill tabs */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="shell flex h-[var(--header-h)] items-center gap-3 pt-[var(--frame)]">
          {/* Logo slips away smoothly on scroll */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            tabIndex={scrolled && !sheet ? -1 : undefined}
            className={`pointer-events-auto shrink-0 rounded-[var(--radius-sm)] transition-[opacity,translate] duration-500 ease-out-expo ${
              scrolled && !sheet ? "pointer-events-none -translate-y-6 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <span className="relative block h-8 w-[195px] sm:h-9 sm:w-[219px]">
              <Logo className={`absolute inset-0 h-full w-full ${sheet ? "" : ON_DARK_HIDE}`} />
              <Logo tone="white" className={`absolute inset-0 h-full w-full invisible ${sheet ? "" : ON_DARK_SHOW}`} />
            </span>
          </Link>

          {/* Desktop primary floating pill tabs on xl+ (1280px+) */}
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
                    <Link href={g.href} className={tab}>
                      {g.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="pointer-events-auto hidden xl:block">
            <ButtonLink href="/contact-us/" tone="ink" className="!min-h-10">
              Contact us
            </ButtonLink>
          </div>

          {/* Unique tactile Menu pill button for mobile (< 1280px) replacing classic hamburger */}
          <button
            type="button"
            onClick={() => setSheet(true)}
            onMouseEnter={(e) => animateCharDance(e.currentTarget)}
            onMouseLeave={(e) => resetCharDance(e.currentTarget)}
            aria-expanded={sheet}
            aria-controls="mobile-nav-modal"
            aria-label="Open navigation menu"
            className="pointer-events-auto ml-auto flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2 text-[0.92rem] font-bold text-ink shadow-md ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 xl:hidden"
          >
            <span className="flex flex-col gap-1 w-3.5 justify-center">
              <span className="h-0.5 w-3.5 rounded-full bg-crimson" />
              <span className="h-0.5 w-2 rounded-full bg-ink" />
            </span>
            <span className="tracking-tight">
              <DancingText text="Menu" />
            </span>
          </button>
        </div>
      </header>

      {/* Aardvark Book Club inspired Full-Screen Organic Wavy Navigation Modal */}
      <div
        id="mobile-nav-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        ref={sheetRef}
        data-lenis-prevent
        className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-crimson text-white transition-[opacity,transform] duration-400 ease-out-expo xl:hidden ${
          sheet
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {/* Organic wavy background shapes in brand colours (crimson, blush, wine) */}
        <svg
          aria-hidden
          viewBox="0 0 800 1200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M0 0 C 260 60, 520 280, 460 520 S 140 840, 260 1200 H0 Z"
            fill="#b80000"
            opacity="0.75"
          />
          <path
            d="M800 0 C 640 180, 520 440, 680 720 S 500 1040, 800 1200 Z"
            fill="#ffb4aa"
            opacity="0.85"
          />
          <path
            d="M0 1200 C 200 1080, 340 940, 500 1020 S 740 1120, 800 1200 Z"
            fill="#45060e"
            opacity="0.8"
          />
        </svg>

        {/* Top bar: Brand logo left + rounded close button right */}
        <div className="relative z-10 flex h-[var(--header-h)] items-center justify-between px-6 pt-[var(--frame)]">
          <Link
            href="/"
            onClick={() => setSheet(false)}
            aria-label={`${site.name} home`}
            className="block h-8 w-[180px]"
          >
            <Logo tone="white" className="h-full w-full" />
          </Link>

          <button
            type="button"
            onClick={() => setSheet(false)}
            aria-label="Close navigation"
            className="grid size-11 place-items-center rounded-2xl bg-white text-ink shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            <X className="size-5 text-ink" strokeWidth={2.5} />
          </button>
        </div>

        {/* Centrepiece: Stacked tactile white pill buttons with dancing text on hover */}
        <nav
          aria-label="Mobile Navigation"
          className="relative z-10 my-auto flex flex-col items-center justify-center gap-3.5 px-6 py-4"
        >
          {MOBILE_PILL_LINKS.map((link) => (
            <AardvarkPillButton
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setSheet(false)}
            />
          ))}
        </nav>

        {/* Bottom bar: Signature Aardvark split button + social circles + copyright */}
        <div className="relative z-10 flex flex-col items-center gap-4 pb-8 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Signature 2-piece split button matching Aardvark's "Log-in / Sign-up ->" */}
            <AardvarkSplitButton
              href="/contact-us/"
              label="Start an enquiry"
              onClick={() => setSheet(false)}
            />

            <div className="flex items-center gap-2.5">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aditya Flexipack on LinkedIn"
                className="grid size-[3.4rem] place-items-center rounded-2xl bg-white text-ink shadow-xl transition-all duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] hover:scale-110 hover:rotate-6 hover:text-crimson active:scale-95"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z" />
                </svg>
              </a>

              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aditya Flexipack on Facebook"
                className="grid size-[3.4rem] place-items-center rounded-2xl bg-white text-ink shadow-xl transition-all duration-300 ease-[cubic-bezier(0.34,2.27,0.64,1)] hover:scale-110 hover:-rotate-6 hover:text-crimson active:scale-95"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
            </div>
          </div>

          <p className="text-[0.74rem] font-medium text-white/75 tracking-wide">
            © Aditya Flexipack Private Limited
          </p>
        </div>
      </div>
    </>
  );
}
