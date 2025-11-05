'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 本番環境ではエラー監視サービス（Sentry等）に送信することを推奨
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', error)
    } else {
      // 本番環境では最小限のログのみ
      console.error('An error occurred:', error.message)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
        <p className="text-gray-600 mb-6">
          申し訳ございません。問題が発生しました。
          {process.env.NODE_ENV === 'development' && error.digest && (
            <span className="block text-xs text-gray-400 mt-2">
              Error ID: {error.digest}
            </span>
          )}
        </p>
        <button
          onClick={() => reset()}
          className="bg-brand-500 text-white px-6 py-2 rounded-md hover:bg-brand-600 transition"
        >
          再試行
        </button>
      </div>
    </div>
  )
}