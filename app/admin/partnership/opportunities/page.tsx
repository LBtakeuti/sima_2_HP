'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import AuthGuard from '@/components/admin/AuthGuard'
import Modal from '@/components/shared/Modal'
import type { PartnershipOpportunity, Category, PartnershipImage } from '@/lib/supabase/partnership'
import RichTextEditor from '@/components/admin/RichTextEditor'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const supabase = createClient()

type FormData = {
  title_ja: string
  title_en: string
  description_ja: string
  description_en: string
  content_ja: string
  content_en: string
  image_url: string
  tags: string[]
  images: PartnershipImage[]
  category_id: string
  status: 'draft' | 'published'
  display_order: number
}

const EMPTY_FORM: FormData = {
  title_ja: '',
  title_en: '',
  description_ja: '',
  description_en: '',
  content_ja: '',
  content_en: '',
  image_url: '',
  tags: [],
  images: [],
  category_id: '',
  status: 'draft',
  display_order: 0,
}

interface SortableGalleryItemProps {
  image: PartnershipImage
  index: number
  onCaptionChange: (index: number, caption: string) => void
  onRemove: (index: number) => void
}

function SortableGalleryItem({
  image,
  index,
  onCaptionChange,
  onRemove,
}: SortableGalleryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.url })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
    boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.15)' : undefined,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row"
    >
      {/* ドラッグハンドル */}
      <button
        type="button"
        aria-label={`画像 ${index + 1} を並び替え`}
        className="flex h-10 w-10 shrink-0 cursor-grab items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* サムネイル */}
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-md bg-gray-100 sm:w-48">
        <Image
          src={image.url}
          alt={`ギャラリー画像 ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 192px"
        />
      </div>

      {/* キャプション + 操作 */}
      <div className="flex flex-1 flex-col gap-3">
        <input
          type="text"
          value={image.caption}
          onChange={(e) => onCaptionChange(index, e.target.value)}
          placeholder="キャプション（任意・言語共通）"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-brand-500"
        />
        <div className="flex items-center justify-between gap-2">
          <details className="flex-1 text-xs text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">URLを表示</summary>
            <span className="mt-1 block break-all text-gray-600">{image.url}</span>
          </details>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="shrink-0 rounded border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            削除
          </button>
        </div>
      </div>
    </li>
  )
}

export default function OpportunitiesAdmin() {
  const [opportunities, setOpportunities] = useState<PartnershipOpportunity[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [mainUploading, setMainUploading] = useState(false)
  const [mainUploadSuccess, setMainUploadSuccess] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [galleryUploadSuccess, setGalleryUploadSuccess] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<PartnershipOpportunity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeLanguageTab, setActiveLanguageTab] = useState<'ja' | 'en'>('ja')
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [tagInput, setTagInput] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    reorderImages(String(active.id), String(over.id))
  }

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
    setFormData(EMPTY_FORM)
    setTagInput('')
    setActiveLanguageTab('ja')
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
      image_url: opportunity.image_url || '',
      tags: Array.isArray(opportunity.tags) ? opportunity.tags : [],
      images: Array.isArray(opportunity.images) ? opportunity.images : [],
      category_id: opportunity.category_id || '',
      status: opportunity.status,
      display_order: opportunity.display_order,
    })
    setTagInput('')
    setActiveLanguageTab('ja')
    setIsModalOpen(true)
  }

  function addTag(raw: string) {
    const candidates = raw
      .split(/[,、]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    if (candidates.length === 0) return
    setFormData((prev) => {
      const merged = [...prev.tags]
      candidates.forEach((t) => {
        if (!merged.includes(t)) merged.push(t)
      })
      return { ...prev, tags: merged }
    })
    setTagInput('')
  }

  function removeTag(tag: string) {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  function updateImageCaption(index: number, caption: string) {
    setFormData((prev) => {
      const next = [...prev.images]
      next[index] = { ...next[index], caption }
      return { ...prev, images: next }
    })
  }

  function reorderImages(activeId: string, overId: string) {
    setFormData((prev) => {
      const oldIndex = prev.images.findIndex((img) => img.url === activeId)
      const newIndex = prev.images.findIndex((img) => img.url === overId)
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev
      return { ...prev, images: arrayMove(prev.images, oldIndex, newIndex) }
    })
  }

  function removeImage(index: number) {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  function removeMainImage() {
    setFormData((prev) => ({ ...prev, image_url: '' }))
  }

  async function uploadSingleFile(file: File): Promise<string | null> {
    if (file.size > 5 * 1024 * 1024) {
      alert(`「${file.name}」は5MBを超えています。スキップします。`)
      return null
    }
    if (!file.type.startsWith('image/')) {
      alert(`「${file.name}」は画像ファイルではありません。スキップします。`)
      return null
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `partnership/${fileName}`

    const { error } = await supabase.storage
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
        alert(`「${file.name}」のアップロードに失敗しました: ${error.message}`)
      }
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)
    return publicUrl
  }

  async function handleMainImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setMainUploading(true)
    setMainUploadSuccess(false)

    try {
      const url = await uploadSingleFile(file)
      if (!url) return
      setFormData((prev) => ({ ...prev, image_url: url }))
      setMainUploadSuccess(true)
      setTimeout(() => setMainUploadSuccess(false), 3000)
    } catch (error) {
      console.error('Upload error:', error)
      alert('画像のアップロードに失敗しました')
    } finally {
      setMainUploading(false)
      e.target.value = ''
    }
  }

  async function handleGalleryImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setGalleryUploading(true)
    setGalleryUploadSuccess(false)

    try {
      const uploaded: PartnershipImage[] = []
      for (const file of Array.from(files)) {
        const url = await uploadSingleFile(file)
        if (url) uploaded.push({ url, caption: '' })
      }
      if (uploaded.length === 0) return

      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }))
      setGalleryUploadSuccess(true)
      setTimeout(() => setGalleryUploadSuccess(false), 3000)
    } catch (error) {
      console.error('Upload error:', error)
      alert('画像のアップロードに失敗しました')
    } finally {
      setGalleryUploading(false)
      e.target.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const submitData = {
      ...formData,
      image_url: formData.image_url || null,
      images: formData.images,
      tags: formData.tags,
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
                {/* 画像（メイン画像のみを参照） */}
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
      </div>

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingOpportunity ? '案件編集' : '案件新規作成'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
                <div className="flex divide-x divide-gray-200 rounded-t-lg overflow-hidden bg-gray-50">
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
                <div className="p-4 md:p-6 space-y-6">
                  {activeLanguageTab === 'ja' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            概要（日本語） *
                          </label>
                          <textarea
                            value={formData.description_ja}
                            onChange={(e) =>
                              setFormData({ ...formData, description_ja: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus-border-transparent"
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          詳細内容（日本語）
                        </label>
                        <RichTextEditor
                          key="ja"
                          value={formData.content_ja}
                          onChange={(value) => setFormData({ ...formData, content_ja: value })}
                          placeholder="本文を入力してください"
                          active
                        />
                      </div>
                    </div>
                  )}

                  {activeLanguageTab === 'en' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title (English) *
                          </label>
                          <input
                            type="text"
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus-border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Overview (English) *
                          </label>
                          <textarea
                            value={formData.description_en}
                            onChange={(e) =>
                              setFormData({ ...formData, description_en: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus-border-transparent"
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Details (English)
                        </label>
                        <RichTextEditor
                          key="en"
                          value={formData.content_en}
                          onChange={(value) => setFormData({ ...formData, content_en: value })}
                          placeholder="Please enter the body text"
                          active
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* メイン画像セクション（一覧サムネ・詳細ヘッダー用、1枚） */}
              <section className="rounded-lg border border-gray-200 bg-white">
                <header className="rounded-t-lg border-b border-gray-200 bg-gray-50 px-5 py-3">
                  <h3 className="text-lg font-bold text-gray-900">メイン画像</h3>
                  <p className="mt-0.5 text-xs text-gray-500">一覧サムネ・詳細ヘッダーに表示されます（1枚）</p>
                </header>

                <div className="space-y-5 p-5">
                  {mainUploadSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 text-sm font-medium">メイン画像をアップロードしました！</span>
                    </div>
                  )}

                  {formData.image_url && (
                    <div>
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image_url}
                          alt="メイン画像プレビュー"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="mt-2 rounded border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        メイン画像を削除
                      </button>
                    </div>
                  )}

                  {/* アップロードまたは URL 入力（グルーピング） */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-3 text-xs font-semibold text-gray-600">アップロードまたは URL 入力</p>

                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                        disabled={mainUploading}
                      />
                      <div className={`w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                        mainUploading
                          ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                          : 'border-brand-300 bg-white hover:border-brand-500 hover:bg-brand-50'
                      }`}>
                        {mainUploading ? (
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
                            メイン画像を選択
                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF （最大5MB）</p>
                          </span>
                        )}
                      </div>
                    </label>

                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 mb-1">画像URLを直接入力</label>
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ギャラリー画像セクション（詳細ページのカルーセル用、複数枚 + キャプション） */}
              <section className="rounded-lg border border-gray-200 bg-white">
                <header className="rounded-t-lg border-b border-gray-200 bg-gray-50 px-5 py-3">
                  <h3 className="text-lg font-bold text-gray-900">ギャラリー画像</h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    詳細ページのカルーセルに表示されます（複数枚 + キャプション、ドラッグして並び替え）
                  </p>
                </header>

                <div className="space-y-5 p-5">
                  {galleryUploadSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 text-sm font-medium">ギャラリー画像をアップロードしました！</span>
                    </div>
                  )}

                  {formData.images.length > 0 && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={formData.images.map((img) => img.url)}
                        strategy={verticalListSortingStrategy}
                      >
                        <ul className="space-y-4">
                          {formData.images.map((image, index) => (
                            <SortableGalleryItem
                              key={image.url}
                              image={image}
                              index={index}
                              onCaptionChange={updateImageCaption}
                              onRemove={removeImage}
                            />
                          ))}
                        </ul>
                      </SortableContext>
                    </DndContext>
                  )}

                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImageUpload}
                      className="hidden"
                      disabled={galleryUploading}
                    />
                    <div className={`w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                      galleryUploading
                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        : 'border-brand-300 hover:border-brand-500 hover:bg-brand-50'
                    }`}>
                      {galleryUploading ? (
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
                          ギャラリー画像を追加（複数選択可）
                          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF （各最大5MB）</p>
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </section>

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
                      setFormData({ ...formData, display_order: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タグ（言語共通）
                </label>
                {formData.tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove ${tag}`}
                          className="rounded-full p-0.5 hover:bg-brand-100"
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && tagInput === '' && formData.tags.length > 0) {
                        const last = formData.tags[formData.tags.length - 1]
                        removeTag(last)
                      }
                    }}
                    placeholder="タグを入力（例: AI）"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(tagInput)}
                    disabled={tagInput.trim() === ''}
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    追加
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  追加ボタンで確定。Backspace で末尾のタグを削除。
                </p>
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
      </Modal>
    </div>
    </AuthGuard>
  )
}
