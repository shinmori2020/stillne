# stillne — コンポーネント設計パターン

Next.js App Router + Medusa v2 + shadcn/ui で構築するECストアフロントのコンポーネント設計ガイド。
Server Components をデフォルトとし、インタラクションが必要な箇所のみ Client Components を使用する。

---

## 1. ディレクトリ構成

### 1.1 全体構成

```
src/
├── app/
│   ├── [locale]/                       ← i18nルーティング（ja / en）
│   │   ├── layout.tsx                  ← ロケール別レイアウト
│   │   ├── page.tsx                    ← トップページ
│   │   ├── loading.tsx                 ← トップページローディング
│   │   ├── error.tsx                   ← トップページエラー
│   │   ├── not-found.tsx               ← 404
│   │   ├── products/
│   │   │   ├── page.tsx                ← 商品一覧
│   │   │   ├── loading.tsx
│   │   │   ├── [handle]/
│   │   │   │   ├── page.tsx            ← 商品詳細
│   │   │   │   └── loading.tsx
│   │   │   └── category/
│   │   │       └── [handle]/
│   │   │           ├── page.tsx        ← カテゴリ別一覧
│   │   │           └── loading.tsx
│   │   ├── cart/
│   │   │   └── page.tsx                ← カートページ
│   │   ├── checkout/
│   │   │   ├── page.tsx                ← チェックアウト
│   │   │   └── success/
│   │   │       └── page.tsx            ← 注文完了
│   │   ├── account/
│   │   │   ├── page.tsx                ← マイページ
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx            ← 注文履歴
│   │   │   │   └── [id]/page.tsx       ← 注文詳細
│   │   │   └── addresses/page.tsx      ← 住所管理
│   │   └── pages/
│   │       └── [slug]/page.tsx         ← 静的ページ（about等）
│   ├── layout.tsx                      ← ルートレイアウト（フォント、テーマ）
│   └── global-error.tsx                ← グローバルエラー
│
├── components/
│   ├── layout/                         ← レイアウト系
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── language-switcher.tsx
│   │   ├── theme-toggle.tsx
│   │   └── breadcrumb.tsx
│   │
│   ├── product/                        ← 商品系
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-detail.tsx
│   │   ├── product-gallery.tsx
│   │   ├── product-info.tsx
│   │   ├── product-variant-selector.tsx
│   │   ├── product-price.tsx
│   │   └── related-products.tsx
│   │
│   ├── cart/                           ← カート系
│   │   ├── cart-drawer.tsx
│   │   ├── cart-item.tsx
│   │   ├── cart-summary.tsx
│   │   ├── add-to-cart-button.tsx
│   │   └── cart-icon.tsx
│   │
│   ├── checkout/                       ← チェックアウト系
│   │   ├── checkout-form.tsx
│   │   ├── shipping-address-form.tsx
│   │   ├── shipping-method-selector.tsx
│   │   ├── payment-section.tsx
│   │   ├── order-summary.tsx
│   │   └── demo-notice.tsx
│   │
│   ├── account/                        ← アカウント系
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── profile-form.tsx
│   │   ├── address-list.tsx
│   │   ├── address-form.tsx
│   │   ├── order-list.tsx
│   │   └── order-detail.tsx
│   │
│   ├── home/                           ← トップページ固有
│   │   ├── hero-banner.tsx
│   │   ├── featured-section.tsx
│   │   ├── new-arrivals.tsx
│   │   └── category-links.tsx
│   │
│   ├── search/                         ← 検索系
│   │   ├── search-bar.tsx
│   │   ├── search-results.tsx
│   │   └── category-filter.tsx
│   │
│   ├── common/                         ← 汎用
│   │   ├── placeholder-image.tsx
│   │   ├── page-header.tsx
│   │   ├── empty-state.tsx
│   │   ├── pagination.tsx
│   │   ├── sort-selector.tsx
│   │   └── scroll-fade-in.tsx
│   │
│   └── ui/                             ← shadcn/ui（自動生成）
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── dialog.tsx
│       ├── sheet.tsx
│       ├── dropdown-menu.tsx
│       ├── badge.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       └── ...
│
├── hooks/                              ← カスタムフック
│   ├── use-cart.ts
│   ├── use-products.ts
│   ├── use-customer.ts
│   ├── use-checkout.ts
│   ├── use-scroll-animation.ts
│   └── use-media-query.ts
│
├── lib/                                ← ユーティリティ
│   ├── medusa.ts                       ← SDK初期化
│   ├── utils.ts                        ← 汎用ユーティリティ（cn関数等）
│   ├── constants.ts                    ← 定数
│   └── format.ts                       ← フォーマット関数（価格、日付）
│
├── types/                              ← 型定義
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── customer.ts
│   └── common.ts
│
├── providers/                          ← コンテキストプロバイダー
│   ├── cart-provider.tsx
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
├── messages/                           ← 翻訳ファイル
│   ├── ja.json
│   └── en.json
│
└── scripts/
    └── seed.ts                         ← ダミーデータ投入
```

