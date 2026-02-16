"use client";

import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format";
import type { Cart } from "@/types/cart";

interface CartSummaryProps {
  cart: Cart | null | undefined;
  showShipping?: boolean;
}

export function CartSummary({ cart, showShipping = true }: CartSummaryProps) {
  const t = useTranslations("cart");

  if (!cart) return null;

  const currencyCode = cart.currency_code ?? "jpy";

  return (
    <div className="space-y-2 text-sm">
      {/* Subtotal */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{t("subtotal")}</span>
        <span className="font-mono">
          {formatPrice(cart.subtotal ?? 0, currencyCode)}
        </span>
      </div>

      {/* Shipping */}
      {showShipping && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("shipping")}</span>
          <span className="font-mono text-muted-foreground">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total, currencyCode)
              : t("shippingCalculated")}
          </span>
        </div>
      )}

      {/* Tax (if applicable) */}
      {cart.tax_total > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {t("tax") ?? "Tax"}
          </span>
          <span className="font-mono">
            {formatPrice(cart.tax_total, currencyCode)}
          </span>
        </div>
      )}

      {/* Discount (if applicable) */}
      {cart.discount_total > 0 && (
        <div className="flex items-center justify-between text-green-600">
          <span>{t("discount") ?? "Discount"}</span>
          <span className="font-mono">
            -{formatPrice(cart.discount_total, currencyCode)}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between border-t border-border pt-2 font-medium">
        <span>{t("total")}</span>
        <span className="font-mono text-lg">
          {formatPrice(cart.total ?? 0, currencyCode)}
        </span>
      </div>
    </div>
  );
}
