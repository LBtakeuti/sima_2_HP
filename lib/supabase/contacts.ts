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
      console.error('Contact submission error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Contact submission error:', error)
    return { success: false, error: 'エラーが発生しました' }
  }
}