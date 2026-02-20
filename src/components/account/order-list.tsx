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

// Demo order data
const demoOrders: Order[] = [
  {
    id: "demo-1",
    display_id: 1024,
    status: "completed",
    fulfillment_status: "shipped",
    payment_status: "captured",
    email: "demo@stillne.com",
    currency_code: "jpy",
    subtotal: 12800,
    tax_total: 1280,
    shipping_total: 0,
    discount_total: 0,
    total: 14080,
    paid_total: 14080,
    refunded_total: 0,
    items: [
      { id: "item-1", cart_id: "", title: "オーガニックコットン クッションカバー", quantity: 2, variant_id: "", unit_price: 4400, subtotal: 8800, total: 8800, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "linen-cushion-cover-d004" } as never },
      { id: "item-2", cart_id: "", title: "ウォールナット トレイ", quantity: 1, variant_id: "", unit_price: 4000, subtotal: 4000, total: 4000, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "candle-holder-b002" } as never },
    ],
    created_at: "2025-02-15T10:30:00Z",
    updated_at: "2025-02-15T10:30:00Z",
  },
  {
    id: "demo-2",
    display_id: 1019,
    status: "completed",
    fulfillment_status: "fulfilled",
    payment_status: "captured",
    email: "demo@stillne.com",
    currency_code: "jpy",
    subtotal: 6600,
    tax_total: 660,
    shipping_total: 550,
    discount_total: 0,
    total: 7810,
    paid_total: 7810,
    refunded_total: 0,
    items: [
      { id: "item-3", cart_id: "", title: "アロマキャンドル ヒノキ", quantity: 1, variant_id: "", unit_price: 3300, subtotal: 3300, total: 3300, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "candle-holder-b002" } as never },
      { id: "item-4", cart_id: "", title: "リネン テーブルナプキン セット", quantity: 1, variant_id: "", unit_price: 3300, subtotal: 3300, total: 3300, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "linen-cushion-cover-d004" } as never },
    ],
    created_at: "2025-01-28T14:00:00Z",
    updated_at: "2025-01-28T14:00:00Z",
  },
  {
    id: "demo-3",
    display_id: 1005,
    status: "pending",
    fulfillment_status: "not_fulfilled",
    payment_status: "captured",
    email: "demo@stillne.com",
    currency_code: "jpy",
    subtotal: 18700,
    tax_total: 1870,
    shipping_total: 0,
    discount_total: 0,
    total: 20570,
    paid_total: 20570,
    refunded_total: 0,
    items: [
      { id: "item-5", cart_id: "", title: "真鍮フラワーベース", quantity: 1, variant_id: "", unit_price: 8800, subtotal: 8800, total: 8800, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "ceramic-flower-vase-a001" } as never },
      { id: "item-6", cart_id: "", title: "ハンドメイド陶器マグ", quantity: 2, variant_id: "", unit_price: 2750, subtotal: 5500, total: 5500, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "mug-cup-c003" } as never },
      { id: "item-7", cart_id: "", title: "ウールブランケット", quantity: 1, variant_id: "", unit_price: 4400, subtotal: 4400, total: 4400, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "wool-blanket-g007" } as never },
      { id: "item-8", cart_id: "", title: "レザーコースター 4枚セット", quantity: 1, variant_id: "", unit_price: 2200, subtotal: 2200, total: 2200, tax_total: 0, discount_total: 0, created_at: "", updated_at: "", product: { handle: "leather-notebook-e005" } as never },
    ],
    created_at: "2025-01-10T09:15:00Z",
    updated_at: "2025-01-10T09:15:00Z",
  },
];

function OrderCard({ order, locale, isDemo }: { order: Order; locale: string; isDemo: boolean }) {
  const content = (
    <>
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
        {order.items.slice(0, 3).map((item) => {
          const handle = item.product?.handle;
          const thumb = (
            <div
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
          );
          return handle ? (
            <Link
              key={item.id}
              href={`/${locale}/products/${handle}`}
              onClick={(e) => e.stopPropagation()}
            >
              {thumb}
            </Link>
          ) : (
            <div key={item.id}>{thumb}</div>
          );
        })}
        {order.items.length > 3 && (
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary text-xs text-muted-foreground">
            +{order.items.length - 3}
          </div>
        )}
      </div>
    </>
  );

  if (isDemo) {
    return (
      <div className="block rounded-lg border border-border p-4">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/account/orders/${order.id}`}
      className="block rounded-lg border border-border p-4 transition-colors hover:border-primary"
    >
      {content}
    </Link>
  );
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

  // Not logged in — show demo data
  if (!customer) {
    return (
      <div>
        <div className="mb-6 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground">
          {locale === "ja"
            ? "これはデモ表示です。実際の注文データではありません。"
            : "This is a demo view. These are not real orders."}
        </div>
        <div className="space-y-4">
          {demoOrders.map((order) => (
            <OrderCard key={order.id} order={order} locale={locale} isDemo />
          ))}
        </div>
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
        <OrderCard key={order.id} order={order} locale={locale} isDemo={false} />
      ))}
    </div>
  );
}
