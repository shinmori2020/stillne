import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/page-header";
import { RegisterForm } from "@/components/account/register-form";

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RegisterPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("register"),
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });

  return (
    <div className="mx-auto max-w-md py-12">
      <PageHeader title={t("register")} className="text-center" />
      <div className="mt-8 rounded-lg border border-border p-6">
        <RegisterForm locale={locale} />
      </div>
    </div>
  );
}
