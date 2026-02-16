import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { OrderList } from "@/components/account/order-list";

interface OrdersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: OrdersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("orders"),
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
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

      <PageHeader title={t("orders")} />

      <div className="mt-8">
        <OrderList locale={locale} />
      </div>
    </div>
  );
}
