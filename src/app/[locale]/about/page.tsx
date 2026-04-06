import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Button } from "@/components/ui/button";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return {
    title: t("title"),
    description: t("concept.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.about" });

  return (
    <div>
      {/* Hero Section - Full width, tall */}
      <ScrollFadeIn>
        <section className="relative flex min-h-[60vh] items-center justify-center bg-secondary/40">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/30">
              Brand Image
            </span>
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="font-heading text-4xl lowercase tracking-wide md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              {t("subtitle")}
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href={`/${locale}/products`}>
                  {t("cta.shop")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      {/* Concept - Full width background */}
      <ScrollFadeIn>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground/40">
                  Concept Image
                </span>
              </div>
              <div>
                <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide md:text-3xl">
                  {t("concept.title")}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {t("concept.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      {/* Brand Story - Full width accent background, image RIGHT */}
      <ScrollFadeIn>
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide md:text-3xl">
                  {t("story.title")}
                </h2>
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {t("story.paragraph1")}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {t("story.paragraph2")}
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary/60">
                  <span className="text-sm text-muted-foreground/40">
                    Story Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      {/* Values - White background */}
      <ScrollFadeIn>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <h2 className="mb-12 text-center font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {t("values.title")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {(["quality", "design", "sustainability"] as const).map((key) => (
                <div key={key} className="group rounded-lg border bg-card p-8 transition-shadow hover:shadow-md">
                  <h3 className="mb-4 font-heading text-lg">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      {/* Materials - Full width accent background, larger cards */}
      <ScrollFadeIn>
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <h2 className="mb-12 text-center font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {t("materials.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(["ceramic", "wood", "fabric", "glass"] as const).map((mat) => (
                <div
                  key={mat}
                  className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="flex aspect-[3/2] items-center justify-center bg-secondary/50 transition-colors group-hover:bg-secondary/70">
                    <span className="text-xs text-muted-foreground/40">
                      {mat}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-sm font-medium">
                      {t(`materials.${mat}.title`)}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {t(`materials.${mat}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      {/* CTA - Full width */}
      <ScrollFadeIn>
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide md:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="mb-10 text-base text-muted-foreground md:text-lg">
              {t("cta.description")}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href={`/${locale}/products`}>
                  {t("cta.shop")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/contact`}>{t("cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollFadeIn>
    </div>
  );
}
