"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Lamp, UtensilsCrossed, Armchair, PenLine } from "lucide-react";
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
    icon: Lamp,
  },
  {
    handle: "tableware",
    labelJa: "テーブルウェア",
    labelEn: "Tableware",
    descJa: "食卓を美しく",
    descEn: "Beautiful dining moments",
    icon: UtensilsCrossed,
  },
  {
    handle: "fabric",
    labelJa: "ファブリック",
    labelEn: "Fabric",
    descJa: "心地よい肌触り",
    descEn: "Comfortable textures",
    icon: Armchair,
  },
  {
    handle: "stationery",
    labelJa: "ステーショナリー",
    labelEn: "Stationery",
    descJa: "書く喜びを日常に",
    descEn: "Joy of writing daily",
    icon: PenLine,
  },
];

export function CategoryBanner({ locale }: CategoryBannerProps) {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <h2 className="mb-8 text-center font-heading text-2xl lowercase tracking-wide md:mb-12 md:text-3xl">
            {locale === "ja" ? "カテゴリーから探す" : "shop by category"}
          </h2>
        </ScrollFadeIn>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <ScrollFadeIn key={cat.handle} delay={index * 0.1}>
                <Link
                  href={`/${locale}/products?category=${cat.handle}`}
                  className="group block"
                >
                  <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-sm md:p-8">
                    <Icon className="mb-4 h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                    <h3 className="font-heading text-base font-medium md:text-lg">
                      {locale === "ja" ? cat.labelJa : cat.labelEn}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                      {locale === "ja" ? cat.descJa : cat.descEn}
                    </p>
                    <span className="mt-4 inline-block text-xs text-muted-foreground/0 transition-colors group-hover:text-primary">
                      {t("viewAll")} →
                    </span>
                  </div>
                </Link>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
