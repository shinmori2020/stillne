"use client";

import { Star } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { ReviewForm } from "./review-form";
import { useReviewStore } from "@/lib/stores/review-store";

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

function formatDate(isoString: string, locale: string): string {
  const date = new Date(isoString);
  if (locale === "ja") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const cls = size === "sm" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.round(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewItem({
  name,
  date,
  rating,
  text,
  isUserReview,
  locale,
}: {
  name: string;
  date: string;
  rating: number;
  text: string;
  isUserReview?: boolean;
  locale: string;
}) {
  const isJa = locale === "ja";
  return (
    <div className="py-6 first:pt-0">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
            {name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{name}</p>
              {isUserReview && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                  {isJa ? "あなた" : "You"}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <StarRating rating={rating} size="xs" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

export function ProductReviews({ productId, locale }: ProductReviewsProps) {
  const isJa = locale === "ja";
  const allUserReviews = useReviewStore((s) => s.reviews);
  const userReviews = allUserReviews.filter((r) => r.productId === productId);

  // Combine demo + user reviews for average calculation
  const allRatings = [
    ...DEMO_REVIEWS.map((r) => r.rating),
    ...userReviews.map((r) => r.rating),
  ];
  const totalCount = allRatings.length;
  const avgRating = allRatings.reduce((sum, r) => sum + r, 0) / totalCount;

  return (
    <ScrollFadeIn>
      <section className="border-t border-border pt-12">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-heading text-xl lowercase tracking-wide md:text-2xl">
            {isJa ? "カスタマーレビュー" : "customer reviews"}
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rating={avgRating} />
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({totalCount})
            </span>
          </div>
        </div>

        <div className="divide-y">
          {/* User reviews first (newest) */}
          {userReviews.map((review) => (
            <ReviewItem
              key={review.id}
              name={review.name}
              date={formatDate(review.createdAt, locale)}
              rating={review.rating}
              text={review.text}
              isUserReview
              locale={locale}
            />
          ))}

          {/* Demo reviews */}
          {DEMO_REVIEWS.map((review) => (
            <ReviewItem
              key={review.id}
              name={isJa ? review.nameJa : review.nameEn}
              date={isJa ? review.dateJa : review.dateEn}
              rating={review.rating}
              text={isJa ? review.textJa : review.textEn}
              locale={locale}
            />
          ))}
        </div>

        {/* Review Form */}
        <ReviewForm productId={productId} locale={locale} />
      </section>
    </ScrollFadeIn>
  );
}
