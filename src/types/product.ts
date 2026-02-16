/**
 * Product-related type definitions
 *
 * Note: @medusajs/types package may not export types directly in some versions.
 * These types are defined based on Medusa v2 SDK response shapes.
 * If @medusajs/types becomes available, consider re-exporting from there.
 */

/**
 * Product image
 */
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Product option value
 */
export interface ProductOptionValue {
  id: string;
  value: string;
  option_id: string;
  metadata?: Record<string, unknown>;
}

/**
 * Product option (e.g., Size, Color)
 */
export interface ProductOption {
  id: string;
  title: string;
  product_id: string;
  values: ProductOptionValue[];
  metadata?: Record<string, unknown>;
}

/**
 * Product variant price
 */
export interface ProductVariantPrice {
  id?: string;
  currency_code: string;
  amount: number;
  min_quantity?: number;
  max_quantity?: number;
}

/**
 * Product variant
 */
export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  barcode?: string;
  ean?: string;
  upc?: string;
  inventory_quantity: number;
  allow_backorder?: boolean;
  manage_inventory?: boolean;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  options?: Array<{ value: string; id?: string; option_id?: string; metadata?: Record<string, unknown> }>;
  prices: ProductVariantPrice[];
  metadata?: Record<string, unknown>;
}

/**
 * Product category
 */
export interface ProductCategory {
  id: string;
  name: string;
  handle: string;
  description?: string;
  parent_category_id?: string;
  parent_category?: ProductCategory;
  category_children?: ProductCategory[];
  metadata?: Record<string, unknown>;
}

/**
 * Product collection
 */
export interface ProductCollection {
  id: string;
  title: string;
  handle: string;
  metadata?: Record<string, unknown>;
}

/**
 * Product
 */
export interface Product {
  id: string;
  title: string;
  handle: string;
  subtitle?: string;
  description?: string;
  is_giftcard?: boolean;
  status: "draft" | "proposed" | "published" | "rejected";
  thumbnail?: string;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  origin_country?: string;
  material?: string;
  collection_id?: string;
  collection?: ProductCollection;
  categories?: ProductCategory[];
  images?: ProductImage[];
  options?: ProductOption[];
  variants?: ProductVariant[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Extended product metadata for Stillne
 */
export interface ProductMetadata {
  /** Sort order for display */
  sort_order?: number;
  /** English title for i18n */
  title_en?: string;
  /** English description for i18n */
  description_en?: string;
}

/**
 * Props for ProductCard component
 */
export interface ProductCardProps {
  /** Product data */
  product: Product;
  /** Current locale */
  locale?: string;
  /** Priority loading for images */
  priority?: boolean;
}

/**
 * Props for ProductGrid component
 */
export interface ProductGridProps {
  /** Array of products to display */
  products: Product[];
  /** Current locale */
  locale?: string;
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Show skeleton loading state */
  isLoading?: boolean;
}
