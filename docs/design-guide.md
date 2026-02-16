# stillne — デザインガイドライン

ミニマルで洗練されたインテリア・雑貨ECショップのデザインシステム。
「静かに佇む、美しい日用品」というコンセプトを、UIのあらゆる要素で体現する。

---

## 1. デザインコンセプト

### 1.1 美的方向性

**トーン:** Refined Minimal（洗練されたミニマル）
**キーワード:** 静謐、余白、素材感、陰影、品格

商品そのものが主役であり、UIは「背景」に徹する。ただし無個性ではなく、
微細なタイポグラフィの選択、計算された余白、繊細なアニメーションを通じて
ブランドの美意識を伝える。

**避けるべきもの:**
- 過剰な装飾、グラデーション、ドロップシャドウ
- 原色の多用、ビビッドなアクセントカラー
- 角丸の大きいカード、遊び心の強いイラスト
- ポップアップやモーダルの多用

**追求するもの:**
- 空気感のある余白
- 商品写真を引き立てるニュートラルな背景
- 触れたくなるような繊細なインタラクション
- 紙の印刷物のような端正なタイポグラフィ

### 1.2 デザイン原則

1. **商品が主役** — UIは商品の美しさを引き立てる舞台装置に徹する
2. **余白は意図** — 余白はデザイン要素であり、詰め込まない
3. **静かな動き** — アニメーションは存在を主張せず、自然に感じられること
4. **一貫性** — 全ページで同じトーン、同じリズム、同じ品質
5. **アクセシブル** — 美しさとアクセシビリティは両立させる

---

## 2. カラーシステム

### 2.1 カラーパレット

Tailwind CSSのCSS変数（`globals.css`）で定義する。
HSL形式を使用し、shadcn/uiの規約に準拠する。

#### ライトモード

| 用途 | 変数名 | HSL値 | HEX参考 | 説明 |
|---|---|---|---|---|
| 背景 | `--background` | 40 20% 98% | #FAFAF8 | ほんのり温かみのあるオフホワイト |
| 背景（セカンダリ） | `--secondary` | 40 10% 95% | #F3F2F0 | カード背景、セクション区切り |
| 前景（テキスト） | `--foreground` | 20 10% 15% | #272524 | ほぼ黒だがわずかに温かい |
| 前景（セカンダリ） | `--muted-foreground` | 20 5% 45% | #726E6B | 補助テキスト、キャプション |
| ボーダー | `--border` | 30 8% 88% | #E2E0DD | 控えめなライン |
| アクセント | `--accent` | 25 30% 35% | #734D33 | ウォームブラウン（CTA、リンク） |
| アクセント前景 | `--accent-foreground` | 40 20% 98% | #FAFAF8 | アクセント上のテキスト |
| デストラクティブ | `--destructive` | 0 60% 50% | #CC3333 | エラー、削除 |
| サクセス | `--success` | 145 40% 40% | #3D9152 | 成功、在庫あり |
| ミュート | `--muted` | 30 8% 93% | #EDECEB | ホバー背景、無効状態 |
| カード | `--card` | 0 0% 100% | #FFFFFF | カード背景 |

#### ダークモード

| 用途 | 変数名 | HSL値 | HEX参考 |
|---|---|---|---|
| 背景 | `--background` | 20 8% 10% | #1A1917 |
| 背景（セカンダリ） | `--secondary` | 20 6% 15% | #282625 |
| 前景 | `--foreground` | 30 10% 90% | #E8E5E2 |
| 前景（セカンダリ） | `--muted-foreground` | 25 5% 55% | #918D89 |
| ボーダー | `--border` | 20 5% 22% | #3A3836 |
| アクセント | `--accent` | 28 35% 55% | #B8845A |
| カード | `--card` | 20 6% 13% | #232120 |

#### CSS変数定義

