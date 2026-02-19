"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { ProductOptions } from "./product-options";
import { QuantitySelector } from "./quantity-selector";
import { ShareButtons } from "./share-buttons";
import { useAddToCart } from "@/hooks/use-cart";
import { useUIStore } from "@/lib/stores/ui-store";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import {
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { Product, ProductVariant } from "@/types/product";

interface ProductDetailProps {
  product: Product;
  locale: string;
}

export function ProductDetail({ product, locale }: ProductDetailProps) {
  const t = useTranslations("product");
  const isJa = locale === "ja";
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(product.variants?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

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
      { variantId: selectedVariant.id, quantity },
      { onSuccess: () => openCart() }
    );
  };

  // Get all images (include entries even with empty URLs for slider display)
  const hasRealThumbnail = product.thumbnail && product.thumbnail.length > 0;
  const allImages = [
    ...(hasRealThumbnail
      ? [{ url: product.thumbnail!, alt: product.title }]
      : []),
    ...(product.images ?? []).filter(
      (img) => !hasRealThumbnail || img.url !== product.thumbnail
    ),
  ];
  // If no images at all (no entries), use a single placeholder entry
  const displayImages =
    allImages.length > 0
      ? allImages
      : [{ url: "", alt: product.title }];

  // Image zoom handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainImageRef.current) return;
      const rect = mainImageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    },
    []
  );

  // Thumbnail slider navigation
  const scrollThumbs = (direction: "left" | "right") => {
    if (!thumbContainerRef.current) return;
    const scrollAmount = 200;
    thumbContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Image navigation
  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };
  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  // Favorite toggle
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  // Accordion toggle
  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Image Gallery */}
      <ScrollFadeIn>
        <div className="space-y-3">
          {/* Main Image with Zoom */}
          <div
            ref={mainImageRef}
            className="relative aspect-square cursor-crosshair overflow-hidden rounded-sm bg-secondary"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            {displayImages[selectedImageIndex]?.url ? (
              <Image
                src={displayImages[selectedImageIndex].url}
                alt={displayImages[selectedImageIndex]?.alt ?? product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-200"
                style={
                  isZooming
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />
            ) : (
              <PlaceholderImage label={displayImages[selectedImageIndex]?.alt} />
            )}

            {/* Image navigation arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100 [div:hover>&]:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100 [div:hover>&]:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Slider */}
          {displayImages.length > 1 && (
            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={() => scrollThumbs("left")}
                className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-1 shadow-sm"
                aria-label="Scroll thumbnails left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Thumbnails */}
              <div
                ref={thumbContainerRef}
                className="flex gap-2 overflow-x-auto scroll-smooth px-6 pb-1 scrollbar-hide"
                style={{ scrollbarWidth: "none" }}
              >
                {displayImages.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-secondary",
                      "ring-offset-background transition-all",
                      index === selectedImageIndex &&
                        "ring-2 ring-primary ring-offset-2"
                    )}
                  >
                    {image.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt ?? `${product.title} - ${index + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderImage />
                    )}
                  </button>
                ))}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => scrollThumbs("right")}
                className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-1 shadow-sm"
                aria-label="Scroll thumbnails right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
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

          {/* Quantity & Add to Cart & Favorite */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={selectedVariant?.inventory_quantity ?? 99}
              disabled={isOutOfStock ?? false}
            />
            <Button
              onClick={handleAddToCart}
              disabled={
                !selectedVariant || isOutOfStock || addToCart.isPending
              }
              className="flex-1"
              size="lg"
            >
              {addToCart.isPending
                ? t("adding")
                : addToCart.isSuccess
                  ? t("addedToCart")
                  : t("addToCart")}
            </Button>
            <button
              onClick={toggleFavorite}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors hover:bg-secondary"
              aria-label={isJa ? "お気に入り" : "Favorite"}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                )}
              />
            </button>
          </div>

          {/* Shipping & Returns Info */}
          <div className="grid grid-cols-3 gap-3 border-t border-border pt-6">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {isJa ? "送料無料" : "Free Shipping"}
              </span>
              <span className="text-[10px] text-muted-foreground/70">
                {isJa ? "¥10,000以上" : "Over ¥10,000"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {isJa ? "返品可能" : "Returns OK"}
              </span>
              <span className="text-[10px] text-muted-foreground/70">
                {isJa ? "7日以内" : "Within 7 days"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {isJa ? "品質保証" : "Quality"}
              </span>
              <span className="text-[10px] text-muted-foreground/70">
                {isJa ? "厳選商品" : "Curated"}
              </span>
            </div>
          </div>

          {/* Accordion sections: Description, Size & Material */}
          <div className="divide-y border-y border-border">
            {/* Description */}
            {product.description && (
              <div>
                <button
                  onClick={() => toggleAccordion("description")}
                  className="flex w-full items-center justify-between py-4 text-sm font-medium"
                >
                  {isJa ? "商品説明" : "Description"}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      openAccordion === "description" && "rotate-180"
                    )}
                  />
                </button>
                {openAccordion === "description" && (
                  <div className="pb-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Size & Material Guide */}
            <div>
              <button
                onClick={() => toggleAccordion("specs")}
                className="flex w-full items-center justify-between py-4 text-sm font-medium"
              >
                {isJa ? "サイズ・素材" : "Size & Material"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    openAccordion === "specs" && "rotate-180"
                  )}
                />
              </button>
              {openAccordion === "specs" && (
                <div className="pb-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      {product.material && (
                        <tr>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {isJa ? "素材" : "Material"}
                          </td>
                          <td className="py-2">{product.material}</td>
                        </tr>
                      )}
                      {product.weight && (
                        <tr>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {isJa ? "重量" : "Weight"}
                          </td>
                          <td className="py-2">{product.weight}g</td>
                        </tr>
                      )}
                      {product.width && (
                        <tr>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {isJa ? "幅" : "Width"}
                          </td>
                          <td className="py-2">{product.width}mm</td>
                        </tr>
                      )}
                      {product.height && (
                        <tr>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {isJa ? "高さ" : "Height"}
                          </td>
                          <td className="py-2">{product.height}mm</td>
                        </tr>
                      )}
                      {product.length && (
                        <tr>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {isJa ? "奥行" : "Depth"}
                          </td>
                          <td className="py-2">{product.length}mm</td>
                        </tr>
                      )}
                      {!product.material &&
                        !product.weight &&
                        !product.width &&
                        !product.height &&
                        !product.length && (
                          <tr>
                            <td
                              colSpan={2}
                              className="py-2 text-muted-foreground"
                            >
                              {isJa
                                ? "詳細情報は準備中です"
                                : "Details coming soon"}
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div>
              <button
                onClick={() => toggleAccordion("shipping")}
                className="flex w-full items-center justify-between py-4 text-sm font-medium"
              >
                {isJa ? "配送・返品について" : "Shipping & Returns"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    openAccordion === "shipping" && "rotate-180"
                  )}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="space-y-3 pb-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    {isJa
                      ? "ご注文確定後、通常3〜5営業日以内に発送いたします。10,000円以上のご購入で送料無料です。"
                      : "Orders ship within 3-5 business days. Free shipping on orders over ¥10,000."}
                  </p>
                  <p>
                    {isJa
                      ? "商品到着後7日以内であれば、未使用品に限り返品・交換を承ります。"
                      : "Returns accepted within 7 days of delivery for unused items."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SKU & Share */}
          <div className="flex items-center justify-between">
            {selectedVariant?.sku && (
              <p className="text-xs text-muted-foreground">
                {t("sku")}: {selectedVariant.sku}
              </p>
            )}
            <ShareButtons
              title={product.title}
              locale={locale}
            />
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  );
}
