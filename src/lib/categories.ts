/**
 * Centralized category definitions
 * All components (header, mobile-menu, product-filter, footer) import from here.
 */

export const CATEGORIES = [
  { key: "interior", handle: "interior" },
  { key: "tableware", handle: "tableware" },
  { key: "fabric", handle: "fabric" },
  { key: "stationery", handle: "stationery" },
  { key: "furniture", handle: "furniture" },
  { key: "lighting", handle: "lighting" },
  { key: "kitchen", handle: "kitchen" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];