```css
/* globals.css */
@layer base {
  :root {
    --background: 40 20% 98%;
    --foreground: 20 10% 15%;
    --card: 0 0% 100%;
    --card-foreground: 20 10% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 10% 15%;
    --primary: 25 30% 35%;
    --primary-foreground: 40 20% 98%;
    --secondary: 40 10% 95%;
    --secondary-foreground: 20 10% 25%;
    --muted: 30 8% 93%;
    --muted-foreground: 20 5% 45%;
    --accent: 25 30% 35%;
    --accent-foreground: 40 20% 98%;
    --destructive: 0 60% 50%;
    --destructive-foreground: 0 0% 100%;
    --border: 30 8% 88%;
    --input: 30 8% 88%;
    --ring: 25 30% 35%;
    --radius: 0.375rem;

    /* カスタムトークン */
    --success: 145 40% 40%;
    --success-foreground: 0 0% 100%;
  }

  .dark {
    --background: 20 8% 10%;
    --foreground: 30 10% 90%;
    --card: 20 6% 13%;
    --card-foreground: 30 10% 90%;
    --popover: 20 6% 13%;
    --popover-foreground: 30 10% 90%;
    --primary: 28 35% 55%;
    --primary-foreground: 20 8% 10%;
    --secondary: 20 6% 15%;
    --secondary-foreground: 30 10% 80%;
    --muted: 20 5% 18%;
    --muted-foreground: 25 5% 55%;
    --accent: 28 35% 55%;
    --accent-foreground: 20 8% 10%;
    --destructive: 0 55% 55%;
    --destructive-foreground: 0 0% 100%;
    --border: 20 5% 22%;
    --input: 20 5% 22%;
    --ring: 28 35% 55%;
  }
}
```

### 2.2 カラー使用ルール

- 背景色は `--background` と `--card` の2色を基本とし、階層を表現する
- テキストは `--foreground`（本文）と `--muted-foreground`（補助）の2段階
- アクセントカラー（ウォームブラウン）はCTAボタンとリンクのみに使用する
- 画像の背景には `--secondary` を使用し、商品写真との一体感を出す
- デストラクティブ・サクセスは機能的な意味でのみ使用し、装飾には使わない
- ボーダーは極力 `1px solid hsl(var(--border))` で統一する

---

## 3. タイポグラフィ

### 3.1 フォントファミリー

| 用途 | フォント | ウェイト | 読み込み方法 |
|---|---|---|---|
| 見出し（欧文） | **Cormorant Garamond** | 400, 500, 600 | Google Fonts（next/font） |
| 本文（欧文） | **Source Sans 3** | 300, 400, 500 | Google Fonts（next/font） |
| 日本語 | **Noto Sans JP** | 300, 400, 500, 700 | Google Fonts（next/font） |
| 等幅（コード・SKU） | **JetBrains Mono** | 400 | Google Fonts（next/font） |

**フォント選定の意図:**
- Cormorant Garamond: セリフ体の気品がインテリアの世界観と調和する。見出しや商品名に使用
- Source Sans 3: 可読性が高く、Cormorantとのコントラストが美しい。UI要素の本文に使用
- Noto Sans JP: 日本語の可読性を最優先。ウェイト300の細い書体で繊細さを表現
- JetBrains Mono: SKU番号や価格の等幅表示に使用

#### next/font 設定例

```typescript
// app/fonts.ts
import {
  Cormorant_Garamond,
  Source_Sans_3,
  Noto_Sans_JP,
  JetBrains_Mono,
} from "next/font/google"

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
})

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
})

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ja",
  display: "swap",
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
})
```

