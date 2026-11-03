import type { PackFormat } from "@/components/ui/Pack";

export type Offering = { name: string; items?: string; pack: PackFormat };

/**
 * The thirteen lines of the old Offerings list, hung as three laddi strips:
 * food aisles, home and personal care, then the pack formats themselves.
 */
export const STRIPS: Offering[][] = [
  [
    { name: "Biscuits and snacks", items: "Cookies, rusk, chips, namkeen, puffs and more", pack: "pillow" },
    { name: "Kitchen essentials", items: "Flour, salt, spices, taste makers", pack: "gusset" },
    { name: "Confectionery", items: "Candies, toffees, cakes", pack: "wrapper" },
    { name: "Cereals and oats", pack: "standup" },
    { name: "Frozen food", pack: "pillow" },
  ],
  [
    { name: "Home care", items: "Detergent powder and cakes, oil", pack: "gusset" },
    { name: "Personal care", items: "Soap, hair oil, shampoo", pack: "sachet" },
    { name: "Pet food and meat", pack: "standup" },
    { name: "Liquid pouching", items: "Juice, soap", pack: "spout" },
  ],
  [
    { name: "Shrink film and collation packs", pack: "polybag" },
    { name: "Laddi packs", pack: "laddi" },
    { name: "Aluminium foil wrappers and liners", pack: "wrapper" },
    { name: "Polybags", pack: "polybag" },
  ],
];

export type HungOffering = Offering & {
  strip: number;
  row: number;
  /** Where the strip ends: "desk" on desktop only (the phone strip runs on), "all" at every width. */
  end?: "desk" | "all";
};

export const OFFERINGS: HungOffering[] = STRIPS.flatMap((strip, s) =>
  strip.map((o, r) => ({
    ...o,
    strip: s,
    row: r,
    end: r === strip.length - 1 ? (s === STRIPS.length - 1 ? "all" : "desk") : undefined,
  })),
);
