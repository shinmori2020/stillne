"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import type { CustomerAddress, AddAddressInput } from "@/types/customer";

// Query key
export const ADDRESSES_QUERY_KEY = ["addresses"] as const;

// Check if Medusa backend is configured
const isMedusaConfigured =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    : !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

/**
 * Hook to fetch customer addresses
 */
export function useAddresses() {
  return useQuery({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async (): Promise<CustomerAddress[]> => {
      if (!isMedusaConfigured) {
        return [];
      }

      try {
        const response = await medusa.store.customer.listAddress();
        return response.addresses as unknown as CustomerAddress[];
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: isMedusaConfigured,
  });
}

/**
 * Hook to add a new address
 */
export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (address: AddAddressInput) => {
      const response = await medusa.store.customer.createAddress(address);
      return response.address as unknown as CustomerAddress;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

/**
 * Hook to update an address
 */
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      addressId,
      data,
    }: {
      addressId: string;
      data: Partial<AddAddressInput>;
    }) => {
      const response = await medusa.store.customer.updateAddress(
        addressId,
        data
      );
      return response.address as unknown as CustomerAddress;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

/**
 * Hook to delete an address
 */
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      await medusa.store.customer.deleteAddress(addressId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
