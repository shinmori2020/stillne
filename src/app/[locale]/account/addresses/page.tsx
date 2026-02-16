import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { AddressList } from "@/components/account/address-list";

interface AddressesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AddressesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("addresses"),
  };
}

export default async function AddressesPage({ params }: AddressesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${locale}/account`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "ja" ? "戻る" : "Back"}
          </Link>
        </Button>
      </div>

      <PageHeader title={t("addresses")} />

      <div className="mt-8">
        <AddressList locale={locale} />
      </div>
    </div>
  );
}
