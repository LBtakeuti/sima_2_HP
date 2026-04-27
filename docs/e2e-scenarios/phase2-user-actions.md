# Phase 2: ユーザーアクション E2E シナリオ

## パートナーシップ詳細ページ（タグ・カルーセル機能）

### SC-UA-001: メイン画像表示
- **対象**: `/[lang]/partnership/[id]`
- **前提**: 案件が image_url を持つ（images[0] フォールバックなし・メイン/ギャラリー完全分離）
- **操作**: 詳細ページにアクセス
- **期待**: メイン画像（16:9アスペクト）が表示される
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S1

### SC-UA-002: メイン画像なし（非表示）
- **対象**: `/[lang]/partnership/[id]`
- **前提**: image_url が空（images の有無は問わない）
- **操作**: 詳細ページにアクセス
- **期待**: メイン画像セクションが非表示、他セクションは正常表示
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S1

### SC-UA-003: ギャラリーセクション表示（1枚以上）
- **対象**: `/[lang]/partnership/[id]`
- **前提**: 案件が images を1枚以上持つ（旧条件「2枚以上」から緩和）
- **操作**: 詳細ページにアクセス
- **期待**: 「ギャラリー」セクションが表示される
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S2, S2-1

### SC-UA-004: ギャラリー矢印ナビゲーション
- **対象**: `/[lang]/partnership/[id]`（gallery画像あり案件）
- **操作**: 次へボタンクリック
- **期待**: スライドが次の画像に切り替わる、ギャラリーが破損しない
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S2

### SC-UA-005: Lightbox 開閉
- **対象**: `/[lang]/partnership/[id]`（gallery画像あり案件）
- **操作**: ギャラリー内画像クリック
- **期待**: Lightboxが全画面で開く
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S3

### SC-UA-006: タグ（キーワード）表示
- **対象**: `/[lang]/partnership/[id]`
- **前提**: 案件に tags が設定されている
- **操作**: 詳細ページにアクセス
- **期待**: 「キーワード」セクションに `#タグ名` 形式のチップが表示される
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S4

### SC-UA-007: タグ未設定（非表示）
- **対象**: `/[lang]/partnership/[id]`
- **前提**: 案件の tags が空
- **操作**: 詳細ページにアクセス
- **期待**: 「キーワード」セクションが非表示
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S5

### SC-UA-010: メイン画像のみ設定（ギャラリー非表示）
- **対象**: `/[lang]/partnership/[id]`
- **前提**: image_url あり、images は空
- **操作**: 詳細ページにアクセス
- **期待**: メイン画像が表示され、ギャラリーセクションは非表示
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S10

### SC-UA-011: ギャラリーのみ設定（メイン画像非表示）
- **対象**: `/[lang]/partnership/[id]`
- **前提**: image_url が空、images に1件以上あり
- **操作**: 詳細ページにアクセス
- **期待**: メイン画像セクションが非表示、ギャラリーが表示される
- **テストファイル**: `e2e/tests/partnership-features.spec.ts` > S11（テストデータ次第でスキップ）

## 管理画面（認証済み前提）

### SC-UA-008: モーダル ESC 閉じ
- **対象**: `/admin/partnership/opportunities`
- **操作**: 新規作成ボタン → ESC キー
- **期待**: モーダルが閉じる
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S8（認証不可時スキップ）

### SC-UA-009: モーダル背景クリック閉じ
- **対象**: `/admin/partnership/opportunities`
- **操作**: 新規作成ボタン → 背景クリック
- **期待**: モーダルが閉じる
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S8（認証不可時スキップ）

### SC-UA-012: メイン画像・ギャラリー画像セクションの独立表示
- **対象**: `/admin/partnership/opportunities`（新規作成 or 編集モーダル）
- **操作**: モーダルを開く
- **期待**: 「メイン画像」セクションと「ギャラリー画像」セクションが両方独立して表示される
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S12（認証不可時スキップ）

### SC-UA-024: DnD ドラッグハンドル表示
- **対象**: `/admin/partnership/opportunities`（編集モーダル・ギャラリー画像登録済み）
- **操作**: 編集モーダルを開く
- **期待**: ギャラリー各画像行にドラッグハンドル（≡ アイコン）が表示される
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S24（認証不可時スキップ）

### SC-UA-026: URL 折りたたみ（details 要素）
- **対象**: `/admin/partnership/opportunities`（編集モーダル・ギャラリー画像登録済み）
- **操作**: 画像カードの summary をクリック
- **期待**: details 要素が展開され URL が表示される
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S26（認証不可時スキップ）