### 1.2 命名規則

| 対象 | 規則 | 例 |
|---|---|---|
| ファイル名 | kebab-case | `product-card.tsx` |
| コンポーネント名 | PascalCase | `ProductCard` |
| フック名 | camelCase、`use` プレフィックス | `useCart` |
| 型名 | PascalCase | `ProductCardProps` |
| 型ファイル | kebab-case | `product.ts` |
| 定数 | SCREAMING_SNAKE_CASE | `MAX_CART_ITEMS` |
| ユーティリティ関数 | camelCase | `formatPrice` |
| CSS変数 | kebab-case、`--` プレフィックス | `--accent` |

### 1.3 エクスポート方針

- ページ・レイアウト: `export default`（Next.js規約）
- コンポーネント: named export（`export function ProductCard`）
- フック: named export
- 型: named export
- バレルエクスポート（`index.ts`）は使用しない（ツリーシェイキング阻害を防ぐ）

---

## 2. Server / Client コンポーネントの分類

### 2.1 判定基準

```
Server Component（デフォルト）を使用:
  ✓ データフェッチ（Medusa API呼び出し）
  ✓ 静的な表示のみ
  ✓ SEOに影響するコンテンツ
  ✓ 環境変数へのアクセス

Client Component（'use client'）を使用:
  ✓ ユーザーインタラクション（クリック、入力、ホバー）
  ✓ React hooks（useState, useEffect, useRef）
  ✓ ブラウザAPI（localStorage, IntersectionObserver）
  ✓ React Query（useQuery, useMutation）
  ✓ イベントハンドラー
```

### 2.2 コンポーネント別分類

| コンポーネント | Server / Client | 理由 |
|---|---|---|
| **レイアウト** | | |
| Header | Client | モバイルメニュー開閉、スクロール検知 |
| Footer | Server | 静的コンテンツ |
| Breadcrumb | Server | パス情報のみ |
| LanguageSwitcher | Client | ドロップダウン操作 |
| ThemeToggle | Client | テーマ切替操作 |
| **商品** | | |
| ProductGrid | Server | 商品一覧データフェッチ |
| ProductCard | Server | 静的表示（リンクのみ） |
| ProductDetail | Server | 商品データフェッチ + SEO |
| ProductGallery | Client | 画像切替インタラクション |
| ProductVariantSelector | Client | バリアント選択操作 |
| ProductPrice | Server | 静的表示 |
| RelatedProducts | Server | データフェッチ |
| **カート** | | |
| CartDrawer | Client | 開閉操作、React Query |
| CartItem | Client | 数量変更、削除 |
| CartSummary | Client | リアクティブ合計表示 |
| AddToCartButton | Client | クリックイベント、ミューテーション |
| CartIcon | Client | バッジ数のリアクティブ表示 |
| **チェックアウト** | | |
| CheckoutForm | Client | フォーム入力、バリデーション |
| ShippingAddressForm | Client | フォーム入力 |
| PaymentSection | Client | Stripe Elements |
| OrderSummary | Client | リアクティブ合計表示 |
| DemoNotice | Server | 静的テキスト |
| **検索** | | |
| SearchBar | Client | 入力、デバウンス |
| SearchResults | Server | データフェッチ |
| CategoryFilter | Client | フィルター操作、URL更新 |
| **共通** | | |
| PlaceholderImage | Server | 静的SVG表示 |
| Pagination | Client | ページ切替操作 |
| SortSelector | Client | ドロップダウン操作 |
| ScrollFadeIn | Client | IntersectionObserver |
| EmptyState | Server | 静的表示 |

### 2.3 Server / Client 境界パターン

Client Component をできるだけ小さく保ち、Server Component でデータをフェッチしてpropsで渡す。

