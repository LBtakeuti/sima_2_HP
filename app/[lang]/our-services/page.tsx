import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import Link from 'next/link'

export default async function OurServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  const services = [
    {
      titleJa: '国際ビジネス展開支援',
      titleEn: 'International Business Expansion Support',
      descriptionJa: '海外市場への進出戦略立案から実行まで、包括的にサポートします。',
      descriptionEn: 'Comprehensive support from strategy planning to execution for overseas market entry.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: '経営戦略コンサルティング',
      titleEn: 'Management Strategy Consulting',
      descriptionJa: '企業の持続的成長を実現するための戦略的アドバイスを提供します。',
      descriptionEn: 'Providing strategic advice to realize sustainable corporate growth.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      titleJa: 'M&Aアドバイザリー',
      titleEn: 'M&A Advisory',
      descriptionJa: '企業買収・合併における戦略立案から実行支援まで行います。',
      descriptionEn: 'From strategy planning to execution support in corporate acquisitions and mergers.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
    },
    {
      titleJa: '市場調査・進出戦略支援',
      titleEn: 'Market Research & Entry Strategy Support',
      descriptionJa: 'インド市場への進出を検討している企業様に、現地の市場動向、競合分析、規制情報などを提供し、最適な進出戦略を策定します。',
      descriptionEn: 'We provide local market trends, competitive analysis, and regulatory information to companies considering entering the Indian market, and formulate optimal entry strategies.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: 'パートナー企業発掘・マッチング',
      titleEn: 'Partner Discovery & Matching',
      descriptionJa: '日本企業とインド企業のマッチングを支援。適切なパートナー候補を発掘し、商談をセッティング。双方の文化や商習慣を理解した上で、円滑なコミュニケーションをサポートします。',
      descriptionEn: 'We support matching between Japanese and Indian companies. We discover appropriate partner candidates, set up business meetings, and support smooth communication based on understanding of both cultures and business practices.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      titleJa: '法務・税務・コンプライアンス支援',
      titleEn: 'Legal, Tax & Compliance Support',
      descriptionJa: 'インドでの会社設立、契約書作成、税務処理、コンプライアンス対応など、専門家ネットワークと連携し、必要な法務・税務サポートを提供します。',
      descriptionEn: 'We provide necessary legal and tax support by collaborating with a network of experts for company establishment in India, contract drafting, tax processing, and compliance handling.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: '現地オペレーション・サプライチェーン構築',
      titleEn: 'Local Operations & Supply Chain Development',
      descriptionJa: '製造拠点の選定、物流網の構築、品質管理体制の確立など、実際の現地オペレーション立ち上げを支援します。長年の経験を活かし、効率的で持続可能なサプライチェーンを構築します。',
      descriptionEn: 'We support the actual establishment of local operations such as manufacturing site selection, logistics network development, and quality control system establishment. We build efficient and sustainable supply chains leveraging years of experience.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      ),
    },
    {
      titleJa: '商品開発・R&Dサポート',
      titleEn: 'Product Development & R&D Support',
      descriptionJa: 'インド市場向けの商品開発、現地ニーズに基づいた製品のローカライズ、R&Dパートナーの発掘など、製品開発プロセス全体をサポートします。',
      descriptionEn: 'We support the entire product development process, including product development for the Indian market, product localization based on local needs, and R&D partner discovery.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: '人材採用・育成支援',
      titleEn: 'Recruitment & Training Support',
      descriptionJa: '現地スタッフの採用支援、日本式ビジネスマナー研修、異文化コミュニケーション研修など、人材面での課題解決をサポートします。',
      descriptionEn: 'We support talent-related challenges such as local staff recruitment support, Japanese business manner training, and cross-cultural communication training.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight">
              {lang === 'ja' ? '提供サービス' : 'Our Services'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? '日印クロスボーダー事業の実働型コンサルティング'
                : 'Hands-On Consulting for Japan-India Cross-Border Business'}
            </p>
          </div>
        </div>
      </section>

      {/* サービス概要セクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {lang === 'ja' ? '実働型コンサルティング' : 'Hands-On Consulting'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {lang === 'ja' ? (
                <>
                  SEEMAPAARは、単なるアドバイスにとどまらず、お客様と共に現場に立ち、課題解決のために手を動かします。30年以上の日印ビジネス経験を活かし、実践的で成果にコミットした支援を提供します。
                </>
              ) : (
                <>
                  SEEMAPAAR doesn't just provide advice—we stand with our clients in the field and work hands-on to solve problems. Leveraging over 30 years of Japan-India business experience, we provide practical, results-committed support.
                </>
              )}
            </p>
          </div>

          {/* サービス一覧 */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {lang === 'ja' ? service.titleJa : service.titleEn}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja' ? service.descriptionJa : service.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 実績・特徴セクション */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? '私たちの強み' : 'Our Strengths'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-brand-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '30年以上の実務経験' : 'Over 30 Years of Practical Experience'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lang === 'ja'
                        ? '創業者は1989年の来日以来、ヨガ講師、ヘナの普及、スパスクール経営、輸出入ビジネス、自社創業・M&Aなど、多岐にわたる経験を積んできました。この実績が、お客様への実践的なサポートの基盤となっています。'
                        : 'Since arriving in Japan in 1989, our founder has accumulated diverse experience as a yoga instructor, henna promoter, spa school manager, import/export business operator, and through founding and M&A of her own company. This track record forms the foundation for practical support to our clients.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-brand-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '両国の文化・商習慣への深い理解' : 'Deep Understanding of Both Cultures & Business Practices'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lang === 'ja'
                        ? 'インド出身でありながら30年以上日本で生活・ビジネスを展開してきた経験から、両国の文化や商習慣を熟知しています。この理解が、円滑なコミュニケーションと信頼構築の鍵となります。'
                        : 'Born in India but living and doing business in Japan for over 30 years, we are deeply familiar with both cultures and business practices. This understanding is the key to smooth communication and trust building.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-brand-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '小規模精鋭チーム' : 'Small, Elite Team'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lang === 'ja'
                        ? '大規模組織が見落としがちな、高度にカスタマイズされた人的要素を提供します。お客様一社一社に寄り添い、きめ細やかなサポートを実現します。'
                        : 'We provide highly customized human elements often overlooked by large organizations. We stay close to each client and deliver detailed support.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {lang === 'ja' ? 'まずはお気軽にご相談ください' : 'Contact Us for a Free Consultation'}
              </h2>
              <p className="text-xl text-brand-50 mb-8">
                {lang === 'ja'
                  ? '日印クロスボーダー事業でお悩みの方、まずは無料相談から始めましょう'
                  : 'If you have concerns about Japan-India cross-border business, let\'s start with a free consultation'}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block bg-white text-brand-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg"
              >
                {lang === 'ja' ? '無料相談を申し込む' : 'Request Free Consultation'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
