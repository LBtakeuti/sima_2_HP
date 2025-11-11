'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import AuthGuard from '@/components/admin/AuthGuard'
import type { NewsArticle, NewsCategory } from '@/lib/supabase/news'
import RichTextEditor from '@/components/admin/RichTextEditor'

const supabase = createClient()

export default function NewsArticlesAdmin() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLanguageTab, setActiveLanguageTab] = useState<'ja' | 'en'>('ja')
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
    setActiveLanguageTab('ja')
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
    setActiveLanguageTab('ja')
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック（5MB制限）
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください')
      return
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください')
      return
    }

    setUploading(true)
    setUploadSuccess(false)

    try {
      // ファイル名を生成（タイムスタンプ + ランダム文字列）
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `news/${fileName}`

      // Supabase Storageにアップロード
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        console.error('Upload error:', error)
        if (error.message.includes('Bucket not found')) {
          alert('エラー: Storageバケット「images」が見つかりません。\n\nSupabaseダッシュボードでバケットを作成してください：\n1. Storage > New bucket\n2. Name: images\n3. Public bucket: ON')
        } else {
          alert(`画像のアップロードに失敗しました: ${error.message}`)
        }
        return
      }

      // 公開URLを取得
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      // フォームデータに設定
      setFormData({ ...formData, image_url: publicUrl })
      setUploadSuccess(true)

      // 3秒後に成功通知を非表示
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error) {
      console.error('Upload error:', error)
      alert('画像のアップロードに失敗しました')
    } finally {
      setUploading(false)
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
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title_ja}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
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
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingArticle ? 'ニュース編集' : 'ニュース新規作成'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border border-gray-200 rounded-lg">
                <div className="flex divide-x divide-gray-200 rounded-t-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveLanguageTab('ja')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeLanguageTab === 'ja'
                        ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-500'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    日本語
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLanguageTab('en')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeLanguageTab === 'en'
                        ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-500'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {activeLanguageTab === 'ja' ? (
                    <>
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
                          概要（日本語）
                        </label>
                        <textarea
                          value={formData.excerpt_ja}
                          onChange={(e) => setFormData({ ...formData, excerpt_ja: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          本文（日本語） *
                        </label>
                        <RichTextEditor
                          value={formData.content_ja}
                          onChange={(value) => setFormData({ ...formData, content_ja: value })}
                          placeholder="本文を入力してください"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          見出し・リスト・文字色などをツールバーから設定できます
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title (English) *
                        </label>
                        <input
                          type="text"
                          value={formData.title_en}
                          onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Excerpt (English)
                        </label>
                        <textarea
                          value={formData.excerpt_en}
                          onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Body (English) *
                        </label>
                        <RichTextEditor
                          value={formData.content_en}
                          onChange={(value) => setFormData({ ...formData, content_en: value })}
                          placeholder="Please enter the article content"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Use the toolbar to adjust headings, colors, and font sizes as needed.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像 *
                </label>

                {/* アップロード成功通知 */}
                {uploadSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800 text-sm font-medium">画像をアップロードしました！</span>
                  </div>
                )}

                {/* 画像プレビュー */}
                {formData.image_url && (
                  <div className="mb-4">
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={formData.image_url}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* ファイル選択ボタン */}
                <div className="flex items-center space-x-4">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className={`w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                      uploading
                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        : 'border-brand-300 hover:border-brand-500 hover:bg-brand-50'
                    }`}>
                      {uploading ? (
                        <span className="flex items-center justify-center text-gray-500">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          アップロード中...
                        </span>
                      ) : (
                        <span className="text-brand-600">
                          <svg className="mx-auto h-12 w-12 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          画像を選択またはドラッグ＆ドロップ
                          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF （最大5MB）</p>
                        </span>
                      )}
                    </div>
                  </label>
                </div>

                {/* 手動URL入力（オプション） */}
                <div className="mt-4">
                  <label className="block text-xs text-gray-500 mb-1">
                    または画像URLを直接入力
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
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
