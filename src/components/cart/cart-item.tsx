"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/format";
import { useUpdateCartItem, useRemoveCartItem } from "@/hooks/use-cart";
import { useUIStore } from "@/lib/stores/ui-store";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const locale = useLocale();
  const t = useTranslations("cart");
  const { closeCart } = useUIStore();

  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const isUpdating = updateItem.isPending || removeItem.isPending;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem.mutate({
      lineItemId: item.id,
      quantity: newQuantity,
    });
  };

  const handleRemove = () => {
    removeItem.mutate(item.id);
  };

  // Get variant info for display
  const variantTitle = item.variant?.title;
  const productHandle = item.product?.handle;

  return (
    <div className="flex gap-4">
      {/* Thumbnail */}
      <Link
        href={productHandle ? `/${locale}/products/${productHandle}` : "#"}
        onClick={closeCart}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary"
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage />
        )}
      </Link>

      {/* Item details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <Link
            href={productHandle ? `/${locale}/products/${productHandle}` : "#"}
            onClick={closeCart}
            className="text-sm font-medium leading-tight hover:text-muted-foreground"
          >
            {item.title}
          </Link>
          {variantTitle && variantTitle !== "Default" && (
            <p className="text-xs text-muted-foreground">{variantTitle}</p>
          )}
          <p className="font-mono text-sm">
            {formatPrice(item.unit_price, "jpy")}
          </p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center font-mono text-sm">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">{t("remove")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
