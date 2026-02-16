"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { PlaceholderImage } from "@/components/common/placeholder-image";
import { formatPrice } from "@/lib/format";

// Demo cart items for display
const DEMO_CART_ITEMS = [
  {
    id: "item_01",
    title: "セラミックフラワーベース A-001",
    variant: "ホワイト",
    price: 580000,
    quantity: 1,
    handle: "ceramic-flower-vase-a001",
  },
  {
    id: "item_02",
    title: "マグカップ C-003",
    variant: "グレー",
    price: 280000,
    quantity: 2,
    handle: "mug-cup-c003",
  },
];

export default function CartPage() {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const params = useParams();
  const locale = params.locale as string;

  const cartItems = DEMO_CART_ITEMS;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
        <h1 className="mt-6 font-heading text-2xl">{t("empty")}</h1>
        <p className="mt-2 text-muted-foreground">
          {t("continueShopping")}
        </p>
        <Button asChild className="mt-6">
          <Link href={`/${locale}/products`}>
            {t("continueShopping")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <ScrollFadeIn>
        <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
          {t("title")}
        </h1>
      </ScrollFadeIn>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <ScrollFadeIn key={item.id}>
                <div className="flex gap-4 rounded-lg border bg-card p-4">
                  {/* Product Image */}
                  <Link
                    href={`/${locale}/products/${item.handle}`}
                    className="shrink-0"
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-md">
                      <PlaceholderImage
                        width={96}
                        height={96}
                        className="h-full w-full"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/${locale}/products/${item.handle}`}
                          className="font-medium hover:underline"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.variant}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity, "jpy")}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        disabled
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <ScrollFadeIn>
            <div className="rounded-lg border bg-card p-6">
              <h2 className="font-heading text-lg">{t("title")}</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal")}</span>
                  <span>{formatPrice(subtotal, "jpy")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("shipping")}</span>
                  <span className="text-sm text-muted-foreground">
                    {t("shippingCalculated")}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>{t("total")}</span>
                    <span>{formatPrice(subtotal, "jpy")}</span>
                  </div>
                </div>
              </div>

              <Button asChild className="mt-6 w-full" size="lg">
                <Link href={`/${locale}/checkout`}>
                  {t("checkout")}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="mt-3 w-full"
              >
                <Link href={`/${locale}/products`}>
                  {t("continueShopping")}
                </Link>
              </Button>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </div>
  );
}
