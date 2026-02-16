# stillne — コーディング規約

Medusa v2 + Next.js（App Router）+ TypeScript で構築するECストアフロントのコーディング規約。
一貫性のあるコードベースを維持し、Claude Codeによるコード生成の品質を担保する。

---

## 1. TypeScript

### 1.1 基本設定

```json
// tsconfig.json（主要な設定のみ抜粋）
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": false,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 1.2 型定義ルール

**interface vs type:**
- オブジェクトの形状定義 → `interface`（拡張可能、エラーメッセージが明確）
- ユニオン型・交差型・ユーティリティ型 → `type`

```tsx
// ✅ 良い例
interface ProductCardProps {
  product: Product
  locale: string
}

type SortOrder = "created_at" | "price_asc" | "price_desc"
type WithLocale<T> = T & { locale: string }

// ❌ 悪い例
type ProductCardProps = {  // objectにはinterfaceを使う
  product: Product
  locale: string
}
```

**型の配置:**
- コンポーネントのProps → 同一ファイル内で定義
- 複数ファイルで共有する型 → `types/` ディレクトリ
- Medusa SDKの型 → `@medusajs/types` から再エクスポート

**禁止事項:**
- `any` の使用禁止 → `unknown` を使い、型ガードで絞り込む
- `@ts-ignore` の使用禁止 → やむを得ない場合のみ `@ts-expect-error` + 理由コメント
- Non-null assertion (`!`) の使用禁止 → optional chaining (`?.`) と nullish coalescing (`??`) を使う

```tsx
// ✅ 良い例
function getPrice(variant: ProductVariant | undefined): number {
  return variant?.calculated_price?.calculated_amount ?? 0
}

// ❌ 悪い例
function getPrice(variant: any): number {
  return variant!.calculated_price!.calculated_amount
}
```

### 1.3 ジェネリクスの使用

```tsx
// API レスポンスのラッパー
interface ApiResponse<T> {
  data: T
  count: number
  offset: number
  limit: number
}

// フック内での使用
function usePaginatedQuery<T>(
  queryKey: string[],
  fetcher: (params: PaginationParams) => Promise<ApiResponse<T>>,
  params: PaginationParams
) {
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => fetcher(params),
  })
}
```

### 1.4 型ガードパターン

```tsx
// Medusa のレスポンスで型を絞り込む
function hasVariants(product: Product): product is Product & { variants: ProductVariant[] } {
  return Array.isArray(product.variants) && product.variants.length > 0
}

// unknown型の安全な処理
function isApiError(error: unknown): error is { message: string; status: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  )
}
```

---

## 2. Next.js App Router

### 2.1 Server Components（デフォルト）

すべてのコンポーネントはデフォルトでServer Component。`"use client"` はインタラクションが必要な場合のみ付与する。

**Server Components で行うこと:**
- Medusa SDK を使ったデータフェッチ
- メタデータ生成（`generateMetadata`）
- 翻訳の取得（`getTranslations`）
- 静的コンテンツのレンダリング

**Server Components で行わないこと:**
- `useState`, `useEffect` 等のフックの使用
- イベントハンドラーの定義
- ブラウザAPIの使用

```tsx
// ✅ Server Component（デフォルト）
import { sdk } from "@/lib/medusa"
import { ProductGrid } from "@/components/product/product-grid"

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const { products } = await sdk.store.product.list({
    limit: 12,
    fields: "+variants.calculated_price",
  })

  return <ProductGrid products={products} locale={locale} />
}
```

### 2.2 Client Components

`"use client"` ディレクティブを使用。可能な限り小さく保つ。

```tsx
// ✅ Client Component は最小限に
"use client"

import { useState } from "react"

// このコンポーネントだけがClient
export function QuantitySelector({ initial, onChange }: QuantitySelectorProps) {
  const [qty, setQty] = useState(initial)
  // ...
}
```

### 2.3 メタデータ

各ページに `generateMetadata` を実装する。

```tsx
// app/[locale]/products/[handle]/page.tsx
import type { Metadata } from "next"
import { sdk } from "@/lib/medusa"