### SC-UA-027: メイン画像アップロード・URL 入力欄表示
- **対象**: `/admin/partnership/opportunities`（新規作成 or 編集モーダル）
- **操作**: モーダルを開く
- **期待**: メイン画像セクションにファイルアップロード欄または URL 入力欄が表示される
- **テストファイル**: `e2e/tests/partnership-admin.spec.ts` > S27（認証不可時スキップ）

## カルーセル スマホレスポンシブ

### SC-UA-020: スマホビューポートでカルーセル表示
- **対象**: `/[lang]/partnership/[id]`（images 1件以上の案件）
- **viewport**: 375x667（iPhone SE）
- **操作**: 詳細ページにアクセス
- **期待**: ギャラリーセクションが表示される
- **テストファイル**: `e2e/tests/partnership-carousel-responsive.spec.ts` > S20（テストデータ待ち）

### SC-UA-021: スマホ用レスポンシブクラス適用
- **対象**: `components/partnership/ImageCarousel.tsx` および スマホビューポート実ブラウザ
- **期待**:
  - スライドに `basis-full` が適用（センターモード解除）
  - 矢印ボタンに `bg-black/40 backdrop-blur-sm` が適用
  - キャプションに `text-xs` が適用
- **テストファイル**: `e2e/tests/partnership-carousel-responsive.spec.ts` > S21-STATIC（✅ パス）、S21（テストデータ待ち）

### SC-UA-022: スマホビューポートでスワイプ操作
- **対象**: `/[lang]/partnership/[id]`（images 複数の案件）
- **viewport**: 375x667
- **操作**: 左スワイプ（マウスドラッグ）
- **期待**: スライドが次の画像に切り替わる（embla 標準スワイプ動作）
- **テストファイル**: `e2e/tests/partnership-carousel-responsive.spec.ts` > S22（テストデータ待ち）

### SC-UA-023: PC ビューポートでセンターモード
- **対象**: `/[lang]/partnership/[id]`（images 複数の案件）
- **viewport**: 1280x720
- **期待**:
  - スライドに `md:basis-[60%]` が適用（センターモード有効）
  - 矢印ボタンに `md:bg-white/90` が適用
- **テストファイル**: `e2e/tests/partnership-carousel-responsive.spec.ts` > S23-STATIC（✅ パス）、S23（テストデータ待ち）

## Lightbox 背景タップクローズ（closest 方式）

> 実装方式: `data-lightbox-content` 属性 + `closest()` 判定。pointer-events / stopPropagation 方式は廃止。

### SC-UA-030: Lightbox 開閉
- **対象**: `/[lang]/partnership/[id]`（images 1件以上の案件）
- **操作**: ギャラリー画像クリック
- **期待**: Lightbox（role="dialog"）が表示される
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S30（テストデータ待ち）、S30-STATIC（✅ パス）

### SC-UA-031: 背景クリックで Lightbox が閉じる
- **対象**: Lightbox 表示中
- **操作**: 画像左右の暗い領域クリック
- **期待**: Lightbox が閉じる（クリックターゲットの祖先に data-lightbox-content がなければ onClose 発火）
- **静的検証**: closest('[data-lightbox-content]') がオーバーレイ onClick 内で使われていること（✅ パス）
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S31（テストデータ待ち）

### SC-UA-032: 画像本体クリックで Lightbox が閉じない
- **対象**: Lightbox 表示中
- **操作**: 画像本体クリック
- **期待**: Lightbox が閉じない（data-lightbox-content 内クリックのため onClose が呼ばれない）
- **静的検証**: data-lightbox-content が画像コンテナに定義されていること（✅ パス）
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S32（テストデータ待ち）

### SC-UA-033: × ボタンで Lightbox が閉じる
- **対象**: Lightbox 表示中
- **操作**: aria-label="Close" ボタンクリック
- **期待**: Lightbox が閉じる（onClick={onClose} 直接呼び出し）
- **静的検証**: aria-label="Close" + data-lightbox-content が × ボタンに定義されていること（✅ パス）
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S33（テストデータ待ち）

### SC-UA-034: ESC キーで Lightbox が閉じる
- **対象**: Lightbox 表示中
- **操作**: ESC キー押下
- **期待**: Lightbox が閉じる
- **静的検証**: `e.key === 'Escape'` ハンドラが定義されていること（✅ パス）
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S34（テストデータ待ち）

### SC-UA-035: モバイルビューポートでの Lightbox 動作
- **対象**: `/[lang]/partnership/[id]`（images 1件以上の案件）
- **viewport**: 375x667（iPhone SE）
- **操作**: 背景タップ → 閉じる、画像タップ → 閉じない
- **テストファイル**: `e2e/tests/partnership-lightbox.spec.ts` > S35（テストデータ待ち）
