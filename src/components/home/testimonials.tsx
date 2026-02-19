"use client";

import { useState, useEffect, useRef } from "react";
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
  {
    nameJa: "高橋 愛",
    nameEn: "Ai T.",
    productJa: "ハンドメイドプレート",
    productEn: "Handmade Plate",
    textJa: "一枚一枚微妙に表情が違うのが手仕事の魅力。料理を盛り付けるだけで、食卓が一気に華やぎます。",
    textEn: "Each plate has its own unique character—that's the charm of handmade. Simply plating food on it elevates the entire table.",
    rating: 5,
  },
  {
    nameJa: "渡辺 翔太",
    nameEn: "Shota W.",
    productJa: "ウォールナットトレイ",
    productEn: "Walnut Tray",
    textJa: "木目が美しく、コーヒーを運ぶだけで絵になります。軽くて使いやすく、毎朝の朝食に欠かせなくなりました。",
    textEn: "The wood grain is gorgeous—even carrying coffee on it looks like a picture. Light, easy to use, and essential for my morning routine.",
    rating: 5,
  },
  {
    nameJa: "伊藤 さくら",
    nameEn: "Sakura I.",
    productJa: "リネンナプキンセット",
    productEn: "Linen Napkin Set",
    textJa: "ナチュラルな色合いがどんな食器にも合います。ゲストが来た時にも褒められて、とても気に入っています。",
    textEn: "The natural tones match any tableware. Guests always compliment them, and I absolutely love using them.",
    rating: 5,
  },
  {
    nameJa: "中村 大輔",
    nameEn: "Daisuke N.",
    productJa: "アロマディフューザー",
    productEn: "Aroma Diffuser",
    textJa: "デザインがミニマルで部屋に馴染みます。香りも穏やかで、帰宅した時にほっとする空間になりました。",
    textEn: "The minimal design blends into any room. The scent is gentle, creating a soothing space to come home to.",
    rating: 5,
  },
  {
    nameJa: "山本 理恵",
    nameEn: "Rie Y.",
    productJa: "スタッキングマグ",
    productEn: "Stacking Mug",
    textJa: "収納しやすいのに見た目も可愛い。家族分揃えましたが、色違いで並べるとインテリアとしても素敵です。",
    textEn: "Easy to store yet adorable in design. I got one for each family member—lined up in different colors, they look wonderful as decor.",
    rating: 5,
  },
];

const GAP = 16; // gap-4 = 1rem = 16px

export function Testimonials({ locale }: TestimonialsProps) {
  const isJa = locale === "ja";
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Start at REVIEWS.length so the prepended set fills the left side
  const [currentIndex, setCurrentIndex] = useState(REVIEWS.length);
  const [cardWidth, setCardWidth] = useState(350);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Measure card width on mount and resize
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance one card at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Seamless loop: when we reach the end of set 3, reset to set 2 start
  useEffect(() => {
    if (currentIndex < REVIEWS.length * 2) return;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(REVIEWS.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }, 600);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const step = cardWidth + GAP;
  const translateX = -currentIndex * step;

  const renderCard = (review: (typeof REVIEWS)[number], index: number) => (
    <div
      key={index}
      ref={index === 0 ? cardRef : undefined}
      className="w-[300px] shrink-0 rounded-lg border bg-card p-6 md:w-[350px]"
    >
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
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
  );

  return (
    <section className="border-y bg-secondary/30 py-16 md:py-24">
      <ScrollFadeIn>
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
            {isJa ? "お客様の声" : "testimonials"}
          </h2>
        </div>
      </ScrollFadeIn>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4"
          style={{
            transform: `translateX(calc(50vw - ${cardWidth / 2}px + ${translateX}px))`,
            transition: isTransitioning
              ? "transform 600ms ease-in-out"
              : "none",
          }}
        >
          {/* 3 sets: left fill + main + loop duplicate */}
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, index) =>
            renderCard(review, index)
          )}
        </div>
      </div>
    </section>
  );
}