export async function generateMetadata({
  params: { handle, locale },
}: {
  params: { handle: string; locale: string }
}): Promise<Metadata> {
  const { product } = await sdk.store.product.retrieve(handle)

  return {
    title: `${product.title} | stillne`,
    description: product.description ?? undefined,
    openGraph: {
      title: product.title,
      description: product.description ?? undefined,
      images: product.thumbnail ? [product.thumbnail] : [],
      type: "website",
    },
    alternates: {
      languages: {
        ja: `/ja/products/${handle}`,
        en: `/en/products/${handle}`,
      },
    },
  }
}
```

### 2.4 ルーティング規約

| パターン | 用途 |
|---|---|
| `page.tsx` | ルートのUI |
| `layout.tsx` | 共有レイアウト（再レンダリングなし） |
| `loading.tsx` | ストリーミング中のUI（Skeleton表示） |
| `error.tsx` | エラーバウンダリ |
| `not-found.tsx` | 404 UI |
| `[param]` | 動的ルート |
| `[locale]` | i18nルーティング |

**すべてのデータフェッチを行うルートセグメントに `loading.tsx` と `error.tsx` を配置すること。**

### 2.5 ページ間のデータ受け渡し

- Server Component → Client Component: props で渡す
- ページ間: URLクエリパラメータ or Cookie
- グローバル状態: Zustand（UIのみ）、React Query（サーバーデータ）

URL経由のデータ受け渡しを優先する。フィルター、ソート、ページネーションはすべてURL params。

```tsx
// ✅ URLクエリパラメータで状態管理
// /products?category=cat_123&sort=price_asc&offset=12
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; offset?: string }
}) {
  const offset = Number(searchParams.offset) || 0
  const { products } = await sdk.store.product.list({
    category_id: searchParams.category ? [searchParams.category] : undefined,
    order: searchParams.sort === "price_asc" ? "variants.prices.amount" : "-created_at",
    limit: 12,
    offset,
  })
  // ...
}
```

---

## 3. Medusa SDK

### 3.1 SDK初期化

```tsx
// lib/medusa.ts
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  auth: {
    type: "session",
  },
})
```

- SDK初期化は `lib/medusa.ts` の1箇所のみ
- 他のファイルからは `import { sdk } from "@/lib/medusa"` で使用
- 直接 `fetch()` でMedusa APIを呼ばない（SDKが型安全に処理する）

### 3.2 Server Component での使用

```tsx
// ✅ async/await で直接呼び出す
const { products } = await sdk.store.product.list({ limit: 12 })

// ❌ useEffect + fetch で呼び出さない
```

### 3.3 Client Component での使用

React Query のフック経由で使用する。直接SDKを呼ばない。

```tsx
// ✅ フック経由
const { mutate: addToCart } = useAddToCart()
addToCart({ variantId: "variant_123", quantity: 1 })

// ❌ コンポーネント内で直接SDK呼び出し
const result = await sdk.store.cart.createLineItem(...)  // Client Componentでは非推奨
```

### 3.4 エラーハンドリング

```tsx
// Medusa APIエラーの型
interface MedusaError {
  type: string
  message: string
  code?: string
}

// Server Componentでのエラーハンドリング
export default async function ProductPage({ params }: { params: { handle: string } }) {
  try {
    const { product } = await sdk.store.product.retrieve(params.handle)
    return <ProductDetail product={product} />
  } catch (error) {
    notFound() // 404として処理
  }
}

// Client Componentでのエラーハンドリング（React Query）
const { mutate, error } = useAddToCart()
// error は React Query が自動管理。UI側で error を表示する
```

---

## 4. スタイリング

### 4.1 Tailwind CSS ルール

**基本方針:**
- すべてのスタイリングはTailwind CSSのユーティリティクラスで行う
- インラインスタイル（`style={}`）は動的な値が必要な場合のみ許可
- カスタムCSSは `globals.css` のCSS変数定義のみ
- `@apply` は使用しない（コンポーネントの再利用で代替する）

```tsx
// ✅ Tailwindユーティリティクラス
<div className="flex items-center gap-4 rounded-md border border-border p-4">

