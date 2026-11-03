/**
 * The one section header: H2 on the left line in Lead (1-7), standfirst in Side (8-12) bottom-aligned to the
 * H2's last line. Drops under the H2 below desktop. Place it inside a `.shell`.
 */
export function SectionHeader({
  id,
  title,
  standfirst,
  dark = false,
  as: Heading = "h2",
}: {
  id?: string;
  title: string;
  standfirst?: string;
  dark?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className="page-grid mb-[var(--stack)] gap-y-5">
      <Heading id={id} className={`display span-lead text-d2 ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </Heading>
      {standfirst && <p className={`span-side max-w-[30rem] self-end text-lead ${dark ? "text-white/85" : "text-ink-soft"}`}>{standfirst}</p>}
    </div>
  );
}
