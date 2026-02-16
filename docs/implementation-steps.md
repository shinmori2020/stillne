# stillne — 実装ステップガイド

Claude Codeへの作業指示書。各ステップを順番に指示し、完了条件を確認してから次に進む。

---

## 進め方

1. 各ステップの「指示文」をClaude Codeにそのまま貼り付ける
2. 完了後「確認コマンド」を実行して結果を確認する
3. 問題なければ次のステップへ進む
4. 問題があればその場で修正してから次へ

---

## Phase 1: プロジェクト初期化（Step 1〜8）

### Step 1: Next.js プロジェクト作成

**指示文:**
```
Next.js 15 のプロジェクトを作成してください。
- プロジェクト名: stillne
- App Router を使用
- TypeScript を使用
- Tailwind CSS を使用
- src/ ディレクトリを使用
- import alias は @/* → ./src/*
- ESLint を有効化
```

**完了条件:**
- `stillne/` ディレクトリが作成されている
- `npm run dev` でローカルサーバーが起動する
- `http://localhost:3000` にアクセスしてNext.jsのデフォルトページが表示される

---

### Step 2: 依存パッケージのインストール

**指示文:**
```
以下のパッケージをインストールしてください。

本番依存:
- @medusajs/js-sdk（Medusa SDK）
- @tanstack/react-query（サーバー状態管理）
- zustand（クライアントUI状態）
- next-intl（多言語対応）
- next-themes（ダークモード）
- react-hook-form（フォーム管理）
- @hookform/resolvers（Zod連携）
- zod（スキーマバリデーション）
- js-cookie（Cookie管理）
- @stripe/stripe-js（Stripe フロントエンド）
- @stripe/react-stripe-js（Stripe React）
- lucide-react（アイコン）
- clsx（条件付きクラス名）
- tailwind-merge（Tailwind クラスマージ）

開発依存:
- @types/js-cookie
- vitest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- @vitejs/plugin-react
- jsdom
- @playwright/test
```

**完了条件:**
- `package.json` に全パッケージが記載されている
- `npm ls` でエラーが出ない

---

### Step 3: TypeScript 設定の強化

**指示文:**
```
tsconfig.json を以下の設定に更新してください。
docs/coding-guide.md のTypeScriptセクションに準拠します。

追加する設定:
- strict: true（すでにあるはず）
- noUncheckedIndexedAccess: true
- noImplicitReturns: true
- noFallthroughCasesInSwitch: true

paths のエイリアス @/* → ./src/* が設定されていることを確認してください。
```

**完了条件:**
- `npx tsc --noEmit` でエラーが出ない

---

### Step 4: Tailwind CSS + フォント設定

**指示文:**
```
docs/design-guide.md に基づいて Tailwind CSS とフォントを設定してください。

1. tailwind.config.ts に以下を追加:
   - fontFamily の拡張: heading, body, ja, mono
   - borderRadius のカスタム値

2. src/app/fonts.ts を作成:
   - Cormorant_Garamond（heading: 400, 500, 600）
   - Source_Sans_3（body: 300, 400, 500）
   - Noto_Sans_JP（ja: 300, 400, 500, 700）
   - JetBrains_Mono（mono: 400）
   - すべて next/font/google から、variable プロパティ付き、display: "swap"

3. src/app/globals.css を更新:
   - design-guide.md セクション2.1 のCSS変数定義（:root と .dark）をそのまま記述
   - カスタムトークン（--success, --success-foreground）も含める
   - prefers-reduced-motion の無効化ルールを追加
   - html に font-body を適用

フォント変数名:
  --font-heading, --font-body, --font-ja, --font-mono
```

**完了条件:**
- `npm run dev` でエラーなく起動する
- ブラウザで確認: 背景色がオフホワイト（#FAFAF8）になっている
- DevTools で CSS変数 `--background`, `--accent` 等が定義されている

---

### Step 5: shadcn/ui 初期化 + 基本コンポーネント追加

**指示文:**
```
shadcn/ui を初期化して、基本コンポーネントを追加してください。

1. shadcn/ui を初期化:
   - style: default
   - base color: 手動設定済み（globals.css のCSS変数を使用）
   - CSS variables: yes
   - コンポーネント配置先: src/components/ui

2. 以下のコンポーネントを追加:
   - button
   - input
   - select
   - sheet（カートドロワー用）
   - dialog
   - dropdown-menu
   - badge
   - skeleton
   - toast（sonner）
   - separator
   - form（react-hook-form連携）
```

**完了条件:**
- `src/components/ui/` に各コンポーネントファイルが存在する
- `npm run build` がエラーなく完了する

---

### Step 6: ユーティリティ関数の作成

**指示文:**
```
docs/component-patterns.md と coding-guide.md に基づいて、
以下のユーティリティファイルを作成してください。

1. src/lib/utils.ts
   - cn() 関数（clsx + tailwind-merge）

2. src/lib/format.ts
   - formatPrice(amount, currencyCode, locale) — Medusaの最小通貨単位から表示用にフォーマット
   - formatDate(date, locale) — Intl.DateTimeFormat で日付フォーマット

3. src/lib/constants.ts
   - SITE_NAME = "stillne"
   - DEFAULT_LOCALE = "ja"
   - SUPPORTED_LOCALES = ["ja", "en"]
   - PRODUCTS_PER_PAGE = 12
   - CART_COOKIE_KEY = "stillne_cart_id"
   - CART_COOKIE_EXPIRY = 30（日）
   - INVENTORY_ALERT_THRESHOLD = 5

4. src/lib/medusa.ts
   - Medusa SDK の初期化（シングルトン）
   - baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
   - auth: { type: "session" }

5. src/lib/cart-cookie.ts
   - getCartId(): string | undefined
   - setCartId(cartId: string): void
   - removeCartId(): void
   - js-cookie を使用、sameSite: "lax"

すべてのファイルに適切なTypeScript型を付けてください。
```