#### Tailwind CSS フォント設定

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      heading: ["var(--font-heading)", "Georgia", "serif"],
      body: ["var(--font-body)", "var(--font-ja)", "sans-serif"],
      ja: ["var(--font-ja)", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    },
  },
}
```

### 3.2 タイプスケール

8px基準のモジュラースケールを使用する。Tailwindのデフォルトクラスに対応させる。

| 用途 | Tailwindクラス | サイズ | 行間 | ウェイト | フォント |
|---|---|---|---|---|---|
| ヒーロー見出し | `text-5xl` / `text-6xl` | 48px / 60px | 1.1 | 400 | heading |
| ページ見出し（h1） | `text-3xl` / `text-4xl` | 30px / 36px | 1.2 | 500 | heading |
| セクション見出し（h2） | `text-2xl` | 24px | 1.3 | 500 | heading |
| サブ見出し（h3） | `text-xl` | 20px | 1.4 | 500 | body |
| 本文 | `text-base` | 16px | 1.7 | 300〜400 | body |
| 補助テキスト | `text-sm` | 14px | 1.6 | 400 | body |
| キャプション | `text-xs` | 12px | 1.5 | 400 | body |
| 商品名（カード） | `text-sm` | 14px | 1.4 | 400 | body |
| 価格 | `text-base` | 16px | 1.0 | 500 | mono |
| SKU | `text-xs` | 12px | 1.0 | 400 | mono |

### 3.3 タイポグラフィルール

- 見出しの欧文は `font-heading`（Cormorant Garamond）、日本語は `font-ja`（Noto Sans JP weight 500）
- 本文は `font-body`（Source Sans 3 + Noto Sans JP の合成）
- 日本語本文の行間は `leading-relaxed`（1.7）以上を確保する
- letter-spacing: 見出しは `tracking-wide`（0.05em）、本文は `tracking-normal`
- 商品名はすべて小文字表記（英語の場合）で統一する
- 価格表示は `font-mono` で `¥3,000` 形式（カンマ区切り、通貨記号付き）
- 英語テキストの見出しはすべて lowercase で表示（`lowercase` クラス使用）

---

## 4. スペーシングシステム

### 4.1 基本単位

4pxベースの8倍数システムを使用する。Tailwindのデフォルトスペーシングに対応。

| トークン | 値 | Tailwindクラス | 用途 |
|---|---|---|---|
| `space-1` | 4px | `p-1`, `m-1` | アイコンとテキストの間隔 |
| `space-2` | 8px | `p-2`, `m-2` | インライン要素の内側余白 |
| `space-3` | 12px | `p-3`, `m-3` | ボタン内のパディング |
| `space-4` | 16px | `p-4`, `m-4` | カード内のパディング |
| `space-6` | 24px | `p-6`, `m-6` | セクション内の要素間隔 |
| `space-8` | 32px | `p-8`, `m-8` | カード間のギャップ |
| `space-12` | 48px | `p-12`, `m-12` | セクション間の区切り |
| `space-16` | 64px | `p-16`, `m-16` | ページセクション間 |
| `space-24` | 96px | `p-24`, `m-24` | ヒーローセクションの上下余白 |
| `space-32` | 128px | `p-32`, `m-32` | ページ上部の大余白 |

### 4.2 レイアウトスペーシング

| コンテキスト | スペーシング | 説明 |
|---|---|---|
| コンテンツ最大幅 | `max-w-7xl`（1280px） | メインコンテンツエリア |
| コンテンツ内側余白 | `px-4 md:px-8 lg:px-12` | 画面端からの距離 |
| 商品グリッドギャップ | `gap-6 md:gap-8` | 商品カード間の間隔 |
| セクション間余白 | `py-16 md:py-24` | トップページの各セクション |
| カード内パディング | `p-0`（画像）/ `p-4`（テキスト） | 商品カード |
| ヘッダー高さ | `h-16`（64px） | 固定ヘッダー |
| フッター上余白 | `mt-24 md:mt-32` | コンテンツとフッターの距離 |

### 4.3 スペーシングルール

- セクション間は `py-16` 以上を確保し、余白を惜しまない
- 商品カードは詰め込みすぎない（1行に最大4列、モバイルは2列）
- 商品画像とテキストの間は `mt-3`（12px）で統一
- ボタン内のパディングは `px-6 py-3` を基本とする
- リスト項目間は `space-y-3`（12px）以上

---

## 5. コンポーネントスタイル

### 5.1 ボタン

| バリアント | スタイル | 用途 |
|---|---|---|
| Primary | bg-accent, text-accent-foreground, hover:opacity-90 | CTA（カートに追加、チェックアウト） |
| Secondary | bg-secondary, text-foreground, hover:bg-muted | 補助アクション |
| Outline | border border-border, bg-transparent, hover:bg-secondary | フィルター、ソート |
| Ghost | bg-transparent, hover:bg-secondary | ナビゲーション、アイコンボタン |
| Link | text-accent, underline-offset-4, hover:underline | テキストリンク |

**ボタンの共通スタイル:**
- 角丸: `rounded-md`（6px）— 角丸を控えめにし、シャープな印象を保つ
- フォントサイズ: `text-sm`（14px）
- ウェイト: `font-medium`（500）
- トランジション: `transition-colors duration-200`
- letter-spacing: `tracking-wide`（0.05em）
- 英語テキストは uppercase で表示

### 5.2 カード（商品カード）

```
┌─────────────────────────┐
│                         │
│      商品画像            │  ← アスペクト比 1:1, overflow-hidden
│      (aspect-square)    │
│                         │
├─────────────────────────┤
│  商品名                  │  ← text-sm, font-body, mt-3
│  ¥3,000                 │  ← text-base, font-mono, mt-1, text-muted-foreground
└─────────────────────────┘
```

**スタイル:**
- ボーダー・シャドウなし（背景色の差で区別する）
- 画像ホバー: `scale-105` + `transition-transform duration-500 ease-out`
- 画像コンテナ: `overflow-hidden` で拡大時にはみ出さない
- カード全体がリンク（`<Link>` でラップ）
- ホバー時にカーソルがポインターに変わるのみ（過剰なエフェクトは不要）

### 5.3 入力フォーム

| 要素 | スタイル |
|---|---|
| テキスト入力 | `border-b border-border bg-transparent focus:border-accent focus:outline-none` |
| セレクト | テキスト入力と同じスタイル（アンダーライン型） |
| チェックボックス | shadcn/ui デフォルト |
| ラジオ | shadcn/ui デフォルト |
| テキストエリア | `border border-border bg-transparent rounded-md focus:border-accent` |

**フォームの方針:**
- 入力欄はアンダーライン型（border-bottom のみ）をデフォルトとする
- フォーカス時にボーダーカラーがアクセントカラーに変わる
- ラベルはフィールドの上に配置（フローティングラベルは不使用）
- エラーメッセージは `text-destructive text-sm mt-1` で表示

### 5.4 ナビゲーション

**ヘッダー:**
- 固定表示（`sticky top-0`）、背景半透明 + backdrop-blur
- 左: ロゴ（テキストロゴ「stillne」、font-heading, lowercase）
- 中央: メインナビ（カテゴリリンク、デスクトップのみ）
- 右: 検索アイコン + 言語切替 + アカウントアイコン + カートアイコン（バッジ付き）
- 高さ: 64px、下ボーダー: `border-b border-border`
- スクロール時: 背景の不透明度を上げる

**モバイルメニュー:**
- ハンバーガーアイコンからスライドイン（左から）
- フルスクリーン + 背景オーバーレイ
- メニュー内にカテゴリ + アカウント + 言語切替を配置

**フッター:**
- `bg-secondary` 背景
- 4カラムグリッド: ショップ情報 / カテゴリ / ヘルプ / SNS
- コピーライト、言語切替

---

## 6. レスポンシブデザイン

### 6.1 ブレイクポイント

Tailwindのデフォルトブレイクポイントを使用（モバイルファースト）。

| プレフィックス | 幅 | 対象デバイス |
|---|---|---|
| (default) | 0px〜 | モバイル |
| `sm:` | 640px〜 | モバイル横向き |
| `md:` | 768px〜 | タブレット |
| `lg:` | 1024px〜 | デスクトップ |
| `xl:` | 1280px〜 | ワイドデスクトップ |

### 6.2 レスポンシブパターン

| コンポーネント | モバイル | タブレット | デスクトップ |
|---|---|---|---|
| 商品グリッド | 2列 | 3列 | 4列 |
| ヒーローバナー | 全幅、テキスト下 | 全幅、テキスト中央 | 全幅、テキスト左寄せ |
| ナビゲーション | ハンバーガー | ハンバーガー | 横並びリンク |
| 商品詳細画像 | 1列スワイプ | 2列 | 左に画像、右に情報 |
| フッター | 1列積み | 2列 | 4列 |
| カートドロワー | フルスクリーン | 右スライド(400px) | 右スライド(480px) |
| チェックアウト | 1列 | 1列 | 2列（フォーム + サマリー） |

### 6.3 モバイルファーストの原則

- スタイルはモバイル基準で書き、ブレイクポイントで拡張する
- タッチターゲットは最小 44×44px を確保
- モバイルでの画像は画面幅いっぱいに表示し、余白は小さめにする
- スクロール方向の一貫性を保つ（横スクロールは画像ギャラリーのみ許可）

---

## 7. アニメーション・トランジション

### 7.1 基本方針

- アニメーションは「気付かない程度の心地よさ」が目標
- 目的は装飾ではなく、状態変化のフィードバックと空間的な連続性の演出
- すべてのアニメーションは `prefers-reduced-motion: reduce` で無効化する

### 7.2 トランジション定義

| 用途 | duration | easing | プロパティ |
|---|---|---|---|
| ホバー（色変化） | 200ms | ease | color, background-color, border-color |
| ホバー（画像拡大） | 500ms | ease-out | transform |
| ページ遷移 | 300ms | ease-in-out | opacity |
| ドロワー開閉 | 300ms | ease-out | transform, opacity |
| アコーディオン | 250ms | ease | height, opacity |
| フェードイン（スクロール） | 600ms | ease-out | opacity, transform |
| ボタン押下 | 100ms | ease | transform (scale) |

### 7.3 スクロールアニメーション

トップページと商品一覧で、要素のスクロールインアニメーションを使用する。

```css
/* 基本のフェードイン・アップ */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 600ms ease-out forwards;
}
```

- 商品カードのスタガーアニメーション: 各カードに `animation-delay` を設定（50msずつ）
- IntersectionObserver で画面に入ったタイミングで発火
- 移動量は `16px`（控えめ）、`opacity` の変化を主とする

### 7.4 マイクロインタラクション

| 対象 | 効果 | 実装 |
|---|---|---|
| カートに追加 | ボタンが一瞬縮小 → 元に戻る + テキスト変化 | `scale-95` → `scale-100` + "追加しました" 表示 |
| カートバッジ | 数値変化時に軽くバウンス | `scale-110` → `scale-100` (200ms) |
| 画像ホバー | ゆっくり拡大 | `scale-105` (500ms ease-out) |
| リンクホバー | アンダーラインが左から右へ伸びる | `scaleX(0)` → `scaleX(1)` + `transform-origin: left` |
| ページ読み込み | ロゴが微かにフェードイン | `opacity: 0` → `opacity: 1` (400ms) |

---

## 8. 画像ガイドライン

### 8.1 画像サイズ規定

| 用途 | サイズ | アスペクト比 | 形式 |
|---|---|---|---|
| 商品サムネイル | 480×480px | 1:1 | WebP |
| 商品詳細（メイン） | 800×800px | 1:1 | WebP |
| 商品詳細（ギャラリー） | 800×800px | 1:1 | WebP |
| ヒーローバナー | 1920×600px | 16:5 | WebP |
| カテゴリカバー | 800×400px | 2:1 | WebP |
| OGP画像 | 1200×630px | 1.91:1 | PNG |

### 8.2 プレースホルダー画像

開発・デモ段階では `PlaceholderImage` コンポーネントを使用する。

**デザイン仕様:**
- 背景色: `bg-secondary`（#F3F2F0）
- 中央にカメラアイコン（Lucide `ImageIcon`）+ サイズテキスト
- アイコンカラー: `text-muted-foreground`（#726E6B）
- テキスト: `text-xs text-muted-foreground`
- ボーダー: なし

```tsx
// components/ui/placeholder-image.tsx
interface PlaceholderImageProps {
  width: number
  height: number
  label?: string
  className?: string
}
```

### 8.3 next/image 設定

- すべての画像に `next/image` を使用する（`<img>` 禁止）
- `priority` フラグ: ファーストビューの画像のみ設定
- `sizes` プロパティ: レスポンシブに応じた適切な値を設定
- `placeholder="blur"`: 本番画像使用時にブラーアップ効果を適用

---

## 9. アクセシビリティ

### 9.1 WCAG 2.2 AA 準拠基準

| 基準 | 要件 | stillneでの対応 |
|---|---|---|
| 1.1.1 非テキスト | すべての画像にalt属性 | 商品画像に商品名をalt設定、装飾画像は `alt=""` |
| 1.4.3 コントラスト | テキスト 4.5:1、大テキスト 3:1 | カラーパレットで確認済み |
| 1.4.11 非テキストコントラスト | UI要素 3:1 | ボーダー、アイコンのコントラスト確保 |
| 2.1.1 キーボード | すべての機能がキーボードで操作可能 | Tab順序、Enter/Space操作 |
| 2.4.7 フォーカス表示 | フォーカスインジケータが視認可能 | `ring-2 ring-accent ring-offset-2` |
| 3.3.2 ラベル | すべてのフォーム入力にラベル | visible label または sr-only |
| 4.1.2 名前・役割 | ARIA属性で補助技術に情報提供 | aria-label, aria-describedby |

### 9.2 フォーカススタイル

```css
/* フォーカスリング（全要素共通） */
:focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
}