```
推奨パターン:

  ProductDetailPage（Server）          ← データフェッチ
    ├── ProductGallery（Client）        ← 画像操作のみ
    ├── ProductInfo（Server）           ← 静的テキスト表示
    │   ├── ProductPrice（Server）
    │   └── ProductVariantSelector（Client）  ← 選択操作のみ
    └── AddToCartButton（Client）       ← ミューテーションのみ

避けるパターン:

  ProductDetailPage（Client）          ← ❌ 全体をClientにしない
    └── すべてがClient Component
```

---

## 3. コンポーネント設計パターン

### 3.1 ProductCard

商品一覧で使用するカードコンポーネント。Server Component。

```tsx
// components/product/product-card.tsx

import Link from "next/link"
import { PlaceholderImage } from "@/components/common/placeholder-image"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  locale: string
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const price = product.variants?.[0]?.calculated_price?.calculated_amount
  const currencyCode = product.variants?.[0]?.calculated_price?.currency_code

  return (
    <Link
      href={`/${locale}/products/${product.handle}`}
      className="group block"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={480}
            height={480}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage width={480} height={480} label="商品画像" />
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-body">{product.title}</h3>
        {price != null && (
          <p className="mt-1 font-mono text-base text-muted-foreground">
            {formatPrice(price, currencyCode)}
          </p>
        )}
      </div>
    </Link>
  )
}
```

**設計ポイント:**
- Server Component（リンクのみ、インタラクションなし）
- 画像ホバー: `group-hover:scale-105` で親要素のホバーに連動
- プレースホルダー画像のフォールバック付き
- 価格フォーマットは `formatPrice` ユーティリティに委譲

### 3.2 ProductGrid

商品カードのグリッドレイアウト。Server Component。

```tsx
// components/product/product-grid.tsx

import { ProductCard } from "./product-card"
import { ScrollFadeIn } from "@/components/common/scroll-fade-in"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  locale: string
}

export function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState message="商品が見つかりませんでした" />
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {products.map((product, index) => (
        <ScrollFadeIn key={product.id} delay={index * 50}>
          <ProductCard product={product} locale={locale} />
        </ScrollFadeIn>
      ))}
    </div>
  )
}
```

### 3.3 PlaceholderImage

プレースホルダー画像コンポーネント。全画像の未設定状態に使用。

```tsx
// components/common/placeholder-image.tsx

import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps {
  width: number
  height: number
  label?: string
  className?: string
}

export function PlaceholderImage({
  width,
  height,
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-secondary",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={label ?? "画像プレースホルダー"}
    >
      <ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden />
      <span className="mt-2 text-xs text-muted-foreground">
        {width} × {height}
      </span>
      {label && (
        <span className="mt-1 text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
```

### 3.4 AddToCartButton

カート追加ボタン。Client Component。楽観的更新を行う。

```tsx
// components/cart/add-to-cart-button.tsx
"use client"

import { useState } from "react"
import { ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/hooks/use-cart"
import { useTranslations } from "next-intl"

interface AddToCartButtonProps {
  variantId: string
  disabled?: boolean
}

export function AddToCartButton({ variantId, disabled }: AddToCartButtonProps) {
  const t = useTranslations("product")
  const [added, setAdded] = useState(false)
  const { mutate, isPending } = useAddToCart()

  const handleClick = () => {
    mutate(
      { variantId, quantity: 1 },
      {
        onSuccess: () => {
          setAdded(true)
          setTimeout(() => setAdded(false), 2000)
        },
      }
    )
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isPending}
      className="w-full tracking-wide uppercase"
      size="lg"
    >
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" aria-hidden />
          {t("addedToCart")}
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" aria-hidden />
          {isPending ? t("adding") : t("addToCart")}
        </>
      )}
    </Button>
  )
}
```

**設計ポイント:**
- `"use client"` を明示
- 追加後2秒間「追加しました」を表示してからリセット
- `isPending` で二重クリック防止
- 翻訳は `next-intl` の `useTranslations` フック
- ボタンテキストは `uppercase` + `tracking-wide`（design-guide準拠）

### 3.5 CartDrawer

ヘッダーから開くカートスライドパネル。Client Component。

```tsx
// components/cart/cart-drawer.tsx
"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"
import { EmptyState } from "@/components/common/empty-state"
import { useCart } from "@/hooks/use-cart"
import { useTranslations } from "next-intl"
import { ShoppingBag } from "lucide-react"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  locale: string
}

export function CartDrawer({ open, onClose, locale }: CartDrawerProps) {
  const t = useTranslations("cart")
  const { cart, isLoading } = useCart()
  const items = cart?.items ?? []

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        className="flex w-full flex-col sm:max-w-[400px] lg:max-w-[480px]"
        aria-label={t("drawerLabel")}
      >
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            {t("title")} ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            message={t("empty")}
            action={{ label: t("continueShopping"), href: `/${locale}/products` }}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <CartSummary cart={cart} locale={locale} />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
```

