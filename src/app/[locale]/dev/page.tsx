import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

interface DevPageProps {
  params: Promise<{ locale: string }>;
}

const SITE_LINKS = [
  {
    category: "ショップ",
    links: [
      { label: "TOPページ", path: "/" },
      { label: "商品一覧", path: "/products" },
      { label: "商品詳細（例）", path: "/products/ceramic-flower-vase-a001" },
    ],
  },
  {
    category: "カート・購入",
    links: [
      { label: "カート", path: "/cart" },
      { label: "チェックアウト", path: "/checkout" },
      { label: "ご注文ありがとうございます", path: "/checkout/success" },
    ],
  },
  {
    category: "マイページ",
    links: [
      { label: "マイページ", path: "/account" },
      { label: "プロフィール", path: "/account/profile" },
      { label: "配送先情報", path: "/account/addresses" },
      { label: "注文履歴", path: "/account/orders" },
      { label: "お気に入り", path: "/account/wishlist" },
      { label: "閲覧履歴", path: "/account/history" },
      { label: "ログイン", path: "/account/login" },
      { label: "新規登録", path: "/account/register" },
    ],
  },
  {
    category: "管理画面",
    links: [
      { label: "管理ダッシュボード", path: "/admin" },
      { label: "商品管理", path: "/admin/products" },
      { label: "注文管理", path: "/admin/orders" },
      { label: "メルマガ管理", path: "/admin/newsletter" },
    ],
  },
  {
    category: "インフォメーション",
    links: [
      { label: "このサイトについて", path: "/about" },
      { label: "お問い合わせ", path: "/contact" },
      { label: "配送について", path: "/shipping" },
      { label: "よくある質問", path: "/faq" },
    ],
  },
  {
    category: "法律関連",
    links: [
      { label: "特定商取引法に基づく表記", path: "/legal/commerce" },
      { label: "プライバシーポリシー", path: "/legal/privacy" },
      { label: "利用規約", path: "/legal/terms" },
    ],
  },
];

export default async function DevPage({ params }: DevPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <header className="mb-12 text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
          dev
        </p>
        <h1 className="font-heading text-3xl lowercase tracking-wide md:text-4xl">
          サイトマップ
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          全ページへのリンク一覧（開発用）
        </p>
      </header>

      <div className="space-y-8">
        {SITE_LINKS.map((group) => (
          <section key={group.category}>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {group.category}
            </h2>
            <div className="border-t">
              {group.links.map((link) => (
                <Link
                  key={link.path}
                  href={`/${locale}${link.path}`}
                  className="flex items-center justify-between border-b px-4 py-4 text-sm transition-colors hover:text-primary"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-foreground">
                    /{locale}{link.path}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
