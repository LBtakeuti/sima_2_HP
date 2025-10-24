import type { Language } from '@/lib/i18n/config'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function ServicesOverviewSection({ lang }: { lang: Language }) {
  const services = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      titleEn: 'Market Entry & Partnership Consulting',
      titleJa: '市場参入・パートナーシップコンサルティング',
      descriptionEn:
        'Support for entering the Japanese and Indian markets. Introduction to the right clients and partners for M&A, Joint Ventures (JV), and business alliances across corporations, government bodies, NGOs, and non-profits.',
      descriptionJa:
        '日本・インド市場への参入支援。M&A、ジョイントベンチャー（JV）、企業・政府機関・NGO・非営利団体との事業提携のための適切なクライアントとパートナーのご紹介。',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      titleEn: 'Technology & Digital Transformation',
      titleJa: 'テクノロジー・デジタルトランスフォーメーション',
      descriptionEn:
        'Consultation and introduction for implementing AI and business automation.',
      descriptionJa: 'AI・ビジネス自動化の導入に関するコンサルティングと企業紹介。',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      titleEn: 'Global Human Capital & Training',
      titleJa: 'グローバル人材・研修',
      descriptionEn: 'Specialized overseas human resources and professional training.',
      descriptionJa: '専門的な海外人材の紹介と専門研修の提供。',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      titleEn: 'Logistics, Trade & General Business Support',
      titleJa: '物流・貿易・総合ビジネスサポート',
      descriptionEn:
        'Comprehensive support for logistics, international trade, and general business operations.',
      descriptionJa: '物流、国際貿易、総合的なビジネスオペレーションの包括的サポート。',
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <FadeInAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'ja' ? '主要サービス' : 'Key Services'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              {lang === 'ja'
                ? '日印クロスボーダービジネスを中心に'
                : 'Focus on India-Japan Cross-Border Business'}
            </p>
          </div>
        </FadeInAnimation>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <FadeInAnimation key={index} delay={200 + index * 100}>
              <div className="bg-white rounded-lg border border-gray-200 p-8 h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mr-4">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {lang === 'ja' ? service.titleJa : service.titleEn}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja' ? service.descriptionJa : service.descriptionEn}
                </p>
              </div>
            </FadeInAnimation>
          ))}
        </div>

        {/* 追加情報 */}
        <FadeInAnimation delay={600}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              {lang === 'ja'
                ? 'これらのサービスについて詳しく知りたい方は、お気軽にお問い合わせください'
                : 'For more information about these services, please feel free to contact us'}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700 transition"
            >
              <span>
                {lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
              </span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </FadeInAnimation>
      </div>
    </section>
  )
}
