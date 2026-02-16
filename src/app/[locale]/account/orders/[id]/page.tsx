import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/utils";

interface OrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

// Demo order data
const DEMO_ORDER = {
  id: "ORD-2024-00001",
  status: "shipped",
  createdAt: "2024-02-10",
  shippedAt: "2024-02-12",
  items: [
    {
      id: "item_01",
      title: "セラミックフラワーベース A-001",
      variant: "ホワイト",
      price: 580000,
      quantity: 1,
      handle: "ceramic-flower-vase-a001",
    },
    {
      id: "item_02",
      title: "マグカップ C-003",
      variant: "グレー",
      price: 280000,
      quantity: 2,
      handle: "mug-cup-c003",
    },
  ],
  shippingAddress: {
    name: "山田 太郎",
    postalCode: "150-0001",
    prefecture: "東京都",
    city: "渋谷区",
    address1: "神南1-1-1",
    address2: "サンプルマンション 101",
    phone: "03-1234-5678",
  },
  subtotal: 1140000,
  shipping: 0,
  total: 1140000,
};

const STATUS_STEPS = [
  { key: "ordered", icon: Package },
  { key: "shipped", icon: Truck },
  { key: "delivered", icon: CheckCircle },
];

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: `${t("orders")} - ${id}`,
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });
  const order = DEMO_ORDER;

  const statusLabels: Record<string, { ja: string; en: string }> = {
    ordered: { ja: "注文受付", en: "Ordered" },
    shipped: { ja: "発送済み", en: "Shipped" },
    delivered: { ja: "配達完了", en: "Delivered" },
  };

  const currentStatusIndex = STATUS_STEPS.findIndex(
    (step) => step.key === order.status
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <ScrollFadeIn>
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/${locale}/account/orders`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("orders")}
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl">
              {t("orderNumber") || "注文番号"}: {order.id}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {t("orderDate")}: {order.createdAt}
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {statusLabels[order.status]?.[locale === "ja" ? "ja" : "en"]}
          </span>
        </div>
      </ScrollFadeIn>

      {/* Order Status Timeline */}
      <ScrollFadeIn>
        <div className="mt-8 rounded-lg border bg-card p-6">
          <div className="flex justify-between">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index <= currentStatusIndex;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      isCompleted ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {statusLabels[step.key]?.[locale === "ja" ? "ja" : "en"]}
                  </span>
                  {index < STATUS_STEPS.length - 1 && (
                    <div
                      className={`absolute mt-5 h-0.5 w-full max-w-[100px] ${
                        index < currentStatusIndex ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ left: "50%", transform: "translateX(20px)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollFadeIn>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Order Items */}
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-heading text-lg">
              {locale === "ja" ? "注文商品" : "Order Items"}
            </h2>
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <PlaceholderImage
                      width={64}
                      height={64}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/${locale}/products/${item.handle}`}
                      className="font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.variant} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ja" ? "小計" : "Subtotal"}
                </span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ja" ? "送料" : "Shipping"}
                </span>
                <span>
                  {order.shipping === 0
                    ? locale === "ja"
                      ? "無料"
                      : "Free"
                    : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-medium">
                <span>{locale === "ja" ? "合計" : "Total"}</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Shipping Address */}
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="flex items-center gap-2 font-heading text-lg">
              <MapPin className="h-5 w-5" />
              {locale === "ja" ? "配送先" : "Shipping Address"}
            </h2>
            <div className="mt-4 space-y-1 text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-muted-foreground">
                〒{order.shippingAddress.postalCode}
              </p>
              <p className="text-muted-foreground">
                {order.shippingAddress.prefecture}
                {order.shippingAddress.city}
                {order.shippingAddress.address1}
              </p>
              {order.shippingAddress.address2 && (
                <p className="text-muted-foreground">
                  {order.shippingAddress.address2}
                </p>
              )}
              <p className="text-muted-foreground">
                TEL: {order.shippingAddress.phone}
              </p>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
}
