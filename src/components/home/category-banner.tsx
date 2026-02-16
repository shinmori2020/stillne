"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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
    gradient: "from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/20",
    icon: "🏠",
  },
  {
    handle: "tableware",
    labelJa: "テーブルウェア",
    labelEn: "Tableware",
    descJa: "食卓を美しく",
    descEn: "Beautiful dining moments",
    gradient: "from-sky-50 to-blue-100 dark:from-sky-950/30 dark:to-blue-900/20",
    icon: "🍽",
  },
  {
    handle: "fabric",
    labelJa: "ファブリック",
    labelEn: "Fabric",
    descJa: "心地よい肌触り",
    descEn: "Comfortable textures",
    gradient: "from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/20",
    icon: "🧵",
  },
  {
    handle: "stationery",
    labelJa: "ステーショナリー",
    labelEn: "Stationery",
    descJa: "書く喜びを日常に",
    descEn: "Joy of writing daily",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/20",
    icon: "✏️",
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
          {CATEGORIES.map((cat, index) => (
            <ScrollFadeIn key={cat.handle} delay={index * 0.1}>
              <Link
                href={`/${locale}/products?category=${cat.handle}`}
                className="group block"
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.gradient} p-6 transition-all duration-300 hover:shadow-lg md:p-8`}
                >
                  <div className="mb-4 text-3xl md:text-4xl">{cat.icon}</div>
                  <h3 className="font-heading text-base font-medium md:text-lg">
                    {locale === "ja" ? cat.labelJa : cat.labelEn}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                    {locale === "ja" ? cat.descJa : cat.descEn}
                  </p>
                  <div className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {t("viewAll")} →
                  </div>
                </div>
              </Link>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
