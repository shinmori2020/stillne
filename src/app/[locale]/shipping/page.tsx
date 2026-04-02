import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Truck, Package, RefreshCw, CreditCard } from "lucide-react";

interface ShippingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ShippingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.shipping" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ShippingPage({ params }: ShippingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.shipping" });

  const sections = [
    {
      icon: Truck,
      titleKey: "deliveryTime.title",
      descriptionKey: "deliveryTime.description",
    },
    {
      icon: CreditCard,
      titleKey: "shippingFee.title",
      descriptionKey: "shippingFee.description",
      noteKey: "shippingFee.note",
    },
    {
      icon: Package,
      titleKey: "packaging.title",
      descriptionKey: "packaging.description",
    },
    {
      icon: RefreshCw,
      titleKey: "returns.title",
      descriptionKey: "returns.description",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
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

      <div className="space-y-8">
        {sections.map((section, index) => (
          <ScrollFadeIn key={section.titleKey}>
            <section className="rounded-lg border bg-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-3 font-heading text-xl">
                    {t(section.titleKey)}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {t(section.descriptionKey)}
                  </p>
                  {section.noteKey && (
                    <p className="mt-2 text-sm text-muted-foreground/80">
                      {t(section.noteKey)}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  );
}
