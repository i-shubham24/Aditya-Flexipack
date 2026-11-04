"use client";

import { useState, type ReactNode } from "react";
import { Check, Mail } from "lucide-react";

interface EmailLinkProps {
  email: string;
  children?: ReactNode;
  className?: string;
  showIcon?: boolean;
  subject?: string;
  iconClassName?: string;
}

export function EmailLink({
  email,
  children,
  className = "",
  showIcon = false,
  subject,
  iconClassName = "size-4 text-white/60",
}: EmailLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // 1. Copy to clipboard for instant reliability on any OS/device
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      }).catch(() => {});
    }

    // 2. mailto will still trigger naturally if an email app is configured
  };

  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  return (
    <a
      href={href}
      onClick={handleClick}
      title={copied ? "Email copied to clipboard!" : `Email ${email} (clicks to copy & open)`}
      className={`group/email relative inline-flex items-center gap-2 transition-colors cursor-pointer ${className}`}
    >
      {showIcon && (
        <span aria-hidden className="shrink-0 transition-transform duration-200 group-hover/email:scale-110">
          {copied ? (
            <Check className="size-4 text-crimson-light" strokeWidth={2.5} />
          ) : (
            <Mail className={iconClassName} />
          )}
        </span>
      )}
      <span>{copied ? "Email copied!" : (children ?? email)}</span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-all duration-200 whitespace-nowrap z-30 ${
          copied ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        ✓ Copied {email}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? `Email address ${email} copied to clipboard` : ""}
      </span>
    </a>
  );
}
