-- ========================================
-- お問い合わせテーブルのセットアップ
-- ========================================
-- このSQLをSupabaseダッシュボードで実行してください

-- 既存のテーブルがあれば削除（オプション）
-- DROP TABLE IF EXISTS contacts CASCADE;

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('ja', 'en', 'hi')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_note TEXT,
  user_agent TEXT,
  ip_address INET,
  service_name TEXT,
  service_id TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts (status);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_service_id_idx ON contacts (service_id) WHERE service_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Allow contact submissions" ON contacts;
DROP POLICY IF EXISTS "Allow anyone to submit contacts" ON contacts;
DROP POLICY IF EXISTS "Allow admin to view contacts" ON contacts;
DROP POLICY IF EXISTS "Allow admin to update contacts" ON contacts;

-- 新しいポリシー: 匿名ユーザーと認証済みユーザーがお問い合わせを送信可能
CREATE POLICY "Allow anyone to submit contacts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ポリシー: 管理者のみが全データを閲覧可能
CREATE POLICY "Allow admin to view contacts" ON contacts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- ポリシー: 管理者のみがデータを更新可能
CREATE POLICY "Allow admin to update contacts" ON contacts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- 確認用のコメント
COMMENT ON TABLE contacts IS 'お問い合わせフォームから送信されたデータを保存';
COMMENT ON POLICY "Allow anyone to submit contacts" ON contacts IS '匿名ユーザーおよび認証済みユーザーがお問い合わせを送信できる';

-- テーブルが正常に作成されたか確認
SELECT 
  'contacts table created successfully' as message,
  COUNT(*) as row_count
FROM contacts;



