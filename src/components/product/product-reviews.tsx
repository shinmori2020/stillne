"use client";

import { Star } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface ProductReviewsProps {
  productId: string;
  locale: string;
}

const DEMO_REVIEWS = [
  {
    id: "rev_01",
    nameJa: "田中 美咲",
    nameEn: "Misaki T.",
    rating: 5,
    dateJa: "2025年12月15日",
    dateEn: "Dec 15, 2025",
    textJa:
      "とても素敵な商品です。質感が写真通りで、部屋に置くだけで雰囲気が変わりました。梱包も丁寧で、ギフトにもおすすめです。",
    textEn:
      "A wonderful product. The texture is exactly as shown, and it transformed the room's atmosphere. Beautifully packaged—great for gifts too.",
  },
  {
    id: "rev_02",
    nameJa: "佐藤 健一",
    nameEn: "Kenichi S.",
    rating: 5,
    dateJa: "2025年11月28日",
    dateEn: "Nov 28, 2025",
    textJa:
      "シンプルなデザインが気に入っています。長く使えそうな品質で、コスパも良いと思います。",
    textEn:
      "Love the simple design. The quality feels built to last, and it's great value for the price.",
  },
  {
    id: "rev_03",
    nameJa: "鈴木 陽子",
    nameEn: "Yoko S.",
    rating: 4,
    dateJa: "2025年10月10日",
    dateEn: "Oct 10, 2025",
    textJa:
      "友人へのプレゼントに購入しました。とても喜んでもらえました。色味が写真と若干異なりましたが、それも味わいのうちだと思います。",
    textEn:
      "Bought this as a gift for a friend who loved it. The color was slightly different from the photo, but that adds to its charm.",
  },
];

export function ProductReviews({ locale }: ProductReviewsProps) {
  const isJa = locale === "ja";
  const avgRating =
    DEMO_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / DEMO_REVIEWS.length;

  return (
    <ScrollFadeIn>
      <section className="border-t border-border pt-12">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-heading text-xl lowercase tracking-wide md:text-2xl">
            {isJa ? "カスタマーレビュー" : "customer reviews"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(avgRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({DEMO_REVIEWS.length})
            </span>
          </div>
        </div>

        <div className="divide-y">
          {DEMO_REVIEWS.map((review) => (
            <div key={review.id} className="py-6 first:pt-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                    {(isJa ? review.nameJa : review.nameEn).charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {isJa ? review.nameJa : review.nameEn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isJa ? review.dateJa : review.dateEn}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isJa ? review.textJa : review.textEn}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScrollFadeIn>
  );
}
