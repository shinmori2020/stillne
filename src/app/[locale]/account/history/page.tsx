"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { ProductCard } from "@/components/product/product-card";
import { useRecentlyViewedStore } from "@/lib/stores/recently-viewed-store";
import { getProductsByIds } from "@/lib/api/products";
import type { Product } from "@/types/product";

export default function HistoryPage() {
  const locale = useLocale();
  const t = useTranslations("history");
  const { viewedIds } = useRecentlyViewedStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (viewedIds.length > 0) {
      setProducts(getProductsByIds(viewedIds));
    } else {
      setProducts([]);
    }
  }, [viewedIds]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
        </header>
      </ScrollFadeIn>

      {products.length > 0 ? (
        <ScrollFadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        </ScrollFadeIn>
      ) : (
        <ScrollFadeIn>
          <div className="py-16 text-center">
            <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">{t("empty")}</p>
            <Link
              href={`/${locale}/products`}
              className="mt-4 inline-block text-sm text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              {t("browseProducts")}
            </Link>
          </div>
        </ScrollFadeIn>
      )}
    </div>
  );
}
