import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { getPublishedNews } from '@/lib/supabase/news'
import Link from 'next/link'

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { lang } = await params
  const { category: categorySlug } = await searchParams
  const dict = await getDictionary(lang as Language)

  const newsArticles = await getPublishedNews(categorySlug)

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
            NEWS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === 'ja' ? '最新情報をお届けします' : 'Latest News and Updates'}
          </p>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {newsArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {lang === 'ja' ? 'ニュースがありません' : 'No news available'}
              </p>
            </div>
          ) : (
            <div className="bg-white">
              {newsArticles.map((newsItem) => (
                <Link
                  key={newsItem.id}
                  href={`/${lang}/news/${newsItem.id}`}
                  className="block px-6 py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-base text-gray-900">
                    {lang === 'ja' ? newsItem.title_ja : newsItem.title_en}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
