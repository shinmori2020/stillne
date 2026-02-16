"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import type {
  Customer,
  LoginInput,
  RegisterInput,
  UpdateCustomerInput,
} from "@/types/customer";

// Query key for customer data
export const CUSTOMER_QUERY_KEY = ["customer"] as const;

// Check if Medusa backend is configured
const isMedusaConfigured =
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    : !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

/**
 * Hook to fetch current customer
 */
export function useCustomer() {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEY,
    queryFn: async (): Promise<Customer | null> => {
      if (!isMedusaConfigured) {
        return null;
      }

      try {
        const response = await medusa.store.customer.retrieve();
        return response.customer as Customer;
      } catch {
        // Not authenticated
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isMedusaConfigured,
  });
}

/**
 * Hook for login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const response = await medusa.auth.login("customer", "emailpass", {
        email,
        password,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEY });
    },
  });
}

/**
 * Hook for registration
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      first_name,
      last_name,
      phone,
    }: RegisterInput) => {
      // First, register the user
      await medusa.auth.register("customer", "emailpass", {
        email,
        password,
      });

      // Then login
      await medusa.auth.login("customer", "emailpass", {
        email,
        password,
      });

      // Update customer info
      const response = await medusa.store.customer.update({
        first_name,
        last_name,
        phone,
      });

      return response.customer as Customer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEY });
    },
  });
}

/**
 * Hook for logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await medusa.auth.logout();
    },
    onSuccess: () => {
      queryClient.setQueryData(CUSTOMER_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEY });
    },
  });
}

/**
 * Hook to update customer info
 */
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCustomerInput) => {
      const response = await medusa.store.customer.update(data);
      return response.customer as Customer;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CUSTOMER_QUERY_KEY, data);
    },
  });
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated() {
  const { data: customer, isLoading } = useCustomer();
  return {
    isAuthenticated: !!customer,
    isLoading,
    customer,
  };
}
