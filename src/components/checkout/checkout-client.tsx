"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { ShippingForm } from "./shipping-form";
import { OrderSummary } from "./order-summary";
import { CheckoutSteps } from "./checkout-steps";
import type { CartAddress } from "@/types/cart";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface CheckoutClientProps {
  locale: string;
}

export function CheckoutClient({ locale }: CheckoutClientProps) {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const { data: cart, isLoading } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState<CartAddress | null>(null);

  // Check if Medusa is configured
  const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  // Loading state (only show if Medusa is configured)
  if (isLoading && isMedusaConfigured) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Empty cart state (show when no cart or Medusa not configured)
  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={ShoppingBag}
          message={tCart("empty")}
          action={{
            label: tCart("continueShopping"),
            href: `/${locale}/products`,
          }}
        />
      </div>
    );
  }

  const handleShippingSubmit = (address: CartAddress) => {
    setShippingAddress(address);
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = () => {
    // In a real app, this would process payment
    setCurrentStep("confirmation");
  };

  const handleBackToShipping = () => {
    setCurrentStep("shipping");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title={t("title")} />
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${locale}/products`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {tCart("continueShopping")}
          </Link>
        </Button>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <ShippingForm
              initialAddress={shippingAddress}
              onSubmit={handleShippingSubmit}
              locale={locale}
            />
          )}

          {currentStep === "payment" && (
            <PaymentSection
              onSubmit={handlePaymentSubmit}
              onBack={handleBackToShipping}
              locale={locale}
            />
          )}

          {currentStep === "confirmation" && (
            <ConfirmationSection locale={locale} />
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}

// Payment section (simplified for demo)
function PaymentSection({
  onSubmit,
  onBack,
  locale,
}: {
  onSubmit: () => void;
  onBack: () => void;
  locale: string;
}) {
  const t = useTranslations("checkout");

  return (
    <div className="space-y-6 rounded-lg border border-border p-6">
      <h2 className="text-lg font-medium">{t("payment")}</h2>

      {/* Demo notice */}
      <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          {t("demoNoticeTitle")}
        </p>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
          {t("demoNoticeBody")}
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          {locale === "ja" ? "戻る" : "Back"}
        </Button>
        <Button onClick={onSubmit} className="flex-1">
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
}

// Confirmation section
function ConfirmationSection({ locale }: { locale: string }) {
  const t = useTranslations("checkout");

  // Generate a fake order number
  const orderNumber = `STL-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="space-y-6 rounded-lg border border-border p-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
        <svg
          className="h-8 w-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-medium">{t("success")}</h2>
        <p className="text-muted-foreground">
          {t("orderNumber")}: <span className="font-mono">{orderNumber}</span>
        </p>
        <p className="text-sm text-muted-foreground">{t("confirmationEmail")}</p>
      </div>

      <Button asChild className="mt-4">
        <Link href={`/${locale}/products`}>
          {locale === "ja" ? "買い物を続ける" : "Continue Shopping"}
        </Link>
      </Button>
    </div>
  );
}
