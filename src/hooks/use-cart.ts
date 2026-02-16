"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import { getCartId, setCartId, removeCartId } from "@/lib/cart-cookie";
import type { Cart, AddToCartInput, UpdateCartItemInput } from "@/types/cart";

// Query key for cart data
export const CART_QUERY_KEY = ["cart"] as const;

// Check if Medusa backend is configured
const isMedusaConfigured =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    : !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

/**
 * Helper to get or create a cart
 */
async function getOrCreateCart(): Promise<string> {
  if (!isMedusaConfigured) {
    throw new Error("Medusa backend not configured");
  }

  const existingCartId = getCartId();
  if (existingCartId) {
    return existingCartId;
  }

  const createResponse = await medusa.store.cart.create({});
  const newCartId = createResponse.cart.id;
  if (!newCartId) {
    throw new Error("Failed to create cart");
  }
  setCartId(newCartId);
  return newCartId;
}

/**
 * Hook to fetch cart data
 */
export function useCart() {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async (): Promise<Cart | null> => {
      // Skip if Medusa is not configured
      if (!isMedusaConfigured) {
        return null;
      }

      const cartId = getCartId();
      if (!cartId) {
        return null;
      }

      try {
        const response = await medusa.store.cart.retrieve(cartId);
        return response.cart as Cart;
      } catch {
        // Cart not found, remove invalid cart ID
        removeCartId();
        return null;
      }
    },
    staleTime: 0, // Always fetch fresh cart data
    enabled: isMedusaConfigured, // Don't run query if not configured
  });
}

/**
 * Hook to add item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ variantId, quantity }: AddToCartInput) => {
      const cartId = await getOrCreateCart();

      // Add item to cart
      const response = await medusa.store.cart.createLineItem(cartId, {
        variant_id: variantId,
        quantity,
      });

      return response.cart as Cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

/**
 * Hook to update cart item quantity
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lineItemId, quantity }: UpdateCartItemInput) => {
      const cartId = getCartId();
      if (!cartId) {
        throw new Error("Cart not found");
      }

      const response = await medusa.store.cart.updateLineItem(
        cartId,
        lineItemId,
        { quantity }
      );

      return response.cart as Cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

/**
 * Hook to remove item from cart
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lineItemId: string) => {
      const cartId = getCartId();
      if (!cartId) {
        throw new Error("Cart not found");
      }

      const response = await medusa.store.cart.deleteLineItem(
        cartId,
        lineItemId
      );

      return response.cart as Cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
