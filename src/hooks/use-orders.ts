"use client";

import { useQuery } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import type { Order } from "@/types/order";

// Query keys
export const ORDERS_QUERY_KEY = ["orders"] as const;

// Check if Medusa backend is configured
const isMedusaConfigured =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    : !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

/**
 * Hook to fetch customer orders
 */
export function useOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async (): Promise<Order[]> => {
      if (!isMedusaConfigured) {
        return [];
      }

      try {
        const response = await medusa.store.order.list({
          limit: 50,
          order: "-created_at",
        });
        return response.orders as unknown as Order[];
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isMedusaConfigured,
  });
}

/**
 * Hook to fetch single order by ID
 */
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, orderId],
    queryFn: async (): Promise<Order | null> => {
      if (!isMedusaConfigured || !orderId) {
        return null;
      }

      try {
        const response = await medusa.store.order.retrieve(orderId);
        return response.order as unknown as Order;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: isMedusaConfigured && !!orderId,
  });
}
