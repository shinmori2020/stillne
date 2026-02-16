"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { ProductOptions } from "./product-options";
import { QuantitySelector } from "./quantity-selector";
import { useAddToCart } from "@/hooks/use-cart";
import { useUIStore } from "@/lib/stores/ui-store";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import type { Product, ProductVariant } from "@/types/product";

interface ProductDetailProps {
  product: Product;
  locale: string;
}

export function ProductDetail({ product, locale }: ProductDetailProps) {
  const t = useTranslations("product");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addToCart = useAddToCart();
  const { openCart } = useUIStore();

  // Get price for selected variant
  const price = selectedVariant?.prices?.find(
    (p) => p.currency_code === "jpy"
  );

  // Check stock status
  const isOutOfStock =
    selectedVariant &&
    selectedVariant.inventory_quantity === 0 &&
    !selectedVariant.allow_backorder;

  const isLowStock =
    selectedVariant &&
    selectedVariant.inventory_quantity > 0 &&
    selectedVariant.inventory_quantity <= 3;

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart.mutate(
      {
        variantId: selectedVariant.id,
        quantity,
      },
      {
        onSuccess: () => {
          openCart();
        },
      }
    );
  };

  // Get all images (thumbnail + images array)
  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail, alt: product.title }] : []),
    ...(product.images ?? []).filter((img) => img.url !== product.thumbnail),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Image Gallery */}
      <ScrollFadeIn>
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
            {allImages.length > 0 ? (
              <Image
                src={allImages[selectedImageIndex]?.url ?? ""}
                alt={allImages[selectedImageIndex]?.alt ?? product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={image.url}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary",
                    "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    index === selectedImageIndex &&
                      "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt ?? `${product.title} - ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollFadeIn>

      {/* Product Info */}
      <ScrollFadeIn delay={0.1}>
        <div className="space-y-6">
          {/* Title & Price */}
          <div className="space-y-2">
            <h1 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {product.title}
            </h1>
            {price && (
              <p className="font-mono text-xl">
                {formatPrice(price.amount, "jpy")}
              </p>
            )}
          </div>

          {/* Stock Status */}
          {isOutOfStock && (
            <p className="text-sm font-medium text-destructive">
              {t("outOfStock")}
            </p>
          )}
          {isLowStock && (
            <p className="text-sm font-medium text-amber-600">
              {t("lowStock")}
            </p>
          )}

          {/* Options */}
          {product.options && product.options.length > 0 && (
            <ProductOptions
              options={product.options}
              variants={product.variants ?? []}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={selectedVariant?.inventory_quantity ?? 99}
              disabled={isOutOfStock ?? false}
            />
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || isOutOfStock || addToCart.isPending}
              className="flex-1"
              size="lg"
            >
              {addToCart.isPending
                ? t("adding")
                : addToCart.isSuccess
                  ? t("addedToCart")
                  : t("addToCart")}
            </Button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-border pt-6">
              <h2 className="mb-3 text-sm font-medium">
                {locale === "ja" ? "商品説明" : "Description"}
              </h2>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          )}

          {/* SKU */}
          {selectedVariant?.sku && (
            <p className="text-xs text-muted-foreground">
              {t("sku")}: {selectedVariant.sku}
            </p>
          )}
        </div>
      </ScrollFadeIn>
    </div>
  );
}
