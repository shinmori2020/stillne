import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/page-header";
import { LoginForm } from "@/components/account/login-form";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LoginPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("login"),
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });

  return (
    <div className="mx-auto px-4 py-12 md:px-8">
      <PageHeader title={t("login")} className="text-center" />
      <div className="mt-8 rounded-lg border border-border p-6">
        <LoginForm locale={locale} />
      </div>
    </div>
  );
}