### 3.6 HeroBanner

トップページのヒーローセクション。Server Component。

```tsx
// components/home/hero-banner.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/common/placeholder-image"
import { getTranslations } from "next-intl/server"

interface HeroBannerProps {
  locale: string
}

export async function HeroBanner({ locale }: HeroBannerProps) {
  const t = await getTranslations("home")

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {/* 背景画像（プレースホルダー） */}
      <div className="absolute inset-0">
        <PlaceholderImage
          width={1920}
          height={600}
          label="ヒーローバナー"
          className="h-full w-full"
        />
      </div>

      {/* オーバーレイ + テキスト */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="max-w-lg">
            <h1 className="font-heading text-5xl leading-tight md:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("heroSubtitle")}
            </p>
            <Button asChild className="mt-8 uppercase tracking-wide" size="lg">
              <Link href={`/${locale}/products`}>
                {t("shopNow")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 3.7 CategoryFilter

商品一覧のカテゴリフィルター。Client Component。URLクエリパラメータで状態管理。

```tsx
// components/search/category-filter.tsx
"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/types/product"

interface CategoryFilterProps {
  categories: ProductCategory[]
  currentCategoryId?: string
}

export function CategoryFilter({
  categories,
  currentCategoryId,
}: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set("category", categoryId)
    } else {
      params.delete("category")
    }
    params.delete("offset") // フィルター変更時にページをリセット
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <nav aria-label="カテゴリフィルター">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => handleSelect(null)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm transition-colors",
              !currentCategoryId
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:bg-secondary"
            )}
          >
            すべて
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm transition-colors",
                currentCategoryId === cat.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:bg-secondary"
              )}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**設計ポイント:**
- URLクエリパラメータで状態管理（共有・ブックマーク可能）
- フィルター変更時にページネーションをリセット
- アクティブ状態はアクセントカラーで明示

### 3.8 DemoNotice

注文完了画面に表示するデモ注文の注意書き。

```tsx
// components/checkout/demo-notice.tsx

import { AlertTriangle } from "lucide-react"

export function DemoNotice() {
  return (
    <div
      className="rounded-md border border-border bg-secondary px-4 py-3"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">
            これはデモ注文です
          </p>
          <p className="mt-1">
            実際の課金は発生していません。テスト用カード番号で処理されています。
          </p>
        </div>
      </div>
    </div>
  )
}
```

### 3.9 ScrollFadeIn

スクロールインアニメーション用ラッパー。Client Component。

```tsx
// components/common/scroll-fade-in.tsx
"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollFadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollFadeIn({ children, delay = 0, className }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // prefers-reduced-motion を尊重
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReduced.matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-600 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

---

## 4. 状態管理パターン

### 4.1 概要

| 種類 | ツール | 用途 |
|---|---|---|
| サーバー状態 | Medusa SDK + React Query | 商品データ、注文データ、顧客データ |
| クライアント状態 | Zustand | カートUI（ドロワー開閉）、検索UI |
| URL状態 | useSearchParams | フィルター、ソート、ページネーション |
| フォーム状態 | React Hook Form | チェックアウトフォーム、ログインフォーム |

### 4.2 React Query プロバイダー

```tsx
// providers/query-provider.tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,     // 1分
            gcTime: 5 * 60 * 1000,    // 5分
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### 4.3 カートフック

```tsx
// hooks/use-cart.ts
"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "@/lib/medusa"
import { getCartId, setCartId } from "@/lib/cart-cookie"

const CART_QUERY_KEY = ["cart"] as const

export function useCart() {
  const cartId = getCartId()

  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => sdk.store.cart.retrieve(cartId!),
    enabled: !!cartId,
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      variantId,
      quantity,
    }: {
      variantId: string
      quantity: number
    }) => {
      let cartId = getCartId()

      // カートが無ければ作成
      if (!cartId) {
        const { cart } = await sdk.store.cart.create({})
        cartId = cart.id
        setCartId(cartId)
      }

      return sdk.store.cart.createLineItem(cartId, {
        variant_id: variantId,
        quantity,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string
      quantity: number
    }) => {
      const cartId = getCartId()!
      return sdk.store.cart.updateLineItem(cartId, itemId, { quantity })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => {
      const cartId = getCartId()!
      return sdk.store.cart.deleteLineItem(cartId, itemId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}
```

