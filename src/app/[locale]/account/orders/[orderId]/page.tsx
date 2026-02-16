import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { OrderDetail } from "@/components/account/order-detail";

interface OrderDetailPageProps {
  params: Promise<{ locale: string; orderId: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("orders"),
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { locale, orderId } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${locale}/account/orders`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "ja" ? "注文履歴" : "Order history"}
          </Link>
        </Button>
      </div>

      <PageHeader
        title={locale === "ja" ? "注文詳細" : "Order details"}
      />

      <div className="mt-8">
        <OrderDetail orderId={orderId} locale={locale} />
      </div>
    </div>
  );
}
