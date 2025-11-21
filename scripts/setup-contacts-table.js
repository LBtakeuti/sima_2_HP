const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// .env.localから環境変数を読み込む
const envContent = fs.readFileSync('.env.local', 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey === 'your-service-role-key') {
  console.error('❌ 環境変数が正しく設定されていません')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupContactsTable() {
  console.log('📝 contactsテーブルをセットアップ中...\n')

  const sql = `
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
  `

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      // rpcが使えない場合は、直接SQLを実行
      console.log('⚠️  RPC経由での実行に失敗しました。代替方法を試行中...\n')
      
      // テーブル作成を試みる
      const { error: createError } = await supabase
        .from('contacts')
        .select('*')
        .limit(1)
      
      if (createError && createError.code === 'PGRST116') {
        console.error('❌ contactsテーブルが存在しません')
        console.error('\n以下のSQLを手動でSupabaseダッシュボードで実行してください：')
        console.error('=' .repeat(80))
        console.log(sql)
        console.error('=' .repeat(80))
        console.error('\n実行方法：')
        console.error('1. https://supabase.com/dashboard にアクセス')
        console.error('2. プロジェクトを選択')
        console.error('3. 左メニューから「SQL Editor」を選択')
        console.error('4. 上記のSQLをコピー＆ペースト')
        console.error('5. 「Run」をクリック\n')
        process.exit(1)
      } else if (!createError) {
        console.log('✅ contactsテーブルは既に存在しています！')
      }
    } else {
      console.log('✅ contactsテーブルのセットアップが完了しました！')
    }

    // テーブルの確認
    console.log('\n📊 テーブルの確認中...')
    const { data: testData, error: testError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)

    if (testError) {
      console.error('❌ エラー:', testError.message)
      process.exit(1)
    } else {
      console.log('✅ contactsテーブルに正常にアクセスできました')
      console.log(`   現在のレコード数: ${testData?.length || 0}`)
    }

    console.log('\n✨ セットアップ完了！')
    console.log('お問い合わせフォームをテストしてください: http://localhost:3002/ja/contact')
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message)
    console.error('\n以下のSQLを手動でSupabaseダッシュボードで実行してください：')
    console.error('=' .repeat(80))
    console.log(sql)
    console.error('=' .repeat(80))
    process.exit(1)
  }
}

setupContactsTable()


