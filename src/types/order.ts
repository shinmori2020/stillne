/**
 * Order-related type definitions
 *
 * Note: @medusajs/types package may not export types directly in some versions.
 * These types are defined based on Medusa v2 SDK response shapes.
 */

import type { CartAddress, CartItem, CartShippingMethod } from "./cart";

/**
 * Order fulfillment status
 */
export type FulfillmentStatus =
  | "not_fulfilled"
  | "partially_fulfilled"
  | "fulfilled"
  | "partially_shipped"
  | "shipped"
  | "partially_returned"
  | "returned"
  | "canceled"
  | "requires_action";

/**
 * Order payment status
 */
export type PaymentStatus =
  | "not_paid"
  | "awaiting"
  | "captured"
  | "partially_refunded"
  | "refunded"
  | "canceled"
  | "requires_action";

/**
 * Order status
 */
export type OrderStatus =
  | "pending"
  | "completed"
  | "archived"
  | "canceled"
  | "requires_action";

/**
 * Order payment
 */
export interface OrderPayment {
  id: string;
  order_id: string;
  amount: number;
  currency_code: string;
  provider_id: string;
  data?: Record<string, unknown>;
  captured_at?: string;
  canceled_at?: string;
  created_at: string;
}

/**
 * Order fulfillment item
 */
export interface FulfillmentItem {
  id: string;
  fulfillment_id: string;
  item_id: string;
  quantity: number;
}

/**
 * Order fulfillment
 */
export interface OrderFulfillment {
  id: string;
  order_id: string;
  provider_id: string;
  tracking_numbers?: string[];
  tracking_links?: { url: string; tracking_number: string }[];
  items: FulfillmentItem[];
  shipped_at?: string;
  canceled_at?: string;
  created_at: string;
}

/**
 * Order
 */
export interface Order {
  id: string;
  display_id: number;
  status: OrderStatus;
  fulfillment_status: FulfillmentStatus;
  payment_status: PaymentStatus;
  email: string;
  customer_id?: string;
  billing_address?: CartAddress;
  shipping_address?: CartAddress;
  items: CartItem[];
  shipping_methods?: CartShippingMethod[];
  payments?: OrderPayment[];
  fulfillments?: OrderFulfillment[];
  currency_code: string;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  discount_total: number;
  total: number;
  paid_total: number;
  refunded_total: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