**完了条件:**
- `npx tsc --noEmit` でエラーが出ない
- 各ファイルに named export がある

---

### Step 7: 型定義ファイルの作成

**指示文:**
```
docs/component-patterns.md のセクション5に基づいて、型定義ファイルを作成してください。

1. src/types/product.ts
   - Product, ProductCategory, ProductCollection を @medusajs/types から再エクスポート
   - ProductCardProps, ProductGridProps のインターフェース
   - ProductMetadata インターフェース（sort_order, title_en, description_en）

2. src/types/cart.ts
   - Cart, CartItem を @medusajs/types から再エクスポート
   - AddToCartInput インターフェース

3. src/types/order.ts
   - Order を @medusajs/types から再エクスポート

4. src/types/customer.ts
   - Customer を @medusajs/types から再エクスポート

5. src/types/common.ts
   - PaginationParams インターフェース
   - PaginatedResponse<T> インターフェース
   - EmptyStateProps インターフェース
   - SortOrder type

注意: @medusajs/types から型がうまくインポートできない場合は、
Medusa SDKのレスポンス型を使うか、独自に定義してください。
その旨をコメントで残してください。
```

**完了条件:**
- `npx tsc --noEmit` でエラーが出ない

---

### Step 8: next-intl 設定 + 翻訳ファイル

**指示文:**
```
docs/coding-guide.md セクション5 と component-patterns.md セクション7 に基づいて、
next-intl の多言語対応を設定してください。

1. src/i18n/request.ts — getRequestConfig の設定

2. src/middleware.ts — next-intl のミドルウェア
   - locales: ["ja", "en"]
   - defaultLocale: "ja"
   - matcher で api, _next, 静的ファイルを除外

3. src/messages/ja.json — 日本語翻訳ファイル
   component-patterns.md セクション7.1 の内容をそのまま使用してください。
   以下のネームスペースを含む:
   - common, home, product, cart, checkout, account

4. src/messages/en.json — 英語翻訳ファイル
   ja.json と同じ構造で英語テキストを設定してください。

5. src/app/[locale]/layout.tsx — ロケール別レイアウト
   - NextIntlClientProvider でラップ
   - lang属性を html タグに設定
   - フォントのCSS変数クラスを body に適用

6. next.config.ts に next-intl プラグイン設定を追加
```

**完了条件:**
- `npm run dev` でエラーなく起動する
- `http://localhost:3000/ja` にアクセスできる
- `http://localhost:3000/en` にアクセスできる

---

## Phase 2: 共通コンポーネント（Step 9〜14）

### Step 9: PlaceholderImage コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.3 のコードをベースに、
PlaceholderImage コンポーネントを作成してください。

ファイル: src/components/common/placeholder-image.tsx

仕様:
- Server Component（"use client" 不要）
- Props: width, height, label?, className?
- 背景: bg-secondary
- 中央に Lucide の ImageIcon（w-8 h-8, text-muted-foreground）
- アイコン下にサイズ表記（"480 × 480"）
- label がある場合はさらにその下に表示
- role="img" と aria-label を設定
- aspect-ratio をインラインスタイルで設定
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 10: EmptyState + PageHeader コンポーネント

**指示文:**
```
以下の汎用コンポーネントを作成してください。

1. src/components/common/empty-state.tsx
   - component-patterns.md セクション9.3 のコードをベースに実装
   - Server Component
   - Props: icon?, message, action? (label + href)
   - 中央揃え、アイコン + メッセージ + オプションのリンクボタン

2. src/components/common/page-header.tsx
   - Server Component
   - Props: title, description?
   - ページのタイトルとオプションの説明文を表示
   - font-heading で見出し、text-muted-foreground で説明文
```

**完了条件:**
- 各ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 11: ScrollFadeIn コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.9 のコードをベースに、
ScrollFadeIn コンポーネントを作成してください。

ファイル: src/components/common/scroll-fade-in.tsx

仕様:
- Client Component（"use client"）
- Props: children, delay?, className?
- IntersectionObserver で画面に入ったらフェードイン
- prefers-reduced-motion: reduce の場合はアニメーションをスキップ
- translate-y-4 → translate-y-0, opacity-0 → opacity-100
- duration: 600ms, ease-out
- delay は transitionDelay スタイルで設定
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 12: Providers（QueryProvider + ThemeProvider + CartProvider）

**指示文:**
```
アプリ全体で使用するプロバイダーを作成してください。

1. src/providers/query-provider.tsx
   - Client Component
   - component-patterns.md セクション4.2 のコードをベースに
   - defaultOptions: staleTime 60s, gcTime 5min, refetchOnWindowFocus false

2. src/providers/theme-provider.tsx
   - Client Component
   - next-themes の ThemeProvider をラップ
   - attribute="class", defaultTheme="system", enableSystem=true

3. src/providers/cart-provider.tsx
   - Client Component
   - カートの初期化と状態を管理するコンテキスト
   - CartDrawer の開閉状態をZustandで管理

4. src/app/[locale]/layout.tsx を更新:
   - QueryProvider, ThemeProvider で children をラップ
   - ラップ順: ThemeProvider → QueryProvider → children
```

