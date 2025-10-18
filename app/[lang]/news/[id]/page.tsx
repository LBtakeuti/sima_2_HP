import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { newsData, getLocalizedNewsItem, getCategoryStyle } from '@/lib/data/news'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string; id: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { lang, id } = await params
  const dict = await getDictionary(lang as Language)

  // ニュース記事を検索
  const newsItem = newsData.find(item => item.id === id)

  if (!newsItem) {
    notFound()
  }

  const localizedItem = getLocalizedNewsItem(newsItem, lang as Language)

  // 関連記事を取得（同じカテゴリの他の記事、最大3件）
  const relatedNews = newsData
    .filter(item => item.id !== newsItem.id && item[`category_${lang}` as keyof typeof item] === localizedItem.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* パンくずナビ */}
      <nav className="bg-gray-50 py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href={`/${lang}`} className="hover:text-brand-600">
                {lang === 'ja' ? 'ホーム' : lang === 'en' ? 'Home' : 'होम'}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/${lang}/news`} className="hover:text-brand-600">
                NEWS
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">
              {localizedItem.title.length > 50
                ? localizedItem.title.substring(0, 50) + '...'
                : localizedItem.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* 記事ヘッダー */}
      <header className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* カテゴリと日付 */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${getCategoryStyle(newsItem.category_color)}`}>
              {localizedItem.category}
            </span>
            <time className="text-gray-500">
              {newsItem.published_date}
            </time>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {localizedItem.title}
          </h1>

          {/* タグ */}
          {localizedItem.tags && localizedItem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {localizedItem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* メイン画像 */}
      {localizedItem.image_url && (
        <div className="px-4 mb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={localizedItem.image_url}
                alt={localizedItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* 記事本文 */}
      <article className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-800 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: localizedItem.content.replace(/\n/g, '<br>').replace(/##\s(.+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>').replace(/###\s(.+)/g, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h3>')
              }}
            />
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {relatedNews.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              {lang === 'ja' ? '関連記事' : lang === 'en' ? 'Related Articles' : 'संबंधित लेख'}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((relatedItem) => {
                const localizedRelated = getLocalizedNewsItem(relatedItem, lang as Language)

                return (
                  <article key={relatedItem.id} className="bg-white border border-gray-200 hover:border-brand-300 transition-colors hover:shadow-lg">
                    {localizedRelated.image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={localizedRelated.image_url}
                          alt={localizedRelated.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyle(relatedItem.category_color)}`}>
                          {localizedRelated.category}
                        </span>
                        <time className="text-gray-500 text-xs">
                          {relatedItem.published_date}
                        </time>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                        <Link
                          href={`/${lang}/news/${relatedItem.id}`}
                          className="hover:text-brand-600 transition-colors"
                        >
                          {localizedRelated.title}
                        </Link>
                      </h3>

                      {localizedRelated.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {localizedRelated.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ナビゲーション */}
      <div className="py-8 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            <Link
              href={`/${lang}/news`}
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {lang === 'ja' ? 'ニュース一覧に戻る' : lang === 'en' ? 'Back to News' : 'समाचार सूची पर वापस जाएं'}
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center bg-brand-500 text-white px-6 py-3 rounded-md font-medium hover:bg-brand-600 transition"
            >
              {lang === 'ja' ? 'お問い合わせ' : lang === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// 静的生成のためのパス生成
export async function generateStaticParams() {
  return newsData.map((item) => ({
    id: item.id,
  }))
}