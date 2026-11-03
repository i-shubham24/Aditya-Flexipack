import { Pack } from "@/components/ui/Pack";

/**
 * Hero teaser for Packaging partnership: the top of the live job card rising out of the hero's bottom edge and
 * cut off by it, its blocks still blank. The page fills them in further down, as the brand types.
 */
export function TicketPeek() {
  return (
    <div aria-hidden className="mb-[calc(var(--section-y)*-0.6-2.5rem)] grid w-full max-w-[17rem] gap-[3px] sm:max-w-[19rem] lg:ml-auto lg:max-w-[21rem]">
      <div className="rounded-[var(--radius-lg)] bg-wine px-5 py-5">
        <span className="block h-7 w-4/5 rounded-[var(--radius-xs)] bg-white/15" />
        <span className="mt-3 block h-3 w-2/5 rounded-[var(--radius-xs)] bg-white/15" />
      </div>
      <div className="flex items-end justify-between gap-4 rounded-[var(--radius-lg)] bg-crimson px-5 pb-12 pt-5">
        <span className="grid flex-1 gap-3">
          <span className="block h-12 w-full rounded-[var(--radius-xs)] bg-white/20" />
          <span className="block h-3 w-1/2 rounded-[var(--radius-xs)] bg-white/20" />
        </span>
        <span className="w-20 shrink-0">
          <Pack format="standup" ink="#45060e" />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[3px]">
        <span className="block h-20 rounded-[var(--radius-lg)] bg-blush" />
        <span className="block h-20 rounded-[var(--radius-lg)] bg-white" />
      </div>
    </div>
  );
}