**完了条件:**
- `npm run dev` でエラーなく起動する
- React QueryのDevtoolsが表示される（開発モード）

---

### Step 13: Zustand UIストア

**指示文:**
```
docs/component-patterns.md セクション4.4 のコードをベースに、
UI状態管理のZustandストアを作成してください。

ファイル: src/lib/stores/ui-store.ts

管理する状態:
- isCartOpen: boolean（カートドロワーの開閉）
- isMobileMenuOpen: boolean（モバイルメニューの開閉）
- isSearchOpen: boolean（検索モーダルの開閉）

アクション:
- openCart, closeCart
- toggleMobileMenu, closeMobileMenu
- openSearch, closeSearch
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 14: カートフック

**指示文:**
```
docs/component-patterns.md セクション4.3 のコードをベースに、
カート操作のカスタムフックを作成してください。

ファイル: src/hooks/use-cart.ts

フック:
- useCart() — カートデータの取得（useQuery）
- useAddToCart() — カートにアイテム追加（useMutation）
  - カートが無ければ自動作成し、cart_id を Cookie に保存
  - 成功時に cart クエリを invalidate
- useUpdateCartItem() — 数量変更（useMutation）
- useRemoveCartItem() — アイテム削除（useMutation）

CART_QUERY_KEY = ["cart"] を定数として定義。
Medusa SDK の型がうまく合わない場合は、as any を避け、
型アサーションや独自の型定義で対応してください。
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

## Phase 3: レイアウト（Step 15〜19）

### Step 15: Header コンポーネント

**指示文:**
```
ヘッダーコンポーネントを作成してください。

ファイル: src/components/layout/header.tsx

仕様（design-guide.md セクション5.4 参照）:
- Client Component（スクロール検知、メニュー開閉）
- sticky top-0, backdrop-blur, bg-background/80
- 高さ: h-16, 下ボーダー: border-b border-border
- 左: テキストロゴ「stillne」（font-heading, lowercase, text-xl）→ トップページリンク
- 中央: メインナビ（「すべて」「インテリア雑貨」「テーブルウェア」「ファブリック」「ステーショナリー」）
  - デスクトップのみ表示（hidden lg:flex）
  - 今はリンク先を /[locale]/products?category=xxx にする（カテゴリIDは仮）
- 右: アイコン群
  - 検索アイコン（Search、onClick で useUIStore.openSearch）
  - 言語切替（後のステップで作成、今はプレースホルダー span で "JA"）
  - テーマ切替（後のステップで作成、今はプレースホルダー）
  - アカウントアイコン（User、/[locale]/account へリンク）
  - カートアイコン（ShoppingBag、onClick で useUIStore.openCart）
    - バッジ: カート内アイテム数を表示（useCart フック使用）
- モバイル: 左にハンバーガーアイコン（Menu）、右にカートアイコン
- z-index: z-50

まだ実装しない部分はプレースホルダーのコメントを残してください。
locale は usePathname() から取得してください。
```

**完了条件:**
- ブラウザでヘッダーが表示される
- ロゴクリックでトップページに遷移する
- レスポンシブ: モバイルでハンバーガー、デスクトップでナビリンクが表示

---

### Step 16: Footer コンポーネント

**指示文:**
```
フッターコンポーネントを作成してください。

ファイル: src/components/layout/footer.tsx

仕様（design-guide.md セクション5.4 参照）:
- Server Component
- 背景: bg-secondary
- 上余白: mt-24 md:mt-32
- 内部パディング: py-12 md:py-16
- コンテンツ幅: max-w-7xl mx-auto px-4 md:px-8 lg:px-12

4カラムグリッド（モバイルは1列、md:2列、lg:4列）:
1. ショップ情報: ロゴ「stillne」+ コンセプト文（1〜2行）
2. カテゴリ: インテリア雑貨 / テーブルウェア / ファブリック / ステーショナリー（リンク）
3. ヘルプ: 配送について / お問い合わせ / 特定商取引法に基づく表記（リンク）
4. SNS: Instagram / X（Twitter）のプレースホルダーリンク

最下部: コピーライト「© 2025 stillne. All rights reserved.」
区切り線: border-t border-border mt-8 pt-8

テキストはすべて翻訳キーで管理してください。
messages/ja.json と messages/en.json に footer ネームスペースを追加してください。
```

**完了条件:**
- ブラウザでフッターが表示される
- レスポンシブ: モバイル1列、デスクトップ4列

---

### Step 17: LanguageSwitcher コンポーネント

**指示文:**
```
言語切替コンポーネントを作成してください。

ファイル: src/components/layout/language-switcher.tsx

仕様（design-guide.md セクション12 参照）:
- Client Component
- shadcn/ui の DropdownMenu を使用
- トリガー: Ghost ボタン、現在の言語コード表示（"JA" or "EN"）、font-mono text-sm
- ドロップダウン内: 「🇯🇵 日本語」「🇬🇧 English」
- 選択時: next-intl の useRouter + usePathname を使ってロケールを切り替え
  - 現在のパスを維持してロケール部分だけ変更する
- 現在選択中の言語にはチェックマーク or 太字
```

**完了条件:**
- ヘッダーに言語切替が表示される
- JA ↔ EN の切り替えが動作し、URLが変わる

---

