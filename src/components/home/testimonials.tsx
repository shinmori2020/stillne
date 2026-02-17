"use client";

import { Star } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface TestimonialsProps {
  locale: string;
}

const REVIEWS = [
  {
    nameJa: "田中 美咲",
    nameEn: "Misaki T.",
    productJa: "セラミックフラワーベース",
    productEn: "Ceramic Flower Vase",
    textJa: "マットな質感がとても上品で、どんなお花を飾っても素敵に見えます。シンプルなのに存在感があり、リビングの雰囲気が変わりました。",
    textEn: "The matte texture is very elegant, and any flowers look beautiful in it. Simple yet with a presence that transformed our living room.",
    rating: 5,
  },
  {
    nameJa: "佐藤 健一",
    nameEn: "Kenichi S.",
    productJa: "リネンテーブルクロス",
    productEn: "Linen Table Cloth",
    textJa: "使うほどに柔らかくなる生地感が最高です。洗濯を重ねても風合いが損なわれず、むしろ味が出てきます。長く使えそうです。",
    textEn: "The fabric gets softer with every use. Even after many washes, it keeps its character and develops more charm over time.",
    rating: 5,
  },
  {
    nameJa: "鈴木 陽子",
    nameEn: "Yoko S.",
    productJa: "キャンドルホルダー",
    productEn: "Candle Holder",
    textJa: "真鍮の温かみのある光沢が食卓を美しく演出してくれます。夜のディナータイムが特別な時間になりました。",
    textEn: "The warm brass glow beautifully sets the dinner table. Evening meals have become something truly special.",
    rating: 5,
  },
];

export function Testimonials({ locale }: TestimonialsProps) {
  const isJa = locale === "ja";

  return (
    <section className="border-y bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
              {isJa ? "お客様の声" : "testimonials"}
            </p>
            <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {isJa ? "使ってくださった方々から" : "from our customers"}
            </h2>
          </div>
        </ScrollFadeIn>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <ScrollFadeIn key={index} delay={index * 0.1}>
              <div className="flex h-full flex-col rounded-lg border bg-card p-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {isJa ? review.textJa : review.textEn}
                </p>
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium">
                    {isJa ? review.nameJa : review.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isJa ? review.productJa : review.productEn}
                  </p>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
