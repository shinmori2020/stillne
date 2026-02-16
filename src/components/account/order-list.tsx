"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useCustomer } from "@/hooks/use-auth";
import { EmptyState } from "@/components/common/empty-state";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus, FulfillmentStatus, PaymentStatus } from "@/types/order";

interface OrderListProps {
  locale: string;
}

// Status badge colors
function getStatusColor(status: OrderStatus | FulfillmentStatus | PaymentStatus): string {
  switch (status) {
    case "completed":
    case "fulfilled":
    case "shipped":
    case "captured":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "pending":
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
  });
}

// Status label
function getStatusLabel(status: FulfillmentStatus, locale: string): string {
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

export function OrderList({ locale }: OrderListProps) {
  const t = useTranslations("account");
  const { data: customer, isLoading: customerLoading } = useCustomer();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  // Check if Medusa is configured
  const isMedusaConfigured = !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  // Loading state
  if ((customerLoading || ordersLoading) && isMedusaConfigured) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not logged in
  if (!customer) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          {locale === "ja"
            ? "注文履歴を見るにはログインしてください"
            : "Please log in to view your order history"}
        </p>
      </div>
    );
  }

  // No orders
  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        message={t("noOrders")}
        action={{
          label: locale === "ja" ? "商品を見る" : "Browse products",
          href: `/${locale}/products`,
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: Order) => (
        <Link
          key={order.id}
          href={`/${locale}/account/orders/${order.id}`}
          className="block rounded-lg border border-border p-4 transition-colors hover:border-primary"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-muted-foreground">
                #{order.display_id}
              </p>
              <p className="mt-1 text-sm">
                {formatDate(order.created_at, locale)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono font-medium">
                {formatPrice(order.total, order.currency_code)}
              </p>
              <span
                className={cn(
                  "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                  getStatusColor(order.fulfillment_status)
                )}
              >
                {getStatusLabel(order.fulfillment_status, locale)}
              </span>
            </div>
          </div>

          {/* Order items preview */}
          <div className="mt-4 flex flex-wrap gap-2">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="h-12 w-12 rounded-sm bg-secondary"
                title={item.title}
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full rounded-sm object-cover"
                  />
                )}
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary text-xs text-muted-foreground">
                +{order.items.length - 3}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
