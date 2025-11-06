'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { PartnershipOpportunity, Category } from '@/lib/supabase/partnership'

interface Props {
  lang: string
  categories: Category[]
  opportunities: PartnershipOpportunity[]
  categorySlug?: string
}

export default function PartnershipList({ lang, categories, opportunities, categorySlug }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // 検索フィルタリング
  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (!searchQuery) return true

    const searchLower = searchQuery.toLowerCase()
    const title = (lang === 'ja' ? opportunity.title_ja : opportunity.title_en).toLowerCase()
    const description = (lang === 'ja' ? opportunity.description_ja : opportunity.description_en).toLowerCase()

    return title.includes(searchLower) || description.includes(searchLower)
  })

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左サイドバー：検索とカテゴリフィルター */}
      <aside className="lg:w-64 flex-shrink-0 space-y-4">
        {/* 検索フィールド */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {lang === 'ja' ? '検索' : 'Search'}
          </h2>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ja' ? 'キーワードで検索...' : 'Search by keyword...'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {lang === 'ja' ? 'カテゴリ' : 'Categories'}
          </h2>
          {/* モバイル: ドロップダウン */}
          <div className="lg:hidden">
            <select
              value={categorySlug || ''}
              onChange={(e) => {
                const value = e.target.value
                if (!value) {
                  router.push(`/${lang}/partnership`, { scroll: false })
                } else {
                  router.push(`/${lang}/partnership?category=${value}`, { scroll: false })
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">
                {lang === 'ja' ? 'すべて' : 'All'}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {lang === 'ja' ? category.name_ja : category.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* デスクトップ: リスト */}
          <nav className="space-y-2 hidden lg:block">
            {/* すべて表示 */}
            <Link
              href={`/${lang}/partnership`}
              scroll={false}
              className={`block px-4 py-2 rounded-md transition-colors ${
                !categorySlug
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang === 'ja' ? 'すべて' : 'All'}
            </Link>

            {/* カテゴリ一覧 */}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${lang}/partnership?category=${category.slug}`}
                scroll={false}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  categorySlug === category.slug
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang === 'ja' ? category.name_ja : category.name_en}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* メインコンテンツエリア：カードグリッド */}
      <main className="flex-1">
        {/* 検索結果の件数表示 */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            {lang === 'ja'
              ? `${filteredOpportunities.length}件の案件が見つかりました`
              : `${filteredOpportunities.length} opportunities found`}
          </div>
        )}

        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? (lang === 'ja'
                    ? '検索条件に一致する案件はありません。'
                    : 'No opportunities match your search.')
                : (lang === 'ja'
                    ? '現在、該当する案件はありません。'
                    : 'No opportunities available at the moment.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <article
                key={opportunity.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-brand-500 transition-all duration-300 hover:shadow-lg"
              >
                {/* タイトル */}
                <div className="p-5 pb-3">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {lang === 'ja' ? opportunity.title_ja : opportunity.title_en}
                  </h3>
                </div>

                {/* 画像 */}
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Image
                    src={opportunity.image_url}
                    alt={lang === 'ja' ? opportunity.title_ja : opportunity.title_en}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>

                {/* 概要 */}
                <div className="p-5 pt-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {lang === 'ja' ? opportunity.description_ja : opportunity.description_en}
                  </p>

                  <Link
                    href={`/${lang}/partnership/${opportunity.id}`}
                    className="inline-flex items-center text-brand-600 font-medium text-sm hover:text-brand-700 transition-colors"
                  >
                    {lang === 'ja' ? '詳しく見る' : 'View More'}
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

