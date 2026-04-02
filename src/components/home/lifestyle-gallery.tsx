"use client";

import { useState, useCallback, useEffect } from "react";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { cn } from "@/lib/utils";

interface LifestyleGalleryProps {
  locale: string;
}

const GALLERY_ITEMS = [
  { labelJa: "リビングに佇む花瓶", labelEn: "Vase in the living room", color: "bg-stone-200 dark:bg-stone-800" },
  { labelJa: "朝の食卓", labelEn: "Morning table setting", color: "bg-stone-100 dark:bg-stone-800/60" },
  { labelJa: "窓辺のキャンドル", labelEn: "Candles by the window", color: "bg-stone-300 dark:bg-stone-700" },
  { labelJa: "リネンのある暮らし", labelEn: "Living with linen", color: "bg-stone-100 dark:bg-stone-800/50" },
  { labelJa: "書斎の一角", labelEn: "A corner of the study", color: "bg-stone-200/60 dark:bg-stone-700/30" },
  { labelJa: "夕暮れのダイニング", labelEn: "Evening dining", color: "bg-stone-200 dark:bg-stone-700/50" },
];

export function LifestyleGallery({ locale }: LifestyleGalleryProps) {
  const isJa = locale === "ja";
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <ScrollFadeIn key={index} delay={index * 0.05}>
              <div
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedIndex(index)}
              >
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

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Content wrapper */}
          <div
            className="flex items-center gap-4 md:gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="shrink-0 cursor-pointer rounded-full bg-background/20 p-3 text-white transition-colors hover:bg-background/40"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image area */}
            <div className="flex max-h-[80vh] w-[70vw] max-w-lg flex-col items-center">
              {(() => {
                const item = GALLERY_ITEMS[selectedIndex];
                if (!item) return null;
                return (
                  <>
                    <div className="relative w-full">
                      {/* Close button */}
                      <button
                        onClick={handleClose}
                        className="absolute -right-3 -top-3 z-10 cursor-pointer rounded-full bg-background/90 p-1.5 text-foreground shadow-md transition-colors hover:bg-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div
                        className={cn(
                          "aspect-square w-full rounded-lg",
                          item.color
                        )}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-medium text-white">
                        {isJa ? item.labelJa : item.labelEn}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {selectedIndex + 1} / {GALLERY_ITEMS.length}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="shrink-0 cursor-pointer rounded-full bg-background/20 p-3 text-white transition-colors hover:bg-background/40"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
