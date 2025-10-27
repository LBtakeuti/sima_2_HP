'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import AuthGuard from '@/components/admin/AuthGuard'
import type { NewsArticle, NewsCategory } from '@/lib/supabase/news'

const supabase = createClient()

export default function NewsArticlesAdmin() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title_ja: '',
    title_en: '',
    excerpt_ja: '',
    excerpt_en: '',
    content_ja: '',
    content_en: '',
    image_url: '',
    category_id: '',
    published_date: new Date().toISOString().split('T')[0],
    status: 'draft' as 'draft' | 'published',
    display_order: 0,
    featured: false,
  })

  useEffect(() => {
    fetchArticles()
    fetchCategories()
  }, [])

  async function fetchArticles() {
    setLoading(true)
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:news_categories(*)
      `)
      .order('published_date', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('news_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
    } else {
      setCategories(data || [])
    }
  }

  function openCreateModal() {
    setEditingArticle(null)
    setFormData({
      title_ja: '',
      title_en: '',
      excerpt_ja: '',
      excerpt_en: '',
      content_ja: '',
      content_en: '',
      image_url: '',
      category_id: '',
      published_date: new Date().toISOString().split('T')[0],
      status: 'draft',
      display_order: 0,
      featured: false,
    })
    setIsModalOpen(true)
  }

  function openEditModal(article: NewsArticle) {
    setEditingArticle(article)
    setFormData({
      title_ja: article.title_ja,
      title_en: article.title_en,
      excerpt_ja: article.excerpt_ja || '',
      excerpt_en: article.excerpt_en || '',
      content_ja: article.content_ja,
      content_en: article.content_en,
      image_url: article.image_url,
      category_id: article.category_id || '',
      published_date: article.published_date.split('T')[0],
      status: article.status,
      display_order: article.display_order,
      featured: article.featured,
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const submitData = {
      ...formData,
      category_id: formData.category_id || null,
      excerpt_ja: formData.excerpt_ja || null,
      excerpt_en: formData.excerpt_en || null,
    }

    if (editingArticle) {
      // 更新
      const { error } = await supabase
        .from('news')
        .update(submitData)
        .eq('id', editingArticle.id)

      if (error) {
        console.error('Error updating article:', error)
        alert('更新に失敗しました')
      } else {
        alert('更新しました')
        setIsModalOpen(false)
        fetchArticles()
      }
    } else {
      // 新規作成
      const { error } = await supabase.from('news').insert([submitData])

      if (error) {
        console.error('Error creating article:', error)
        alert('作成に失敗しました')
      } else {
        alert('作成しました')
        setIsModalOpen(false)
        fetchArticles()
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('本当に削除しますか?')) return

    const { error } = await supabase.from('news').delete().eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      alert('削除に失敗しました')
    } else {
      alert('削除しました')
      fetchArticles()
    }
  }

  // カテゴリカラーのスタイル取得
  function getCategoryStyle(color: string) {
    const styles = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
    }
    return styles[color as keyof typeof styles] || styles.gray
  }

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ニュース記事管理</h1>
          <button
            onClick={openCreateModal}
            className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition"
          >
            新規作成
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* 画像 */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={article.image_url}
                    alt={article.title_ja}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>

                {/* コンテンツ */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {article.status === 'published' ? '公開中' : '下書き'}
                    </span>
                    <time className="text-xs text-gray-500">
                      {new Date(article.published_date).toLocaleDateString('ja-JP')}
                    </time>
                  </div>

                  {article.category && (
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${getCategoryStyle(
                        article.category.color
                      )}`}
                    >
                      {article.category.name_ja}
                    </span>
                  )}

                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {article.title_ja}
                  </h3>

                  {article.excerpt_ja && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {article.excerpt_ja}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    {article.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        注目
                      </span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">順: {article.display_order}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(article)}
                      className="flex-1 px-4 py-2 bg-brand-600 text-white text-sm rounded hover:bg-brand-700 transition"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            管理画面に戻る
          </Link>
        </div>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingArticle ? 'ニュース編集' : 'ニュース新規作成'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    タイトル（日本語） *
                  </label>
                  <input
                    type="text"
                    value={formData.title_ja}
                    onChange={(e) => setFormData({ ...formData, title_ja: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    タイトル（英語） *
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    概要（日本語）
                  </label>
                  <textarea
                    value={formData.excerpt_ja}
                    onChange={(e) => setFormData({ ...formData, excerpt_ja: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    概要（英語）
                  </label>
                  <textarea
                    value={formData.excerpt_en}
                    onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    本文（日本語） *
                  </label>
                  <textarea
                    value={formData.content_ja}
                    onChange={(e) => setFormData({ ...formData, content_ja: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={8}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Markdown形式で記述できます（## 見出し、### 小見出し）
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    本文（英語） *
                  </label>
                  <textarea
                    value={formData.content_en}
                    onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={8}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Markdown format supported (## Heading, ### Subheading)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像URL *
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">カテゴリなし</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name_ja}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公開日 *
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    表示順
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                  注目記事として表示
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
                >
                  {editingArticle ? '更新' : '作成'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AuthGuard>
  )
}
