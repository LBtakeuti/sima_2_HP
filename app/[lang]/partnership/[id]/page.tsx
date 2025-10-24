import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { getOpportunityById, getPublishedOpportunities } from '@/lib/supabase/partnership'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function PartnershipDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const dict = await getDictionary(lang as Language)

  const opportunity = await getOpportunityById(id)

  if (!opportunity) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* パンくずリスト */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-brand-600 transition-colors">
              {lang === 'ja' ? 'ホーム' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/partnership`} className="hover:text-brand-600 transition-colors">
              {lang === 'ja' ? 'パートナーシップ案件' : 'Partnership Opportunities'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {lang === 'ja' ? opportunity.title_ja : opportunity.title_en}
            </span>
          </nav>
        </div>
      </section>

      {/* ヘッダー */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-brand-50 via-white to-brand-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {lang === 'ja' ? opportunity.title_ja : opportunity.title_en}
            </h1>
            {opportunity.category && (
              <div className="inline-flex items-center px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                {lang === 'ja' ? opportunity.category.name_ja : opportunity.category.name_en}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* メイン画像 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={opportunity.image_url}
                alt={lang === 'ja' ? opportunity.title_ja : opportunity.title_en}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* コンテンツ */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 概要 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-brand-500 pl-4">
                {lang === 'ja' ? '概要' : 'Overview'}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {lang === 'ja' ? opportunity.description_ja : opportunity.description_en}
              </p>
            </div>

            {/* 詳細内容 */}
            {(lang === 'ja' ? opportunity.content_ja : opportunity.content_en) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-brand-500 pl-4">
                  {lang === 'ja' ? '詳細' : 'Details'}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: (lang === 'ja' ? opportunity.content_ja : opportunity.content_en) || '',
                    }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 p-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {lang === 'ja' ? 'この案件に興味がありますか?' : 'Interested in this opportunity?'}
              </h3>
              <p className="text-brand-50 mb-6">
                {lang === 'ja'
                  ? 'まずはお気軽にお問い合わせください'
                  : 'Please feel free to contact us'}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block bg-white text-brand-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg"
              >
                {lang === 'ja' ? 'お問い合わせはこちら' : 'Contact Us'}
              </Link>
            </div>

            {/* 戻るリンク */}
            <div className="mt-12 text-center">
              <Link
                href={`/${lang}/partnership`}
                className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {lang === 'ja' ? '案件一覧に戻る' : 'Back to Opportunities'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
