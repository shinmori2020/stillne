"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { useRecentlyViewedStore } from "@/lib/stores/recently-viewed-store";
import { getProductsByIds } from "@/lib/api/products";
import type { Product } from "@/types/product";

export function RecentlyViewedSection() {
  const locale = useLocale();
  const isJa = locale === "ja";
  const { viewedIds } = useRecentlyViewedStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (viewedIds.length > 0) {
      setProducts(getProductsByIds(viewedIds).slice(0, 4));
    } else {
      setProducts([]);
    }
  }, [viewedIds]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {isJa ? "最近チェックした" : "recently browsed"}
              </p>
              <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
                {isJa ? "閲覧履歴" : "recently viewed"}
              </h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href={`/${locale}/account/history`}>
                {isJa ? "すべて見る" : "View all"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <ProductGrid products={products} locale={locale} columns={4} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
