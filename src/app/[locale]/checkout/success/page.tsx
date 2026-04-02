import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { PackageCheck, Package, Mail, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { formatPrice } from "@/lib/format";
import { TrackPurchase } from "@/components/checkout/track-purchase";

interface CheckoutSuccessPageProps {
  params: Promise<{ locale: string }>;
}

// Demo order items (matches DEMO_CART in checkout-client.tsx)
const DEMO_ORDER_ITEMS = [
  { title: "セラミックフラワーベース A-001", handle: "ceramic-flower-vase-a001", productId: "prod_01", quantity: 1, subtotal: 580000 },
  { title: "マグカップ C-003", handle: "mug-cup-c003", productId: "prod_03", quantity: 2, subtotal: 560000 },
  { title: "リネンクッションカバー D-004", handle: "linen-cushion-cover-d004", productId: "prod_04", quantity: 1, subtotal: 380000 },
  { title: "テーブルランプ J-010", handle: "table-lamp-j010", productId: "prod_10", quantity: 1, subtotal: 1850000 },
  { title: "木製カッティングボード K-011", handle: "wooden-cutting-board-k011", productId: "prod_11", quantity: 1, subtotal: 580000 },
];

const DEMO_ORDER_SUBTOTAL = 3950000;

export async function generateMetadata({
  params,
}: CheckoutSuccessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });

  return {
    title: t("success"),
  };
}

export default async function CheckoutSuccessPage({
  params,
}: CheckoutSuccessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "checkout" });
  const tCart = await getTranslations({ locale, namespace: "cart" });

  // Demo order number
  const orderNumber = "ORD-2024-00001";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:px-12">
      {/* Track purchased products */}
      <TrackPurchase productIds={DEMO_ORDER_ITEMS.map((item) => item.productId)} />

      {/* Step indicator */}
      <CheckoutSteps currentStep="confirmation" />

      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
          <PackageCheck className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mt-6 font-heading text-3xl lowercase tracking-wide md:text-4xl">
          {t("success")}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          {t("orderNumber")}: <span className="font-mono font-medium">{orderNumber}</span>
        </p>

        <div className="mt-8 rounded-lg border bg-card p-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <p>{t("confirmationEmail")}</p>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="font-medium text-amber-800 dark:text-amber-200">
            {t("demoNoticeTitle")}
          </p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            {t("demoNoticeBody")}
          </p>
        </div>

        {/* Order Summary */}
        <div className="mt-8 rounded-lg border bg-card p-6 text-left">
          <h2 className="flex items-center gap-2 font-heading text-lg">
            <Package className="h-5 w-5" />
            {t("reviewItems")}
          </h2>

          <div className="mt-4 space-y-3">
            {DEMO_ORDER_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-1 text-sm min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between min-[390px]:gap-2">
                <span className="text-muted-foreground">
                  {item.title} × {item.quantity}
                </span>
                <div className="flex items-center justify-between gap-3 min-[390px]:justify-end">
                  <Link
                    href={`/${locale}/products/${item.handle}#review-form`}
                    className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80"
                  >
                    <PenLine className="h-3 w-3" />
                    {locale === "ja" ? "レビュー" : "Review"}
                  </Link>
                  <span className="font-mono">{formatPrice(item.subtotal, "jpy")}</span>
                </div>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{tCart("subtotal")}</span>
                <span className="font-mono">{formatPrice(DEMO_ORDER_SUBTOTAL, "jpy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{tCart("shipping")}</span>
                <span>{locale === "ja" ? "無料" : "Free"}</span>
              </div>
              <div className="mt-2 flex justify-between font-medium">
                <span>{tCart("total")}</span>
                <span className="font-mono">{formatPrice(DEMO_ORDER_SUBTOTAL, "jpy")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={`/${locale}/account/orders`}>
              {t("viewOrder")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/products`}>
              {locale === "ja" ? "買い物を続ける" : "Continue Shopping"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
