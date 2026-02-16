import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface ContactLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}