### Step 18: ThemeToggle コンポーネント

**指示文:**
```
テーマ切替コンポーネントを作成してください。

ファイル: src/components/layout/theme-toggle.tsx

仕様:
- Client Component
- next-themes の useTheme を使用
- Ghost ボタン、Sun / Moon アイコン切替
- ライトモード: Sun アイコン表示
- ダークモード: Moon アイコン表示
- クリックでトグル（light ↔ dark）
- aria-label: "テーマを切り替え"

Header コンポーネントのプレースホルダーを LanguageSwitcher と ThemeToggle に置き換えてください。
```

**完了条件:**
- ヘッダーにテーマ切替ボタンが表示される
- クリックでライト / ダークモードが切り替わる
- ダークモードでCSS変数が正しく切り替わっている

---

### Step 19: MobileMenu コンポーネント

**指示文:**
```
モバイルメニューコンポーネントを作成してください。

ファイル: src/components/layout/mobile-menu.tsx

仕様:
- Client Component
- shadcn/ui の Sheet を使用（左からスライドイン）
- useUIStore の isMobileMenuOpen で開閉制御
- メニュー内容:
  - ロゴ「stillne」
  - カテゴリリンク一覧（すべて / インテリア雑貨 / テーブルウェア / ファブリック / ステーショナリー）
  - セパレーター
  - アカウント / 注文履歴 リンク
  - セパレーター
  - 言語切替（LanguageSwitcher）
  - テーマ切替（ThemeToggle）
- リンクをクリックしたらメニューを閉じる

Header のモバイルハンバーガーボタンと連携させてください。
```

**完了条件:**
- モバイル幅でハンバーガーをクリックするとメニューが表示される
- リンクをクリックするとメニューが閉じて遷移する

---

## Phase 4: トップページ（Step 20〜23）

### Step 20: HeroBanner コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.6 をベースに HeroBanner を作成してください。

ファイル: src/components/home/hero-banner.tsx

仕様:
- Server Component（async、getTranslations 使用）
- 高さ: h-[60vh] min-h-[400px]
- 背景: PlaceholderImage（1920×600, "ヒーローバナー"）
- テキストオーバーレイ:
  - 見出し: t("heroTitle") → font-heading text-5xl md:text-6xl
  - サブテキスト: t("heroSubtitle") → text-lg text-muted-foreground
  - CTAボタン: t("shopNow") → Button（primary、asChild + Link、uppercase tracking-wide）
- max-w-7xl でセンタリング、テキストは max-w-lg
```

**完了条件:**
- `/ja` でヒーローバナーが表示される
- プレースホルダー画像 + テキスト + ボタンが配置されている

---

### Step 21: ProductCard コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.1 のコードをベースに ProductCard を作成してください。

ファイル: src/components/product/product-card.tsx

仕様:
- Server Component
- Props: product（型は Medusa SDK の Product 型 or 独自定義）, locale
- Link でラップ（/[locale]/products/[handle]）
- 画像: aspect-square, overflow-hidden, bg-secondary
  - thumbnail がある場合: next/image（480×480, object-cover, group-hover:scale-105）
  - ない場合: PlaceholderImage（480×480, "商品画像"）
- テキスト: mt-3
  - 商品名: text-sm font-body
  - 価格: mt-1 font-mono text-base text-muted-foreground, formatPrice() 使用

Medusa SDK の Product 型が使えない場合は、独自の Product インターフェースを
types/product.ts に定義してください（id, title, handle, thumbnail, variants 等）。
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 22: ProductGrid + NewArrivals コンポーネント

**指示文:**
```
1. src/components/product/product-grid.tsx を作成
   - component-patterns.md セクション3.2 をベースに
   - Server Component
   - Props: products[], locale
   - grid: grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4
   - 各カードを ScrollFadeIn でラップ（delay: index * 50）
   - 商品が0件の場合は EmptyState を表示

2. src/components/home/new-arrivals.tsx を作成
   - Server Component（async）
   - 見出し: t("newArrivals") → font-heading text-2xl
   - 今はダミーの商品データ配列を定義して ProductGrid に渡す
   - ダミーデータ: 4〜8件、各商品に id, title, handle, thumbnail: null, variants を設定
   - Medusa 接続後にAPIから取得するよう後で差し替える（TODO コメント）
```

**完了条件:**
- `/ja` のトップページにダミー商品が表示される
- プレースホルダー画像 + 商品名 + 価格が各カードに表示される

---

### Step 23: トップページの組み立て

**指示文:**
```
src/app/[locale]/page.tsx を更新して、トップページを組み立ててください。

構成:
1. HeroBanner
2. NewArrivals セクション（py-16 md:py-24, max-w-7xl mx-auto px-4 md:px-8 lg:px-12）
3. CategoryLinks セクション（TODO コメントでプレースホルダー）
4. FeaturedSection（TODO コメントでプレースホルダー）

メタデータ:
- title: "stillne — 静かに佇む、美しい日用品"
- description: "暮らしに溶け込む、厳選されたインテリア・雑貨のオンラインストア"
- locale に応じて英語メタデータも設定
```

**完了条件:**
- `/ja` でヒーロー + 新着商品のあるトップページが表示される
- `/en` でも英語テキストで同じレイアウトが表示される
- ヘッダー・フッターが正しく表示されている
- ダークモード切替が動作する

---

## Phase 5: 商品一覧・詳細（Step 24〜29）

### Step 24: 商品一覧ページ

**指示文:**
```
商品一覧ページを作成してください。

