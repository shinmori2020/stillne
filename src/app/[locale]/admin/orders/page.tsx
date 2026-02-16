"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { formatPrice } from "@/lib/utils";

// Demo orders
const DEMO_ORDERS = [
  {
    id: "ORD-2024-00024",
    customer: "田中 花子",
    email: "hanako@example.com",
    total: 1140000,
    itemCount: 3,
    status: "shipped",
    date: "2024-02-15",
  },
  {
    id: "ORD-2024-00023",
    customer: "佐藤 一郎",
    email: "ichiro@example.com",
    total: 580000,
    itemCount: 1,
    status: "processing",
    date: "2024-02-14",
  },
  {
    id: "ORD-2024-00022",
    customer: "鈴木 美咲",
    email: "misaki@example.com",
    total: 1680000,
    itemCount: 2,
    status: "delivered",
    date: "2024-02-13",
  },
  {
    id: "ORD-2024-00021",
    customer: "高橋 健太",
    email: "kenta@example.com",
    total: 420000,
    itemCount: 1,
    status: "delivered",
    date: "2024-02-12",
  },
  {
    id: "ORD-2024-00020",
    customer: "渡辺 愛",
    email: "ai@example.com",
    total: 2480000,
    itemCount: 4,
    status: "delivered",
    date: "2024-02-11",
  },
];

export default function AdminOrdersPage() {
  const t = useTranslations("admin");
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusLabels: Record<string, { ja: string; en: string; color: string }> = {
    processing: {
      ja: "処理中",
      en: "Processing",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    shipped: {
      ja: "発送済み",
      en: "Shipped",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    delivered: {
      ja: "配達完了",
      en: "Delivered",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    cancelled: {
      ja: "キャンセル",
      en: "Cancelled",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const filteredOrders = DEMO_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ScrollFadeIn>
        <h1 className="font-heading text-2xl md:text-3xl">{t("orders")}</h1>
      </ScrollFadeIn>

      {/* Filters */}
      <ScrollFadeIn>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={
                locale === "ja"
                  ? "注文番号、顧客名、メールで検索..."
                  : "Search by order ID, customer, email..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-40"
            >
              <option value="all">
                {locale === "ja" ? "すべてのステータス" : "All Status"}
              </option>
              <option value="processing">
                {statusLabels.processing[locale === "ja" ? "ja" : "en"]}
              </option>
              <option value="shipped">
                {statusLabels.shipped[locale === "ja" ? "ja" : "en"]}
              </option>
              <option value="delivered">
                {statusLabels.delivered[locale === "ja" ? "ja" : "en"]}
              </option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </ScrollFadeIn>

      {/* Orders Table */}
      <ScrollFadeIn>
        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {locale === "ja" ? "注文番号" : "Order ID"}
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                    {locale === "ja" ? "顧客" : "Customer"}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {locale === "ja" ? "合計" : "Total"}
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                    {locale === "ja" ? "日付" : "Date"}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {locale === "ja" ? "ステータス" : "Status"}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    {locale === "ja" ? "操作" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <span className="font-medium">{order.id}</span>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {order.customer}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p>{formatPrice(order.total)}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.itemCount} {locale === "ja" ? "点" : "items"}
                        </p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className="text-muted-foreground">{order.date}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                          statusLabels[order.status]?.color
                        }`}
                      >
                        {statusLabels[order.status]?.[locale === "ja" ? "ja" : "en"]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              {locale === "ja"
                ? "注文が見つかりませんでした"
                : "No orders found"}
            </div>
          )}
        </div>
      </ScrollFadeIn>
    </div>
  );
}
