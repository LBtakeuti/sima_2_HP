'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import AuthGuard from '@/components/admin/AuthGuard'
import type { PartnershipOpportunity, Category } from '@/lib/supabase/partnership'

const supabase = createClient()

export default function OpportunitiesAdmin() {
  const [opportunities, setOpportunities] = useState<PartnershipOpportunity[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<PartnershipOpportunity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title_ja: '',
    title_en: '',
    description_ja: '',
    description_en: '',
    content_ja: '',
    content_en: '',
    image_url: '',
    category_id: '',
    status: 'draft' as 'draft' | 'published',
    display_order: 0,
  })

  useEffect(() => {
    fetchOpportunities()
    fetchCategories()
  }, [])

  async function fetchOpportunities() {
    setLoading(true)
    const { data, error } = await supabase
      .from('partnership_opportunities')
      .select(`
        *,
        category:categories(*)
      `)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching opportunities:', error)
    } else {
      setOpportunities(data || [])
    }
    setLoading(false)
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('categories')
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
    setEditingOpportunity(null)
    setFormData({
      title_ja: '',
      title_en: '',
      description_ja: '',
      description_en: '',
      content_ja: '',
      content_en: '',
      image_url: '',
      category_id: '',
      status: 'draft',
      display_order: 0,
    })
    setIsModalOpen(true)
  }

  function openEditModal(opportunity: PartnershipOpportunity) {
    setEditingOpportunity(opportunity)
    setFormData({
      title_ja: opportunity.title_ja,
      title_en: opportunity.title_en,
      description_ja: opportunity.description_ja,
      description_en: opportunity.description_en,
      content_ja: opportunity.content_ja || '',
      content_en: opportunity.content_en || '',
      image_url: opportunity.image_url,
      category_id: opportunity.category_id || '',
      status: opportunity.status,
      display_order: opportunity.display_order,
    })
    setIsModalOpen(true)
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
      const filePath = `partnership/${fileName}`

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const submitData = {
      ...formData,
      category_id: formData.category_id || null,
      content_ja: formData.content_ja || null,
      content_en: formData.content_en || null,
    }

    if (editingOpportunity) {
      // 更新
      const { error } = await supabase
        .from('partnership_opportunities')
        .update(submitData)
        .eq('id', editingOpportunity.id)

      if (error) {
        console.error('Error updating opportunity:', error)
        alert('更新に失敗しました')
      } else {
        alert('更新しました')
        setIsModalOpen(false)
        fetchOpportunities()
      }
    } else {
      // 新規作成
      const { error } = await supabase.from('partnership_opportunities').insert([submitData])

      if (error) {
        console.error('Error creating opportunity:', error)
        alert('作成に失敗しました')
      } else {
        alert('作成しました')
        setIsModalOpen(false)
        fetchOpportunities()
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('本当に削除しますか?')) return

    const { error } = await supabase.from('partnership_opportunities').delete().eq('id', id)

    if (error) {
      console.error('Error deleting opportunity:', error)
      alert('削除に失敗しました')
    } else {
      alert('削除しました')
      fetchOpportunities()
    }
  }

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">パートナーシップ案件管理</h1>
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
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* 画像 */}
                <div className="relative aspect-[4/3] bg-gray-100">
                  {opportunity.image_url ? (
                    <Image
                      src={opportunity.image_url}
                      alt={opportunity.title_ja}
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
                        opportunity.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {opportunity.status === 'published' ? '公開中' : '下書き'}
                    </span>
                    <span className="text-xs text-gray-500">順: {opportunity.display_order}</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {opportunity.title_ja}
                  </h3>

                  {opportunity.category && (
                    <p className="text-sm text-gray-600 mb-2">{opportunity.category.name_ja}</p>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {opportunity.description_ja}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(opportunity)}
                      className="flex-1 px-4 py-2 bg-brand-600 text-white text-sm rounded hover:bg-brand-700 transition"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(opportunity.id)}
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
              {editingOpportunity ? '案件編集' : '案件新規作成'}
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
                    概要（日本語） *
                  </label>
                  <textarea
                    value={formData.description_ja}
                    onChange={(e) => setFormData({ ...formData, description_ja: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    概要（英語） *
                  </label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    詳細内容（日本語）
                  </label>
                  <textarea
                    value={formData.content_ja}
                    onChange={(e) => setFormData({ ...formData, content_ja: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    詳細内容（英語）
                  </label>
                  <textarea
                    value={formData.content_en}
                    onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    rows={5}
                  />
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

              <div className="grid grid-cols-3 gap-4">
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
                  {editingOpportunity ? '更新' : '作成'}
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
