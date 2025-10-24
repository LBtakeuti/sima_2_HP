import { createClient } from '@supabase/supabase-js'

/**
 * クライアントサイドで認証状態をチェック
 */
export async function checkAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  return { user, error }
}

/**
 * ログアウト処理
 */
export async function signOut() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.auth.signOut()

  return { error }
}
