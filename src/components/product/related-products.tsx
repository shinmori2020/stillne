"use client";

import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  locale: string;
}

export function RelatedProducts({ products, locale }: RelatedProductsProps) {
  const isJa = locale === "ja";

  if (products.length === 0) return null;

  return (
    <ScrollFadeIn>
      <section className="border-t border-border pt-12">
        <h2 className="mb-8 font-heading text-xl lowercase tracking-wide md:text-2xl">
          {isJa ? "こちらもおすすめ" : "you may also like"}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </ScrollFadeIn>
  );
}