ファイル: src/app/[locale]/products/page.tsx

仕様:
- Server Component（async）
- searchParams からフィルター・ソートパラメータを取得: category, sort, offset
- 今はダミー商品データを使用（NewArrivals と同じ形式、12件分）
  - TODO: Medusa SDK からのデータ取得に差し替え
- ページタイトル: PageHeader（"すべての商品" / "All Products"）
- ProductGrid で商品を表示
- generateMetadata でSEOメタデータ設定

同時に作成:
- src/app/[locale]/products/loading.tsx（component-patterns.md セクション9.1 のSkeleton UIベース）
- src/app/[locale]/products/error.tsx（component-patterns.md セクション9.2 ベース）
```

**完了条件:**
- `/ja/products` で商品一覧が表示される
- Skeleton のローディングUIが存在する

---

### Step 25: CategoryFilter コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.7 のコードをベースに CategoryFilter を作成してください。

ファイル: src/components/search/category-filter.tsx

仕様:
- Client Component
- Props: categories（{ id, name }[]）, currentCategoryId?
- URL search params で状態管理
- 「すべて」+ 各カテゴリのボタン
- アクティブ: bg-accent text-accent-foreground
- 非アクティブ: border-border hover:bg-secondary
- カテゴリ変更時にoffset（ページ）をリセット

ダミーカテゴリを4つ定義して、商品一覧ページに組み込んでください:
- インテリア雑貨 / テーブルウェア / ファブリック / ステーショナリー
```

**完了条件:**
- 商品一覧にカテゴリフィルターが表示される
- クリックでURLが更新される

---

### Step 26: SortSelector コンポーネント

**指示文:**
```
ソート選択コンポーネントを作成してください。

ファイル: src/components/common/sort-selector.tsx

仕様:
- Client Component
- shadcn/ui の Select を使用
- 選択肢: 新着順 / 価格が安い順 / 価格が高い順
- URL search params の sort パラメータを更新
- ソート変更時にoffset（ページ）をリセット

商品一覧ページに組み込んでください。
CategoryFilter とSortSelector は同じ行に配置（flex justify-between）。
```

**完了条件:**
- ソートセレクターが表示される
- 選択でURLの sort パラメータが変わる

---

### Step 27: Pagination コンポーネント

**指示文:**
```
ページネーションコンポーネントを作成してください。

ファイル: src/components/common/pagination.tsx

仕様:
- Client Component
- Props: total（全件数）, limit, currentOffset
- 前へ / 次へ ボタン
- 現在のページ番号 / 総ページ数 表示
- URL search params の offset を更新
- 最初のページでは「前へ」を disabled
- 最後のページでは「次へ」を disabled
- ボタンは Ghost バリアント

商品一覧ページの ProductGrid の下に配置してください。
```

**完了条件:**
- ページネーションが表示される
- 前へ / 次へ でURLが更新される

---

### Step 28: 商品詳細ページ

**指示文:**
```
商品詳細ページを作成してください。

ファイル: src/app/[locale]/products/[handle]/page.tsx

仕様:
- Server Component（async）
- params.handle からダミー商品を特定（今は固定データ）
  - TODO: Medusa SDK からのデータ取得に差し替え
- レイアウト:
  - デスクトップ: 2カラム（左: 画像、右: 情報）grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12
  - モバイル: 1カラム（画像が上、情報が下）

左カラム（画像）:
- 今はPlaceholderImage（800×800, "商品画像"）を1枚表示
- TODO: ProductGallery コンポーネントに差し替え

右カラム（情報）:
- 商品名: font-heading text-3xl
- 価格: font-mono text-xl mt-2
- 説明文: text-muted-foreground mt-4 leading-relaxed
- バリアント選択: TODO（今はプレースホルダー）
- AddToCartButton: TODO（今は Button で「カートに追加」を表示、disabled）
- SKU: text-xs font-mono text-muted-foreground mt-6

同時に作成:
- loading.tsx（Skeleton: 2カラムのスケルトン）
- generateMetadata（商品名、説明文、OGP）

パンくずリスト:
- src/components/layout/breadcrumb.tsx を作成
- ホーム > すべての商品 > {商品名}
- 商品詳細ページの上部に配置
```

**完了条件:**
- `/ja/products/dummy-product` のようなURLで商品詳細が表示される
- パンくずリストが正しく表示される
- レスポンシブ: モバイル1カラム、デスクトップ2カラム

---

### Step 29: AddToCartButton コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.4 のコードをベースに AddToCartButton を作成してください。

ファイル: src/components/cart/add-to-cart-button.tsx

仕様:
- Client Component
- Props: variantId, disabled?
- useAddToCart フックを使用
- 状態遷移: 「カートに追加」→「追加中...」→「追加しました ✓」（2秒後にリセット）
- アイコン: ShoppingBag → loading → Check
- ボタン: w-full, uppercase tracking-wide, size="lg"
- disabled 時とpending時はクリック不可
- テキストはすべて翻訳キー

商品詳細ページのプレースホルダーを AddToCartButton に置き換えてください。
（Medusa未接続のため、実際のカート操作はまだ動かなくてOKです）
```

**完了条件:**
- 商品詳細にカート追加ボタンが表示される
- `npx tsc --noEmit` でエラーが出ない

---

## Phase 6: カート（Step 30〜33）

### Step 30: CartIcon コンポーネント

**指示文:**
```
ヘッダーのカートアイコンを専用コンポーネントとして切り出してください。

