"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-auth";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface RegisterFormProps {
  locale: string;
}

export function RegisterForm({ locale }: RegisterFormProps) {
  const t = useTranslations("account");
  const tValidation = useTranslations("validation");
  const router = useRouter();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
      });
      router.push(`/${locale}/account`);
    } catch {
      setError(t("registerError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
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
          <Label htmlFor="firstName">{t("firstName")}</Label>
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
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: tValidation("required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: tValidation("invalidEmail"),
            },
          })}
          className={errors.email ? "border-destructive" : ""}
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
              value: /^[\d-]+$/,
              message: tValidation("invalidPhone"),
            },
          })}
          placeholder="090-1234-5678"
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password", {
              required: tValidation("required"),
              minLength: {
                value: 8,
                message: tValidation("minLength", { min: 8 }),
              },
            })}
            className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: tValidation("required"),
            validate: (value) =>
              value === password || tValidation("passwordMismatch"),
          })}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || registerMutation.isPending}
      >
        {isSubmitting || registerMutation.isPending
          ? t("registering")
          : t("register")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link
          href={`/${locale}/account/login`}
          className="font-medium text-primary hover:underline"
        >
          {t("login")}
        </Link>
      </p>
    </form>
  );
}
