import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Tone = "crimson" | "ink" | "white" | "foil" | "wine";

/** Label block and arrow block, set side by side with a hairline gap. */
const tones: Record<Tone, { label: string; knob: string }> = {
  crimson: { label: "bg-crimson text-white", knob: "bg-crimson-deep text-white" },
  ink: { label: "bg-ink text-white", knob: "bg-press text-white" },
  white: { label: "bg-white text-ink", knob: "bg-ink text-white" },
  foil: { label: "bg-foil text-ink", knob: "bg-ink text-white" },
  wine: { label: "bg-wine text-white", knob: "bg-crimson text-white" },
};

const shell = "group/btn inline-flex min-h-12 items-stretch gap-[3px] text-[0.98rem] font-semibold disabled:pointer-events-none disabled:opacity-55";
const labelCls =
  "flex items-center rounded-[var(--radius-sm)] px-5 transition-transform duration-300 ease-[var(--ease-back)] group-hover/btn:-translate-y-0.5 group-active/btn:translate-y-0";
const knobCls =
  "grid w-12 place-items-center rounded-[var(--radius-sm)] transition-transform duration-300 ease-[var(--ease-back)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-active/btn:translate-y-0";

function Parts({ tone, children, plain }: { tone: Tone; children: ReactNode; plain?: boolean }) {
  const t = tones[tone];
  return (
    <>
      <span className={`${labelCls} ${t.label}`}>{children}</span>
      {!plain && (
        <span aria-hidden className={`${knobCls} ${t.knob}`}>
          <ArrowRight className="size-[1.15rem] transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={2.4} />
        </span>
      )}
    </>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & { tone?: Tone; children: ReactNode; className?: string; plain?: boolean };

export function ButtonLink({ tone = "crimson", children, className = "", plain, ...rest }: LinkProps) {
  return (
    <Link className={`${shell} ${className}`} {...rest}>
      <Parts tone={tone} plain={plain}>
        {children}
      </Parts>
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { tone?: Tone; plain?: boolean };

export function Button({ tone = "crimson", children, className = "", plain, ...rest }: BtnProps) {
  return (
    <button className={`${shell} ${className}`} {...rest}>
      <Parts tone={tone} plain={plain}>
        {children}
      </Parts>
    </button>
  );
}