ファイル: src/components/cart/cart-icon.tsx

仕様:
- Client Component
- ShoppingBag アイコン + バッジ（アイテム数）
- バッジ: absolute -top-1 -right-1, bg-accent text-accent-foreground, min-w-[18px] h-[18px], text-xs
- アイテム数が0の場合はバッジ非表示
- バッジ変更時に軽くスケールアニメーション（scale-110 → scale-100）
- onClick で useUIStore.openCart
- aria-label: "カート（{count}点）"

Header コンポーネントの該当部分を CartIcon に置き換えてください。
```

**完了条件:**
- ヘッダーにカートアイコンが表示される

---

### Step 31: CartItem コンポーネント

**指示文:**
```
カート内の各商品行を表示するコンポーネントを作成してください。

ファイル: src/components/cart/cart-item.tsx

仕様:
- Client Component
- Props: item（CartItem型）
- レイアウト: 画像（左）+ 情報（右）の横並び、gap-4
- 画像: 80×80px, aspect-square, PlaceholderImage でフォールバック
- 情報:
  - 商品名: text-sm
  - バリアント名: text-xs text-muted-foreground
  - 数量変更: -/+ ボタン + 中央に数値（useUpdateCartItem 使用）
  - 価格: font-mono text-sm
  - 削除ボタン: X アイコン、Ghost、useRemoveCartItem 使用
- 数量変更・削除は React Query のミューテーション
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 32: CartSummary コンポーネント

**指示文:**
```
カートの合計金額サマリーを表示するコンポーネントを作成してください。

ファイル: src/components/cart/cart-summary.tsx

仕様:
- Client Component
- Props: cart（Cart型）, locale
- 表示内容:
  - 小計: formatPrice() で表示
  - 送料: 「チェックアウト時に計算」or 金額表示
  - セパレーター
  - 合計: font-medium text-lg
- 「チェックアウトへ進む」ボタン: Button（primary, w-full, Link to /[locale]/checkout）

テキストは翻訳キーで管理。
```

**完了条件:**
- ファイルが存在する
- `npx tsc --noEmit` でエラーが出ない

---

### Step 33: CartDrawer コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.5 のコードをベースに CartDrawer を作成してください。

ファイル: src/components/cart/cart-drawer.tsx

仕様:
- Client Component
- shadcn/ui の Sheet（右からスライド）
- useUIStore の isCartOpen / closeCart で制御
- useCart() でカートデータ取得
- 空カート: EmptyState（ShoppingBag アイコン + 「カートに商品がありません」+ 「買い物を続ける」リンク）
- カート内容あり: CartItem のリスト（スクロール可能）+ CartSummary（下部固定）
- 幅: w-full sm:max-w-[400px] lg:max-w-[480px]

app/[locale]/layout.tsx に CartDrawer を配置してください。
（Header の外、main と同じ階層に）
```

**完了条件:**
- カートアイコンをクリックするとドロワーが右からスライドインする
- 空の場合は EmptyState が表示される

---

## Phase 7: チェックアウト（Step 34〜37）

### Step 34: カートページ

**指示文:**
```
カートの詳細ページを作成してください。

ファイル: src/app/[locale]/cart/page.tsx

仕様:
- Client Component（カート操作のため）
- PageHeader: "カート" / "Shopping Cart"
- 2カラムレイアウト（デスクトップ）: 左にカート商品一覧、右にサマリー
- モバイル: 1カラム（商品一覧 → サマリー）
- 空カートの場合: EmptyState を表示
- CartItem 一覧 + CartSummary

generateMetadata: title "カート | stillne"
```

**完了条件:**
- `/ja/cart` でカートページが表示される

---

### Step 35: DemoNotice コンポーネント

**指示文:**
```
docs/component-patterns.md セクション3.8 のコードをベースに DemoNotice を作成してください。

ファイル: src/components/checkout/demo-notice.tsx

仕様:
- Server Component
- AlertTriangle アイコン + 注意文
- 「これはデモ注文です」「実際の課金は発生していません。テスト用カード番号で処理されています。」
- role="alert"
- 背景: bg-secondary, border border-border, rounded-md

テキストは翻訳キーで管理してください。
messages の checkout ネームスペースに demoNoticeTitle, demoNoticeBody を追加。
```

**完了条件:**
- ファイルが存在する

---

### Step 36: チェックアウトページ（基本構造）

**指示文:**
```
チェックアウトページの基本構造を作成してください。

ファイル: src/app/[locale]/checkout/page.tsx

仕様:
- Client Component
- 2カラム（デスクトップ）: 左にフォーム、右に注文サマリー
- DemoNotice をページ上部に表示

左カラム（フォーム、ステップ形式）:
- Step 1: 配送先情報（ShippingAddressForm — 次のステップで作成、今はプレースホルダー）
- Step 2: 配送方法（プレースホルダー）
- Step 3: 決済情報（プレースホルダー）

右カラム:
- OrderSummary（カート内容の読み取り専用表示 — 今は簡易版でOK）

ステップの状態管理は useState で行う（currentStep: 1 | 2 | 3）

generateMetadata: title "チェックアウト | stillne"
```

**完了条件:**
- `/ja/checkout` でチェックアウトページの基本レイアウトが表示される
- DemoNotice が表示されている

---

### Step 37: 注文完了ページ

**指示文:**
```
注文完了ページを作成してください。

ファイル: src/app/[locale]/checkout/success/page.tsx

