import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";

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
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="mb-16">
          <h2 className="mb-6 font-heading text-2xl lowercase tracking-wide">
            {t("concept.title")}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {t("concept.description")}
          </p>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section>
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
    </div>
  );
}
