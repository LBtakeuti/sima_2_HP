#!/usr/bin/env node

/**
 * 初期管理者ユーザーを作成するスクリプト
 *
 * 実行方法:
 * node scripts/create-admin-user.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const readline = require('readline')

// コマンドラインから入力を受け取る
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ エラー: 環境変数が設定されていません')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
    console.error('\n.env.local ファイルに以下の変数を設定してください:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=your-project-url')
    console.error('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
    process.exit(1)
  }

  // Service Role Keyを使用してSupabaseクライアントを作成
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('='.repeat(60))
  console.log('管理者ユーザー作成スクリプト')
  console.log('='.repeat(60))
  console.log('')

  // ユーザーから情報を取得
  const ADMIN_EMAIL = await question('管理者メールアドレスを入力してください: ')
  const ADMIN_PASSWORD = await question('管理者パスワードを入力してください（8文字以上）: ')
  const CONFIRM_PASSWORD = await question('パスワードを再入力してください: ')

  rl.close()

  // バリデーション
  if (!ADMIN_EMAIL || !ADMIN_EMAIL.includes('@')) {
    console.error('❌ エラー: 有効なメールアドレスを入力してください')
    process.exit(1)
  }

  if (ADMIN_PASSWORD.length < 8) {
    console.error('❌ エラー: パスワードは8文字以上で設定してください')
    process.exit(1)
  }

  if (ADMIN_PASSWORD !== CONFIRM_PASSWORD) {
    console.error('❌ エラー: パスワードが一致しません')
    process.exit(1)
  }

  console.log('')
  console.log('📧 管理者ユーザーを作成中...')
  console.log('Email:', ADMIN_EMAIL)

  try {
    // ユーザーを作成
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true, // メール確認をスキップ
    })

    if (error) {
      if (error.message.includes('already exists') || error.message.includes('already registered')) {
        console.log('ℹ️  このユーザーは既に存在します')
        console.log('✅ 既存のアカウントでログインできます')
      } else {
        console.error('❌ エラー:', error.message)
        process.exit(1)
      }
    } else {
      console.log('✅ 管理者ユーザーの作成に成功しました!')
      console.log('   User ID:', data.user.id)
      console.log('   Email:', data.user.email)
      console.log('\n🔗 ログインページ: http://localhost:3000/admin/login')
      console.log('\n⚠️  セキュリティのため、パスワードは安全に保管してください')
    }
  } catch (err) {
    console.error('❌ 予期しないエラー:', err)
    process.exit(1)
  }
}

createAdminUser()
