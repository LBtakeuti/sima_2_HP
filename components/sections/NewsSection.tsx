import type { Language } from '@/lib/i18n/config'
import { getPublishedNews } from '@/lib/supabase/news'
import Link from 'next/link'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default async function NewsSection({ lang, dict }: { lang: Language; dict: any }) {
  // Supabaseから最新のニュースを取得
  const newsArticles = await getPublishedNews()
  const latestNews = newsArticles.slice(0, 4)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* ヘッダー */}
        <FadeInAnimation>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-medium text-gray-900 mb-2 tracking-tight">NEWS</h2>
              <p className="text-gray-500 text-lg font-sans">
                {lang === 'ja' ? 'Latest Information' : 'Latest Information'}
              </p>
            </div>
            <a
              href={`/${lang}/news`}
              className="inline-flex items-center bg-brand-500 text-white px-6 py-3 font-sans font-normal hover:bg-brand-600 transition text-sm"
            >
              VIEW MORE
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </FadeInAnimation>

        {/* ニュースリスト */}
        <FadeInAnimation delay={200}>
          <div className="bg-white/80 backdrop-blur-sm">
            {latestNews.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {lang === 'ja' ? 'ニュースがありません' : 'No news available'}
              </div>
            ) : (
              latestNews.map((item, index) => {
                const title = lang === 'ja' ? item.title_ja : item.title_en
                const publishedDate = new Date(item.published_date)
                const formattedDate = lang === 'ja'
                  ? `${publishedDate.getFullYear()}年${publishedDate.getMonth() + 1}月${publishedDate.getDate()}日`
                  : publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

                return (
                  <article
                    key={item.id}
                    className={`flex items-center gap-6 py-6 px-8 hover:bg-gray-50 transition-colors cursor-pointer ${
                      index !== latestNews.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    {/* 日付 */}
                    <time className="text-sm text-gray-500 whitespace-nowrap min-w-[120px]">
                      {formattedDate}
                    </time>
                    
                    {/* タイトル */}
                    <h3 className="text-gray-900 font-sans font-normal text-lg leading-relaxed flex-1">
                      <Link
                        href={`/${lang}/news/${item.id}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {title}
                      </Link>
                    </h3>
                  </article>
                )
              })
            )}
          </div>
        </FadeInAnimation>
      </div>
    </section>
  )
}