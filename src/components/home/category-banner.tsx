"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface CategoryBannerProps {
  locale: string;
}

const CATEGORIES = [
  {
    handle: "interior",
    labelJa: "インテリア雑貨",
    labelEn: "Interior",
    descJa: "空間を彩るアイテム",
    descEn: "Items that color your space",
  },
  {
    handle: "tableware",
    labelJa: "テーブルウェア",
    labelEn: "Tableware",
    descJa: "食卓を美しく",
    descEn: "Beautiful dining moments",
  },
  {
    handle: "fabric",
    labelJa: "ファブリック",
    labelEn: "Fabric",
    descJa: "心地よい肌触り",
    descEn: "Comfortable textures",
  },
  {
    handle: "stationery",
    labelJa: "ステーショナリー",
    labelEn: "Stationery",
    descJa: "書く喜びを日常に",
    descEn: "Joy of writing daily",
  },
];

export function CategoryBanner({ locale }: CategoryBannerProps) {
  const isJa = locale === "ja";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <ScrollFadeIn>
          <p className="mb-6 text-center text-sm uppercase tracking-widest text-muted-foreground">
            {isJa ? "カテゴリー" : "categories"}
          </p>
        </ScrollFadeIn>

        <div className="space-y-0 divide-y">
          {CATEGORIES.map((cat, index) => (
            <ScrollFadeIn key={cat.handle} delay={index * 0.08}>
              <Link
                href={`/${locale}/products?category=${cat.handle}`}
                className="group flex items-center justify-between py-5 transition-colors hover:text-primary"
              >
                <div>
                  <span className="font-heading text-lg tracking-wide md:text-xl">
                    {isJa ? cat.labelJa : cat.labelEn}
                  </span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {isJa ? cat.descJa : cat.descEn}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
