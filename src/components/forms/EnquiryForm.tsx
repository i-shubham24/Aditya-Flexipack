"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Paperclip } from "lucide-react";
import { forms, type Field, type FormId } from "@/content/forms";
import { site } from "@/content/site";
import { EmailLink } from "@/components/ui/EmailLink";
import { Button } from "@/components/ui/Button";

export type EnquiryStatus = "idle" | "sending" | "sent" | "not-live" | "failed";

/** A select field drawn as a radio group of tiles instead: one pictogram per option (decorative). */
export type TileIcons = Record<string, (option: string) => ReactNode>;

const control =
  "w-full rounded-[var(--radius-sm)] bg-white px-4 text-[1rem] text-ink ring-1 ring-foil-3 transition-[box-shadow] outline-none placeholder:text-steel hover:ring-ink-soft focus-visible:ring-2 focus-visible:ring-crimson aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-crimson";

const labelCls = "mb-2 block text-[0.95rem] font-semibold text-ink";

/** Field ids carry the form id, so two forms kept alive across routes never share an id. */
const fieldId = (form: FormId, name: string) => `f-${form}-${name}`;

function Control({ form, f, error }: { form: FormId; f: Field; error?: string }) {
  const id = fieldId(form, f.name);
  const described = [f.hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const common = { id, name: f.name, required: f.required, "aria-invalid": error ? true : undefined, "aria-describedby": described };

  if (f.type === "textarea") return <textarea {...common} rows={5} className={`${control} min-h-36 py-3`} />;
  if (f.type === "select")
    return (
      <span className="relative block">
        <select {...common} defaultValue="" className={`${control} min-h-12 appearance-none pr-11`}>
          <option value="" disabled>
            Choose one
          </option>
          {f.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" />
      </span>
    );
  if (f.type === "file")
    return (
      <span className="flex min-h-14 items-center gap-3 rounded-[var(--radius-sm)] border border-dashed border-foil-3 bg-white px-4 focus-within:border-crimson">
        <Paperclip aria-hidden className="size-5 shrink-0 text-crimson" />
        <input
          {...common}
          type="file"
          multiple={(f.maxFiles ?? 1) > 1}
          accept=".pdf,.doc,.docx"
          className="min-h-11 w-full text-[0.95rem] text-ink-soft file:mr-4 file:rounded-[var(--radius-xs)] file:border-0 file:bg-foil file:px-4 file:py-2 file:font-semibold file:text-ink"
        />
      </span>
    );
  return <input {...common} type={f.type} autoComplete={f.autoComplete} className={`${control} min-h-12`} />;
}

/**
 * A select drawn as a native radio group: arrow keys move between tiles, `required` still blocks an empty
 * submit, and the submitted value is exactly the option text the select would have sent.
 */
function TileGroup({ form, f, error, icon }: { form: FormId; f: Field; error?: string; icon: (option: string) => ReactNode }) {
  const id = fieldId(form, f.name);
  const described = [f.hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset aria-describedby={described} aria-invalid={error ? true : undefined}>
      <legend className={labelCls}>
        {f.label}
        {f.required && <span className="text-crimson"> *</span>}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {f.options?.map((o, i) => (
          <label
            key={o}
            className="relative flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] bg-white px-3 py-2 text-ink ring-1 ring-foil-3 transition-[background-color,color,box-shadow] duration-200 hover:ring-ink-soft has-[:checked]:bg-crimson has-[:checked]:text-white has-[:checked]:ring-crimson has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ink"
          >
            <input
              type="radio"
              id={i === 0 ? id : undefined}
              name={f.name}
              value={o}
              required={f.required}
              className="absolute inset-0 size-full cursor-pointer appearance-none rounded-[var(--radius-sm)] opacity-0"
            />
            <span aria-hidden className="pointer-events-none grid h-9 w-10 shrink-0 place-items-center [&>svg]:max-h-9 [&>svg]:w-full">
              {icon(o)}
            </span>
            <span className="pointer-events-none text-[0.95rem] font-semibold leading-tight">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** The delivery messages, shared by the form and by any page that shows them on an object of its own. */
export function StatusMessage({ status, className = "" }: { status: EnquiryStatus; className?: string }) {
  if (status === "sent")
    return (
      <p className={className}>
        <span className="hand mr-2 text-[1.6rem] text-crimson">Thank you.</span>
        Your details have reached our team and we will be in touch shortly.
      </p>
    );
  if (status === "not-live")
    return (
      <p className={className}>
        Your details look complete, but online delivery for this form is not switched on yet. Please write to{" "}
        <EmailLink email={site.email} className="font-semibold text-crimson underline" />{" "}


        or call{" "}
        <a href={site.phoneHref} className="font-semibold text-crimson underline">
          {site.phone}
        </a>{" "}

        and we will take it from there.
      </p>
    );
  if (status === "failed")
    return (
      <p className={className}>
        Something went wrong while sending. Please try again, or write to{" "}
        <EmailLink email={site.email} className="font-semibold text-crimson underline" />{" "}


        .
      </p>
    );
  return null;
}

/** The same messages as plain text, for a visually hidden live region. */
function statusText(status: EnquiryStatus) {
  if (status === "sent") return "Thank you. Your details have reached our team and we will be in touch shortly.";
  if (status === "not-live")
    return `Your details look complete, but online delivery for this form is not switched on yet. Please write to ${site.email} or call ${site.phone} and we will take it from there.`;
  if (status === "failed") return `Something went wrong while sending. Please try again, or write to ${site.email}.`;
  return "";
}

/** Every text value in the form, by field name. */
function snapshot(el: HTMLFormElement) {
  const out: Record<string, string> = {};
  new FormData(el).forEach((v, k) => {
    if (typeof v === "string" && k !== "form" && k !== "website") out[k] = v;
  });
  return out;
}

/** One form component for contact, career, packaging and vendor enquiries, driven by content/forms.ts. */
export function EnquiryForm({
  form,
  tone = "light",
  onInput,
  onStatus,
  onSent,
  statusDisplay = "inline",
  tiles,
}: {
  form: FormId;
  tone?: "light" | "wash";
  /** Called with every text value whenever the visitor types or chooses something. */
  onInput?: (values: Record<string, string>) => void;
  /** Called on every delivery status change. */
  onStatus?: (status: EnquiryStatus) => void;
  /** Called only when the enquiry was really delivered; never for "not-live" or a failure. */
  onSent?: () => void;
  /** "inline" shows the message under the form; "announce" only announces it, for pages that show it elsewhere. */
  statusDisplay?: "inline" | "announce";
  /** Select fields to draw as radio tiles, keyed by field name. */
  tiles?: TileIcons;
}) {
  const def = forms[form];
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const callbacks = useRef({ onStatus, onSent });
  useEffect(() => {
    callbacks.current = { onStatus, onSent };
  });

  function report(next: EnquiryStatus) {
    setStatus(next);
    callbacks.current.onStatus?.(next);
    if (next === "sent") callbacks.current.onSent?.();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    // Native checks first, so the browser points at the first gap.
    if (!el.reportValidity()) return;
    report("sending");
    setErrors({});
    try {
      const res = await fetch("/api/enquiry/", { method: "POST", body: new FormData(el) });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string; errors?: Record<string, string> };
      if (body.ok) {
        report("sent");
        el.reset();
      } else if (body.reason === "invalid" && body.errors) {
        setErrors(body.errors);
        report("idle");
        el.querySelector<HTMLElement>(`[name="${Object.keys(body.errors)[0]}"]`)?.focus();
      } else report(body.reason === "not-live" ? "not-live" : "failed");
    } catch {
      report("failed");
    }
  }

  const changed = onInput ? (e: FormEvent<HTMLFormElement>) => onInput(snapshot(e.currentTarget)) : undefined;

  return (
    <form
      onSubmit={onSubmit}
      onInput={changed}
      onChange={changed}
      className={`relative rounded-[var(--radius-xl)] p-[clamp(1.25rem,3vw,2.5rem)] ${tone === "wash" ? "bg-crimson-wash" : "bg-foil"}`}
    >
      <input type="hidden" name="form" value={def.id} />
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        {def.fields.map((f) => {
          const id = fieldId(form, f.name);
          const icon = f.type === "select" ? tiles?.[f.name] : undefined;
          return (
            <div key={f.name} className={f.wide || icon ? "sm:col-span-2" : ""}>
              {icon ? (
                <TileGroup form={form} f={f} error={errors[f.name]} icon={icon} />
              ) : (
                <>
                  <label htmlFor={id} className={labelCls}>
                    {f.label}
                    {f.required && <span className="text-crimson"> *</span>}
                  </label>
                  <Control form={form} f={f} error={errors[f.name]} />
                </>
              )}
              {f.hint && (
                <p id={`${id}-hint`} className="mt-1.5 text-[0.88rem] text-ink-soft">
                  {f.hint}
                </p>
              )}
              {errors[f.name] && (
                <p id={`${id}-error`} className="mt-1.5 text-[0.9rem] font-semibold text-crimson-deep">
                  {errors[f.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : def.submit}
        </Button>
        <p className="text-[0.92rem] text-ink-soft">Fields marked * are required.</p>
      </div>

      {statusDisplay === "announce" ? (
        <p aria-live="polite" className="sr-only">
          {statusText(status)}
        </p>
      ) : (
        <div aria-live="polite" className="empty:hidden mt-6">
          <StatusMessage status={status} className="rounded-[var(--radius-md)] bg-white p-5 text-[1.02rem] text-ink" />
        </div>
      )}
    </form>
  );
}
