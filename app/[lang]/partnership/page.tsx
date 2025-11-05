import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import { getActiveCategories, getPublishedOpportunities } from '@/lib/supabase/partnership'
import Link from 'next/link'
import PartnershipList from '@/components/partnership/PartnershipList'

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
      <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
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
          <PartnershipList
            lang={lang}
            categories={categories}
            opportunities={opportunities}
            categorySlug={categorySlug}
          />
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
