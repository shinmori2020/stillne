"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Package, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { formatPrice } from "@/lib/utils";

// Demo statistics
const DEMO_STATS = {
  totalProducts: 8,
  totalOrders: 24,
  totalRevenue: 28560000, // ¥285,600
};

// Demo recent orders
const DEMO_RECENT_ORDERS = [
  {
    id: "ORD-2024-00024",
    customer: "田中 花子",
    total: 1140000,
    status: "shipped",
    date: "2024-02-15",
  },
  {
    id: "ORD-2024-00023",
    customer: "佐藤 一郎",
    total: 580000,
    status: "processing",
    date: "2024-02-14",
  },
  {
    id: "ORD-2024-00022",
    customer: "鈴木 美咲",
    total: 1680000,
    status: "delivered",
    date: "2024-02-13",
  },
];

export default function AdminDashboard() {
  const t = useTranslations("admin");
  const params = useParams();
  const locale = params.locale as string;

  const statusLabels: Record<string, { ja: string; en: string; color: string }> = {
    processing: { ja: "処理中", en: "Processing", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    shipped: { ja: "発送済み", en: "Shipped", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    delivered: { ja: "配達完了", en: "Delivered", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  };

  return (
    <div className="space-y-8">
      <ScrollFadeIn>
        <h1 className="font-heading text-2xl md:text-3xl">{t("dashboard")}</h1>
      </ScrollFadeIn>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("totalProducts")}</p>
                <p className="text-2xl font-bold">{DEMO_STATS.totalProducts}</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <ShoppingCart className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("totalOrders")}</p>
                <p className="text-2xl font-bold">{DEMO_STATS.totalOrders}</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="rounded-lg border bg-card p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("totalRevenue")}</p>
                <p className="text-2xl font-bold">{formatPrice(DEMO_STATS.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Recent Orders */}
      <ScrollFadeIn>
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-heading text-lg">
              {locale === "ja" ? "最近の注文" : "Recent Orders"}
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${locale}/admin/orders`}>
                {locale === "ja" ? "すべて見る" : "View all"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="divide-y">
            {DEMO_RECENT_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                      statusLabels[order.status]?.color
                    }`}
                  >
                    {statusLabels[order.status]?.[locale === "ja" ? "ja" : "en"]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollFadeIn>

      {/* Quick Actions */}
      <ScrollFadeIn>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-lg">
            {locale === "ja" ? "クイックアクション" : "Quick Actions"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${locale}/admin/products/new`}>
                {t("addProduct")}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/admin/products`}>
                {t("products")}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/admin/orders`}>
                {t("orders")}
              </Link>
            </Button>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  );
}
