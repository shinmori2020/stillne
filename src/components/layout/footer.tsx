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
    { label: locale === "ja" ? "サイズ・ケアガイド" : "Size & Care Guide", href: "/guide" },
    { label: t("contact"), href: "/contact" },
    { label: locale === "ja" ? "よくある質問" : "FAQ", href: "/faq" },
  ] as const;

  const legalLinks = [
    { label: locale === "ja" ? "特定商取引法に基づく表記" : "Legal Notice", href: "/legal/commerce" },
    { label: locale === "ja" ? "プライバシーポリシー" : "Privacy Policy", href: "/legal/privacy" },
    { label: locale === "ja" ? "利用規約" : "Terms of Service", href: "/legal/terms" },
    { label: locale === "ja" ? "サイトマップ" : "Sitemap", href: "/dev" },
  ] as const;

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Shop Info */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-heading text-2xl lowercase tracking-wide md:text-3xl"
            >
              stillne
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("concept")}
            </p>
            <div className="mt-4 space-y-1 text-xs text-muted-foreground">
              <p>{locale === "ja" ? "〒150-0001 東京都渋谷区神宮前3-1-1" : "3-1-1 Jingumae, Shibuya-ku, Tokyo 150-0001"}</p>
              <p>TEL: 03-1234-5678</p>
            </div>
            {/* SNS Icons */}
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground transition-colors hover:bg-foreground/20 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground transition-colors hover:bg-foreground/20 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" aria-label="LINE" className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground transition-colors hover:bg-foreground/20 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
              </a>
            </div>
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
          <p className="text-center text-xs text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
