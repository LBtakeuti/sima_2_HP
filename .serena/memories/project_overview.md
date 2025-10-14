# SEEMAPAR プロジェクト概要

## プロジェクトの目的
SEEMAPAR（シーマパール）の企業ウェブサイト。多言語対応（日本語、英語、ヒンディー語）のコーポレートサイトで、企業情報、ニュース、サービス、お問い合わせ機能を提供。

## 技術スタック
- **フレームワーク**: Next.js 15.5.4 (App Router)
- **言語**: TypeScript 5.9.3
- **スタイリング**: Tailwind CSS 3.4.18
- **データベース/認証**: Supabase
- **フォーム管理**: React Hook Form + Zod
- **パッケージマネージャ**: pnpm
- **UI**: カスタムコンポーネント (components/ui/)

## プロジェクト構成
```
/
├── app/                    # Next.js App Router
│   ├── [lang]/            # 多言語対応ページ
│   │   ├── about/         # 会社概要
│   │   ├── contact/       # お問い合わせ
│   │   └── service/       # サービス
│   └── admin/             # 管理画面
├── components/            
│   ├── ui/                # 再利用可能なUIコンポーネント
│   ├── front/             # フロントエンド向けコンポーネント
│   └── admin/             # 管理画面用コンポーネント
├── lib/                   
│   ├── i18n/              # 多言語対応
│   ├── supabase/          # Supabaseクライアント
│   ├── types/             # TypeScript型定義
│   └── utils/             # ユーティリティ関数
└── public/                # 静的ファイル
```

## 主な機能
- 多言語対応（ja, en, hi）
- レスポンシブデザイン
- ニュース配信システム
- お問い合わせフォーム
- 管理画面（/admin）