import Image from "next/image";
import type { ReactNode } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import type { FormId } from "@/content/forms";

/**
 * Heading, a note and a framed photo on one side, the form on the other, on its own colour panel.
 * The form card takes the other light tone so it always reads against the panel.
 */
export function FormSection({
  id,
  title,
  note,
  form,
  photo,
  panel = "foil",
  children,
}: {
  id: string;
  title: string;
  note?: string;
  form: FormId;
  photo?: { src: string; alt: string };
  panel?: "foil" | "wash";
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 pt-[var(--frame)]">
      <div className={`panel py-[var(--section-y)] ${panel === "foil" ? "bg-foil" : "bg-crimson-wash"}`}>
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div>
            <h2 id={`${id}-title`} className="display text-[clamp(2.6rem,5vw,5rem)] text-ink">
              {title}
            </h2>
            {note && <p className="hand mt-3 inline-block -rotate-2 text-[2rem] text-crimson">{note}</p>}
            {children && <div className="mt-5 space-y-4 text-[1.06rem] leading-relaxed text-ink-soft">{children}</div>}
            {photo && (
              <div className="mt-8 hidden -rotate-[3deg] rounded-[var(--radius-lg)] bg-white p-2 transition-[rotate] duration-500 ease-[var(--ease-back)] hover:rotate-0 lg:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="30vw" className="object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm form={form} tone={panel === "foil" ? "wash" : "light"} />
        </div>
      </div>
      </div>
    </section>
  );
}
