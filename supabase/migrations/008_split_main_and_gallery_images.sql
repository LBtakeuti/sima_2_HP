-- パートナーシップ案件のメイン画像とギャラリー画像のフィールドを完全に分離する
-- ・image_url: メイン画像専用（一覧サムネ・詳細ヘッダー用）
-- ・images JSONB: ギャラリー専用（カルーセル用、{url, caption}[]）
-- 旧実装では「images[0] をカバー画像として流用」していたため、その整合性を解消する。

-- ケース1: image_url が空 で images に画像がある場合
--   → images[0].url を image_url にコピーしてメイン画像を補完する
UPDATE partnership_opportunities
SET image_url = images->0->>'url'
WHERE (image_url IS NULL OR image_url = '')
  AND jsonb_array_length(images) > 0;

-- ケース2: image_url が images[0].url と完全一致する場合
--   → 旧仕様で images[0] をカバー画像扱いしていたデータと判定し、
--     images の先頭1件を取り除いてギャラリーから除外する
UPDATE partnership_opportunities
SET images = (
  SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
  FROM jsonb_array_elements(images) WITH ORDINALITY AS arr(elem, idx)
  WHERE idx > 1
)
WHERE jsonb_array_length(images) > 0
  AND images->0->>'url' = image_url;

-- 安全策: images が NULL になっているレコードを空配列に正規化
UPDATE partnership_opportunities
SET images = '[]'::jsonb
WHERE images IS NULL;

-- カラム説明の更新
COMMENT ON COLUMN partnership_opportunities.image_url IS 'メイン画像（一覧サムネ・詳細ヘッダー用）';
COMMENT ON COLUMN partnership_opportunities.images IS 'ギャラリー画像配列（カルーセル用、{url, caption}[]）';
