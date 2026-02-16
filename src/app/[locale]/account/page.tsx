import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/page-header";
import { AccountDashboard } from "@/components/account/account-dashboard";

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AccountPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("myPage"),
  };
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <PageHeader title={t("myPage")} className="text-center" />
      <div className="mt-8">
        <AccountDashboard locale={locale} />
      </div>
    </div>
  );
}
