/**
 * Customer type definitions
 */

export interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  has_account: boolean;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
}

export interface CustomerAddress {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  company: string | null;
  address_1: string;
  address_2: string | null;
  city: string;
  province: string | null;
  postal_code: string;
  country_code: string;
  phone: string | null;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface UpdateCustomerInput {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}

export interface AddAddressInput {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  province?: string;
  postal_code: string;
  country_code: string;
  phone?: string;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
}
