import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { getActiveCategories, getPublishedOpportunities } from '@/lib/supabase/partnership'
import Link from 'next/link'
import Image from 'next/image'

export default async function PartnershipPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { lang } = await params
  const { category: categorySlug } = await searchParams
  const dict = await getDictionary(lang as Language)

  const [categories, opportunities] = await Promise.all([
    getActiveCategories(),
    getPublishedOpportunities(categorySlug),
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
              {lang === 'ja' ? 'パートナーシップ案件' : 'Partnership Opportunities'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? '共に成長する、信頼できるパートナーシップの機会'
                : 'Trusted partnership opportunities to grow together'}
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左サイドバー：カテゴリフィルター */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {lang === 'ja' ? 'カテゴリ' : 'Categories'}
                </h2>
                <nav className="space-y-2">
                  {/* すべて表示 */}
                  <Link
                    href={`/${lang}/partnership`}
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
              {opportunities.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">
                    {lang === 'ja'
                      ? '現在、該当する案件はありません。'
                      : 'No opportunities available at the moment.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {opportunities.map((opportunity) => (
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
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-500 to-brand-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {lang === 'ja'
                ? '共に国境を越えて、"信頼"をつくりませんか?'
                : 'Build "Trust" Beyond Borders Together?'}
            </h2>
            <p className="text-xl text-brand-50 mb-8">
              {lang === 'ja'
                ? 'パートナーシップにご興味のある方は、まずはお気軽にご連絡ください'
                : 'If you are interested in partnership opportunities, please feel free to contact us'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block bg-white text-brand-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg"
            >
              {lang === 'ja' ? 'お問い合わせはこちら' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
