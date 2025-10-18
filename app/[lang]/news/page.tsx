import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { newsData, getLocalizedNewsItem, getCategoryStyle } from '@/lib/data/news'
import Link from 'next/link'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  // ニュースデータを日付順でソート（新しい順）
  const sortedNews = newsData.sort((a, b) =>
    new Date(b.published_date.replace(/\./g, '/')).getTime() -
    new Date(a.published_date.replace(/\./g, '/')).getTime()
  )

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight">
            NEWS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === 'ja'
              ? '最新情報をお届けします'
              : lang === 'en'
              ? 'Latest News and Updates'
              : 'नवीनतम समाचार और अपडेट'}
          </p>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.map((newsItem) => {
              const localizedItem = getLocalizedNewsItem(newsItem, lang as Language)

              return (
                <article key={newsItem.id} className="bg-white border border-gray-200 hover:border-brand-300 transition-colors hover:shadow-lg">
                  {/* 画像 */}
                  {localizedItem.image_url && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={localizedItem.image_url}
                        alt={localizedItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* カテゴリと日付 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryStyle(newsItem.category_color)}`}>
                        {localizedItem.category}
                      </span>
                      <time className="text-gray-500 text-sm">
                        {newsItem.published_date}
                      </time>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link
                        href={`/${lang}/news/${newsItem.id}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {localizedItem.title}
                      </Link>
                    </h2>

                    {/* 概要 */}
                    {localizedItem.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {localizedItem.excerpt}
                      </p>
                    )}

                    {/* タグ */}
                    {localizedItem.tags && localizedItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {localizedItem.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 続きを読む */}
                    <Link
                      href={`/${lang}/news/${newsItem.id}`}
                      className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm"
                    >
                      {lang === 'ja' ? '続きを読む' : lang === 'en' ? 'Read More' : 'और पढ़ें'}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {/* 空の状態 */}
          {sortedNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {lang === 'ja'
                  ? 'ニュースがありません'
                  : lang === 'en'
                  ? 'No news available'
                  : 'कोई समाचार उपलब्ध नहीं'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}