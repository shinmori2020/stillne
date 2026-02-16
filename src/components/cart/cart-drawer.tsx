"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { EmptyState } from "@/components/common/empty-state";

export function CartDrawer() {
  const locale = useLocale();
  const t = useTranslations("cart");
  const { isCartOpen, closeCart } = useUIStore();
  const { data: cart, isLoading } = useCart();

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-medium">
              {t("title")}
              {!isEmpty && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({items.length})
                </span>
              )}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">{t("drawerLabel")}</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : isEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              icon={ShoppingBag}
              message={t("empty")}
              action={{
                label: t("continueShopping"),
                href: `/${locale}/products`,
              }}
            />
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            {/* Cart Summary & Checkout */}
            <div className="border-t border-border pt-4">
              <CartSummary cart={cart} />
              <div className="mt-4 space-y-2">
                <Button asChild className="w-full" size="lg" onClick={closeCart}>
                  <Link href={`/${locale}/checkout`}>
                    {t("checkout")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                >
                  <Link href={`/${locale}/products`}>
                    {t("continueShopping")}
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
