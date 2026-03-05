# Stillne EC Shop - プロジェクト機能サマリー

> 最終更新: 2026-02-21

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | Stillne |
| タイプ | Next.js 16 ECサイト |
| バージョン | 0.1.0 |
| 対応言語 | 日本語 (デフォルト) / 英語 |
| 技術スタック | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Medusa SDK |

---

## 1. ページルート一覧

### 公開ページ

#### トップページ (`/[locale]/`)
- **ファイル:** `src/app/[locale]/page.tsx`
- ヒーローバナー（グラデーション背景・装飾要素付き）
- 新商品ショーケース（8商品）
- スタッフピックセクション
- お客様レビューカルーセル
- ライフスタイルギャラリー
- ブランドバリューセクション
- FAQセクション（アコーディオン式）
- ニュースレター購読フォーム
- SEO対応（JSON-LD: Organization & Website スキーマ）
- ロケール別メタデータ生成

#### 商品一覧ページ (`/[locale]/products`)
- **ファイル:** `src/app/[locale]/products/page.tsx`
- 商品グリッド表示（12件/ページ）
- カテゴリフィルタリング（インテリア、食器、ファブリック、文房具）
- ソート機能（新着順、価格昇順、価格降順）
- ページネーション
- パンくずナビゲーション
- レスポンシブグリッドレイアウト

#### 商品詳細ページ (`/[locale]/products/[handle]`)
- **ファイル:** `src/app/[locale]/products/[handle]/page.tsx`
- 商品画像ギャラリー（サムネイル付き）
- 商品スペック表示（素材、重量、サイズ）
- バリアント選択（カラー、サイズ）
- 在庫管理・低在庫警告表示
- 価格表示（通貨フォーマット対応）
- 数量セレクター
- カート追加機能
- 商品レビューセクション
- 関連商品表示（同カテゴリから4件）
- シェアボタン（SNS共有、リンクコピー）
- パンくずナビゲーション

#### カートページ (`/[locale]/cart`)
- **ファイル:** `src/app/[locale]/cart/page.tsx`
- カート商品一覧（画像・詳細付き）
- 数量変更（増減ボタン）
- 商品削除機能
- 注文サマリー（小計・合計）
- 送料表示（チェックアウト時計算）
- チェックアウトボタン
- 空カート状態表示

#### チェックアウトページ (`/[locale]/checkout`)
- **ファイル:** `src/app/[locale]/checkout/page.tsx`
- チェックアウトステップ表示
- 配送先住所フォーム
- 配送方法選択
- 注文サマリー表示
- Stripe決済連携（準備済み）
- デモ表示

#### チェックアウト完了ページ (`/[locale]/checkout/success`)
- **ファイル:** `src/app/[locale]/checkout/success/page.tsx`
- 注文確認メッセージ
- 注文番号表示
- メール確認案内
- 注文履歴リンク

#### アバウトページ (`/[locale]/about`)
- **ファイル:** `src/app/[locale]/about/page.tsx`
- ブランドストーリー
- コンセプト説明
- ブランドバリュー（3カード: Quality, Design, Sustainability）
- スクロールフェードインアニメーション

#### お問い合わせページ (`/[locale]/contact`)
- **ファイル:** `src/app/[locale]/contact/page.tsx`
- お問い合わせフォーム（名前、メール、件名、メッセージ）
- 連絡先情報表示
- 成功・エラーメッセージング
- フォームバリデーション

#### 配送情報ページ (`/[locale]/shipping`)
- **ファイル:** `src/app/[locale]/shipping/page.tsx`
- 配送日数情報
- 送料詳細
- 梱包情報
- 返品ポリシー

---

### アカウントページ（認証済みユーザー）

#### アカウントダッシュボード (`/[locale]/account`)
- **ファイル:** `src/app/[locale]/account/page.tsx`
- ダッシュボード概要
- 注文・住所・プロフィールへのクイックリンク

#### ログインページ (`/[locale]/account/login`)
- **ファイル:** `src/app/[locale]/account/login/page.tsx`
- メール/パスワードログインフォーム
- 新規登録リンク

#### 新規登録ページ (`/[locale]/account/register`)
- **ファイル:** `src/app/[locale]/account/register/page.tsx`
- アカウント作成フォーム
- パスワード確認

#### プロフィールページ (`/[locale]/account/profile`)
- **ファイル:** `src/app/[locale]/account/profile/page.tsx`
- プロフィール情報編集（名前、メール、電話番号）

#### 注文履歴ページ (`/[locale]/account/orders`)
- **ファイル:** `src/app/[locale]/account/orders/page.tsx`
- 注文一覧表示
- ステータスフィルター

