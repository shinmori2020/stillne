/**
 * Cart-related type definitions
 *
 * Note: @medusajs/types package may not export types directly in some versions.
 * These types are defined based on Medusa v2 SDK response shapes.
 */

import type { Product, ProductVariant } from "./product";

/**
 * Cart line item
 */
export interface CartItem {
  id: string;
  cart_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  quantity: number;
  variant_id: string;
  variant?: ProductVariant;
  product_id?: string;
  product?: Product;
  unit_price: number;
  subtotal: number;
  total: number;
  tax_total: number;
  discount_total: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Cart shipping address
 */
export interface CartAddress {
  id?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country_code?: string;
  phone?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Cart shipping method
 */
export interface CartShippingMethod {
  id: string;
  shipping_option_id: string;
  name: string;
  price: number;
  data?: Record<string, unknown>;
}

/**
 * Cart
 */
export interface Cart {
  id: string;
  email?: string;
  billing_address_id?: string;
  billing_address?: CartAddress;
  shipping_address_id?: string;
  shipping_address?: CartAddress;
  items: CartItem[];
  region_id: string;
  currency_code: string;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  discount_total: number;
  total: number;
  item_count: number;
  shipping_methods?: CartShippingMethod[];
  payment_session?: {
    id: string;
    provider_id: string;
    status: string;
    data?: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Input for adding item to cart
 */
export interface AddToCartInput {
  /** Product variant ID */
  variantId: string;
  /** Quantity to add */
  quantity: number;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Input for updating cart item
 */
export interface UpdateCartItemInput {
  /** Line item ID */
  lineItemId: string;
  /** New quantity */
  quantity: number;
}
