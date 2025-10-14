# コードスタイルと規約

## TypeScript設定
- **strictモード**: 有効（strict: true）
- **ターゲット**: ES2017
- **モジュール解決**: bundler
- **パスエイリアス**: `@/*` でプロジェクトルートを参照

## ファイル命名規則
- **コンポーネント**: PascalCase（例: `Header.tsx`, `ContactForm.tsx`）
- **ユーティリティ**: kebab-case（例: `get-dictionary.ts`, `date.ts`）
- **型定義ファイル**: kebab-case with `.types.ts`（例: `database.types.ts`）

## コンポーネント規約

### 関数コンポーネント
- デフォルトエクスポートを使用
- 関数宣言形式を使用（`export default function ComponentName()`）
- Props型は inline で定義

```typescript
export default function Header({ lang }: { lang: string }) {
  // ...
}
```

### async/awaitパターン
- Server Componentsではasync functionを使用
- Promiseパラメータは明示的にawait

```typescript
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  // ...
}
```

## スタイリング
- **Tailwind CSS**を使用
- インラインクラス名で記述
- `cn()`ユーティリティ関数でクラス名を結合（`tailwind-merge`使用）

## インポート順序
1. React/Next.js関連
2. 外部ライブラリ
3. 内部モジュール（@/で始まる）
4. 相対パス
5. 型定義

## 日本語コメント
- 重要なロジックには日本語でコメントを記載
- コンポーネントセクションには日本語コメントでマークアップ

```typescript
{/* ロゴ */}
{/* ナビゲーション */}
{/* 言語切り替え */}
```

## 型安全性
- `any`型の使用は避ける
- 明示的な型定義を心がける
- Zodスキーマで実行時検証

## ディレクトリ構成ルール
- フィーチャーベースの構成
- 再利用可能なコンポーネントは`components/ui/`へ
- ページ固有のコンポーネントは各機能ディレクトリへ