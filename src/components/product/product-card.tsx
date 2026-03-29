"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { WishlistButton } from "@/components/product/wishlist-button";
import type { ProductCardProps } from "@/types/product";

export function ProductCard({
  product,
  locale = "ja",
  priority = false,
}: ProductCardProps) {
  const t = useTranslations("product");
  const [imageError, setImageError] = useState(false);

  // Get the lowest price from all variants
  const lowestPrice = product.variants?.reduce((min, variant) => {
    const jpyPrice = variant.prices?.find((p) => p.currency_code === "jpy");
    if (jpyPrice && (min === null || jpyPrice.amount < min)) {
      return jpyPrice.amount;
    }
    return min;
  }, null as number | null);

  // Check if any variant is out of stock
  const isOutOfStock = product.variants?.every(
    (v) => v.inventory_quantity === 0 && !v.allow_backorder
  );

  // Check if any variant has low stock
  const hasLowStock = product.variants?.some(
    (v) => v.inventory_quantity > 0 && v.inventory_quantity <= 3
  );

  const thumbnailUrl = product.thumbnail || product.images?.[0]?.url;

  return (
    <Link
      href={`/${locale}/products/${product.handle}`}
      className="group block"
    >
      <article className="space-y-3">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
          {thumbnailUrl && !imageError ? (
            <Image
              src={thumbnailUrl}
              alt={product.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-500",
                "group-hover:scale-105",
                isOutOfStock && "opacity-60"
              )}
              onError={() => setImageError(true)}
            />
          ) : (
            <PlaceholderImage />
          )}

          {/* Wishlist button */}
          <WishlistButton
            productId={product.id}
            size="sm"
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          />

          {/* Stock badges */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <span className="rounded-sm bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                {t("outOfStock")}
              </span>
            </div>
          )}
          {!isOutOfStock && hasLowStock && (
            <span className="absolute bottom-2 left-2 rounded-sm bg-accent px-2 py-1 text-xs text-accent-foreground">
              {t("lowStock")}
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-tight transition-colors group-hover:text-muted-foreground">
            {product.title}
          </h3>
          {typeof lowestPrice === "number" && (
            <p className="font-mono text-sm text-muted-foreground">
              {formatPrice(lowestPrice, "jpy")}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

// Skeleton component for loading state
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-square animate-pulse rounded-sm bg-secondary" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}
