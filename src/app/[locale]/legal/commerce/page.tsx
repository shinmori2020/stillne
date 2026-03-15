import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollFadeIn } from "@/components/common/scroll-fade-in";
import { Scale } from "lucide-react";

interface CommercePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommercePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.commerce" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const COMMERCE_ITEMS = [
  "seller",
  "representative",
  "address",
  "phone",
  "email",
  "url",
  "price",
  "additionalFees",
  "payment",
  "paymentTiming",
  "delivery",
  "returns",
  "cancellation",
] as const;

export default async function CommercePage({ params }: CommercePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.commerce" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <ScrollFadeIn>
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Scale className="h-6 w-6 text-primary" />
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
        <div className="rounded-lg border bg-card">
          <table className="w-full">
            <tbody className="divide-y">
              {COMMERCE_ITEMS.map((item) => (
                <tr key={item} className="flex flex-col sm:table-row">
                  <th className="bg-secondary/50 px-6 py-4 text-left text-sm font-medium sm:w-1/4">
                    {t(`${item}.title`)}
                  </th>
                  <td className="px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`${item}.value`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollFadeIn>
    </div>
  );
}
