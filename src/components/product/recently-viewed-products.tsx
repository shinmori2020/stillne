"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { ProductCard } from "./product-card";
import { useRecentlyViewedStore } from "@/lib/stores/recently-viewed-store";
import { getProductsByIds } from "@/lib/api/products";
import type { Product } from "@/types/product";

interface RecentlyViewedProductsProps {
  currentProductId: string;
}

export function RecentlyViewedProducts({
  currentProductId,
}: RecentlyViewedProductsProps) {
  const locale = useLocale();
  const isJa = locale === "ja";
  const { viewedIds } = useRecentlyViewedStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const ids = viewedIds
      .filter((id) => id !== currentProductId)
      .slice(0, 4);
    if (ids.length > 0) {
      setProducts(getProductsByIds(ids));
    } else {
      setProducts([]);
    }
  }, [viewedIds, currentProductId]);

  if (products.length === 0) return null;

  return (
    <ScrollFadeIn>
      <section className="border-t border-border pt-12">
        <h2 className="mb-8 font-heading text-xl lowercase tracking-wide md:text-2xl">
          {isJa ? "最近見た商品" : "recently viewed"}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </ScrollFadeIn>
  );
}
