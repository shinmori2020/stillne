import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Shield } from "lucide-react";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const PRIVACY_SECTIONS = [
  "collection",
  "purpose",
  "thirdParty",
  "management",
  "disclosure",
  "cookies",
  "changes",
  "contact",
] as const;

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.privacy" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Shield className="h-6 w-6 text-primary" />
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
        <p className="mb-10 text-sm leading-relaxed text-muted-foreground">
          {t("intro")}
        </p>
      </ScrollFadeIn>

      <div className="border-t">
        {PRIVACY_SECTIONS.map((section, index) => (
          <ScrollFadeIn key={section}>
            <section className="border-b px-4 py-6 md:px-6 md:py-8">
              <h2 className="mb-3 font-heading text-xl">
                <span className="mr-3 font-sans text-3xl font-light text-muted-foreground">{index + 1}.</span>
                {t(`${section}.title`)}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {t(`${section}.description`)}
              </p>
            </section>
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  );
}
