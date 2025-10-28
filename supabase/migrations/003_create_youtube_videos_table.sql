-- YouTube動画管理テーブル
CREATE TABLE youtube_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  youtube_url TEXT NOT NULL,
  title_ja TEXT NOT NULL,
  title_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- インデックス作成
CREATE INDEX youtube_videos_display_order_idx ON youtube_videos (display_order);
CREATE INDEX youtube_videos_is_published_idx ON youtube_videos (is_published);

-- RLS（Row Level Security）を有効化
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- ポリシー：全ユーザーが公開済み動画を閲覧可能
CREATE POLICY "Public can view published videos" ON youtube_videos
  FOR SELECT
  USING (is_published = true);

-- ポリシー：管理者のみが全データを閲覧・編集可能
CREATE POLICY "Admin can view all videos" ON youtube_videos
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can insert videos" ON youtube_videos
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can update videos" ON youtube_videos
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

CREATE POLICY "Admin can delete videos" ON youtube_videos
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- サンプルデータ挿入（後で実際のURLに置き換えてください）
INSERT INTO youtube_videos (youtube_url, title_ja, title_en, display_order) VALUES
  ('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '動画タイトル 1', 'Video Title 1', 1),
  ('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '動画タイトル 2', 'Video Title 2', 2),
  ('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '動画タイトル 3', 'Video Title 3', 3),
  ('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '動画タイトル 4', 'Video Title 4', 4);
