"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { useOrder } from "@/hooks/use-orders";
import { EmptyState } from "@/components/common/empty-state";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { FulfillmentStatus, PaymentStatus } from "@/types/order";

interface OrderDetailProps {
  orderId: string;
  locale: string;
}

// Status badge colors
function getStatusColor(status: FulfillmentStatus | PaymentStatus): string {
  switch (status) {
    case "fulfilled":
    case "shipped":
    case "captured":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "not_fulfilled":
    case "not_paid":
    case "awaiting":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "canceled":
    case "returned":
    case "refunded":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

// Format date
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Status labels
function getFulfillmentLabel(status: FulfillmentStatus, locale: string): string {
  const labels: Record<FulfillmentStatus, { ja: string; en: string }> = {
    not_fulfilled: { ja: "未発送", en: "Not shipped" },
    partially_fulfilled: { ja: "一部発送済み", en: "Partially shipped" },
    fulfilled: { ja: "発送済み", en: "Shipped" },
    partially_shipped: { ja: "一部配送中", en: "Partially in transit" },
    shipped: { ja: "配送中", en: "In transit" },
    partially_returned: { ja: "一部返品", en: "Partially returned" },
    returned: { ja: "返品済み", en: "Returned" },
    canceled: { ja: "キャンセル", en: "Canceled" },
    requires_action: { ja: "対応が必要", en: "Requires action" },
  };
  return labels[status]?.[locale === "ja" ? "ja" : "en"] ?? status;
}

function getPaymentLabel(status: PaymentStatus, locale: string): string {
  const labels: Record<PaymentStatus, { ja: string; en: string }> = {
    not_paid: { ja: "未払い", en: "Not paid" },
    awaiting: { ja: "支払い待ち", en: "Awaiting payment" },
    captured: { ja: "支払い済み", en: "Paid" },
    partially_refunded: { ja: "一部返金", en: "Partially refunded" },
    refunded: { ja: "返金済み", en: "Refunded" },
    canceled: { ja: "キャンセル", en: "Canceled" },
    requires_action: { ja: "対応が必要", en: "Requires action" },
  };
  return labels[status]?.[locale === "ja" ? "ja" : "en"] ?? status;
}

export function OrderDetail({ orderId, locale }: OrderDetailProps) {
  const t = useTranslations("account");
  const tCart = useTranslations("cart");
  const { data: order, isLoading } = useOrder(orderId);

  // Check if Medusa is configured
  const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  // Loading state
  if (isLoading && isMedusaConfigured) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <EmptyState
        icon={Package}
        message={locale === "ja" ? "注文が見つかりませんでした" : "Order not found"}
        action={{
          label: t("orders"),
          href: `/${locale}/account/orders`,
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Order header */}
      <div className="rounded-lg border border-border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-lg">
              {locale === "ja" ? "注文番号" : "Order"} #{order.display_id}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(order.created_at, locale)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                getStatusColor(order.fulfillment_status)
              )}
            >
              {getFulfillmentLabel(order.fulfillment_status, locale)}
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                getStatusColor(order.payment_status)
              )}
            >
              {getPaymentLabel(order.payment_status, locale)}
            </span>
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="mb-4 font-medium">
          {locale === "ja" ? "注文商品" : "Order items"}
        </h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderImage />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {tCart("quantity") ?? "Qty"}: {item.quantity}
                  </p>
                </div>
                <p className="font-mono">
                  {formatPrice(item.subtotal, order.currency_code)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="mb-4 font-medium">
          {locale === "ja" ? "合計" : "Summary"}
        </h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{tCart("subtotal")}</dt>
            <dd className="font-mono">
              {formatPrice(order.subtotal, order.currency_code)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{tCart("shipping")}</dt>
            <dd className="font-mono">
              {formatPrice(order.shipping_total, order.currency_code)}
            </dd>
          </div>
          {order.tax_total > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                {locale === "ja" ? "税金" : "Tax"}
              </dt>
              <dd className="font-mono">
                {formatPrice(order.tax_total, order.currency_code)}
              </dd>
            </div>
          )}
          {order.discount_total > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                {locale === "ja" ? "割引" : "Discount"}
              </dt>
              <dd className="font-mono text-green-600">
                -{formatPrice(order.discount_total, order.currency_code)}
              </dd>
            </div>
          )}
          <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
            <dt>{tCart("total")}</dt>
            <dd className="font-mono">
              {formatPrice(order.total, order.currency_code)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Shipping address */}
      {order.shipping_address && (
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 font-medium">
            {locale === "ja" ? "配送先住所" : "Shipping address"}
          </h2>
          <address className="not-italic text-sm text-muted-foreground">
            <p>
              {order.shipping_address.last_name} {order.shipping_address.first_name}
            </p>
            <p>〒{order.shipping_address.postal_code}</p>
            <p>
              {order.shipping_address.province}
              {order.shipping_address.city}
              {order.shipping_address.address_1}
            </p>
            {order.shipping_address.address_2 && (
              <p>{order.shipping_address.address_2}</p>
            )}
            {order.shipping_address.phone && (
              <p className="mt-2">TEL: {order.shipping_address.phone}</p>
            )}
          </address>
        </div>
      )}

      {/* Back link */}
      <div className="pt-4">
        <Link
          href={`/${locale}/account/orders`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {locale === "ja" ? "注文履歴に戻る" : "Back to order history"}
        </Link>
      </div>
    </div>
  );
}
