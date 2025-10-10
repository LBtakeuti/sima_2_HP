export type ContactStatus = 'pending' | 'in_progress' | 'completed'
export type Language = 'ja' | 'en' | 'hi'

export interface Contact {
  id: string
  created_at: string
  name: string
  company: string | null
  email: string
  phone: string | null
  message: string
  language: Language
  status: ContactStatus
  admin_note: string | null
  user_agent: string | null
  ip_address: string | null
}

export type ContactInsert = Omit<Contact, 'id' | 'created_at' | 'status' | 'admin_note'>
export type ContactUpdate = Partial<Pick<Contact, 'status' | 'admin_note'>>