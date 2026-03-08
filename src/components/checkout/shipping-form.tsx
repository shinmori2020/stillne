"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CartAddress } from "@/types/cart";

interface ShippingFormProps {
  initialAddress: CartAddress | null;
  onSubmit: (address: CartAddress) => void;
  locale: string;
}

interface ShippingFormData {
  firstName: string;
  lastName: string;
  postalCode: string;
  province: string;
  city: string;
  address1: string;
  address2?: string;
  phone: string;
}

export function ShippingForm({
  initialAddress,
  onSubmit,
  locale,
}: ShippingFormProps) {
  const t = useTranslations("checkout");
  const tAddress = useTranslations("address");
  const tAccount = useTranslations("account");
  const tValidation = useTranslations("validation");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>({
    defaultValues: {
      firstName: initialAddress?.first_name ?? "",
      lastName: initialAddress?.last_name ?? "",
      postalCode: initialAddress?.postal_code ?? "",
      province: initialAddress?.province ?? "",
      city: initialAddress?.city ?? "",
      address1: initialAddress?.address_1 ?? "",
      address2: initialAddress?.address_2 ?? "",
      phone: initialAddress?.phone ?? "",
    },
  });

  const handleFormSubmit = (data: ShippingFormData) => {
    const address: CartAddress = {
      first_name: data.firstName,
      last_name: data.lastName,
      postal_code: data.postalCode,
      province: data.province,
      city: data.city,
      address_1: data.address1,
      address_2: data.address2,
      phone: data.phone,
      country_code: "jp",
    };
    onSubmit(address);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 rounded-lg border border-border p-6"
    >
      <h2 className="text-lg font-medium">{t("shippingAddress")}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Last Name (姓) */}
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

        {/* First Name (名) */}
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

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Postal Code */}
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
            className={errors.postalCode ? "border-destructive" : ""}
          />
          {errors.postalCode && (
            <p className="text-xs text-destructive">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Prefecture */}
        <div className="space-y-2">
          <Label htmlFor="province">{tAddress("prefecture")}</Label>
          <Input
            id="province"
            {...register("province", { required: tValidation("required") })}
            className={errors.province ? "border-destructive" : ""}
          />
          {errors.province && (
            <p className="text-xs text-destructive">{errors.province.message}</p>
          )}
        </div>
      </div>

      {/* City */}
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

      {/* Address 1 */}
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

      {/* Address 2 */}
      <div className="space-y-2">
        <Label htmlFor="address2">{tAddress("address2")}</Label>
        <Input id="address2" {...register("address2")} />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">{tAddress("phone")}</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            required: tValidation("required"),
            pattern: {
              value: /^[\d-]+$/,
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

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {locale === "ja" ? "次へ進む" : "Continue"}
      </Button>
    </form>
  );
}