// ❌ インラインスタイル
<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

// ❌ @apply
// globals.css で .card { @apply flex items-center gap-4; } しない
```

**条件付きスタイリング:**

```tsx
import { cn } from "@/lib/utils"

<button
  className={cn(
    "rounded-md px-4 py-2 text-sm transition-colors",
    isActive
      ? "border-accent bg-accent text-accent-foreground"
      : "border-border hover:bg-secondary"
  )}
>
```

### 4.2 shadcn/ui ルール

- コンポーネントは `components/ui/` に配置（`npx shadcn@latest add` で追加）
- カスタマイズは `className` prop で上書きする
- `components/ui/` 内のソースファイルは直接編集しない
- Radix UIのプリミティブを直接使用しない（shadcn/uiのラッパーを使う）

```tsx
// ✅ className で上書き
<Button className="w-full uppercase tracking-wide" size="lg">

// ❌ components/ui/button.tsx を直接編集しない
```

### 4.3 レスポンシブ記述順序

モバイルファーストで、小さい方から大きい方へ記述する。

```tsx
// ✅ モバイル → タブレット → デスクトップ
<div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">

// ❌ 順序がバラバラ
<div className="lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
```

### 4.4 デザイントークンの使用

design-guide.md で定義されたCSS変数を使用する。ハードコードされた色値は使わない。

```tsx
// ✅ CSS変数経由
<div className="bg-background text-foreground">
<span className="text-muted-foreground">
<div className="border-border">

// ❌ ハードコード
<div className="bg-[#FAFAF8] text-[#272524]">
```

---

## 5. 多言語対応（next-intl）

### 5.1 基本設定

```tsx
// i18n/request.ts
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default,
}))
```

```tsx
// middleware.ts
import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["ja", "en"],
  defaultLocale: "ja",
})

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
```

### 5.2 翻訳ルール

- すべてのUI文言は翻訳キーで管理する。ハードコードされた日本語テキスト禁止
- Server Componentでは `getTranslations`、Client Componentでは `useTranslations`
- 翻訳キーはドット区切りのネスト構造（`"cart.empty"`, `"product.addToCart"`）
- 動的な値はICU MessageFormat で埋め込む

```tsx
// messages/ja.json
{
  "cart": {
    "itemCount": "{count, plural, =0 {カートは空です} one {1点} other {{count}点}}"
  }
}

// 使用
t("cart.itemCount", { count: items.length })
```

### 5.3 商品データの多言語化

Medusaの商品データは `metadata` フィールドで英語テキストを管理する。

```tsx
// 商品名の言語切替
function getLocalizedTitle(product: Product, locale: string): string {
  if (locale === "en" && product.metadata?.title_en) {
    return product.metadata.title_en as string
  }
  return product.title
}

// 商品説明の言語切替
function getLocalizedDescription(product: Product, locale: string): string {
  if (locale === "en" && product.metadata?.description_en) {
    return product.metadata.description_en as string
  }
  return product.description ?? ""
}
```

---

## 6. エラーハンドリング

### 6.1 エラー階層

```
グローバルエラー        → app/global-error.tsx（最終防衛線）
ルートエラー            → app/[locale]/error.tsx（ロケール内の汎用エラー）
ページエラー            → app/[locale]/products/error.tsx（ページ固有エラー）
コンポーネントエラー    → try-catch + ErrorBoundary（部分的な失敗）
APIエラー              → React Query の error 状態（自動管理）
フォームエラー         → React Hook Form のバリデーション
```

### 6.2 エラーUI方針

- ユーザーにはフレンドリーなメッセージを表示する（技術的な詳細は非表示）
- 「再試行」ボタンを必ず提供する
- 404 の場合は `notFound()` を使い、`not-found.tsx` で処理する
- サーバーサイドのエラー詳細は `console.error` でログに出す（本番では監視ツールへ）

### 6.3 フォームバリデーション

React Hook Form + Zod を使用する。

```tsx
// schemas/checkout.ts
import { z } from "zod"

