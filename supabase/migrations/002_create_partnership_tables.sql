-- カテゴリマスタテーブル（業種）
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- パートナーシップ案件テーブル
CREATE TABLE partnership_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title_ja TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ja TEXT NOT NULL,
  description_en TEXT NOT NULL,
  content_ja TEXT,
  content_en TEXT,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  display_order INTEGER DEFAULT 0,
  meta_title_ja TEXT,
  meta_title_en TEXT,
  meta_description_ja TEXT,
  meta_description_en TEXT
);

-- インデックス作成
CREATE INDEX categories_slug_idx ON categories (slug);
CREATE INDEX categories_display_order_idx ON categories (display_order);
CREATE INDEX partnership_opportunities_category_id_idx ON partnership_opportunities (category_id);
CREATE INDEX partnership_opportunities_status_idx ON partnership_opportunities (status);
CREATE INDEX partnership_opportunities_display_order_idx ON partnership_opportunities (display_order);

-- RLS（Row Level Security）を有効化
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_opportunities ENABLE ROW LEVEL SECURITY;

-- ポリシー：全ユーザーが公開済みデータを閲覧可能
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view published opportunities" ON partnership_opportunities
  FOR SELECT
  USING (status = 'published');

-- ポリシー：管理者のみが全データを閲覧・編集可能
CREATE POLICY "Admin can view all categories" ON categories
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can insert categories" ON categories
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can update categories" ON categories
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can delete categories" ON categories
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can view all opportunities" ON partnership_opportunities
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can insert opportunities" ON partnership_opportunities
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can update opportunities" ON partnership_opportunities
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can delete opportunities" ON partnership_opportunities
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- サンプルデータ挿入
INSERT INTO categories (name_ja, name_en, slug, display_order) VALUES
  ('デジタルコマース', 'Digital Commerce', 'digital-commerce', 1),
  ('メディカルテック', 'Medical Tech', 'medical-tech', 2),
  ('アグリテック', 'Agri Tech', 'agri-tech', 3),
  ('フィンテック', 'Fintech', 'fintech', 4),
  ('エンタープライズソフトウェア', 'Enterprise Software', 'enterprise-software', 5),
  ('製造業DX', 'Manufacturing DX', 'manufacturing-dx', 6);
