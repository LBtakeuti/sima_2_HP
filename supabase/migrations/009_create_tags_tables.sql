-- ========================================
-- 009: タグの正規化（SEO 対応 Step 1）
-- ========================================
-- 1. tags マスタテーブル
-- 2. partnership_opportunity_tags 中間テーブル
-- 3. 既存 partnership_opportunities.tags TEXT[] を空配列にリセット
--    （案C: テストデータのみのため全削除、運用開始時に新規登録）
-- 4. RLS ポリシー（公開: SELECT 可 / 管理者: 全操作可）

-- ----------------------------------------
-- tags テーブル
-- ----------------------------------------
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ja TEXT NOT NULL UNIQUE,
  name_en TEXT,
  slug TEXT NOT NULL UNIQUE,
  description_ja TEXT,
  description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- スラッグは英数字・ハイフンのみ
  CONSTRAINT tags_slug_pattern CHECK (slug ~ '^[a-z0-9-]+$')
);

CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_name_ja ON tags(name_ja);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_tags_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tags_updated_at
  BEFORE UPDATE ON tags
  FOR EACH ROW
  EXECUTE FUNCTION update_tags_updated_at();

-- ----------------------------------------
-- partnership_opportunity_tags 中間テーブル
-- ----------------------------------------
CREATE TABLE partnership_opportunity_tags (
  opportunity_id UUID NOT NULL REFERENCES partnership_opportunities(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (opportunity_id, tag_id)
);

CREATE INDEX idx_pot_opportunity ON partnership_opportunity_tags(opportunity_id);
CREATE INDEX idx_pot_tag ON partnership_opportunity_tags(tag_id);

-- ----------------------------------------
-- 既存タグデータのリセット（案C: 全削除）
-- ----------------------------------------
UPDATE partnership_opportunities SET tags = '{}';

-- ----------------------------------------
-- RLS ポリシー
-- ----------------------------------------
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_opportunity_tags ENABLE ROW LEVEL SECURITY;

-- tags: 公開ユーザー SELECT 可
CREATE POLICY "Public can view tags"
  ON tags FOR SELECT
  USING (true);

-- tags: 管理者のみ INSERT/UPDATE/DELETE 可
-- （既存 partnership_opportunities ポリシーと同じ current_setting 方式を踏襲）
CREATE POLICY "Admin can insert tags"
  ON tags FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can update tags"
  ON tags FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can delete tags"
  ON tags FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- partnership_opportunity_tags: 公開ユーザー SELECT 可（公開記事の関連タグ取得用）
CREATE POLICY "Public can view opportunity tags"
  ON partnership_opportunity_tags FOR SELECT
  USING (true);

-- partnership_opportunity_tags: 管理者のみ INSERT/DELETE 可
CREATE POLICY "Admin can insert opportunity tags"
  ON partnership_opportunity_tags FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can delete opportunity tags"
  ON partnership_opportunity_tags FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- ----------------------------------------
-- カラムコメント
-- ----------------------------------------
COMMENT ON TABLE tags IS 'タグマスタ（SEO 対応用、slug でタグ別アーカイブページに利用）';
COMMENT ON COLUMN tags.slug IS 'URL セーフな英数字スラッグ（^[a-z0-9-]+$）';
COMMENT ON TABLE partnership_opportunity_tags IS 'パートナーシップ案件とタグの多対多関連';
