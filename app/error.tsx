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
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
        <p className="text-gray-600 mb-6">申し訳ございません。問題が発生しました。</p>
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