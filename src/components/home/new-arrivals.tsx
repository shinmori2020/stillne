"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import type { Product } from "@/types/product";

interface NewArrivalsProps {
  products: Product[];
  locale: string;
}

export function NewArrivals({ products, locale }: NewArrivalsProps) {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {t("newArrivals")}
            </h2>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href={`/${locale}/products`}>
                {t("viewAll")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <ProductGrid
            products={products}
            locale={locale}
            columns={4}
          />
        </ScrollFadeIn>
      </div>
    </section>
  );
}

// Skeleton for loading state
export function NewArrivalsSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between md:mb-12">
          <div className="h-8 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-8 w-20 animate-pulse rounded bg-secondary" />
        </div>
        <ProductGrid products={[]} locale="ja" columns={4} isLoading />
      </div>
    </section>
  );
}
