"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReviewStore } from "@/lib/stores/review-store";

interface ReviewFormProps {
  productId: string;
  locale: string;
}

export function ReviewForm({ productId, locale }: ReviewFormProps) {
  const isJa = locale === "ja";
  const { addReview } = useReviewStore();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !text.trim()) return;

    addReview({
      productId,
      name: name.trim(),
      rating,
      text: text.trim(),
    });

    setSubmitted(true);
    setName("");
    setRating(0);
    setText("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  const isValid = rating > 0 && name.trim().length > 0 && text.trim().length > 0;

  return (
    <div id="review-form" className="border-t border-border pt-8">
      <h3 className="mb-6 text-sm font-medium">
        {isJa ? "レビューを書く" : "Write a review"}
      </h3>

      {submitted ? (
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Check className="h-5 w-5 text-primary" />
          <p className="text-sm text-primary">
            {isJa
              ? "レビューを投稿しました。ありがとうございます！"
              : "Thank you for your review!"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div>
            <label className="mb-2 block text-xs text-muted-foreground">
              {isJa ? "評価" : "Rating"}
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 transition-transform hover:scale-110"
                    aria-label={`${starValue} ${isJa ? "星" : "stars"}`}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        starValue <= (hoverRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-xs text-muted-foreground"
            >
              {isJa ? "お名前" : "Name"}
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isJa ? "例: 田中 太郎" : "e.g. John D."}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              maxLength={50}
            />
          </div>

          {/* Review Text */}
          <div>
            <label
              htmlFor="review-text"
              className="mb-2 block text-xs text-muted-foreground"
            >
              {isJa ? "レビュー" : "Review"}
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                isJa
                  ? "商品の使い心地や感想をお聞かせください"
                  : "Share your experience with this product"
              }
              rows={4}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              maxLength={500}
            />
          </div>

          <Button type="submit" size="sm" disabled={!isValid}>
            {isJa ? "レビューを投稿する" : "Submit review"}
          </Button>
        </form>
      )}
    </div>
  );
}
