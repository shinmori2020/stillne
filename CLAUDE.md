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
- 商品画像は現在プレースホルダー表示（Unsplash直接URLはレート制限・安定性の問題で使用中止。将来的にはローカル画像またはCDNサービスを推奨）

## コミット・コミュニケーション
- コミットメッセージ: 日本語（prefix: feat/fix/improve/chore）
- 会話: 日本語で行う

## タスク
### 完了済み
- [x] 検索機能の実装（リアルタイム検索モーダル）
- [x] 検索機能の改善（スコアリング、ひらがな/カタカナ統合検索、フィルタ、UI改善）
- [x] 商品詳細ページの作成（個別商品の説明・仕様・画像表示）
- [x] TOPページメイン画像のスライドショー（フェード切り替え）
- [x] お問い合わせページの調整
- [x] カートページの調整
- [x] チェックアウトページの調整
- [x] 注文確認ページの調整
- [x] 注文完了（ご注文ありがとうございます）ページの調整
- [x] お気に入り（ウィッシュリスト）機能（Zustand + localStorage、ページネーション付き）
- [x] 最近見た商品機能（閲覧履歴表示、一覧ページ付き）
- [x] 法律関連ページの作成（特定商取引法、プライバシーポリシー、利用規約）
- [x] FAQページの作成（よくある質問）
- [x] デバッグ用サイトマップページ（/dev）
- [x] 商品レビュー・評価機能（デモレビュー3件、星評価表示）
- [x] SNSシェアボタン（X、LINE、リンクコピー）
- [x] レスポンシブの細かい調整（メガメニュー・商品詳細・管理画面・各ページのパディング等）

### フロントエンドで対応可能
- [ ] サイズ・ケアガイドページの作成
- [ ] 商品比較機能
- [ ] OGP画像・ファビコンの設定
- [ ] READMEの整備（現在デフォルトのまま）
- [ ] テストの追加（主要機能のユニットテスト・E2Eテスト）

### バックエンド接続が必要
- [ ] Medusaバックエンド接続（デモ→実運用への移行）
- [ ] Stripe決済の接続（テスト環境での決済フロー完成）
- [ ] メールマガジン登録フォーム（フッター）
- [ ] ギフトオプション機能（ラッピング、メッセージカード）
- [ ] クーポン・プロモーションコード機能
- [ ] ゲストチェックアウト（アカウント不要購入）
