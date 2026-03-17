import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CATEGORIES } from "@/lib/categories";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tCategory = await getTranslations("category");

  const currentYear = new Date().getFullYear();

  const helpLinks = [
    { label: t("shipping"), href: "/shipping" },
    { label: t("contact"), href: "/contact" },
    { label: locale === "ja" ? "よくある質問" : "FAQ", href: "/faq" },
  ] as const;

  const legalLinks = [
    { label: locale === "ja" ? "特定商取引法に基づく表記" : "Legal Notice", href: "/legal/commerce" },
    { label: locale === "ja" ? "プライバシーポリシー" : "Privacy Policy", href: "/legal/privacy" },
    { label: locale === "ja" ? "利用規約" : "Terms of Service", href: "/legal/terms" },
  ] as const;

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Shop Info */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-heading text-xl lowercase tracking-wide"
            >
              stillne
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("concept")}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium">{t("categories")}</h3>
            <ul className="mt-4 space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={`/${locale}/products?category=${cat.handle}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tCategory(cat.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-medium">{t("help")}</h3>
            <ul className="mt-4 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-medium">{t("social")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="mb-4 flex flex-wrap justify-center gap-4 text-xs">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mb-4 flex justify-center">
            <Link
              href={`/${locale}/dev`}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale === "ja" ? "サイトマップ" : "Sitemap"}
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
