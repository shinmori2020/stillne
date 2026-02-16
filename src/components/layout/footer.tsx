import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tCategory = await getTranslations("category");

  const currentYear = new Date().getFullYear();

  const categoryLinks = [
    { key: "interior", href: "/products?category=interior" },
    { key: "tableware", href: "/products?category=tableware" },
    { key: "fabric", href: "/products?category=fabric" },
    { key: "stationery", href: "/products?category=stationery" },
  ] as const;

  const helpLinks = [
    { label: t("shipping"), href: "/shipping" },
    { label: t("contact"), href: "/contact" },
    { label: locale === "ja" ? "マイページ" : "My Page", href: "/account" },
    { label: locale === "ja" ? "管理画面" : "Admin", href: "/admin" },
  ] as const;

  return (
    <footer className="mt-24 bg-secondary md:mt-32">
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
              {categoryLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tCategory(link.key)}
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

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
