#!/usr/bin/env node

/**
 * 初期管理者ユーザーを作成するスクリプト
 *
 * 実行方法:
 * node scripts/create-admin-user.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const ADMIN_EMAIL = 'takeuchi@landbridge.co.jp'
const ADMIN_PASSWORD = 'test12345!'

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
        console.log('✅ 以下の情報でログインできます:')
        console.log('   Email:', ADMIN_EMAIL)
        console.log('   Password:', ADMIN_PASSWORD)
      } else {
        console.error('❌ エラー:', error.message)
        process.exit(1)
      }
    } else {
      console.log('✅ 管理者ユーザーの作成に成功しました!')
      console.log('   User ID:', data.user.id)
      console.log('   Email:', data.user.email)
      console.log('\n以下の情報でログインできます:')
      console.log('   Email:', ADMIN_EMAIL)
      console.log('   Password:', ADMIN_PASSWORD)
      console.log('\n🔗 ログインページ: http://localhost:3000/admin/login')
    }
  } catch (err) {
    console.error('❌ 予期しないエラー:', err)
    process.exit(1)
  }
}

createAdminUser()
