"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, FocusEvent, MouseEvent, ReactNode } from "react";
import { DanceText, dance, settle } from "@/components/ui/dance";

type Tone = "crimson" | "ink" | "white" | "foil" | "wine";

/** Aardvark's split button: a label block and a square arrow block in one colour, butted together. */
const tones: Record<Tone, string> = {
  crimson: "bg-crimson text-white",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  foil: "bg-foil text-ink",
  wine: "bg-wine text-white",
};

const shell =
  "group/btn inline-flex min-h-12 items-stretch text-[0.98rem] font-semibold transition-transform duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55";
const labelCls = "flex items-center rounded-[var(--radius-sm)] px-5";
const knobCls = "-ml-px grid w-12 place-items-center rounded-[var(--radius-sm)]";

function Parts({ tone, children, plain }: { tone: Tone; children: ReactNode; plain?: boolean }) {
  const t = tones[tone];
  return (
    <>
      <span className={`${labelCls} ${t}`}>{typeof children === "string" ? <DanceText text={children} /> : children}</span>
      {!plain && (
        <span aria-hidden className={`${knobCls} ${t}`}>
          <ArrowRight className="size-[1.15rem] transition-transform duration-300 ease-[var(--ease-back)] group-hover/btn:translate-x-1" strokeWidth={2.6} />
        </span>
      )}
    </>
  );
}

// The letter dance runs alongside any handlers the caller passes.
type Handlers<E> = {
  onMouseEnter?: (e: MouseEvent<E>) => void;
  onMouseLeave?: (e: MouseEvent<E>) => void;
  onFocus?: (e: FocusEvent<E>) => void;
  onBlur?: (e: FocusEvent<E>) => void;
};
function withDance<E extends HTMLElement>(h: Handlers<E>): Required<Handlers<E>> {
  return {
    onMouseEnter: (e) => {
      dance(e.currentTarget);
      h.onMouseEnter?.(e);
    },
    onMouseLeave: (e) => {
      settle(e.currentTarget);
      h.onMouseLeave?.(e);
    },
    onFocus: (e) => {
      if (e.currentTarget.matches(":focus-visible")) dance(e.currentTarget);
      h.onFocus?.(e);
    },
    onBlur: (e) => {
      settle(e.currentTarget);
      h.onBlur?.(e);
    },
  };
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & { tone?: Tone; children: ReactNode; className?: string; plain?: boolean };

export function ButtonLink({ tone = "crimson", children, className = "", plain, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }: LinkProps) {
  return (
    <Link className={`${shell} ${className}`} {...rest} {...withDance<HTMLAnchorElement>({ onMouseEnter, onMouseLeave, onFocus, onBlur })}>
      <Parts tone={tone} plain={plain}>
        {children}
      </Parts>
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { tone?: Tone; plain?: boolean };

export function Button({ tone = "crimson", children, className = "", plain, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }: BtnProps) {
  return (
    <button className={`${shell} ${className}`} {...rest} {...withDance<HTMLButtonElement>({ onMouseEnter, onMouseLeave, onFocus, onBlur })}>
      <Parts tone={tone} plain={plain}>
        {children}
      </Parts>
    </button>
  );
}

type TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & { tone?: "ink" | "white"; children: ReactNode; className?: string };

/** The quieter second action beside a split button, as on the home hero: underlined text with a full 44px tap height. */
export function TextLink({ tone = "ink", children, className = "", ...rest }: TextLinkProps) {
  const ink = tone === "white" ? "text-white decoration-white/50 hover:decoration-white" : "text-ink decoration-ink/30 hover:decoration-ink";
  return (
    <Link className={`inline-flex min-h-11 items-center font-semibold underline underline-offset-4 transition-colors ${ink} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
