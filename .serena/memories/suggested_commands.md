# 開発コマンド一覧

## 基本コマンド

### 開発サーバー起動
```bash
pnpm dev
```
localhost:3000で開発サーバーが起動

### ビルド
```bash
pnpm build
```
本番用にアプリケーションをビルド

### 本番サーバー起動
```bash
pnpm start
```
ビルド後のアプリケーションを起動

### コード検証

#### Lint実行
```bash
pnpm lint
```
ESLintによるコード検証

#### 型チェック
```bash
pnpm type-check
```
TypeScriptの型チェック（tsc --noEmit）

### Supabase関連

#### 型定義生成
```bash
pnpm supabase:gen-types
```
Supabaseのデータベース型定義を自動生成

## Git操作（macOS）

### 基本コマンド
- `git status` - 変更状況確認
- `git add .` - 全ての変更をステージング
- `git commit -m "message"` - コミット
- `git push` - リモートへプッシュ
- `git pull` - リモートから取得

## システムコマンド（macOS）

### ファイル操作
- `ls -la` - ファイル一覧（隠しファイル含む）
- `cd <directory>` - ディレクトリ移動
- `mkdir <name>` - ディレクトリ作成
- `rm -rf <name>` - ファイル/ディレクトリ削除

### 検索
- `find . -name "*.tsx"` - ファイル検索
- `grep -r "pattern" .` - 文字列検索

## 推奨ワークフロー

1. 開発開始時: `pnpm dev`
2. コード変更後: `pnpm lint` → `pnpm type-check`
3. コミット前: 上記の検証コマンドが全てパスすることを確認
4. 本番デプロイ前: `pnpm build`で正常にビルドできることを確認