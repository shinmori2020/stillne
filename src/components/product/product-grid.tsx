"use client";

import { cn } from "@/lib/utils";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import type { ProductGridProps } from "@/types/product";

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
} as const;

export function ProductGrid({
  products,
  locale = "ja",
  columns = 4,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-6 md:gap-8", columnClasses[columns])}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:gap-8", columnClasses[columns])}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
