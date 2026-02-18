"use client";

import { Gem, Leaf, Truck, ShieldCheck } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface BrandValuesProps {
  locale: string;
}

const VALUES = [
  {
    icon: Gem,
    titleJa: "こだわりの素材",
    titleEn: "Quality Materials",
    descJa: "職人が厳選した上質な素材のみを使用。天然素材の風合いを活かし、ひとつひとつ丁寧に仕上げています。手に取るたびに感じる心地よさを大切にしています。",
    descEn: "Only the finest materials selected by artisans. We preserve the natural texture of each material, carefully finishing every piece by hand. Comfort you can feel every time you reach for it.",
  },
  {
    icon: Leaf,
    titleJa: "持続可能なものづくり",
    titleEn: "Sustainable Craft",
    descJa: "環境に配慮した製造工程と、長く愛用できる耐久性を両立。使い捨てではなく、暮らしに寄り添い続けるものづくりを目指しています。",
    descEn: "Environmentally conscious processes combined with lasting durability. We craft products meant to stay with you, not to be discarded.",
  },
  {
    icon: Truck,
    titleJa: "全国送料無料",
    titleEn: "Free Shipping",
    descJa: "¥5,000以上のお買い上げで全国どこでも送料無料。商品の魅力をそのままお届けするため、ひとつひとつ丁寧に梱包しています。",
    descEn: "Free shipping nationwide on orders over ¥5,000. Each item is carefully packaged to deliver the product's charm intact.",
  },
  {
    icon: ShieldCheck,
    titleJa: "安心の品質保証",
    titleEn: "Quality Guarantee",
    descJa: "お届けから30日間の品質保証付き。万が一の初期不良にも迅速に対応いたします。安心してお買い物をお楽しみください。",
    descEn: "30-day quality guarantee from delivery. We respond promptly to any defects. Shop with complete peace of mind.",
  },
];

export function BrandValues({ locale }: BrandValuesProps) {
  return (
    <section className="border-y bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <h2 className="mb-10 text-center font-heading text-2xl lowercase tracking-wide md:mb-14 md:text-3xl">
            {locale === "ja" ? "stillneが大切にしていること" : "what we value"}
          </h2>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollFadeIn key={index} delay={index * 0.1}>
                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-center font-heading text-base font-medium md:text-lg">
                    {locale === "ja" ? value.titleJa : value.titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {locale === "ja" ? value.descJa : value.descEn}
                  </p>
                </div>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