#### 注文詳細ページ (`/[locale]/account/orders/[id]`)
- **ファイル:** `src/app/[locale]/account/orders/[id]/page.tsx`
- 注文タイムライン/ステータス追跡
- 注文明細
- 配送先住所表示

#### 住所管理ページ (`/[locale]/account/addresses`)
- **ファイル:** `src/app/[locale]/account/addresses/page.tsx`
- 保存済み住所一覧
- 住所追加・編集・削除
- デフォルト住所設定
- MapPin/Phoneアイコン付きUI
- ホバーシャドウエフェクト

---

### 管理画面ページ

#### 管理ダッシュボード (`/[locale]/admin`)
- **ファイル:** `src/app/[locale]/admin/page.tsx`
- 統計カード（商品数、注文数、売上）
- 最近の注文テーブル
- クイックアクションボタン
- ブラウンカラー統一デザイン

#### 商品管理 (`/[locale]/admin/products`)
- **ファイル:** `src/app/[locale]/admin/products/page.tsx`
- 商品テーブル（検索・フィルタ付き）
- 商品編集・削除ボタン
- ステータス表示（公開/下書き）

#### 商品新規追加 (`/[locale]/admin/products/new`)
- **ファイル:** `src/app/[locale]/admin/products/new/page.tsx`
- 商品作成フォーム
- カテゴリ設定、バリアント管理、画像アップロード

#### 商品編集 (`/[locale]/admin/products/[id]`)
- **ファイル:** `src/app/[locale]/admin/products/[id]/page.tsx`
- 商品情報編集
- バリアント価格・在庫更新

#### 注文管理 (`/[locale]/admin/orders`)
- **ファイル:** `src/app/[locale]/admin/orders/page.tsx`
- 全注文一覧
- ステータス管理
- 検索・フィルタ機能

#### ニュースレター管理 (`/[locale]/admin/newsletter`)
- **ファイル:** `src/app/[locale]/admin/newsletter/page.tsx`
- 購読者リスト
- メール作成（テンプレート選択付き）
- 配信履歴
- 統計表示（購読者数、配信数、開封率）

---

## 2. コンポーネント構成

### レイアウトコンポーネント (`src/components/layout/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Header | `header.tsx` | スティッキーヘッダー、ナビゲーション、カート/アカウントアイコン |
| Footer | `footer.tsx` | フッターリンク、ニュースレター、SNS |
| Mobile Menu | `mobile-menu.tsx` | モバイルハンバーガーメニュー |
| Language Switcher | `language-switcher.tsx` | 言語切替（日/英） |
| Theme Toggle | `theme-toggle.tsx` | ダーク/ライトモード切替（ページフェード遷移付き） |

### 商品コンポーネント (`src/components/product/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Product Card | `product-card.tsx` | 商品カード表示 |
| Product Grid | `product-grid.tsx` | 商品グリッドレイアウト |
| Product List Client | `product-list-client.tsx` | クライアントサイド商品リスト |
| Product Detail | `product-detail.tsx` | 商品詳細表示 |
| Product Options | `product-options.tsx` | バリアント選択UI |
| Product Filter | `product-filter.tsx` | カテゴリフィルタ |
| Product Sort | `product-sort.tsx` | ソートオプション |
| Quantity Selector | `quantity-selector.tsx` | 数量選択 |
| Product Reviews | `product-reviews.tsx` | レビューセクション |
| Related Products | `related-products.tsx` | 関連商品カルーセル |
| Share Buttons | `share-buttons.tsx` | SNS共有ボタン |

### トップページコンポーネント (`src/components/home/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Hero Banner | `hero-banner.tsx` | ヒーローセクション |
| New Arrivals | `new-arrivals.tsx` | 新着商品 |
| Staff Picks | `staff-picks.tsx` | スタッフおすすめ |
| Brand Story | `brand-story.tsx` | ブランドストーリー |
| Brand Values | `brand-values.tsx` | ブランドバリュー |
| Testimonials | `testimonials.tsx` | お客様の声 |
| Lifestyle Gallery | `lifestyle-gallery.tsx` | ライフスタイルギャラリー |
| Newsletter | `newsletter.tsx` | ニュースレター購読 |
| FAQ Section | `faq-section.tsx` | FAQ |
| Category Banner | `category-banner.tsx` | カテゴリバナー |

### カートコンポーネント (`src/components/cart/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Cart Drawer | `cart-drawer.tsx` | スライドアウトカートパネル |
| Cart Item | `cart-item.tsx` | カート内商品表示 |
| Cart Summary | `cart-summary.tsx` | 注文サマリー |