### 4.4 Zustand ストア（UI状態）

```tsx
// lib/stores/ui-store.ts
import { create } from "zustand"

interface UIState {
  isCartOpen: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openSearch: () => void
  closeSearch: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}))
```

### 4.5 カートCookie管理

```tsx
// lib/cart-cookie.ts
import Cookies from "js-cookie"

const CART_ID_KEY = "stillne_cart_id"

export function getCartId(): string | undefined {
  return Cookies.get(CART_ID_KEY)
}

export function setCartId(cartId: string): void {
  Cookies.set(CART_ID_KEY, cartId, { expires: 30, sameSite: "lax" })
}

export function removeCartId(): void {
  Cookies.remove(CART_ID_KEY)
}
```

---

## 5. 型定義パターン

### 5.1 Medusa型の拡張

Medusa SDKの型を基盤にし、フロントエンド固有の型を追加する。

```tsx
// types/product.ts
import type { StoreProduct, StoreProductCategory } from "@medusajs/types"

// Medusaの型をそのまま再エクスポート
export type Product = StoreProduct
export type ProductCategory = StoreProductCategory

// フロントエンド固有の型
export interface ProductCardProps {
  product: Product
  locale: string
}

export interface ProductGridProps {
  products: Product[]
  locale: string
}

// カスタムメタデータ（並び順等）
export interface ProductMetadata {
  sort_order?: number
  title_en?: string
  description_en?: string
}
```

```tsx
// types/cart.ts
import type { StoreCart, StoreCartLineItem } from "@medusajs/types"

export type Cart = StoreCart
export type CartItem = StoreCartLineItem

export interface AddToCartInput {
  variantId: string
  quantity: number
}
```

### 5.2 共通型

```tsx
// types/common.ts

// ページネーション
export interface PaginationParams {
  offset: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  count: number
  offset: number
  limit: number
}

// 空状態
export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  message: string
  action?: {
    label: string
    href: string
  }
}

// ソート
export type SortOrder = "created_at" | "price_asc" | "price_desc" | "title"
```

---

## 6. ユーティリティ関数

### 6.1 価格フォーマット

```tsx
// lib/format.ts

export function formatPrice(
  amount: number,
  currencyCode: string = "jpy",
  locale: string = "ja-JP"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: currencyCode === "jpy" ? 0 : 2,
  }).format(amount / 100) // Medusaは最小通貨単位で格納
}

export function formatDate(
  date: string | Date,
  locale: string = "ja-JP"
): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}
```

### 6.2 cn ユーティリティ

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 7. 翻訳パターン

### 7.1 翻訳ファイル構造

```json
// messages/ja.json
{
  "common": {
    "loading": "読み込み中...",
    "error": "エラーが発生しました",
    "retry": "再試行",
    "back": "戻る"
  },
  "home": {
    "heroTitle": "静かに佇む、美しい日用品",
    "heroSubtitle": "暮らしに溶け込む、厳選されたインテリア・雑貨",
    "shopNow": "ショップを見る",
    "newArrivals": "新着商品",
    "featured": "特集"
  },
  "product": {
    "addToCart": "カートに追加",
    "addedToCart": "追加しました",
    "adding": "追加中...",
    "outOfStock": "在庫切れ",
    "relatedProducts": "関連商品"
  },
  "cart": {
    "title": "カート",
    "empty": "カートに商品がありません",
    "continueShopping": "買い物を続ける",
    "checkout": "チェックアウトへ進む",
    "subtotal": "小計",
    "shipping": "送料",
    "total": "合計",
    "drawerLabel": "ショッピングカート"
  },
  "checkout": {
    "title": "チェックアウト",
    "shippingAddress": "配送先情報",
    "shippingMethod": "配送方法",
    "payment": "お支払い",
    "confirm": "注文を確定する",
    "success": "ご注文ありがとうございます",
    "orderNumber": "注文番号"
  },
  "account": {
    "login": "ログイン",
    "register": "新規登録",
    "logout": "ログアウト",
    "profile": "プロフィール",
    "orders": "注文履歴",
    "addresses": "住所管理"
  }
}
```

### 7.2 Server / Client での翻訳使用

```tsx
// Server Component
import { getTranslations } from "next-intl/server"

export async function ServerComponent() {
  const t = await getTranslations("home")
  return <h1>{t("heroTitle")}</h1>
}

// Client Component
"use client"
import { useTranslations } from "next-intl"

export function ClientComponent() {
  const t = useTranslations("cart")
  return <p>{t("empty")}</p>
}
```

