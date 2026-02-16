"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { CartSummary } from "@/components/cart/cart-summary";
import { formatPrice } from "@/lib/format";
import type { Cart } from "@/types/cart";

interface OrderSummaryProps {
  cart: Cart;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  const t = useTranslations("cart");

  return (
    <div className="sticky top-24 space-y-4 rounded-lg border border-border p-6">
      <h2 className="text-lg font-medium">{t("title")}</h2>

      {/* Cart items */}
      <div className="max-h-[300px] space-y-4 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-sm font-medium leading-tight">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {t("quantity") ?? "Qty"}: {item.quantity}
                </p>
              </div>
              <p className="font-mono text-sm">
                {formatPrice(item.subtotal, "jpy")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        <CartSummary cart={cart} showShipping={true} />
      </div>
    </div>
  );
}
