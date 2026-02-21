"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/format";

// Demo products (same as in products.ts)
const DEMO_PRODUCTS = [
  {
    id: "prod_01",
    title: "セラミックフラワーベース A-001",
    handle: "ceramic-flower-vase-a001",
    price: 580000,
    category: "interior",
    status: "published",
    stock: 15,
  },
  {
    id: "prod_02",
    title: "キャンドルホルダー B-002",
    handle: "candle-holder-b002",
    price: 420000,
    category: "interior",
    status: "published",
    stock: 8,
  },
  {
    id: "prod_03",
    title: "マグカップ C-003",
    handle: "mug-cup-c003",
    price: 280000,
    category: "tableware",
    status: "published",
    stock: 25,
  },
  {
    id: "prod_04",
    title: "リネンクッションカバー D-004",
    handle: "linen-cushion-cover-d004",
    price: 380000,
    category: "fabric",
    status: "published",
    stock: 12,
  },
  {
    id: "prod_05",
    title: "レザーノート E-005",
    handle: "leather-notebook-e005",
    price: 450000,
    category: "stationery",
    status: "published",
    stock: 20,
  },
  {
    id: "prod_06",
    title: "ガラスプレート F-006",
    handle: "glass-plate-f006",
    price: 320000,
    category: "tableware",
    status: "published",
    stock: 6,
  },
  {
    id: "prod_07",
    title: "ウールブランケット G-007",
    handle: "wool-blanket-g007",
    price: 1200000,
    category: "fabric",
    status: "draft",
    stock: 4,
  },
  {
    id: "prod_08",
    title: "真鍮ペンスタンド H-008",
    handle: "brass-pen-stand-h008",
    price: 680000,
    category: "stationery",
    status: "published",
    stock: 10,
  },
];

export default function AdminProductsPage() {
  const t = useTranslations("admin");
  const tCategory = useTranslations("category");
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = DEMO_PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ScrollFadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-heading text-2xl md:text-3xl">{t("products")}</h1>
          <Button asChild>
            <Link href={`/${locale}/admin/products/new`}>
              <Plus className="mr-2 h-4 w-4" />
              {t("addProduct")}
            </Link>
          </Button>
        </div>
      </ScrollFadeIn>

      {/* Search */}
      <ScrollFadeIn>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={locale === "ja" ? "商品を検索..." : "Search products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </ScrollFadeIn>

      {/* Products Table */}
      <ScrollFadeIn>
        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {t("productName")}
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                    {t("productCategory")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {t("productPrice")}
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                    {t("productStock")}
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                    {t("productStatus")}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    {locale === "ja" ? "操作" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded">
                          <PlaceholderImage
                            width={40}
                            height={40}
                            className="h-full w-full"
                          />
                        </div>
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {tCategory(product.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span>{formatPrice(product.price, "jpy")}</span>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span
                        className={
                          product.stock < 5
                            ? "font-semibold text-primary"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                          product.status === "published"
                            ? "bg-primary/10 text-primary dark:bg-primary/15"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {product.status === "published"
                          ? t("published")
                          : t("draft")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Link href={`/${locale}/admin/products/${product.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              {locale === "ja"
                ? "商品が見つかりませんでした"
                : "No products found"}
            </div>
          )}
        </div>
      </ScrollFadeIn>
    </div>
  );
}
