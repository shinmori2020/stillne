"use client";

import { useTranslations } from "next-intl";
import { ProductGrid } from "./product-grid";
import { ProductFilter } from "./product-filter";
import { ProductSort } from "./product-sort";
import { Pagination } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductListClientProps {
  initialProducts: Product[];
  initialCount: number;
  locale: string;
  category?: string;
  sort?: string;
  currentPage: number;
  totalPages: number;
}

export function ProductListClient({
  initialProducts,
  initialCount,
  locale,
  category,
  sort,
  currentPage,
  totalPages,
}: ProductListClientProps) {
  const t = useTranslations("product");

  if (initialProducts.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        message={t("noProducts")}
        action={{
          label: t("allProducts"),
          href: `/${locale}/products`,
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter and Sort controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductFilter locale={locale} currentCategory={category} />
        <ProductSort locale={locale} currentSort={sort} />
      </div>

      {/* Product count */}
      <p className="text-sm text-muted-foreground">
        {initialCount}
        {locale === "ja" ? "件の商品" : ` product${initialCount !== 1 ? "s" : ""}`}
      </p>

      {/* Product grid */}
      <ProductGrid products={initialProducts} locale={locale} columns={4} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={`/${locale}/products`}
          searchParams={{ category, sort }}
        />
      )}
    </div>
  );
}
