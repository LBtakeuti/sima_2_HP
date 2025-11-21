# お問い合わせメール通知のセットアップ

このドキュメントでは、Resendを使用したお問い合わせフォームのメール通知機能のセットアップ方法を説明します。

## 📋 概要

お問い合わせフォームから送信された内容が、指定したメールアドレス（複数可）に自動で通知されます。

### 機能
- ✅ 複数のメールアドレスに同時送信可能
- ✅ データはSupabaseに保存され、メール送信に失敗してもデータは保持
- ✅ HTMLフォーマットの美しいメール通知
- ✅ お問い合わせ者のメールアドレスに返信可能（Reply-To設定済み）

---

## 🚀 セットアップ手順

### 1. Resendアカウントの作成

1. https://resend.com にアクセス
2. 「Sign Up」をクリックしてアカウント作成
3. メールアドレスを認証

**料金:**
- 無料プラン: 月100通まで（ほとんどの場合、これで十分です）
- Proプラン: 月$20で50,000通まで

### 2. API Keyの取得

1. Resendダッシュボードにログイン
2. 左メニューから「API Keys」を選択
3. 「Create API Key」をクリック
4. キーの名前を入力（例: "SEEMAPAAR Website"）
5. 生成されたAPIキー（`re_xxxxx...`）をコピー

### 3. 環境変数の設定

`.env.local`ファイルを開き、以下の値を設定してください：

```bash
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# メール送信元アドレス（Resendに登録したメールアドレス、または認証済みドメインのアドレス）
RESEND_FROM_EMAIL=noreply@yourdomain.com

# お問い合わせ通知先メールアドレス
# 単一のメールアドレス
CONTACT_NOTIFICATION_EMAIL=your-email@example.com

# または、複数のメールアドレス（カンマ区切り）
CONTACT_NOTIFICATION_EMAIL=email1@example.com,email2@example.com,email3@example.com
```

**注意:**
- `your_resend_api_key_here`を実際のAPIキーに置き換えてください
- `noreply@yourdomain.com`を実際の送信元メールアドレスに置き換えてください
  - **テスト環境**: Resendに登録したメールアドレスを使用
  - **本番環境**: 認証済みドメインのメールアドレスを使用（例: `noreply@seemapaar.com`）
- `your-email@example.com`を実際の通知先メールアドレスに置き換えてください

### 4. 開発サーバーの再起動

環境変数を変更した場合は、開発サーバーを再起動してください：

```bash
# 開発サーバーを停止（Ctrl+C）
# 再度起動
npm run dev -- -p 3002
```

---

## 📧 複数のメールアドレスに送信する方法

### 方法1: カンマ区切りで指定（推奨）

```bash
CONTACT_NOTIFICATION_EMAIL=boss@example.com,manager@example.com,sales@example.com
```

### 方法2: スペースを含めても問題なし

```bash
CONTACT_NOTIFICATION_EMAIL=boss@example.com, manager@example.com, sales@example.com
```

### 送信例

- 3つのメールアドレスを設定 → **1通のメール**として3名に送信
- 料金: 1通分のみ（複数宛先でも1通扱い）

---

## 🧪 テスト方法

### 1. ローカル環境でテスト

1. 開発サーバーを起動: `npm run dev -- -p 3002`
2. ブラウザで http://localhost:3002/ja/contact を開く
3. お問い合わせフォームに入力して送信
4. 設定したメールアドレスに通知が届くか確認

### 2. 確認ポイント

- ✅ お問い合わせフォームで「送信成功」のメッセージが表示される
- ✅ 設定したメールアドレスに通知メールが届く
- ✅ メールの内容が正しく表示される
- ✅ メールの「返信」ボタンで、お問い合わせ者のメールアドレスが表示される

### 3. トラブルシューティング

#### メールが届かない場合

1. **環境変数を確認**
   ```bash
   # .env.localファイルを確認
   cat .env.local | grep RESEND
   cat .env.local | grep CONTACT_NOTIFICATION_EMAIL
   ```

2. **ブラウザのコンソールを確認**
   - F12を押して開発者ツールを開く
   - コンソールにエラーメッセージがないか確認

3. **Resendダッシュボードを確認**
   - https://resend.com にログイン
   - 「Logs」メニューからメール送信履歴を確認
   - エラーがある場合は詳細を確認

4. **APIキーを確認**
   - APIキーが正しくコピーされているか確認
   - `re_`で始まっているか確認

#### よくあるエラー

```
Email service is not configured
```
→ `RESEND_API_KEY`が設定されていません

```
Notification email is not configured
```
→ `CONTACT_NOTIFICATION_EMAIL`が設定されていません

```
Failed to send email notification
```
→ APIキーが無効、または送信制限に達しています

```
You can only send testing emails to your own email address
```
→ `RESEND_FROM_EMAIL`がResendに登録したメールアドレスと一致していません。または、独自ドメインの認証が必要です

---

## 🔐 セキュリティ

### 重要な注意事項

1. **`.env.local`をGitにコミットしない**
   - 既に`.gitignore`に含まれています
   - APIキーは機密情報です

2. **本番環境の設定**
   - Vercel等のホスティングサービスの環境変数設定を使用
   - APIキーを直接コードに書かない

3. **APIキーの管理**
   - 必要に応じてAPIキーを再生成できます
   - 不要になったキーは削除してください

---

## 📊 メール送信の仕組み

```
ユーザー
  ↓
お問い合わせフォーム送信
  ↓
Supabaseにデータ保存 ✅
  ↓
Resend APIを呼び出し
  ↓
指定したメールアドレスに通知 📧
```

**重要:** メール送信に失敗しても、お問い合わせデータはSupabaseに保存されます。

---

## 📝 カスタマイズ

### メールのデザインを変更する

`app/api/send-contact-email/route.ts`ファイルの`html`部分を編集してください。

### 件名を変更する

```typescript
subject: `${subjectPrefix} ${name}様より`,
```

この部分を編集してください。

### 送信元アドレスを変更する（独自ドメイン使用時）

Resendで独自ドメインを認証後、以下を変更：

```typescript
from: 'no-reply@your-domain.com',
```

---

## 🆘 サポート

問題が解決しない場合：

1. Resendのドキュメント: https://resend.com/docs
2. Resendのサポート: https://resend.com/support
3. プロジェクトのIssueを作成

---

## ✅ チェックリスト

セットアップ完了前に以下を確認してください：

- [ ] Resendアカウントを作成した
- [ ] API Keyを取得した
- [ ] `.env.local`に`RESEND_API_KEY`を設定した
- [ ] `.env.local`に`CONTACT_NOTIFICATION_EMAIL`を設定した
- [ ] 開発サーバーを再起動した
- [ ] お問い合わせフォームでテストした
- [ ] メール通知が届いた
- [ ] メールの内容が正しい
- [ ] 返信機能が動作する

すべてチェックが完了したら、本番環境にデプロイできます！