### アカウントコンポーネント (`src/components/account/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Account Dashboard | `account-dashboard.tsx` | アカウントダッシュボード |
| Login Form | `login-form.tsx` | ログインフォーム |
| Register Form | `register-form.tsx` | 新規登録フォーム |
| Profile Form | `profile-form.tsx` | プロフィール編集 |
| Address Form | `address-form.tsx` | 住所フォーム |
| Address List | `address-list.tsx` | 住所一覧管理 |
| Order List | `order-list.tsx` | 注文履歴 |
| Order Detail | `order-detail.tsx` | 注文詳細 |

### チェックアウトコンポーネント (`src/components/checkout/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Checkout Client | `checkout-client.tsx` | チェックアウトフロー管理 |
| Checkout Steps | `checkout-steps.tsx` | ステップインジケーター |
| Shipping Form | `shipping-form.tsx` | 配送フォーム |
| Order Summary | `order-summary.tsx` | チェックアウト時注文サマリー |

### 共通コンポーネント (`src/components/common/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| Breadcrumb | `breadcrumb.tsx` | パンくずナビ |
| Page Header | `page-header.tsx` | セクションタイトル |
| Pagination | `pagination.tsx` | ページネーション |
| Empty State | `empty-state.tsx` | 空状態メッセージ |
| Placeholder Image | `placeholder-image.tsx` | プレースホルダー画像 |
| Scroll Fade In | `scroll-fade-in.tsx` | スクロールアニメーション |

### UIコンポーネント (`src/components/ui/`)

Radix UIベースのコンポーネントライブラリ:
Badge, Button, Dialog, Dropdown Menu, Form, Input, Label, Scroll Area, Select, Separator, Sheet, Skeleton, Sonner, Textarea

### SEOコンポーネント (`src/components/seo/`)

| コンポーネント | ファイル | 機能 |
|---------------|---------|------|
| JSON-LD | `json-ld.tsx` | 構造化データ（Organization, Product, Website） |

---

## 3. データレイヤー

### API (`src/lib/api/`)

#### Products API (`products.ts`)
- `getProducts()` - 商品一覧取得（フィルタ、ソート、ページネーション対応）
- `getProductByHandle()` - ハンドルで商品取得
- `getNewArrivals()` - 新着商品取得
- バックエンド: Medusa SDK（フォールバックとしてデモデータ）
- タイムアウト: 3秒

### 型定義 (`src/types/`)

- **Product Types** (`product.ts`): Product, ProductImage, ProductVariant, ProductOption, ProductCategory 等
- **Cart Types** (`cart.ts`): Cart, CartItem, CartAddress, CartShippingMethod 等
- **Customer Types** (`customer.ts`): Customer, Address 等
- **Order Types** (`order.ts`): Order, OrderItem, OrderStatus 等
- **Common Types** (`common.ts`): Pagination, Filter, Sort 等

### 定数 (`src/lib/constants.ts`)

```
SITE_NAME: "stillne"
DEFAULT_LOCALE: "ja"
SUPPORTED_LOCALES: ["ja", "en"]
PRODUCTS_PER_PAGE: 12
CART_COOKIE_KEY: "stillne_cart_id"
CART_COOKIE_EXPIRY: 30日
INVENTORY_ALERT_THRESHOLD: 5
```

---

## 4. 国際化 (i18n)

### 構成

- **ルーティング:** `src/i18n/routing.ts` - 対応ロケール定義
- **リクエスト設定:** `src/i18n/request.ts` - ロケール別メッセージ読み込み
- **ミドルウェア:** `src/middleware.ts` - ロケール検出・ルーティング

### メッセージファイル (`src/messages/`)

- `ja.json` - 日本語翻訳
- `en.json` - 英語翻訳
- セクション: common, home, product, cart, checkout, account, admin, category, navigation, pages

---

## 5. スタイリング & テーマ

### カラーパレット

| 用途 | ライトモード | ダークモード |
|------|-------------|-------------|
| Primary | HSL 25 30% 35% (ブラウン) | HSL 28 35% 55% (明るめブラウン) |
| Background | HSL 40 15% 97% | HSL 20 8% 18% |
| Card | HSL 0 0% 100% | HSL 20 6% 21% |
| Secondary | HSL 40 10% 95% | HSL 20 8% 24% |
| Muted | HSL 30 8% 93% | HSL 20 6% 26% |

### フォント

- 見出し: Cormorant Garamond (セリフ)
- 本文: Source Sans 3 (サンセリフ)
- 日本語: Noto Sans JP
- コード: JetBrains Mono

### テーマ切替