仕様:
- Server Component
- 中央揃えのレイアウト、py-24
- チェックマークアイコン（Check、bg-success/10 の丸い背景）
- 見出し: "ご注文ありがとうございます" / "Thank you for your order"（font-heading text-3xl）
- 注文番号: "注文番号: #1234"（仮の番号、text-muted-foreground）
- 説明: "確認メールをお送りしました"
- DemoNotice
- 「買い物を続ける」ボタン → /[locale]/products へリンク
- 「注文履歴を見る」ボタン → /[locale]/account/orders へリンク

テキストは翻訳キーで管理。
```

**完了条件:**
- `/ja/checkout/success` で注文完了ページが表示される
- DemoNotice が表示されている

---

## Phase 8: アカウント（Step 38〜41）

### Step 38: ログイン・登録ページ

**指示文:**
```
ログインと新規登録ページを作成してください。

1. src/app/[locale]/account/login/page.tsx
   - Client Component
   - React Hook Form + Zod でバリデーション
   - フィールド: メールアドレス、パスワード
   - 「ログイン」ボタン（primary, w-full）
   - 「アカウントをお持ちでない方」→ 登録ページへのリンク
   - Medusa Auth API は TODO（今はフォームのUIのみ）

2. src/app/[locale]/account/register/page.tsx
   - Client Component
   - React Hook Form + Zod でバリデーション
   - フィールド: 姓、名、メールアドレス、パスワード、パスワード確認
   - 「新規登録」ボタン（primary, w-full）
   - 「すでにアカウントをお持ちの方」→ ログインページへのリンク
   - Medusa Auth API は TODO

3. Zodスキーマ:
   - src/schemas/auth.ts
   - loginSchema: email(必須, email形式), password(必須, 8文字以上)
   - registerSchema: lastName(必須), firstName(必須), email, password, confirmPassword(一致確認)

フォームはdesign-guide.md のアンダーライン型スタイル（border-b）で実装してください。
```

**完了条件:**
- `/ja/account/login` でログインフォームが表示される
- `/ja/account/register` で登録フォームが表示される
- バリデーションエラーが表示される

---

### Step 39: マイページ

**指示文:**
```
マイページのレイアウトと各ページを作成してください。

1. src/app/[locale]/account/layout.tsx
   - サイドナビ（デスクトップ）: プロフィール / 注文履歴 / 住所管理 / ログアウト
   - モバイル: ナビをページ上部にタブ風に表示
   - 未ログイン時はログインページにリダイレクト（TODO）

2. src/app/[locale]/account/page.tsx
   - マイページトップ（プロフィール概要）
   - 名前、メールアドレス表示（ダミーデータ）
   - 「プロフィールを編集」リンク

3. src/app/[locale]/account/orders/page.tsx
   - 注文履歴一覧（ダミーデータ 2〜3件）
   - 各行: 注文番号、日付、ステータス、合計金額
   - 注文番号クリックで詳細へ

4. src/app/[locale]/account/orders/[id]/page.tsx
   - 注文詳細（ダミーデータ）
   - 注文情報、商品リスト、配送先、ステータス

テキストは翻訳キーで管理。account ネームスペースに追加。
```

**完了条件:**
- `/ja/account` でマイページが表示される
- サイドナビから各ページに遷移できる

---

### Step 40: 静的ページ

**指示文:**
```
静的ページ（About, 配送について, お問い合わせ）を作成してください。

ファイル: src/app/[locale]/pages/[slug]/page.tsx

仕様:
- Server Component
- slug に応じてコンテンツを切り替え（about / shipping / contact）
- 各ページ: PageHeader + 本文（ダミーテキスト）
- about: ショップのコンセプト紹介（3〜4段落のダミーテキスト）
- shipping: 配送ポリシー、送料、配送日数等（テーブル形式）
- contact: お問い合わせ先情報 or フォーム（プレースホルダー）
- 存在しない slug は notFound()
- 各ページのメタデータを generateMetadata で設定

テキストは翻訳キーで管理。pages ネームスペースを新規追加。
```

**完了条件:**
- `/ja/pages/about`, `/ja/pages/shipping`, `/ja/pages/contact` が表示される
- 存在しないスラッグで404が表示される

---

### Step 41: 404 ページ

**指示文:**
```
カスタム404ページを作成してください。

ファイル: src/app/[locale]/not-found.tsx

仕様:
- Server Component
- 中央揃えレイアウト
- 大きな "404" テキスト（font-heading text-8xl text-muted-foreground/30）
- メッセージ: "ページが見つかりませんでした"
- 「トップページへ戻る」ボタン → /[locale] へリンク
```

**完了条件:**
- 存在しないURLで404ページが表示される

---

## Phase 9: 仕上げ（Step 42〜46）

### Step 42: Breadcrumb の全ページ対応

**指示文:**
```
パンくずリストを必要な全ページに設置してください。

対象ページ:
- 商品一覧: ホーム > すべての商品
- カテゴリ一覧: ホーム > すべての商品 > {カテゴリ名}
- 商品詳細: ホーム > すべての商品 > {商品名}
- カート: ホーム > カート
- チェックアウト: ホーム > チェックアウト
- マイページ各ページ: ホーム > マイページ > {ページ名}
- 静的ページ: ホーム > {ページ名}

