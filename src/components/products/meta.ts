import {
  BadgeCheck,
  Bath,
  Boxes,
  Brush,
  Car,
  CircleCheck,
  Cookie,
  Cpu,
  Droplets,
  Factory,
  Gauge,
  House,
  Layers,
  Layers3,
  PackageOpen,
  Palette,
  Pill,
  Printer,
  RefreshCw,
  Recycle,
  Ruler,
  ScanEye,
  ScanSearch,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sprout,
  Target,
  Timer,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ProductSlug } from "@/content/products";
import type { HeroTone } from "@/components/page/PageHero";

type Photo = { src: string; alt: string };

export type ProductMeta = {
  /** Hero field, from the logo palette. */
  tone: HeroTone;
  /** Card colours on the products index and in related links, matching the home carousel order. */
  card: { bg: string; ink: string; sub: string };
  cover: Photo;
  hero: [Photo, Photo];
  about: Photo;
  extraPhoto?: Photo;
  /** Key facts, each one taken from this product's copy on the old site. */
  glance: { icon: LucideIcon; value: string; label: string }[];
  /** One icon per item of the product's `extra` list, in order. */
  extraIcons?: LucideIcon[];
};

export const productMeta: Record<ProductSlug, ProductMeta> = {
  laminates: {
    tone: "crimson",
    card: { bg: "bg-crimson", ink: "text-white", sub: "text-white/85" },
    cover: { src: "/media/old/home/photo-laminate-film-roller.webp", alt: "Clear laminate film wound round a roller" },
    hero: [
      { src: "/media/old/home/photo-laminate-film-roller.webp", alt: "Clear laminate film wound round a roller" },
      { src: "/media/plant/laminator-unwind.webp", alt: "Printed film web running over rollers at the Aditya Flexipack plant" },
    ],
    about: { src: "/media/old/products-films/photo-clear-film-roll-on-machine.webp", alt: "Large roll of clear film on an unwinder" },
    glance: [
      { icon: Layers, value: "10", label: "laminate structures, from high-dart to mono-structured" },
      { icon: ShieldCheck, value: "High barrier", label: "superior aroma retention for a longer shelf life" },
      { icon: Recycle, value: "Mono", label: "structured laminates, ideal for recycling" },
      { icon: Factory, value: "4,000 MT", label: "laminates production capacity every month" },
    ],
  },
  pouches: {
    tone: "foil",
    card: { bg: "bg-foil", ink: "text-ink", sub: "text-ink-soft" },
    cover: { src: "/media/products/branded-pouches.webp", alt: "Printed snack pouches carrying the Aditya Flexipack mark" },
    hero: [
      { src: "/media/products/branded-pouches.webp", alt: "Printed snack pouches carrying the Aditya Flexipack mark" },
      { src: "/media/process/foil-pouches.webp", alt: "Silver foil zip pouches in several sizes" },
    ],
    about: { src: "/media/old/products-pouches/photo-pouch-range-autumn.webp", alt: "Spout, stand-up, flat-bottom, foil and kraft pouches" },
    extraPhoto: { src: "/media/plant/pouch-machine.webp", alt: "Machine on the Aditya Flexipack production floor" },
    glance: [
      { icon: PackageOpen, value: "7", label: "pouch formats, from shaped to stand-up" },
      { icon: ScanEye, value: "Auto detection", label: "a system that minimises errors and waste" },
      { icon: Gauge, value: "High speed", label: "production without compromising seal strength" },
      { icon: Droplets, value: "Liquid", label: "pouches alongside dry and high-barrier formats" },
    ],
    extraIcons: [ScanEye, Gauge, BadgeCheck, Timer],
  },
  films: {
    tone: "wine",
    card: { bg: "bg-wine", ink: "text-white", sub: "text-white/80" },
    cover: { src: "/media/process/metallised-rolls.webp", alt: "Rolls of metallised film on a rewinding shaft" },
    hero: [
      { src: "/media/process/metallised-rolls.webp", alt: "Rolls of metallised film on a rewinding shaft" },
      { src: "/media/plant/blown-film-tower.webp", alt: "Blown film tower at the Aditya Flexipack plant" },
    ],
    about: { src: "/media/old/home/plant-production-hall-floor.webp", alt: "Production hall at the Aditya Flexipack plant with roll stock behind" },
    glance: [
      { icon: Layers3, value: "3 lines", label: "CPP, metallised and blown film" },
      { icon: Layers, value: "7, 5 and 3", label: "layer blown films on multiple lines" },
      { icon: ScanSearch, value: "Hawk-Eye", label: "inspection on our metalliser" },
      { icon: Gauge, value: "OD", label: "optical density measurement for precise barrier control" },
    ],
  },
  inks: {
    tone: "wash",
    card: { bg: "bg-blush", ink: "text-ink", sub: "text-ink/75" },
    cover: { src: "/media/old/home/photo-blue-ink-stirring.webp", alt: "Blue ink swirled with yellow by a stirring rod" },
    hero: [
      { src: "/media/old/home/photo-blue-ink-stirring.webp", alt: "Blue ink swirled with yellow by a stirring rod" },
      { src: "/media/process/ink-roller.webp", alt: "Yellow gravure ink running onto a press roller" },
    ],
    about: { src: "/media/old/products-inks/photo-ink-pots-printing-unit.webp", alt: "Blue, red and yellow ink pots in a printing unit" },
    glance: [
      { icon: BadgeCheck, value: "ISO 22000", label: "2018 certified sister concern makes our inks" },
      { icon: Palette, value: "NTNK", label: "specialised non-toluene, non-ketone inks" },
      { icon: Printer, value: "Gravure", label: "optimised for high-speed press stability" },
      { icon: Layers, value: "Solvent-free", label: "compatible with every lamination process" },
    ],
    extraIcons: [Palette, Printer, Layers, ShieldCheck],
  },
  cylinders: {
    tone: "wine",
    card: { bg: "bg-ink", ink: "text-white", sub: "text-white/75" },
    cover: { src: "/media/old/home/photo-printed-film-rolls-on-shafts.webp", alt: "Printed and metallised film on large shafts inside a machine" },
    hero: [
      { src: "/media/old/home/photo-printed-film-rolls-on-shafts.webp", alt: "Printed and metallised film on large shafts inside a machine" },
      { src: "/media/plant/cylinder-engraver.webp", alt: "Copper gravure cylinder on an engraving machine at the plant" },
    ],
    about: { src: "/media/old/products-cylinders/photo-cylinders-printed-film-close.webp", alt: "Chrome cylinders carrying printed film" },
    extraPhoto: { src: "/media/plant/cylinder-engraving-line.webp", alt: "Cylinder engraving machine with a copper cylinder and operator screen" },
    glance: [
      { icon: Workflow, value: "Prepress", label: "to production, one complete workflow" },
      { icon: Target, value: "Micro", label: "precision engraving for colour, tone and registration" },
      { icon: Brush, value: "Coatings", label: "specialised coatings and geometry" },
      { icon: RefreshCw, value: "Re-engraving", label: "processes alongside new cylinders" },
    ],
    extraIcons: [Target, Boxes, Brush, RefreshCw],
  },
  polybags: {
    tone: "crimson",
    card: { bg: "bg-crimson-deep", ink: "text-white", sub: "text-white/85" },
    cover: { src: "/media/old/home/mockup-clear-zip-bag.webp", alt: "Clear zip bag printed with the Aditya Flexipack name" },
    hero: [
      { src: "/media/old/home/mockup-clear-zip-bag.webp", alt: "Clear zip bag printed with the Aditya Flexipack name" },
      { src: "/media/old/products-polybags/photo-polybag-film-roll.webp", alt: "Large roll of clear polyethylene film on a pallet" },
    ],
    about: { src: "/media/old/products-polybags/banner-film-rolls-blue-tint.webp", alt: "Clear polyethylene film rolls on a converting machine" },
    glance: [
      { icon: Ruler, value: "120 micron", label: "customisable thickness, at the most" },
      { icon: PackageOpen, value: "3-side seal", label: "high-strength mono-layer construction" },
      { icon: Palette, value: "Multi-colour", label: "single and multi-coloured printing" },
      { icon: Truck, value: "Large scale", label: "supply with fast lead times" },
    ],
    extraIcons: [Shirt, Cookie, Car, Sparkles, Pill, Cpu, House, ShoppingBag],
  },
};

export const FallbackIcon = CircleCheck;

/** Industries listed on the old products page, with an icon each. */
export const industryIcons: Record<string, LucideIcon> = {
  "Food and beverages": Cookie,
  "Personal care and hygiene": Bath,
  "Agriculture and seeds": Sprout,
  "Retail and consumer goods": ShoppingBag,
  "Automotive and lubricants": Car,
};
