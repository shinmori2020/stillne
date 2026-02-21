"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomer } from "@/hooks/use-auth";
import {
  useAddresses,
  useAddAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/hooks/use-addresses";
import { EmptyState } from "@/components/common/empty-state";
import { AddressForm } from "./address-form";
import { cn } from "@/lib/utils";
import type { CustomerAddress, AddAddressInput } from "@/types/customer";

interface AddressListProps {
  locale: string;
}

export function AddressList({ locale }: AddressListProps) {
  const t = useTranslations("account");
  const { data: customer, isLoading: customerLoading } = useCustomer();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const addAddress = useAddAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);

  // Check if Medusa is configured
  const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  // Loading state
  if ((customerLoading || addressesLoading) && isMedusaConfigured) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not logged in — show demo data
  if (!customer) {
    const demoAddresses: CustomerAddress[] = [
      {
        id: "demo-addr-1",
        customer_id: "demo-customer",
        first_name: "太郎",
        last_name: "山田",
        address_1: "丸の内1-1-1",
        address_2: "stillneビル 3F",
        city: "千代田区",
        province: "東京都",
        postal_code: "100-0005",
        country_code: "jp",
        phone: "03-1234-5678",
        company: "",
        is_default_shipping: true,
        is_default_billing: true,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
      },
      {
        id: "demo-addr-2",
        customer_id: "demo-customer",
        first_name: "太郎",
        last_name: "山田",
        address_1: "梅田2-2-2",
        address_2: "グランフロント大阪 12F",
        city: "北区",
        province: "大阪府",
        postal_code: "530-0001",
        country_code: "jp",
        phone: "06-9876-5432",
        company: "",
        is_default_shipping: false,
        is_default_billing: false,
        created_at: "2025-02-01T00:00:00Z",
        updated_at: "2025-02-01T00:00:00Z",
      },
    ];

    return (
      <div>
        <div className="mb-6 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground">
          {locale === "ja"
            ? "これはデモ表示です。実際の住所データではありません。"
            : "This is a demo view. These are not real addresses."}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {demoAddresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                "relative rounded-lg border p-5 transition-shadow duration-200 hover:shadow-md",
                address.is_default_shipping
                  ? "border-primary"
                  : "border-border"
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium">
                  {address.last_name} {address.first_name}
                </p>
                {address.is_default_shipping && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {locale === "ja" ? "デフォルト" : "Default"}
                  </span>
                )}
              </div>
              <address className="not-italic text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <div>
                    <p>〒{address.postal_code}</p>
                    <p>
                      {address.province}
                      {address.city}
                      {address.address_1}
                    </p>
                    {address.address_2 && <p>{address.address_2}</p>}
                  </div>
                </div>
                {address.phone && (
                  <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <p>{address.phone}</p>
                  </div>
                )}
              </address>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleAddAddress = async (data: AddAddressInput) => {
    try {
      await addAddress.mutateAsync(data);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  const handleUpdateAddress = async (data: AddAddressInput) => {
    if (!editingAddress) return;
    try {
      await updateAddress.mutateAsync({
        addressId: editingAddress.id,
        data,
      });
      setEditingAddress(null);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    const confirmed = window.confirm(
      locale === "ja"
        ? "この住所を削除してもよろしいですか？"
        : "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    try {
      await deleteAddress.mutateAsync(addressId);
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  // Show form for adding new address
  if (showForm) {
    return (
      <div className="rounded-lg border border-border p-6">
        <h2 className="mb-6 text-lg font-medium">
          {locale === "ja" ? "新しい住所を追加" : "Add new address"}
        </h2>
        <AddressForm
          onSubmit={handleAddAddress}
          onCancel={() => setShowForm(false)}
          isSubmitting={addAddress.isPending}
          locale={locale}
        />
      </div>
    );
  }

  // Show form for editing address
  if (editingAddress) {
    return (
      <div className="rounded-lg border border-border p-6">
        <h2 className="mb-6 text-lg font-medium">
          {locale === "ja" ? "住所を編集" : "Edit address"}
        </h2>
        <AddressForm
          initialAddress={editingAddress}
          onSubmit={handleUpdateAddress}
          onCancel={() => setEditingAddress(null)}
          isSubmitting={updateAddress.isPending}
          locale={locale}
        />
      </div>
    );
  }

  // No addresses
  if (!addresses || addresses.length === 0) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={MapPin}
          message={locale === "ja" ? "登録された住所がありません" : "No addresses saved"}
        />
        <div className="text-center">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {locale === "ja" ? "住所を追加" : "Add address"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add button */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {locale === "ja" ? "住所を追加" : "Add address"}
        </Button>
      </div>

      {/* Address list */}
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address: CustomerAddress) => (
          <div
            key={address.id}
            className={cn(
              "relative rounded-lg border p-4",
              address.is_default_shipping
                ? "border-primary"
                : "border-border"
            )}
          >
            {address.is_default_shipping && (
              <span className="absolute -top-2 left-4 bg-background px-2 text-xs font-medium text-primary">
                {locale === "ja" ? "デフォルト" : "Default"}
              </span>
            )}

            <address className="not-italic text-sm">
              <p className="font-medium">
                {address.last_name} {address.first_name}
              </p>
              <p className="mt-2 text-muted-foreground">
                〒{address.postal_code}
              </p>
              <p className="text-muted-foreground">
                {address.province}
                {address.city}
                {address.address_1}
              </p>
              {address.address_2 && (
                <p className="text-muted-foreground">{address.address_2}</p>
              )}
              {address.phone && (
                <p className="mt-2 text-muted-foreground">
                  TEL: {address.phone}
                </p>
              )}
            </address>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingAddress(address)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                {locale === "ja" ? "編集" : "Edit"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteAddress(address.id)}
                disabled={deleteAddress.isPending}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                {locale === "ja" ? "削除" : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