- `next-themes` による class ベースのダーク/ライト切替
- ページ全体のフェードアニメーション（0.25秒フェードアウト → テーマ切替 → 0.25秒フェードイン）
- システム設定検出対応

---

## 6. プロバイダー & フック

### プロバイダー (`src/providers/`)

| プロバイダー | ファイル | 機能 |
|-------------|---------|------|
| Theme Provider | `theme-provider.tsx` | ダーク/ライトモード管理 |
| Query Provider | `query-provider.tsx` | TanStack React Query セットアップ |
| Cart Provider | `cart-provider.tsx` | カート状態管理 |

### カスタムフック (`src/hooks/`)

| フック | ファイル | 機能 |
|--------|---------|------|
| useCart | `use-cart.ts` | カートデータ取得・管理 |
| useAddToCart | `use-cart.ts` | カート追加ミューテーション |
| useUpdateCartItem | `use-cart.ts` | 数量更新 |
| useRemoveCartItem | `use-cart.ts` | 商品削除 |
| useAuth | `use-auth.ts` | 認証状態管理 |
| useOrders | `use-orders.ts` | 注文履歴取得 |
| useAddresses | `use-addresses.ts` | 住所管理 |

### UI状態管理 (`src/lib/stores/ui-store.ts`)

Zustand ストア:
- カートドロワーの開閉
- モバイルメニュートグル
- 検索モーダル表示

---

## 7. 主要パッケージ

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| next | 16.1.6 | フレームワーク |
| react | 19.2.3 | UIライブラリ |
| @medusajs/js-sdk | 2.13.1 | ECバックエンド |
| @tanstack/react-query | 5.90.21 | データフェッチング |
| tailwindcss | 4 | CSSフレームワーク |
| zustand | 5.0.11 | 状態管理 |
| @stripe/react-stripe-js | 5.6.0 | 決済 |
| next-intl | 4.8.2 | 国際化 |
| next-themes | 0.4.6 | テーマ管理 |
| react-hook-form | 7.71.1 | フォーム管理 |
| zod | 4.3.6 | バリデーション |
| lucide-react | 0.563.0 | アイコン |

---

## 8. 機能チェックリスト

### EC機能
- [x] 商品カタログ（フィルタ付き）
- [x] 商品検索（実装準備済み）
- [x] ショッピングカート
- [x] チェックアウトフロー
- [x] 注文履歴
- [x] 配送情報ページ
- [x] 商品レビュー
- [x] 関連商品表示
- [x] 在庫管理・アラート

### ユーザーアカウント
- [x] ユーザー登録
- [x] ログイン
- [x] プロフィール管理
- [x] 住所管理
- [x] 注文履歴閲覧

### 管理画面
- [x] 商品管理（CRUD）
- [x] 注文管理
- [x] ニュースレター管理
- [x] ダッシュボード・売上統計

### コンテンツ & マーケティング
- [x] ヒーローバナー付きトップページ
- [x] 新着商品・スタッフピック
- [x] お客様の声カルーセル
- [x] ライフスタイルギャラリー
- [x] FAQセクション
- [x] ニュースレター購読
- [x] アバウト・お問い合わせ・配送情報ページ

### 技術機能
- [x] 多言語対応（日/英）
- [x] ダーク/ライトテーマ
- [x] レスポンシブデザイン
- [x] モバイルナビゲーション
- [x] パンくずナビ
- [x] ページネーション
- [x] フォームバリデーション
- [x] SEO最適化（JSON-LD）
- [x] 画像最適化
- [x] トースト通知
- [x] ローディング状態
- [x] Stripe決済準備済み
- [x] Medusaバックエンド連携

### アクセシビリティ
- [x] セマンティックHTML
- [x] ARIAラベル
- [x] キーボードナビゲーション
- [x] フォーカスインジケーター
- [x] カラーコントラスト
- [x] モーション軽減対応

---

## 9. デモデータ

### 商品（8件）

| 商品名 | 価格 | カテゴリ |
|--------|------|---------|
| セラミックフラワーベース A-001 | ¥5,800 | インテリア |
| キャンドルホルダー B-002 | ¥4,200 | インテリア |
| マグカップ C-003 | ¥2,800 | 食器 |
| リネンクッションカバー D-004 | ¥3,800 | ファブリック |
| レザーノート E-005 | ¥4,500 | 文房具 |
| ガラスプレート F-006 | ¥3,200 | 食器 |
| ウールブランケット G-007 | ¥12,000 | ファブリック |
| 真鍮ペンスタンド H-008 | ¥6,800 | 文房具 |

---

## 10. 環境変数

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
NEXT_PUBLIC_SITE_URL=https://stillne.com
```
