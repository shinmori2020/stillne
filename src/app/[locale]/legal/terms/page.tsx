import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { FileText } from "lucide-react";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const TERMS_SECTIONS = [
  "scope",
  "account",
  "order",
  "payment",
  "intellectualProperty",
  "disclaimer",
  "changes",
  "law",
] as const;

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.terms" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <p className="mb-8 rounded-lg border bg-card p-6 text-sm leading-relaxed text-muted-foreground md:p-8">
          {t("intro")}
        </p>
      </ScrollFadeIn>

      <div className="space-y-6">
        {TERMS_SECTIONS.map((section, index) => (
          <ScrollFadeIn key={section}>
            <section className="rounded-lg border bg-card p-6 md:p-8">
              <h2 className="mb-3 font-heading text-xl">
                <span className="mr-2 text-muted-foreground">
                  {`第${index + 1}条`}
                </span>
                {t(`${section}.title`)}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`${section}.description`)}
              </p>
            </section>
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  );
}
