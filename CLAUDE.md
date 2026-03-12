# Stillne - ECショップデモサイト

## プロジェクト概要
インテリア・雑貨のECデモサイト。Medusaバックエンドは未接続で、ダミーデータで動作中。
- URL: https://stillne-shop.vercel.app/ja
- GitHub: https://github.com/shinmori2020/stillne
- Vercel: 同一リポジトリに3プロジェクト連携（stillne, stillne-2vml, stillne-shop）

## 技術スタック
- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4（CSS変数でカラー管理）
- shadcn/ui（Radix UI）/ Lucide Icons
- next-intl（i18n: ja/en）/ next-themes（ダーク/ライト）
- Zustand（UI状態）/ TanStack React Query（データ取得）
- Stripe決済（準備済み・未接続）

## コマンド
- `npm run dev` - 開発サーバー
- `npm run build` - 本番ビルド（デプロイ前に必ず確認）
- `npm run lint` - ESLint

## ディレクトリ構造
- `src/app/[locale]/` - ページ（account, admin, cart, checkout, products, about, contact, shipping）
- `src/components/` - コンポーネント（account, cart, checkout, common, home, layout, product, seo, ui）
- `src/lib/` - API, stores, utils, constants
- `src/hooks/` - カスタムフック（use-cart, use-auth, use-orders, use-addresses）
- `src/messages/` - 翻訳ファイル（ja.json, en.json）
- `src/types/` - 型定義
- `docs/project-features.md` - 全機能の詳細ドキュメント

## デザインルール
- カラー: ブラウン系で統一（primary: HSL 25 30% 35%）
- 管理画面もブラウン系（カラフルな色は使わない）
- フォント: 見出し=Cormorant Garamond、本文=Source Sans 3、日本語=Noto Sans JP
- ダークモード: ページ全体フェード遷移（0.25秒）

## 作業時の注意点
- デモサイトのためバックエンドは未接続。データはコンポーネント内のダミーデータ
- デモデータを書く際、TypeScript型に必須プロパティ（customer_id, created_at等）を忘れるとビルドが失敗する
- Vercelデプロイはpush後に自動実行。反映が遅い場合はブラウザキャッシュを確認
- `npm run build` を変更後に実行してビルドエラーがないか確認してからpushする

## コミット・コミュニケーション
- コミットメッセージ: 日本語（prefix: feat/fix/improve/chore）
- 会話: 日本語で行う

## 未着手タスク
- [ ] 商品画像の設定（Unsplashから8商品分の画像を選んで一括設定）
- [x] 検索機能の実装（リアルタイム検索モーダル）
- [ ] 検索機能の改善（より良い検索体験の実装）
- [ ] 商品詳細ページの作成（個別商品の説明・仕様・画像表示）
- [ ] TOPページメイン画像のスライドショー（フェード切り替え）
- [x] お問い合わせページの調整
- [x] カートページの調整
- [x] チェックアウトページの調整
- [x] 注文確認ページの調整
- [x] 注文完了（ご注文ありがとうございます）ページの調整
- [ ] お気に入り（ウィッシュリスト）機能
- [ ] レスポンシブの細かい調整（スマホ表示の確認・改善）
- [ ] Medusaバックエンド接続（デモ→実運用への移行）
- [ ] Stripe決済の接続（テスト環境での決済フロー完成）
- [ ] テストの追加（主要機能のユニットテスト・E2Eテスト）
- [ ] READMEの整備（現在デフォルトのまま）
- [ ] OGP画像・ファビコンの設定
