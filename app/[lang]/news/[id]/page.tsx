import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { getNewsById, getPublishedNews } from '@/lib/supabase/news'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// カテゴリカラーのスタイル取得
function getCategoryStyle(color: string) {
  const styles = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  }
  return styles[color as keyof typeof styles] || styles.gray
}

interface PageProps {
  params: Promise<{ lang: string; id: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { lang, id } = await params
  const dict = await getDictionary(lang as Language)

  const newsItem = await getNewsById(id)

  if (!newsItem) {
    notFound()
  }

  // 関連記事を取得（同じカテゴリの他の記事、最大3件）
  const allNews = await getPublishedNews()
  const relatedNews = allNews
    .filter(item => item.id !== newsItem.id && item.category_id === newsItem.category_id)
    .slice(0, 3)

  const title = lang === 'ja' ? newsItem.title_ja : newsItem.title_en
  const content = lang === 'ja' ? newsItem.content_ja : newsItem.content_en

  return (
    <div className="min-h-screen">
      {/* パンくずナビ */}
      <nav className="bg-gray-50 py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href={`/${lang}`} className="hover:text-brand-600">
                {lang === 'ja' ? 'ホーム' : 'Home'}
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
              {title.length > 50 ? title.substring(0, 50) + '...' : title}
            </li>
          </ol>
        </div>
      </nav>

      {/* 記事ヘッダー */}
      <header className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* カテゴリと日付 */}
          <div className="flex items-center gap-4 mb-6">
            {newsItem.category && (
              <span
                className={`px-4 py-2 text-sm font-medium rounded-full ${getCategoryStyle(
                  newsItem.category.color
                )}`}
              >
                {lang === 'ja' ? newsItem.category.name_ja : newsItem.category.name_en}
              </span>
            )}
            <time className="text-gray-500">
              {new Date(newsItem.published_date).toLocaleDateString(
                lang === 'ja' ? 'ja-JP' : 'en-US',
                { year: 'numeric', month: '2-digit', day: '2-digit' }
              )}
            </time>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
        </div>
      </header>

      {/* メイン画像 */}
      <div className="px-4 mb-12 mt-4">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            <Image
              src={newsItem.image_url}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      </div>

      {/* 記事本文 */}
      <article className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: content
                  .replace(/\n/g, '<br>')
                  .replace(/##\s(.+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
                  .replace(/###\s(.+)/g, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h3>'),
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
              {lang === 'ja' ? '関連記事' : 'Related Articles'}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((relatedItem) => (
                <article
                  key={relatedItem.id}
                  className="bg-white border border-gray-200 hover:border-brand-300 transition-colors hover:shadow-lg"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden relative">
                    <Image
                      src={relatedItem.image_url}
                      alt={lang === 'ja' ? relatedItem.title_ja : relatedItem.title_en}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {relatedItem.category && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyle(
                            relatedItem.category.color
                          )}`}
                        >
                          {lang === 'ja' ? relatedItem.category.name_ja : relatedItem.category.name_en}
                        </span>
                      )}
                      <time className="text-gray-500 text-xs">
                        {new Date(relatedItem.published_date).toLocaleDateString(
                          lang === 'ja' ? 'ja-JP' : 'en-US',
                          { year: 'numeric', month: '2-digit', day: '2-digit' }
                        )}
                      </time>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link
                        href={`/${lang}/news/${relatedItem.id}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {lang === 'ja' ? relatedItem.title_ja : relatedItem.title_en}
                      </Link>
                    </h3>

                    {(lang === 'ja' ? relatedItem.excerpt_ja : relatedItem.excerpt_en) && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {lang === 'ja' ? relatedItem.excerpt_ja : relatedItem.excerpt_en}
                      </p>
                    )}
                  </div>
                </article>
              ))}
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
              {lang === 'ja' ? 'ニュース一覧に戻る' : 'Back to News'}
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center bg-brand-500 text-white px-6 py-3 rounded-md font-medium hover:bg-brand-600 transition"
            >
              {lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
