import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  cormorantGaramond,
  sourceSans3,
  notoSansJP,
  jetbrainsMono,
} from "@/app/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "@/providers/cart-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/search/search-modal";
import type { SupportedLocale } from "@/lib/constants";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillne.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "stillne - " + t("hero.title"),
      template: "%s | stillne",
    },
    description: t("hero.subtitle"),
    keywords:
      locale === "ja"
        ? ["インテリア", "雑貨", "ミニマル", "ライフスタイル", "北欧", "シンプル"]
        : ["interior", "lifestyle", "minimal", "nordic", "simple", "home goods"],
    authors: [{ name: "stillne" }],
    creator: "stillne",
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      url: baseUrl,
      siteName: "stillne",
      title: "stillne - " + t("hero.title"),
      description: t("hero.subtitle"),
    },
    twitter: {
      card: "summary_large_image",
      title: "stillne - " + t("hero.title"),
      description: t("hero.subtitle"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        ja: `${baseUrl}/ja`,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as SupportedLocale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${sourceSans3.variable} ${notoSansJP.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <CartProvider>
              <NextIntlClientProvider messages={messages}>
                <Header />
                <MobileMenu />
                <CartDrawer />
                <SearchModal />
                <main className="min-h-screen">{children}</main>
                <Footer locale={locale} />
              </NextIntlClientProvider>
            </CartProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
