import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface CheckoutSuccessPageProps {
  params: Promise<{ locale: string }>;
}

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

  // Demo order number
  const orderNumber = "ORD-2024-00001";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8 md:py-24">
      <ScrollFadeIn>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="mt-6 font-heading text-3xl lowercase tracking-wide md:text-4xl">
          {t("success")}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          {t("orderNumber")}: <span className="font-mono font-medium">{orderNumber}</span>
        </p>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="mt-8 rounded-lg border bg-card p-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <p>{t("confirmationEmail")}</p>
          </div>
        </div>
      </ScrollFadeIn>

      {/* Demo Notice */}
      <ScrollFadeIn>
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="font-medium text-amber-800 dark:text-amber-200">
            {t("demoNoticeTitle")}
          </p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            {t("demoNoticeBody")}
          </p>
        </div>
      </ScrollFadeIn>

      {/* Order Summary Preview */}
      <ScrollFadeIn>
        <div className="mt-8 rounded-lg border bg-card p-6 text-left">
          <h2 className="flex items-center gap-2 font-heading text-lg">
            <Package className="h-5 w-5" />
            {locale === "ja" ? "ご注文内容" : "Order Summary"}
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                セラミックフラワーベース A-001 × 1
              </span>
              <span>¥5,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                マグカップ C-003 × 2
              </span>
              <span>¥5,600</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ja" ? "小計" : "Subtotal"}
                </span>
                <span>¥11,400</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ja" ? "送料" : "Shipping"}
                </span>
                <span>{locale === "ja" ? "無料" : "Free"}</span>
              </div>
              <div className="mt-2 flex justify-between font-medium">
                <span>{locale === "ja" ? "合計" : "Total"}</span>
                <span>¥11,400</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
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
      </ScrollFadeIn>
    </div>
  );
}
