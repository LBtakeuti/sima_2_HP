-- partnership_opportunities テーブル拡張
-- 1. tags カラム追加（言語非依存の自由入力タグ）
ALTER TABLE partnership_opportunities
  ADD COLUMN tags TEXT[] DEFAULT '{}';

-- 2. images カラム追加（JSONB: [{url, caption}, ...]）
ALTER TABLE partnership_opportunities
  ADD COLUMN images JSONB DEFAULT '[]'::jsonb;

-- 3. 既存 image_url を images JSONB に移行（caption は空文字列）
UPDATE partnership_opportunities
SET images = jsonb_build_array(
  jsonb_build_object('url', image_url, 'caption', '')
)
WHERE image_url IS NOT NULL AND image_url != '';

-- 4. image_url カラムは後方互換のため残す（NULL 許可化）
ALTER TABLE partnership_opportunities
  ALTER COLUMN image_url DROP NOT NULL;

-- 5. インデックス（tags 検索高速化用）
CREATE INDEX IF NOT EXISTS idx_partnership_opportunities_tags
  ON partnership_opportunities USING GIN (tags);