/* フォーカスリングを消さない（NEVER outline: none without replacement） */
```

### 9.3 スクリーンリーダー対応

| コンポーネント | 対応 |
|---|---|
| カートアイコン | `aria-label="カート（3点）"` + バッジは `aria-hidden` |
| 商品画像 | `alt="セラミックフラワーベース A-001"` |
| 価格変更 | `aria-live="polite"` で変更を通知 |
| カート操作 | 追加・削除時に `aria-live="assertive"` で結果を通知 |
| モーダル/ドロワー | `role="dialog"`, `aria-modal="true"`, フォーカストラップ |
| ナビゲーション | `nav` + `aria-label="メインナビゲーション"` |
| パンくずリスト | `nav` + `aria-label="パンくず"` + `aria-current="page"` |

### 9.4 アニメーション制御

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. ダークモード

### 10.1 実装方針

- `next-themes` を使用してテーマ切替を実装する
- デフォルト: システム設定に従う（`system`）
- 手動切替: ヘッダーにトグルアイコンを配置（☀️ / 🌙）
- CSS変数ベースなので、`.dark` クラスの付与だけで全体が切り替わる

### 10.2 ダークモードでの注意点

- 商品画像のプレースホルダーは `--secondary`（ダーク版）を使用する
- 白背景の商品画像がある場合、カード背景との境界が曖昧にならないよう `border` を追加する
- シャドウはダークモードでは使用しない（見えないため）。代わりにボーダーで区切る
- テキストの階層（foreground / muted-foreground）は明確に維持する

---

## 11. アイコン

### 11.1 アイコンライブラリ

**Lucide React** を使用する（shadcn/uiと同じ）。

```tsx
import { ShoppingBag, Search, User, Menu, X, ChevronRight } from "lucide-react"
```

### 11.2 アイコンサイズ

| コンテキスト | サイズ | Tailwindクラス |
|---|---|---|
| ヘッダーアイコン | 20px | `w-5 h-5` |
| ボタン内アイコン | 16px | `w-4 h-4` |
| リスト項目アイコン | 16px | `w-4 h-4` |
| 空状態アイコン | 48px | `w-12 h-12` |
| プレースホルダー画像 | 32px | `w-8 h-8` |

### 11.3 アイコン使用ルール

- ストローク幅: デフォルト（2px）を使用
- カラー: `currentColor` を継承（テキストカラーと同じ）
- アイコン単体のボタンには必ず `aria-label` を設定する
- テキスト付きアイコンは `aria-hidden="true"` を設定

---

## 12. 言語切替UI

### 12.1 デザイン仕様

- ヘッダー右側に配置（アカウントアイコンの左）
- ドロップダウン形式: 現在の言語コード（JA / EN）を表示
- クリックでドロップダウンが開き、言語を選択
- 選択後はページがリロードされず、URLのみ変更される

### 12.2 スタイル

```
[JA ▾]  ← Ghost ボタンスタイル、text-sm、font-mono
  ┌──────────┐
  │ 🇯🇵 日本語  │  ← ドロップダウン内
  │ 🇬🇧 English │
  └──────────┘
```

---

## 付録: デザイントークン一覧

Claude Codeがコード生成時に参照する、全トークンのクイックリファレンス。

```
COLORS:
  bg-background        → オフホワイト / ダークグレー
  bg-card              → 白 / チャコール
  bg-secondary         → ライトグレー / ダークチャコール
  bg-accent            → ウォームブラウン
  text-foreground      → ほぼ黒 / ほぼ白
  text-muted-foreground → グレー
  border-border        → ライトグレー / ダークグレー

FONTS:
  font-heading         → Cormorant Garamond（見出し欧文）
  font-body            → Source Sans 3 + Noto Sans JP（本文）
  font-ja              → Noto Sans JP（日本語専用）
  font-mono            → JetBrains Mono（価格・SKU）

SPACING:
  セクション間: py-16 md:py-24
  カード間: gap-6 md:gap-8
  コンテンツ幅: max-w-7xl
  内側余白: px-4 md:px-8 lg:px-12

RADIUS:
  ボタン: rounded-md (6px)
  カード: rounded-none (0px)
  入力: rounded-none (border-bottom only)

ANIMATION:
  ホバー: 200ms ease
  画像拡大: 500ms ease-out
  フェードイン: 600ms ease-out
  ドロワー: 300ms ease-out
```
