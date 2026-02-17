"use client";

import { Instagram } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface LifestyleGalleryProps {
  locale: string;
}

const GALLERY_ITEMS = [
  { labelJa: "リビングに佇む花瓶", labelEn: "Vase in the living room", color: "bg-stone-200 dark:bg-stone-800" },
  { labelJa: "朝の食卓", labelEn: "Morning table setting", color: "bg-amber-100 dark:bg-amber-900/30" },
  { labelJa: "窓辺のキャンドル", labelEn: "Candles by the window", color: "bg-stone-300 dark:bg-stone-700" },
  { labelJa: "リネンのある暮らし", labelEn: "Living with linen", color: "bg-stone-100 dark:bg-stone-800/50" },
  { labelJa: "書斎の一角", labelEn: "A corner of the study", color: "bg-amber-50 dark:bg-amber-950/30" },
  { labelJa: "夕暮れのダイニング", labelEn: "Evening dining", color: "bg-stone-200 dark:bg-stone-700/50" },
];

export function LifestyleGallery({ locale }: LifestyleGalleryProps) {
  const isJa = locale === "ja";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <ScrollFadeIn>
          <div className="mb-8 flex items-center justify-center gap-3 md:mb-12">
            <Instagram className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {isJa ? "暮らしのシーン" : "lifestyle scenes"}
            </h2>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <ScrollFadeIn key={index} delay={index * 0.05}>
              <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg">
                <div className={`absolute inset-0 ${item.color}`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-background/90 px-4 py-2">
                    <p className="text-xs font-medium">
                      {isJa ? item.labelJa : item.labelEn}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        <ScrollFadeIn delay={0.3}>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isJa
              ? "※ 実際のサイトでは商品の使用シーン写真が表示されます"
              : "* In production, lifestyle photos of products will be displayed"}
          </p>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
