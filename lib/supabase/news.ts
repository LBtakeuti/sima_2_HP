import { createClient } from './server'

// ニュースカテゴリの型定義
export type NewsCategory = {
  id: string
  created_at: string
  updated_at: string
  name_ja: string
  name_en: string
  slug: string
  color: 'green' | 'blue' | 'purple' | 'gray' | 'red' | 'yellow'
  display_order: number
  is_active: boolean
}

// ニュース記事の型定義
export type NewsArticle = {
  id: string
  created_at: string
  updated_at: string
  title_ja: string
  title_en: string
  excerpt_ja: string | null
  excerpt_en: string | null
  content_ja: string
  content_en: string
  image_url: string
  category_id: string | null
  published_date: string
  status: 'draft' | 'published'
  display_order: number
  featured: boolean
  category?: NewsCategory | null
}

/**
 * アクティブなニュースカテゴリを全て取得
 */
export async function getActiveNewsCategories(): Promise<NewsCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching news categories:', error)
    return []
  }

  return data || []
}

/**
 * 公開済みのニュース記事を取得（オプションでカテゴリフィルタ）
 */
export async function getPublishedNews(
  categorySlug?: string
): Promise<NewsArticle[]> {
  const supabase = await createClient()

  let query = supabase
    .from('news')
    .select(`
      *,
      category:news_categories(*)
    `)
    .eq('status', 'published')
    .order('published_date', { ascending: false })
    .order('display_order', { ascending: true })

  // カテゴリフィルタが指定されている場合
  if (categorySlug) {
    const { data: category } = await supabase
      .from('news_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

/**
 * IDでニュース記事を取得
 */
export async function getNewsById(
  id: string
): Promise<NewsArticle | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(*)
    `)
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching news:', error)
    return null
  }

  return data
}

/**
 * 全てのニュース記事を取得（管理画面用）
 */
export async function getAllNews(): Promise<NewsArticle[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select(`
      *,
      category:news_categories(*)
    `)
    .order('published_date', { ascending: false })
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching all news:', error)
    return []
  }

  return data || []
}

/**
 * 全てのニュースカテゴリを取得（管理画面用）
 */
export async function getAllNewsCategories(): Promise<NewsCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news_categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching all news categories:', error)
    return []
  }

  return data || []
}
