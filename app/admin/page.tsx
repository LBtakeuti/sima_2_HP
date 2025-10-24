'use client'

import Link from 'next/link'
import AuthGuard from '@/components/admin/AuthGuard'

export default function AdminDashboard() {
  return (
    <AuthGuard>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">管理画面</h1>

        {/* Partnership Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* パートナーシップ案件管理 */}
            <Link
              href="/admin/partnership/opportunities"
              className="block p-8 bg-white border border-gray-200 rounded-lg hover:border-brand-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">パートナーシップ案件</h3>
              </div>
              <p className="text-gray-600">パートナーシップ案件の追加・編集・削除を行います</p>
            </Link>

            {/* カテゴリ管理 */}
            <Link
              href="/admin/partnership/categories"
              className="block p-8 bg-white border border-gray-200 rounded-lg hover:border-brand-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">カテゴリ管理</h3>
              </div>
              <p className="text-gray-600">業種カテゴリの追加・編集・削除を行います</p>
            </Link>
          </div>
        </div>

        {/* News Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ニュース記事管理 */}
            <Link
              href="/admin/news/articles"
              className="block p-8 bg-white border border-gray-200 rounded-lg hover:border-brand-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">ニュース記事</h3>
              </div>
              <p className="text-gray-600">ニュース記事の追加・編集・削除を行います</p>
            </Link>

            {/* ニュースカテゴリ管理 */}
            <Link
              href="/admin/news/categories"
              className="block p-8 bg-white border border-gray-200 rounded-lg hover:border-brand-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">ニュースカテゴリ</h3>
              </div>
              <p className="text-gray-600">ニュースカテゴリの追加・編集・削除を行います</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
    </AuthGuard>
  )
}
