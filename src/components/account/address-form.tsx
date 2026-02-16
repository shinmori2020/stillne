"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CustomerAddress, AddAddressInput } from "@/types/customer";

interface AddressFormData {
  firstName: string;
  lastName: string;
  postalCode: string;
  province: string;
  city: string;
  address1: string;
  address2?: string;
  phone?: string;
  isDefaultShipping: boolean;
}

interface AddressFormProps {
  initialAddress?: CustomerAddress | null;
  onSubmit: (data: AddAddressInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  locale: string;
}

export function AddressForm({
  initialAddress,
  onSubmit,
  onCancel,
  isSubmitting,
  locale,
}: AddressFormProps) {
  const tAddress = useTranslations("address");
  const tAccount = useTranslations("account");
  const tValidation = useTranslations("validation");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      firstName: initialAddress?.first_name ?? "",
      lastName: initialAddress?.last_name ?? "",
      postalCode: initialAddress?.postal_code ?? "",
      province: initialAddress?.province ?? "",
      city: initialAddress?.city ?? "",
      address1: initialAddress?.address_1 ?? "",
      address2: initialAddress?.address_2 ?? "",
      phone: initialAddress?.phone ?? "",
      isDefaultShipping: initialAddress?.is_default_shipping ?? false,
    },
  });

  const handleFormSubmit = (data: AddressFormData) => {
    const address: AddAddressInput = {
      first_name: data.firstName,
      last_name: data.lastName,
      postal_code: data.postalCode,
      province: data.province,
      city: data.city,
      address_1: data.address1,
      address_2: data.address2,
      phone: data.phone,
      country_code: "jp",
      is_default_shipping: data.isDefaultShipping,
    };
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lastName">{tAccount("lastName")}</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: tValidation("required") })}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">{tAccount("firstName")}</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: tValidation("required") })}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">{tAddress("postalCode")}</Label>
        <Input
          id="postalCode"
          {...register("postalCode", {
            required: tValidation("required"),
            pattern: {
              value: /^\d{3}-?\d{4}$/,
              message: tValidation("invalidPostalCode"),
            },
          })}
          placeholder="123-4567"
          className={`max-w-[200px] ${errors.postalCode ? "border-destructive" : ""}`}
        />
        {errors.postalCode && (
          <p className="text-xs text-destructive">{errors.postalCode.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="province">{tAddress("prefecture")}</Label>
        <Input
          id="province"
          {...register("province", { required: tValidation("required") })}
          className={`max-w-[200px] ${errors.province ? "border-destructive" : ""}`}
        />
        {errors.province && (
          <p className="text-xs text-destructive">{errors.province.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">{tAddress("city")}</Label>
        <Input
          id="city"
          {...register("city", { required: tValidation("required") })}
          className={errors.city ? "border-destructive" : ""}
        />
        {errors.city && (
          <p className="text-xs text-destructive">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address1">{tAddress("address1")}</Label>
        <Input
          id="address1"
          {...register("address1", { required: tValidation("required") })}
          className={errors.address1 ? "border-destructive" : ""}
        />
        {errors.address1 && (
          <p className="text-xs text-destructive">{errors.address1.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address2">{tAddress("address2")}</Label>
        <Input id="address2" {...register("address2")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{tAddress("phone")}</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            pattern: {
              value: /^[\d-]*$/,
              message: tValidation("invalidPhone"),
            },
          })}
          placeholder="090-1234-5678"
          className={`max-w-[250px] ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isDefaultShipping"
          {...register("isDefaultShipping")}
          className="h-4 w-4 rounded border-border"
        />
        <Label htmlFor="isDefaultShipping" className="font-normal">
          {locale === "ja" ? "デフォルトの配送先に設定" : "Set as default shipping address"}
        </Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {locale === "ja" ? "キャンセル" : "Cancel"}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? locale === "ja" ? "保存中..." : "Saving..."
            : locale === "ja" ? "保存" : "Save"}
        </Button>
      </div>
    </form>
  );
}
