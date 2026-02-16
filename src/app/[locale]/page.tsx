import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/hero-banner";
import { NewArrivals } from "@/components/home/new-arrivals";
import { CategoryBanner } from "@/components/home/category-banner";
import { BrandValues } from "@/components/home/brand-values";
import { BrandStory } from "@/components/home/brand-story";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { getNewArrivals } from "@/lib/api/products";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title:
      locale === "ja"
        ? "stillne — 静かに佇む、美しい日用品"
        : "stillne — beautiful everyday objects",
    description: t("heroSubtitle"),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch new arrival products from Medusa
  const newArrivals = await getNewArrivals(8);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd locale={locale} />
      <HeroBanner locale={locale} />
      <CategoryBanner locale={locale} />
      {newArrivals.length > 0 && (
        <NewArrivals products={newArrivals} locale={locale} />
      )}
      <BrandValues locale={locale} />
      <BrandStory locale={locale} />
    </>
  );
}
