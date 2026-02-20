"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomer, useUpdateCustomer } from "@/hooks/use-auth";
import type { UpdateCustomerInput } from "@/types/customer";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ProfileFormProps {
  locale: string;
}

export function ProfileForm({ locale }: ProfileFormProps) {
  const t = useTranslations("account");
  const tValidation = useTranslations("validation");
  const { data: customer } = useCustomer();
  const updateCustomer = useUpdateCustomer();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: customer?.first_name ?? "",
      lastName: customer?.last_name ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setSuccess(false);
    setError(null);

    try {
      const updateData: UpdateCustomerInput = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone || undefined,
      };

      // Only update email if it changed
      if (data.email !== customer?.email) {
        updateData.email = data.email;
      }

      await updateCustomer.mutateAsync(updateData);
      setSuccess(true);
    } catch {
      setError(t("updateError"));
    }
  };

  const isDemo = !customer;

  const formContent = (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: tValidation("required") })}
            className={errors.lastName ? "border-destructive" : ""}
            disabled={isDemo}
            defaultValue={isDemo ? "山田" : undefined}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: tValidation("required") })}
            className={errors.firstName ? "border-destructive" : ""}
            disabled={isDemo}
            defaultValue={isDemo ? "太郎" : undefined}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: tValidation("required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: tValidation("invalidEmail"),
            },
          })}
          className={errors.email ? "border-destructive" : ""}
          disabled={isDemo}
          defaultValue={isDemo ? "demo@stillne.com" : undefined}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
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
          disabled={isDemo}
          defaultValue={isDemo ? "090-1234-5678" : undefined}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>
    </>
  );

  if (isDemo) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground">
          {locale === "ja"
            ? "これはデモ表示です。実際のユーザーデータではありません。"
            : "This is a demo view. This is not real user data."}
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
          {t("profileUpdated")}
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {formContent}

      <Button
        type="submit"
        disabled={isSubmitting || updateCustomer.isPending}
      >
        {isSubmitting || updateCustomer.isPending
          ? t("saving")
          : t("saveChanges")}
      </Button>
    </form>
  );
}
