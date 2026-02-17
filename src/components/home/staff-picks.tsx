"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import type { Product } from "@/types/product";

interface StaffPicksProps {
  products: Product[];
  locale: string;
}

export function StaffPicks({ products, locale }: StaffPicksProps) {
  const t = useTranslations("home");
  const isJa = locale === "ja";

  // Pick specific products as staff recommendations (indices 1, 3, 5, 6)
  const picks = [1, 3, 5, 6]
    .map((i) => products[i])
    .filter((p): p is Product => !!p);

  if (picks.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {isJa ? "スタッフが選ぶ" : "curated for you"}
              </p>
              <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
                {isJa ? "おすすめ商品" : "staff picks"}
              </h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href={`/${locale}/products`}>
                {t("viewAll")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <ProductGrid products={picks} locale={locale} columns={4} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
