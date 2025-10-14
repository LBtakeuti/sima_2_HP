import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">404 - ページが見つかりません</h2>
        <p className="text-gray-600 mb-6">お探しのページは見つかりませんでした。</p>
        <Link
          href="/ja"
          className="inline-block bg-brand-500 text-white px-6 py-3 rounded-md hover:bg-brand-600 transition"
        >
          ホームへ戻る
        </Link>
      </div>
    </div>
  )
}