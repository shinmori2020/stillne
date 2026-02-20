import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { ProfileForm } from "@/components/account/profile-form";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("profile"),
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "account" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${locale}/account`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "ja" ? "戻る" : "Back"}
          </Link>
        </Button>
      </div>

      <PageHeader title={t("profile")} />

      <div className="mt-8 rounded-lg border border-border p-6">
        <ProfileForm locale={locale} />
      </div>
    </div>
  );
}