---

## 8. 管理画面ウィジェット

Medusa Admin UIにウィジェットとして追加する4つのカスタムコンポーネント。
ストアフロントとは別のコードベース（Medusaバックエンドのプロジェクト内）に配置する。

### 8.1 ファイル配置

```
medusa-backend/
└── src/
    └── admin/
        └── widgets/
            ├── dashboard-widget.tsx         ← ① 売上・注文ダッシュボード
            ├── inventory-alert-widget.tsx   ← ② 在庫アラート
            ├── product-sort-widget.tsx      ← ③ 商品並び順管理
            └── bulk-status-widget.tsx       ← ④ 注文一括変更
```

### 8.2 ウィジェット設計方針

- Medusa Admin UIの標準スタイルに合わせる（独自のスタイリングは最小限）
- Medusaのウィジェット規約に従い `config` オブジェクトで配置先を指定
- データ取得は Medusa Admin SDK のフックを使用
- グラフは Recharts、ドラッグ&ドロップは @dnd-kit/core

### 8.3 ① ダッシュボードウィジェット概要

```tsx
// 配置先: Overview ページ
export const config = defineWidgetConfig({
  zone: "order.list.before",
})

// 表示内容:
// - 売上サマリーカード3枚（今日 / 今週 / 今月）
// - 注文数の折れ線チャート（Recharts LineChart、直近30日）
// - ステータス内訳の円グラフ（Recharts PieChart）
// - 直近5件の注文クイックリスト
```

### 8.4 ② 在庫アラートウィジェット概要

```tsx
// 配置先: Product List ページ上部
export const config = defineWidgetConfig({
  zone: "product.list.before",
})

// 表示内容:
// - 閾値以下の商品を警告リスト表示
// - 在庫0は赤、閾値以下は黄色
// - 閾値設定（デフォルト5）
// - 商品名クリックで編集ページへ遷移
```

### 8.5 ③ 商品並び順ウィジェット概要

```tsx
// 配置先: Product List ページ
export const config = defineWidgetConfig({
  zone: "product.list.before",
})

// 表示内容:
// - ドラッグ&ドロップで並び替え（@dnd-kit/core）
// - metadata.sort_order を更新
// - 「トップページ特集に追加」トグル
// - 保存ボタンで一括更新
```

### 8.6 ④ 注文一括変更ウィジェット概要

```tsx
// 配置先: Order List ページ
export const config = defineWidgetConfig({
  zone: "order.list.before",
})

// 表示内容:
// - チェックボックスで複数注文選択
// - 一括ステータス変更ドロップダウン
// - 確認ダイアログ
// - 進捗バー + 結果サマリー
```

---

## 9. ローディング・エラーパターン

### 9.1 ローディング（loading.tsx）

```tsx
// app/[locale]/products/loading.tsx

import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/3" />
        </div>
      ))}
    </div>
  )
}
```

### 9.2 エラー（error.tsx）

```tsx
// app/[locale]/products/error.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function ProductsError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const t = useTranslations("common")

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-muted-foreground">{t("error")}</p>
      <Button onClick={reset} variant="outline" className="mt-4">
        {t("retry")}
      </Button>
    </div>
  )
}
```

### 9.3 空状態

```tsx
// components/common/empty-state.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { EmptyStateProps } from "@/types/common"

export function EmptyState({ icon: Icon, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon className="mb-4 h-12 w-12 text-muted-foreground" aria-hidden />}
      <p className="text-muted-foreground">{message}</p>
      {action && (
        <Button asChild variant="outline" className="mt-4">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
```

---

## 10. コンポーネント品質チェックリスト

新規コンポーネント作成時に確認する項目:

- [ ] Server / Client の判定は適切か
- [ ] `"use client"` は必要な場合のみ付与しているか
- [ ] Props に適切な型定義があるか（`interface` + named export）
- [ ] 翻訳キーを使用しているか（ハードコードされた日本語テキストがないか）
- [ ] `next/image` を使用しているか（`<img>` 禁止）
- [ ] プレースホルダー画像のフォールバックがあるか
- [ ] aria属性が適切に設定されているか
- [ ] キーボード操作が可能か
- [ ] `prefers-reduced-motion` を尊重しているか
- [ ] レスポンシブ対応しているか（モバイルファースト）
- [ ] design-guide のカラー変数・フォント・スペーシングを使用しているか
- [ ] エラー状態と空状態のハンドリングがあるか
