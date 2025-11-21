import { createClient } from './client'
import type { ContactInsert } from '@/lib/types/contact'

// クライアントサイドからの投稿
export async function submitContact(data: ContactInsert): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // Supabaseにデータを保存
    const { error } = await supabase
      .from('contacts')
      .insert(data)

    if (error) {
      // 開発環境のみエラー詳細をログ出力
      console.error('Contact submission error:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return { success: false, error: `お問い合わせの送信に失敗しました: ${error.message}` }
    }

    // メール通知を送信（非同期で実行）
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          message: data.message,
          language: data.language,
          serviceName: data.service_name,
        }),
      })

      if (!response.ok) {
        // メール送信に失敗してもデータは保存されているのでエラーログのみ
        console.error('Email notification failed, but contact data was saved')
        if (process.env.NODE_ENV === 'development') {
          const errorData = await response.json()
          console.error('Email error details:', errorData)
        }
      } else {
        const result = await response.json()
        if (process.env.NODE_ENV === 'development') {
          console.log(`Email notification sent to ${result.recipients} recipient(s)`)
        }
      }
    } catch (emailError) {
      // メール送信エラーは致命的ではないのでログのみ
      console.error('Email notification error:', emailError)
      // データは保存されているので成功として扱う
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