"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/format";
import { ShippingForm } from "./shipping-form";
import { OrderSummary } from "./order-summary";
import { CheckoutSteps } from "./checkout-steps";
import type { Cart, CartAddress } from "@/types/cart";

type CheckoutStep = "shipping" | "review" | "confirmation";

// Demo cart data for when Medusa is not configured
const DEMO_CART: Cart = {
  id: "demo_cart_01",
  items: [
    {
      id: "item_01",
      cart_id: "demo_cart_01",
      title: "セラミックフラワーベース A-001",
      thumbnail: "",
      quantity: 1,
      variant_id: "var_01",
      unit_price: 580000,
      subtotal: 580000,
      total: 580000,
      tax_total: 0,
      discount_total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "item_02",
      cart_id: "demo_cart_01",
      title: "マグカップ C-003",
      thumbnail: "",
      quantity: 2,
      variant_id: "var_03",
      unit_price: 280000,
      subtotal: 560000,
      total: 560000,
      tax_total: 0,
      discount_total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "item_03",
      cart_id: "demo_cart_01",
      title: "リネンクッションカバー D-004",
      thumbnail: "",
      quantity: 1,
      variant_id: "var_04",
      unit_price: 380000,
      subtotal: 380000,
      total: 380000,
      tax_total: 0,
      discount_total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "item_04",
      cart_id: "demo_cart_01",
      title: "テーブルランプ J-010",
      thumbnail: "",
      quantity: 1,
      variant_id: "var_10",
      unit_price: 1850000,
      subtotal: 1850000,
      total: 1850000,
      tax_total: 0,
      discount_total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "item_05",
      cart_id: "demo_cart_01",
      title: "木製カッティングボード K-011",
      thumbnail: "",
      quantity: 1,
      variant_id: "var_11",
      unit_price: 580000,
      subtotal: 580000,
      total: 580000,
      tax_total: 0,
      discount_total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  region_id: "reg_jp",
  currency_code: "jpy",
  subtotal: 3950000,
  tax_total: 0,
  shipping_total: 0,
  discount_total: 0,
  total: 3950000,
  item_count: 6,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

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

  // Use demo cart when Medusa is not configured
  const activeCart = isMedusaConfigured ? cart : DEMO_CART;

  // Loading state (only show if Medusa is configured)
  if (isLoading && isMedusaConfigured) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Empty cart state
  if (!activeCart || activeCart.items.length === 0) {
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
    setCurrentStep("review");
  };

  const handlePlaceOrder = () => {
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

          {currentStep === "review" && (
            <OrderReviewSection
              cart={activeCart}
              shippingAddress={shippingAddress}
              onPlaceOrder={handlePlaceOrder}
              onBackToShipping={handleBackToShipping}
              locale={locale}
            />
          )}

          {currentStep === "confirmation" && (
            <ConfirmationSection locale={locale} />
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary cart={activeCart} />
        </div>
      </div>
    </div>
  );
}

// Order Review section (注文確認)
function OrderReviewSection({
  cart,
  shippingAddress,
  onPlaceOrder,
  onBackToShipping,
  locale,
}: {
  cart: Cart;
  shippingAddress: CartAddress | null;
  onPlaceOrder: () => void;
  onBackToShipping: () => void;
  locale: string;
}) {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");

  return (
    <div className="space-y-6">
      {/* Shipping Address Review */}
      <div className="rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <MapPin className="h-5 w-5" />
            {t("reviewShippingAddress")}
          </h2>
          <Button variant="ghost" size="sm" onClick={onBackToShipping}>
            <Pencil className="mr-1 h-3.5 w-3.5" />
            {t("edit")}
          </Button>
        </div>
        {shippingAddress && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {shippingAddress.last_name} {shippingAddress.first_name}
            </p>
            <p className="mt-1">〒{shippingAddress.postal_code}</p>
            <p>{shippingAddress.province} {shippingAddress.city}</p>
            <p>{shippingAddress.address_1}</p>
            {shippingAddress.address_2 && <p>{shippingAddress.address_2}</p>}
            <p className="mt-1">TEL: {shippingAddress.phone}</p>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          <CreditCard className="h-5 w-5" />
          {t("reviewPaymentMethod")}
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("creditCard")}
        </p>
      </div>

      {/* Order Items Review */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="text-lg font-medium">{t("reviewItems")}</h2>
        <div className="mt-4 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <PlaceholderImage className="h-full w-full" />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {tCart("quantity") ?? "Qty"}: {item.quantity}
                  </p>
                </div>
                <p className="font-mono text-sm">
                  {formatPrice(item.subtotal, "jpy")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{tCart("subtotal")}</span>
            <span className="font-mono">{formatPrice(cart.subtotal, "jpy")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{tCart("shipping")}</span>
            <span className="text-sm text-muted-foreground">
              {cart.shipping_total
                ? formatPrice(cart.shipping_total, "jpy")
                : locale === "ja" ? "無料" : "Free"}
            </span>
          </div>
          <div className="mt-2 flex justify-between font-medium">
            <span>{tCart("total")}</span>
            <span className="font-mono">{formatPrice(cart.total, "jpy")}</span>
          </div>
        </div>
      </div>

      {/* Demo notice */}
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          {t("demoNoticeTitle")}
        </p>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
          {t("demoNoticeBody")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBackToShipping}>
          {t("backToShipping")}
        </Button>
        <Button onClick={onPlaceOrder} className="flex-1">
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
}

// Confirmation section (注文完了)
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

      {/* Demo notice */}
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          {t("demoNoticeTitle")}
        </p>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
          {t("demoNoticeBody")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href={`/${locale}/account/orders`}>
            {t("viewOrder")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/${locale}/products`}>
            {locale === "ja" ? "買い物を続ける" : "Continue Shopping"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
