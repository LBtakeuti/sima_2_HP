-- お問い合わせフォームのRLSポリシーを修正
-- 匿名ユーザー（ログインしていないユーザー）でも送信できるようにする

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Allow contact submissions" ON contacts;

-- 新しいポリシーを作成：匿名ユーザーを含む全員がINSERT可能
CREATE POLICY "Allow anyone to submit contacts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 確認用のコメント
COMMENT ON POLICY "Allow anyone to submit contacts" ON contacts IS 
'匿名ユーザーおよび認証済みユーザーがお問い合わせを送信できる';



