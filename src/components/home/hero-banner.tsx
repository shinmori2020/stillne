"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  locale: string;
}

const SLIDES = [
  {
    id: 1,
    gradient: "from-stone-200/50 via-amber-100/30 to-stone-100/40 dark:from-stone-800/50 dark:via-stone-700/30 dark:to-stone-800/40",
    decorative1: "bg-primary/10",
    decorative2: "bg-accent/10",
    titleKey: "hero.slide1.title",
    subtitleKey: "hero.slide1.subtitle",
  },
  {
    id: 2,
    gradient: "from-amber-50/60 via-stone-100/40 to-amber-100/30 dark:from-stone-700/60 dark:via-stone-800/40 dark:to-stone-700/30",
    decorative1: "bg-amber-200/15",
    decorative2: "bg-stone-300/10",
    titleKey: "hero.slide2.title",
    subtitleKey: "hero.slide2.subtitle",
  },
  {
    id: 3,
    gradient: "from-stone-100/50 via-amber-50/40 to-stone-200/30 dark:from-stone-800/50 dark:via-stone-700/40 dark:to-stone-800/30",
    decorative1: "bg-stone-400/10",
    decorative2: "bg-primary/15",
    titleKey: "hero.slide3.title",
    subtitleKey: "hero.slide3.subtitle",
  },
  {
    id: 4,
    gradient: "from-amber-100/40 via-stone-50/50 to-amber-50/30 dark:from-stone-700/40 dark:via-stone-800/50 dark:to-stone-700/30",
    decorative1: "bg-amber-300/10",
    decorative2: "bg-stone-400/12",
    titleKey: "hero.slide4.title",
    subtitleKey: "hero.slide4.subtitle",
  },
  {
    id: 5,
    gradient: "from-stone-50/60 via-amber-100/30 to-stone-100/50 dark:from-stone-800/60 dark:via-stone-700/30 dark:to-stone-800/50",
    decorative1: "bg-primary/12",
    decorative2: "bg-stone-300/15",
    titleKey: "hero.slide5.title",
    subtitleKey: "hero.slide5.subtitle",
  },
];

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = useTranslations("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const [displaySlide, setDisplaySlide] = useState(0);

  const changeSlide = useCallback((next: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setDisplaySlide(next);
      setCurrentSlide(next);
      setTimeout(() => setTextVisible(true), 100);
    }, 500);
  }, []);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % SLIDES.length;
    changeSlide(next);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const next = (currentSlide - 1 + SLIDES.length) % SLIDES.length;
    changeSlide(next);
  }, [currentSlide, changeSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    changeSlide(index);
  }, [currentSlide, changeSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const slide = SLIDES[displaySlide]!;

  return (
    <section
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[80vh]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides */}
      {SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div className={cn("absolute inset-0 bg-gradient-to-br", s.gradient)} />
          <div className="absolute inset-0 opacity-30">
            <div className={cn("absolute left-1/4 top-1/4 h-64 w-64 rounded-full blur-3xl", s.decorative1)} />
            <div className={cn("absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl", s.decorative2)} />
          </div>
        </div>
      ))}

      {/* Content - text changes, buttons stay fixed */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <div>
            {/* Animated text */}
            <div
              className={cn(
                "transition-all duration-700 ease-out",
                textVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-3 opacity-0 blur-[2px]"
              )}
            >
              <h1 className="font-heading text-2xl lowercase tracking-wide md:text-3xl lg:text-4xl">
                {t(slide.titleKey as any)}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base">
                {t(slide.subtitleKey as any)}
              </p>
            </div>

            {/* Static buttons - always visible */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href={`/${locale}/products`}>
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/about`}>
                  {t("hero.secondaryCta")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-background/40 md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-background/40 md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, index) => (
          <button
            key={s.id}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentSlide
                ? "w-8 bg-foreground"
                : "w-2 bg-foreground/30 hover:bg-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
