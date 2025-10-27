import { createClient } from '@/lib/supabase/client'

/**
 * クライアントサイドで認証状態をチェック
 */
export async function checkAuth() {
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  return { user, error }
}

/**
 * ログアウト処理
 */
export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  return { error }
}
