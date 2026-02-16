"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

interface HeroBannerProps {
  locale: string;
}

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = useTranslations("home");

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[80vh]">
      {/* Background - gradient placeholder (replace with actual image in production) */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <ScrollFadeIn>
            <div className="max-w-xl">
              <h1 className="font-heading text-4xl lowercase tracking-wide md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:mt-6 md:text-xl">
                {t("hero.subtitle")}
              </p>
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
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
