import { createClient } from './server'

// カテゴリの型定義
export type Category = {
  id: string
  created_at: string
  updated_at: string
  name_ja: string
  name_en: string
  slug: string
  display_order: number
  is_active: boolean
}

// パートナーシップ案件の型定義
export type PartnershipOpportunity = {
  id: string
  created_at: string
  updated_at: string
  title_ja: string
  title_en: string
  description_ja: string
  description_en: string
  content_ja: string | null
  content_en: string | null
  image_url: string
  category_id: string | null
  status: 'draft' | 'published'
  display_order: number
  meta_title_ja: string | null
  meta_title_en: string | null
  meta_description_ja: string | null
  meta_description_en: string | null
  category?: Category | null
}

/**
 * アクティブなカテゴリを全て取得
 */
export async function getActiveCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

/**
 * 公開済みのパートナーシップ案件を取得（オプションでカテゴリフィルタ）
 */
export async function getPublishedOpportunities(
  categorySlug?: string
): Promise<PartnershipOpportunity[]> {
  const supabase = await createClient()

  let query = supabase
    .from('partnership_opportunities')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('status', 'published')
    .order('display_order', { ascending: true })

  // カテゴリフィルタが指定されている場合
  if (categorySlug) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching opportunities:', error)
    return []
  }

  return data || []
}

/**
 * IDでパートナーシップ案件を取得
 */
export async function getOpportunityById(
  id: string
): Promise<PartnershipOpportunity | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('partnership_opportunities')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching opportunity:', error)
    return null
  }

  return data
}

/**
 * 全てのパートナーシップ案件を取得（管理画面用）
 */
export async function getAllOpportunities(): Promise<PartnershipOpportunity[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('partnership_opportunities')
    .select(`
      *,
      category:categories(*)
    `)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching all opportunities:', error)
    return []
  }

  return data || []
}

/**
 * 全てのカテゴリを取得（管理画面用）
 */
export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching all categories:', error)
    return []
  }

  return data || []
}
