'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AuthGuard from '@/components/admin/AuthGuard'

const supabase = createClient()

interface YouTubeVideo {
  id: string
  created_at: string
  updated_at: string
  youtube_url: string
  title_ja: string
  title_en: string
  display_order: number
  is_published: boolean
}

export default function YouTubeVideosAdmin() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    youtube_url: '',
    title_ja: '',
    title_en: '',
    display_order: 0,
    is_published: true,
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching videos:', error)
    } else {
      setVideos(data || [])
    }
    setLoading(false)
  }

  function openCreateModal() {
    setEditingVideo(null)
    setFormData({
      youtube_url: '',
      title_ja: '',
      title_en: '',
      display_order: videos.length + 1,
      is_published: true,
    })
    setIsModalOpen(true)
  }

  function openEditModal(video: YouTubeVideo) {
    setEditingVideo(video)
    setFormData({
      youtube_url: video.youtube_url,
      title_ja: video.title_ja,
      title_en: video.title_en,
      display_order: video.display_order,
      is_published: video.is_published,
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingVideo) {
      // 更新
      const { error } = await supabase
        .from('youtube_videos')
        .update(formData)
        .eq('id', editingVideo.id)

      if (error) {
        console.error('Error updating video:', error)
        alert('更新に失敗しました')
      } else {
        alert('更新しました')
        setIsModalOpen(false)
        fetchVideos()
      }
    } else {
      // 新規作成
      const { error } = await supabase.from('youtube_videos').insert([formData])

      if (error) {
        console.error('Error creating video:', error)
        alert('作成に失敗しました')
      } else {
        alert('作成しました')
        setIsModalOpen(false)
        fetchVideos()
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('本当に削除しますか?')) return

    const { error } = await supabase.from('youtube_videos').delete().eq('id', id)

    if (error) {
      console.error('Error deleting video:', error)
      alert('削除に失敗しました')
    } else {
      alert('削除しました')
      fetchVideos()
    }
  }

  // YouTube URLからVideo IDを抽出
  function extractVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  }

  // YouTube埋め込みURL取得
  function getEmbedUrl(url: string): string {
    const videoId = extractVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">YouTube動画管理</h1>
            <button
              onClick={openCreateModal}
              className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition"
            >
              新規追加
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* YouTube埋め込み */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getEmbedUrl(video.youtube_url)}
                      title={video.title_ja}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          video.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {video.is_published ? '公開中' : '非公開'}
                      </span>
                      <span className="text-xs text-gray-500">順: {video.display_order}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {video.title_ja}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1 mb-4">{video.title_en}</p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(video)}
                        className="flex-1 px-3 py-2 bg-brand-600 text-white text-sm rounded hover:bg-brand-700 transition"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {videos.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p>まだ動画が登録されていません</p>
            </div>
          )}
        </div>

        {/* モーダル */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingVideo ? 'YouTube動画編集' : 'YouTube動画追加'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    YouTubeの動画URLを入力してください
                  </p>
                </div>

                {/* プレビュー */}
                {formData.youtube_url && getEmbedUrl(formData.youtube_url) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      プレビュー
                    </label>
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getEmbedUrl(formData.youtube_url)}
                        title="Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      公開ステータス
                    </label>
                    <select
                      value={formData.is_published ? 'true' : 'false'}
                      onChange={(e) =>
                        setFormData({ ...formData, is_published: e.target.value === 'true' })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      <option value="true">公開</option>
                      <option value="false">非公開</option>
                    </select>
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
                    {editingVideo ? '更新' : '作成'}
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
