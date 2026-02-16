/**
 * Cart cookie management utilities
 * Uses js-cookie for cookie operations
 */

import Cookies from "js-cookie";
import { CART_COOKIE_KEY, CART_COOKIE_EXPIRY } from "./constants";

/**
 * Get the cart ID from cookie
 * @returns Cart ID if exists, undefined otherwise
 */
export function getCartId(): string | undefined {
  return Cookies.get(CART_COOKIE_KEY);
}

/**
 * Set the cart ID in cookie
 * @param cartId - The cart ID to store
 */
export function setCartId(cartId: string): void {
  Cookies.set(CART_COOKIE_KEY, cartId, {
    expires: CART_COOKIE_EXPIRY,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Remove the cart ID cookie
 */
export function removeCartId(): void {
  Cookies.remove(CART_COOKIE_KEY);
}
