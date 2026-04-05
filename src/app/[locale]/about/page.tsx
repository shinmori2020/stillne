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
      {/* Hero Section */}
      <ScrollFadeIn>
        <section className="relative flex min-h-[360px] items-center justify-center bg-secondary/40">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/40">
              Brand Image
            </span>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-heading text-3xl lowercase tracking-wide md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </section>
      </ScrollFadeIn>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:px-12">
        {/* Concept */}
        <ScrollFadeIn>
          <section className="mb-20">
            <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide">
              {t("concept.title")}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {t("concept.description")}
            </p>
          </section>
        </ScrollFadeIn>

        {/* Brand Story */}
        <ScrollFadeIn>
          <section className="mb-20">
            <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide">
              {t("story.title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-secondary/60">
                <span className="text-sm text-muted-foreground/60">
                  Story Image
                </span>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  {t("story.paragraph1")}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {t("story.paragraph2")}
                </p>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Values */}
        <ScrollFadeIn>
          <section className="mb-20">
            <h2 className="mb-8 font-heading text-2xl lowercase tracking-wide">
              {t("values.title")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-3 font-heading text-lg">
                  {t("values.quality.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("values.quality.description")}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-3 font-heading text-lg">
                  {t("values.design.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("values.design.description")}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-3 font-heading text-lg">
                  {t("values.sustainability.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("values.sustainability.description")}
                </p>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Materials */}
        <ScrollFadeIn>
          <section className="mb-20">
            <h2 className="mb-8 font-heading text-2xl lowercase tracking-wide">
              {t("materials.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(["ceramic", "wood", "fabric", "glass"] as const).map((mat) => (
                <div key={mat} className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/60">
                    <span className="text-xs text-muted-foreground/60">
                      {mat}
                    </span>
                  </div>
                  <h3 className="mb-1 text-sm font-medium">
                    {t(`materials.${mat}.title`)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(`materials.${mat}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollFadeIn>

        {/* CTA */}
        <ScrollFadeIn>
          <section className="rounded-lg bg-secondary/40 p-8 text-center md:p-12">
            <h2 className="mb-4 font-heading text-2xl lowercase tracking-wide">
              {t("cta.title")}
            </h2>
            <p className="mb-8 text-muted-foreground">
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
          </section>
        </ScrollFadeIn>
      </div>
    </div>
  );
}