export const shippingAddressSchema = z.object({
  lastName: z.string().min(1, "姓を入力してください"),
  firstName: z.string().min(1, "名を入力してください"),
  postalCode: z.string().regex(/^\d{3}-?\d{4}$/, "正しい郵便番号を入力してください"),
  prefecture: z.string().min(1, "都道府県を選択してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  address1: z.string().min(1, "番地を入力してください"),
  address2: z.string().optional(),
  phone: z.string().regex(/^0\d{9,10}$/, "正しい電話番号を入力してください").optional(),
})

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>
```

```tsx
// components/checkout/shipping-address-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { shippingAddressSchema, type ShippingAddressInput } from "@/schemas/checkout"

export function ShippingAddressForm({ onSubmit }: { onSubmit: (data: ShippingAddressInput) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressInput>({
    resolver: zodResolver(shippingAddressSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="lastName" className="text-sm">姓</label>
        <input
          id="lastName"
          {...register("lastName")}
          className="w-full border-b border-border bg-transparent py-2 focus:border-accent focus:outline-none"
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
        />
        {errors.lastName && (
          <p id="lastName-error" className="mt-1 text-sm text-destructive" role="alert">
            {errors.lastName.message}
          </p>
        )}
      </div>
      {/* ... 他のフィールド */}
    </form>
  )
}
```

---

## 7. パフォーマンス

### 7.1 Core Web Vitals 目標

| 指標 | 目標値 | 主要な対策 |
|---|---|---|
| LCP | < 2.5s | Server Components、next/image、priority属性 |
| FID / INP | < 100ms | Client Componentの最小化、コード分割 |
| CLS | < 0.1 | 画像のwidth/height指定、Skeleton UI |

### 7.2 画像最適化

```tsx
// ✅ next/image を使用（width/height 必須）
import Image from "next/image"

<Image
  src={product.thumbnail}
  alt={product.title}
  width={480}
  height={480}
  className="h-full w-full object-cover"
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// ファーストビューの画像のみ priority
<Image src={heroImage} alt="..." width={1920} height={600} priority />

// ❌ 素のimg要素
<img src={product.thumbnail} />
```

### 7.3 コード分割

```tsx
import dynamic from "next/dynamic"

// ファーストビューに不要なコンポーネントを遅延読み込み
const CartDrawer = dynamic(() =>
  import("@/components/cart/cart-drawer").then((mod) => ({ default: mod.CartDrawer })),
  { ssr: false }
)

const RelatedProducts = dynamic(() =>
  import("@/components/product/related-products").then((mod) => ({ default: mod.RelatedProducts }))
)
```

**遅延読み込み対象:**
- CartDrawer（ユーザー操作で初めて表示）
- MobileMenu（モバイルのみ）
- 商品詳細の RelatedProducts（ページ下部）
- 検索モーダル

### 7.4 インポート最適化

```tsx
// ✅ 個別インポート
import { ShoppingBag } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

// ❌ パッケージ全体のインポート
import * as Icons from "lucide-react"
import * as ReactQuery from "@tanstack/react-query"
```

### 7.5 React Query キャッシュ戦略

```tsx
// 商品一覧: 1分間キャッシュ（頻繁に変わらない）
useQuery({
  queryKey: ["products", params],
  staleTime: 60 * 1000,
})

// カート: キャッシュなし（常に最新を取得）
useQuery({
  queryKey: ["cart"],
  staleTime: 0,
})

// カテゴリ一覧: 5分間キャッシュ（ほぼ変わらない）
useQuery({
  queryKey: ["categories"],
  staleTime: 5 * 60 * 1000,
})
```

---

## 8. テスト

### 8.1 テスト戦略

| レイヤー | ツール | 対象 | カバレッジ目標 |
|---|---|---|---|
| ユニットテスト | Vitest + Testing Library | ユーティリティ関数、フック、コンポーネント | 主要ロジック |
| E2Eテスト | Playwright | 購買フロー、認証フロー | クリティカルパス |

### 8.2 テストファイル配置

```
src/
├── components/
│   └── cart/
│       ├── add-to-cart-button.tsx
│       └── add-to-cart-button.test.tsx    ← コンポーネントと同階層
├── hooks/
│   ├── use-cart.ts
│   └── use-cart.test.ts
├── lib/
│   ├── format.ts
│   └── format.test.ts
└── e2e/                                   ← E2Eテストは別ディレクトリ
    ├── purchase-flow.spec.ts
    ├── auth-flow.spec.ts
    └── fixtures/
        └── test-data.ts
```

### 8.3 ユニットテストの書き方

```tsx
// lib/format.test.ts
import { describe, it, expect } from "vitest"
import { formatPrice } from "./format"

describe("formatPrice", () => {
  it("JPYを通貨フォーマットで表示する", () => {
    expect(formatPrice(300000, "jpy", "ja-JP")).toBe("¥3,000")
  })

  it("USDを通貨フォーマットで表示する", () => {
    expect(formatPrice(2999, "usd", "en-US")).toBe("$29.99")
  })

  it("0円を正しく表示する", () => {
    expect(formatPrice(0, "jpy", "ja-JP")).toBe("¥0")
  })
})
```

```tsx
// components/cart/add-to-cart-button.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddToCartButton } from "./add-to-cart-button"

// Medusa SDKをモック
vi.mock("@/lib/medusa", () => ({
  sdk: {
    store: {
      cart: {
        createLineItem: vi.fn().mockResolvedValue({ cart: { items: [] } }),
      },
    },
  },
}))

describe("AddToCartButton", () => {
  it("クリックで「追加しました」に変わる", async () => {
    const user = userEvent.setup()
    render(<AddToCartButton variantId="variant_123" />)

    await user.click(screen.getByRole("button"))
    expect(screen.getByText("追加しました")).toBeInTheDocument()
  })

  it("disabled時はクリックできない", () => {
    render(<AddToCartButton variantId="variant_123" disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
```

### 8.4 テストの原則

- ユーザーの行動をテストする（実装の詳細はテストしない）
- `data-testid` は E2E テスト用のセレクターとしてのみ使用する
- Medusa SDK はモジュールレベルでモックする（テストごとではなく）
- スナップショットテストは使用しない（メンテナンスコストが高い）

### 8.5 E2Eテスト

```tsx
// e2e/purchase-flow.spec.ts
import { test, expect } from "@playwright/test"

test.describe("購買フロー", () => {
  test("商品をカートに追加してチェックアウトできる", async ({ page }) => {
    // 1. トップページにアクセス
    await page.goto("/ja")
    await expect(page).toHaveTitle(/stillne/)

    // 2. 商品一覧へ遷移
    await page.click('a[href*="/products"]')

    // 3. 最初の商品をクリック
    await page.click('[data-testid="product-card"]:first-child')

    // 4. カートに追加
    await page.click('[data-testid="add-to-cart"]')
    await expect(page.getByText("追加しました")).toBeVisible()

    // 5. カートページへ
    await page.click('[data-testid="cart-icon"]')
    await page.click('a[href*="/cart"]')

    // 6. チェックアウトへ
    await page.click('[data-testid="checkout-button"]')

    // 7. 配送先入力
    await page.fill('[name="lastName"]', "テスト")
    await page.fill('[name="firstName"]', "太郎")
    await page.fill('[name="postalCode"]', "100-0001")
    // ... 残りのフィールド

    // 8. Stripeテスト決済
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]')
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242")
    // ... 有効期限、CVC

    // 9. 注文確定
    await page.click('[data-testid="confirm-order"]')

    // 10. 注文完了を確認
    await expect(page.getByText("ご注文ありがとうございます")).toBeVisible()
    await expect(page.getByText("これはデモ注文です")).toBeVisible()
  })
})
```

**E2Eテスト対象（クリティカルパス）:**
- 購買フロー: 商品閲覧 → カート追加 → チェックアウト → 注文完了
- 認証フロー: 新規登録 → ログイン → マイページ → ログアウト
- カート操作: 追加 → 数量変更 → 削除
- レスポンシブ: モバイル（375px）とデスクトップ（1280px）の両方

---

## 9. Git運用

### 9.1 ブランチ戦略

```
main                    ← 本番（自動デプロイ）
├── develop             ← 開発統合ブランチ
│   ├── feat/product-list      ← 機能開発
│   ├── feat/cart-drawer
│   ├── fix/price-format       ← バグ修正
│   └── chore/update-deps      ← 保守作業
```

- `main` ブランチは直接pushしない（PRマージのみ）
- 機能ブランチは `develop` から分岐し、`develop` にマージする
- リリース時に `develop` → `main` にマージする

### 9.2 コミットメッセージ

Conventional Commits 形式を使用する。

```
<type>(<scope>): <description>

type:
  feat     新機能
  fix      バグ修正
  style    スタイル変更（コードの動作に影響しない）
  refactor リファクタリング
  test     テスト追加・修正
  chore    ビルド・設定変更
  docs     ドキュメント変更

scope（任意）:
  product, cart, checkout, account, admin, layout, i18n, config

例:
  feat(cart): add cart drawer component
  fix(product): fix price format for JPY
  style(layout): adjust header spacing on mobile
  chore(config): update tailwind config for custom fonts
```

### 9.3 PRルール

- PRのタイトルはConventional Commits形式にする
- 変更内容の概要と動作確認手順を記載する
- スクリーンショット（UIの変更がある場合）を添付する
- Vercel Preview デプロイで動作確認する

---

## 10. 環境変数

### 10.1 環境変数一覧

```env
# .env.local（ローカル開発用）

# Medusa Backend
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Stripe（テストモード専用）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# next-intl
NEXT_PUBLIC_DEFAULT_LOCALE=ja

# Siteメタデータ
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=stillne
```

### 10.2 環境変数ルール

- `NEXT_PUBLIC_` プレフィックス: クライアントに公開される値のみ
- シークレットキー（`STRIPE_SECRET_KEY` 等）は `NEXT_PUBLIC_` を付けない
- `.env.local` は `.gitignore` に含める（コミットしない）
- `.env.example` をリポジトリに含め、必要な変数名のみ記載する
- ハードコードされたURL・キーは禁止

---

## 11. ディレクトリ内のインポート順序

ファイル内のインポートは以下の順序で記述する。グループ間に空行を入れる。

```tsx
// 1. React / Next.js
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// 2. 外部ライブラリ
import { useQuery } from "@tanstack/react-query"
import { ShoppingBag } from "lucide-react"

// 3. 内部モジュール（@/ エイリアス）
import { sdk } from "@/lib/medusa"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/format"

// 4. コンポーネント
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"

// 5. 型（type import）
import type { Product } from "@/types/product"
```

---

## 12. 禁止パターン一覧

コード生成時に絶対に避けるべきパターン。

| # | 禁止事項 | 代替 |
|---|---|---|
| 1 | `any` 型の使用 | `unknown` + 型ガード |
| 2 | `@ts-ignore` | `@ts-expect-error` + 理由 |
| 3 | Non-null assertion (`!`) | `?.` と `??` |
| 4 | `<img>` 要素 | `next/image` |
| 5 | インラインスタイル（`style={}`） | Tailwind CSSクラス |
| 6 | ハードコードされた色値 | CSS変数（`bg-background` 等） |
| 7 | ハードコードされた日本語テキスト | 翻訳キー（`t("key")`） |
| 8 | `console.log` in production | 適切なロギング or 削除 |
| 9 | `.env` ファイルのコミット | `.gitignore` に追加 |
| 10 | ハードコードされたURL | 環境変数 |
| 11 | `useEffect` でのデータフェッチ（Server Componentで可能な場合） | Server Componentでawait |
| 12 | バレルエクスポート（`index.ts`） | 直接インポート |
| 13 | `outline: none` without replacement | `focus-visible` スタイル |
| 14 | Medusa APIへの直接fetch | Medusa JS SDK |
| 15 | `default export`（ページ・レイアウト以外） | named export |
