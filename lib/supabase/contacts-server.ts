import { createClient as createServerClient } from './server'
import type { Contact } from '@/lib/types/contact'

// サーバーサイドでのお問い合わせ取得（管理機能用）
export async function getContacts(): Promise<Contact[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contacts:', error)
    return []
  }

  return data || []
}

// サーバーサイドでの単一お問い合わせ取得
export async function getContact(id: string): Promise<Contact | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching contact:', error)
    return null
  }

  return data
}

// お問い合わせステータス更新（管理機能用）
export async function updateContactStatus(
  id: string,
  status: 'pending' | 'in_progress' | 'completed',
  adminNote?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerClient()

  const updateData: any = { status }
  if (adminNote !== undefined) {
    updateData.admin_note = adminNote
  }

  const { error } = await supabase
    .from('contacts')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Error updating contact:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}