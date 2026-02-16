/**
 * Application constants
 */

/** Site name */
export const SITE_NAME = "stillne" as const;

/** Default locale for the application */
export const DEFAULT_LOCALE = "ja" as const;

/** Supported locales */
export const SUPPORTED_LOCALES = ["ja", "en"] as const;

/** Type for supported locales */
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** Number of products to display per page */
export const PRODUCTS_PER_PAGE = 12 as const;

/** Cookie key for storing cart ID */
export const CART_COOKIE_KEY = "stillne_cart_id" as const;

/** Cart cookie expiry in days */
export const CART_COOKIE_EXPIRY = 30 as const;

/** Inventory alert threshold - show "low stock" warning below this number */
export const INVENTORY_ALERT_THRESHOLD = 5 as const;
