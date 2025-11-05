-- Security improvements and rate limiting for contacts table

-- 1. Create rate limiting function
-- この関数は同じメールアドレスまたはIPから短時間に複数の投稿を防ぎます
CREATE OR REPLACE FUNCTION check_contact_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INTEGER;
  time_window INTERVAL := '5 minutes';
  max_submissions INTEGER := 3;
BEGIN
  -- メールアドレスベースのレート制限チェック
  SELECT COUNT(*)
  INTO recent_count
  FROM contacts
  WHERE email = NEW.email
    AND created_at > NOW() - time_window;

  IF recent_count >= max_submissions THEN
    RAISE EXCEPTION 'レート制限に達しました。しばらく経ってから再度お試しください。';
  END IF;

  -- IPアドレスベースのレート制限チェック（IPが記録されている場合）
  IF NEW.ip_address IS NOT NULL THEN
    SELECT COUNT(*)
    INTO recent_count
    FROM contacts
    WHERE ip_address = NEW.ip_address
      AND created_at > NOW() - time_window;

    IF recent_count >= max_submissions THEN
      RAISE EXCEPTION 'レート制限に達しました。しばらく経ってから再度お試しください。';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. レート制限トリガーを作成
DROP TRIGGER IF EXISTS contact_rate_limit_trigger ON contacts;
CREATE TRIGGER contact_rate_limit_trigger
  BEFORE INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION check_contact_rate_limit();

-- 3. 入力バリデーション関数
CREATE OR REPLACE FUNCTION validate_contact_input()
RETURNS TRIGGER AS $$
BEGIN
  -- 名前の長さチェック
  IF LENGTH(TRIM(NEW.name)) < 1 OR LENGTH(TRIM(NEW.name)) > 100 THEN
    RAISE EXCEPTION 'お名前は1文字以上100文字以内で入力してください。';
  END IF;

  -- メールアドレスの長さチェック
  IF LENGTH(TRIM(NEW.email)) < 3 OR LENGTH(TRIM(NEW.email)) > 255 THEN
    RAISE EXCEPTION 'メールアドレスは3文字以上255文字以内で入力してください。';
  END IF;

  -- メッセージの長さチェック
  IF LENGTH(TRIM(NEW.message)) < 10 OR LENGTH(TRIM(NEW.message)) > 5000 THEN
    RAISE EXCEPTION 'メッセージは10文字以上5000文字以内で入力してください。';
  END IF;

  -- 会社名の長さチェック（指定されている場合）
  IF NEW.company IS NOT NULL AND LENGTH(TRIM(NEW.company)) > 200 THEN
    RAISE EXCEPTION '会社名は200文字以内で入力してください。';
  END IF;

  -- 電話番号の長さチェック（指定されている場合）
  IF NEW.phone IS NOT NULL AND LENGTH(TRIM(NEW.phone)) > 50 THEN
    RAISE EXCEPTION '電話番号は50文字以内で入力してください。';
  END IF;

  -- データのトリミング（前後の空白を削除）
  NEW.name := TRIM(NEW.name);
  NEW.email := LOWER(TRIM(NEW.email));
  NEW.message := TRIM(NEW.message);
  
  IF NEW.company IS NOT NULL THEN
    NEW.company := TRIM(NEW.company);
  END IF;
  
  IF NEW.phone IS NOT NULL THEN
    NEW.phone := TRIM(NEW.phone);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. バリデーショントリガーを作成
DROP TRIGGER IF EXISTS contact_validation_trigger ON contacts;
CREATE TRIGGER contact_validation_trigger
  BEFORE INSERT OR UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION validate_contact_input();

-- 5. RLSポリシーの改善
-- 既存のINSERTポリシーを削除して、より安全なものに置き換え
DROP POLICY IF EXISTS "Allow contact submissions" ON contacts;

-- 新しいINSERTポリシー: 認証なしでも投稿可能だが、レート制限が適用される
CREATE POLICY "Allow public contact submissions" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- SELECTポリシーの改善: 認証されたユーザーのみ閲覧可能
DROP POLICY IF EXISTS "Allow admin to view contacts" ON contacts;
CREATE POLICY "Allow authenticated users to view contacts" ON contacts
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- UPDATEポリシーの改善
DROP POLICY IF EXISTS "Allow admin to update contacts" ON contacts;
CREATE POLICY "Allow authenticated users to update contacts" ON contacts
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- 6. DELETEポリシーを追加: 認証されたユーザーのみ削除可能
CREATE POLICY "Allow authenticated users to delete contacts" ON contacts
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- 7. インデックスの追加（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS contacts_ip_address_created_at_idx 
  ON contacts (ip_address, created_at DESC) 
  WHERE ip_address IS NOT NULL;

CREATE INDEX IF NOT EXISTS contacts_email_created_at_idx 
  ON contacts (email, created_at DESC);

-- 8. コメントを追加（ドキュメント目的）
COMMENT ON FUNCTION check_contact_rate_limit() IS 
  'レート制限チェック: 同じメールまたはIPから5分間に3回以上の投稿を防ぐ';

COMMENT ON FUNCTION validate_contact_input() IS 
  '入力バリデーション: 各フィールドの長さと形式をチェックし、データをサニタイズする';

COMMENT ON TABLE contacts IS 
  'お問い合わせ情報を保存するテーブル。レート制限とバリデーションが適用されます。';

