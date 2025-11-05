import { createClient } from './client'
import type { ContactInsert } from '@/lib/types/contact'

// クライアントサイドからの投稿
export async function submitContact(data: ContactInsert): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('contacts')
      .insert(data)

    if (error) {
      // 開発環境のみエラー詳細をログ出力
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact submission error:', error)
      }
      return { success: false, error: 'お問い合わせの送信に失敗しました' }
    }

    return { success: true }
  } catch (error) {
    // 開発環境のみエラー詳細をログ出力
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact submission error:', error)
    }
    return { success: false, error: 'エラーが発生しました' }
  }
}