Breadcrumb コンポーネントは汎用的に使えるよう、
items: { label, href? }[] のプロパティを受け取る形にしてください。
aria-label="パンくず" と aria-current="page" を最後の項目に設定。
```

**完了条件:**
- 各ページにパンくずリストが表示される
- 最後の項目はリンクなし、それ以外はリンクあり

---

### Step 43: SEO（JSON-LD + サイトマップ）

**指示文:**
```
SEO対応を追加してください。

1. JSON-LD 構造化データ:
   - 商品詳細ページ: Product スキーマ（name, description, image, offers.price, offers.priceCurrency）
   - パンくずリスト: BreadcrumbList スキーマ
   - script タグで head に挿入

2. src/app/sitemap.ts:
   - Next.js の generateSitemap を使用
   - トップページ、商品一覧、静的ページを含める
   - ダミー商品のURLも含める（後でMedusaデータに差し替え）
   - 各URLに ja / en のalternates を設定

3. src/app/robots.ts:
   - 基本的なrobots.txt を生成
   - sitemap のURLを含める
```

**完了条件:**
- 商品詳細ページのソースに JSON-LD が含まれている
- `/sitemap.xml` にアクセスできる
- `/robots.txt` にアクセスできる

---

### Step 44: テスト環境のセットアップ

**指示文:**
```
テスト環境をセットアップしてください。

1. vitest.config.ts:
   - @vitejs/plugin-react を使用
   - テスト環境: jsdom
   - パスエイリアス: @/ → ./src/
   - setup ファイル: src/test/setup.ts

2. src/test/setup.ts:
   - @testing-library/jest-dom の matchers をインポート

3. playwright.config.ts:
   - baseURL: http://localhost:3000
   - projects: chromium, mobile (375px viewport)

4. package.json にスクリプト追加:
   - "test": "vitest"
   - "test:run": "vitest run"
   - "test:e2e": "playwright test"

5. サンプルテスト作成:
   - src/lib/format.test.ts（formatPrice のテスト 3〜4ケース）
```

**完了条件:**
- `npm test -- --run` でサンプルテストがパスする

---

### Step 45: シードデータスクリプト

**指示文:**
```
ダミー商品データのシードスクリプトを作成してください。

ファイル: src/scripts/seed.ts

仕様:
- Medusa Admin API を使って商品データを投入するスクリプト
- ただし今はMedusa未接続のため、JSON形式のダミーデータファイルを出力する
- 出力先: src/data/products.json

データ内容（20〜30商品）:
- カテゴリごとに5〜8商品:
  - インテリア雑貨: セラミックフラワーベース、キャンドルホルダー、オブジェ等
  - テーブルウェア: マグカップ、プレート、カトラリー等
  - ファブリック: クッションカバー、ブランケット等
  - ステーショナリー: ノート、ペン、デスクトレイ等
- 各商品:
  - id, title, handle（kebab-case）, description（日本語ダミー文）
  - thumbnail: null（プレースホルダー使用）
  - variants: 1〜3つ（カラーバリエーション等）
  - price: カテゴリに応じた現実的な価格（¥1,500〜¥25,000）
  - category_id（カテゴリIDは仮）
  - metadata: { title_en, description_en, sort_order }

同時に src/data/categories.json も作成:
- 4カテゴリ（id, name, handle, description）

各ページのダミーデータを、この JSON ファイルから読み込むよう更新してください。
```

**完了条件:**
- `src/data/products.json` に20〜30商品のデータがある
- トップページ、商品一覧、商品詳細がJSONデータから表示される

---

### Step 46: 全ページの最終確認と修正

**指示文:**
```
以下のチェックリストに沿って、全ページの動作確認と修正を行ってください。

1. ルーティング確認:
   - / → /ja にリダイレクトされる
   - /ja と /en ですべてのページにアクセスできる
   - 存在しないパスで404が表示される

2. レスポンシブ確認:
   - モバイル（375px）で全ページのレイアウトが崩れていない
   - デスクトップ（1280px）で全ページのレイアウトが崩れていない

3. ダークモード確認:
   - テーマ切替で全ページの色が正しく切り替わる

4. 言語切替確認:
   - JA / EN の切り替えで全テキストが切り替わる
   - 切り替え後にURLのロケールが変わる

5. ナビゲーション確認:
   - ヘッダーのすべてのリンクが正しい遷移先に向いている
   - フッターのすべてのリンクが正しい
   - パンくずリストの各リンクが正しい

6. コンソールエラー確認:
   - ブラウザのコンソールにエラーが出ていない

問題があれば修正してください。
最後に `npm run build` が成功することを確認してください。
```

**完了条件:**
- `npm run build` が成功する
- 上記チェックリストをすべてクリア

---

## まとめ

| Phase | ステップ | 内容 |
|---|---|---|
| 1 | Step 1〜8 | プロジェクト初期化、設定、ユーティリティ |
| 2 | Step 9〜14 | 共通コンポーネント、プロバイダー、フック |
| 3 | Step 15〜19 | レイアウト（ヘッダー、フッター、メニュー） |
| 4 | Step 20〜23 | トップページ |
| 5 | Step 24〜29 | 商品一覧・詳細 |
| 6 | Step 30〜33 | カート |
| 7 | Step 34〜37 | チェックアウト |
| 8 | Step 38〜41 | アカウント・静的ページ |
| 9 | Step 42〜46 | 仕上げ（SEO、テスト、シードデータ、最終確認） |

全46ステップ。各ステップの完了条件を確認しながら進めてください。
Medusa バックエンドとの接続は、全UIが完成した後に別途行います。
