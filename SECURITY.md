# セキュリティガイド

このドキュメントは、SEEMAPAR ウェブサイトのセキュリティ対策について説明します。

## 実装済みのセキュリティ対策

### 1. 認証とアクセス制御

- ✅ **Supabase認証**: 管理画面へのアクセスはSupabaseの認証システムで保護
- ✅ **ミドルウェア保護**: Next.jsミドルウェアで管理画面ルートを保護
- ✅ **セッション管理**: サーバーサイドでセッションを検証
- ✅ **AuthGuard**: クライアント側での二重チェック

### 2. データベースセキュリティ

- ✅ **Row Level Security (RLS)**: Supabaseのテーブルで有効化
- ✅ **レート制限**: 5分間に3回までの投稿制限（メール/IP単位）
- ✅ **入力バリデーション**: データベーストリガーでの検証
- ✅ **データサニタイゼーション**: 挿入前の自動トリミングと正規化

### 3. XSS（クロスサイトスクリプティング）対策

- ✅ **React自動エスケープ**: Reactのデフォルト機能
- ✅ **Zod バリデーション**: フォーム入力の厳格な検証
- ✅ **文字数制限**: すべての入力フィールドに最大長を設定
- ✅ **CSPヘッダー**: Content Security Policyの実装

### 4. セキュリティヘッダー

次のセキュリティヘッダーをすべてのレスポンスに追加:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: [詳細はmiddleware.tsを参照]
```

### 5. エラーハンドリング

- ✅ **環境別ログ**: 本番環境では詳細なエラーを非表示
- ✅ **一般化されたエラーメッセージ**: ユーザーには最小限の情報のみ表示
- ✅ **エラーダイジェスト**: 開発環境でのみエラーIDを表示

### 6. 認証情報の保護

- ✅ **環境変数**: すべての機密情報は環境変数で管理
- ✅ **バリデーション**: 起動時に必須環境変数をチェック
- ✅ **対話式セットアップ**: 管理者パスワードのハードコードを排除

## 環境変数の設定

以下の環境変数を `.env.local` に設定してください:

```bash
# Supabase設定（必須）
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 管理者機能用（サーバーサイドのみ）
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **重要**: `.env.local` ファイルは絶対にGitにコミットしないでください！

## セットアップ手順

### 初回セットアップ

1. 環境変数を設定:
   ```bash
   cp .env.example .env.local
   # .env.localを編集して、実際の値を設定
   ```

2. 依存関係をインストール:
   ```bash
   pnpm install
   ```

3. Supabaseマイグレーションを実行:
   ```bash
   # Supabase CLIを使用
   supabase db push
   ```

4. 管理者アカウントを作成:
   ```bash
   pnpm run create-admin
   ```

## セキュリティベストプラクティス

### 開発時

1. **環境変数を共有しない**: `.env.local` は個人の開発環境用
2. **定期的な依存関係の更新**: `pnpm update` で脆弱性を解消
3. **コードレビュー**: 機密情報のハードコードがないか確認

### 本番環境

1. **HTTPS必須**: 必ずHTTPSで配信
2. **環境変数の管理**: Vercel/Netlifyなどの環境変数機能を使用
3. **定期的なバックアップ**: データベースの定期バックアップ
4. **監視の設定**: エラー監視サービス（Sentry等）の導入を推奨

## レート制限

### お問い合わせフォーム

- **制限**: 同じメールアドレスまたはIPから5分間に3回まで
- **実装場所**: データベーストリガー (`check_contact_rate_limit`)
- **エラー**: 制限超過時は明確なエラーメッセージを表示

### 今後の改善案

- [ ] ログイン試行のレート制限（Supabase Authの機能を利用）
- [ ] 管理画面アクション（記事作成等）のレート制限
- [ ] Redis等を使用したより高度なレート制限

## 脆弱性報告

セキュリティ上の問題を発見した場合は、公開のIssueではなく、
プロジェクト管理者に直接連絡してください。

## データベーススキーマ

### contactsテーブルの保護機能

1. **レート制限トリガー**: `contact_rate_limit_trigger`
2. **バリデーショントリガー**: `contact_validation_trigger`
3. **RLSポリシー**: 認証されたユーザーのみ閲覧・編集可能

詳細は `supabase/migrations/` のSQLファイルを参照してください。

## 監査ログ

現在、以下の操作がタイムスタンプ付きで記録されます:

- お問い合わせの投稿（`contacts.created_at`）
- ステータス更新（`contacts.updated_at` - 実装予定）

## コンプライアンス

### GDPR対応

- ユーザーデータは明示的な同意の下で収集
- データ削除機能（管理画面で実装可能）
- データエクスポート機能（実装予定）

### 個人情報保護

- 最小限のデータのみ収集
- 暗号化された通信（HTTPS）
- データベースレベルでのアクセス制御

---

最終更新: 2024年11月5日

