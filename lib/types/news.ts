export type NewsStatus = 'draft' | 'published'

export interface News {
  id: string
  created_at: string
  updated_at: string
  published_date: string
  status: NewsStatus
  title_ja: string
  title_en: string
  title_hi: string
  content_ja: string
  content_en: string
  content_hi: string
  thumbnail_url: string | null
  slug: string | null
}

export type NewsInsert = Omit<News, 'id' | 'created_at' | 'updated_at'>
export type NewsUpdate = Partial<NewsInsert>

export interface LocalizedNews {
  id: string
  title: string
  content: string
  published_date: string
  status: NewsStatus
  thumbnail_url: string | null
}