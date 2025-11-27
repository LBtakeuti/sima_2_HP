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
  process.exit(1)
}

console.log('🔧 Supabaseに接続中...')
console.log(`URL: ${supabaseUrl}`)

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createContactsTable() {
  console.log('\n📝 contactsテーブルを作成中...\n')

  // PostgreSQL関数を使用してSQLを実行
  const createTableSQL = `
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
`

  const createIndexesSQL = `
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts (status);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_service_id_idx ON contacts (service_id) WHERE service_id IS NOT NULL;
`

  const setupRLSSQL = `
-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
`

  const dropPoliciesSQL = `
-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Allow contact submissions" ON contacts;
DROP POLICY IF EXISTS "Allow anyone to submit contacts" ON contacts;
DROP POLICY IF EXISTS "Allow admin to view contacts" ON contacts;
DROP POLICY IF EXISTS "Allow admin to update contacts" ON contacts;
`

  const createPoliciesSQL = `
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
    // 各SQLを順番に実行
    const sqls = [
      { name: 'テーブル作成', sql: createTableSQL },
      { name: 'インデックス作成', sql: createIndexesSQL },
      { name: 'RLS有効化', sql: setupRLSSQL },
      { name: 'ポリシー削除', sql: dropPoliciesSQL },
      { name: 'ポリシー作成', sql: createPoliciesSQL }
    ]

    for (const { name, sql } of sqls) {
      console.log(`⏳ ${name}中...`)
      
      // Supabaseのrest APIを直接使用してSQLを実行
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ query: sql })
      })

      if (!response.ok && response.status !== 404) {
        const error = await response.text()
        console.log(`⚠️  ${name}をスキップ（既に存在するか、別の方法が必要）`)
      }
    }

    console.log('\n✅ SQLの実行を完了しました')
    console.log('\n📊 テーブルの確認中...')

    // テーブルが存在するか確認
    const { data, error } = await supabase
      .from('contacts')
      .select('id')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        console.error('\n❌ contactsテーブルが作成できませんでした')
        console.error('\n以下の方法で手動で作成してください：')
        console.error('\n1. https://supabase.com/dashboard/project/' + supabaseUrl.match(/https:\/\/([^.]+)/)[1] + '/sql/new')
        console.error('2. 上記のSQLをすべてコピー＆ペースト')
        console.error('3. 「Run」をクリック\n')
        process.exit(1)
      }
      throw error
    }

    console.log('✅ contactsテーブルの作成に成功しました！')
    console.log('\n🧪 テストを実行してください：')
    console.log('   http://localhost:3002/ja/contact\n')
    
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message)
    console.error('\n📋 手動でのセットアップが必要です')
    console.error('詳細は setup_contacts_table.sql ファイルを参照してください\n')
    process.exit(1)
  }
}

createContactsTable()



