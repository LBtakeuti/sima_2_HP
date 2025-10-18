import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import Link from 'next/link'

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  const partnershipTypes = [
    {
      titleJa: '販売代理店・ディストリビューター',
      titleEn: 'Sales Agent / Distributor',
      descriptionJa: '日本製品のインド市場での販売パートナー、またはインド製品の日本市場での販売パートナーを募集しています。',
      descriptionEn: 'We are looking for sales partners to distribute Japanese products in the Indian market, or Indian products in the Japanese market.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: '技術提携・共同開発',
      titleEn: 'Technical Partnership / Joint Development',
      descriptionJa: '技術交流、共同研究開発、製品のローカライズなど、技術面での協業パートナーを募集しています。',
      descriptionEn: 'We are looking for technical collaboration partners for technology exchange, joint R&D, and product localization.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      titleJa: '業務提携・アライアンス',
      titleEn: 'Business Partnership / Alliance',
      descriptionJa: 'コンサルティング、人材紹介、法務・税務など、クロスボーダー事業を支援する専門家パートナーを募集しています。',
      descriptionEn: 'We are looking for professional partners to support cross-border business, including consulting, recruitment, legal and tax services.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      titleJa: 'サプライチェーン・物流パートナー',
      titleEn: 'Supply Chain / Logistics Partner',
      descriptionJa: '輸出入、倉庫、配送など、物流面での協業パートナーを募集しています。',
      descriptionEn: 'We are looking for logistics partners for import/export, warehousing, and distribution.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
    },
  ]

  const partnerBenefits = [
    {
      titleJa: '豊富なネットワーク',
      titleEn: 'Rich Network',
      descriptionJa: '30年以上の日印ビジネス経験を通じて構築した、信頼できるビジネスネットワークへのアクセス',
      descriptionEn: 'Access to a trusted business network built through over 30 years of Japan-India business experience',
    },
    {
      titleJa: '文化・言語サポート',
      titleEn: 'Cultural & Language Support',
      descriptionJa: '両国の文化・商習慣を理解した通訳・翻訳、ビジネスコミュニケーション支援',
      descriptionEn: 'Interpretation, translation, and business communication support with understanding of both cultures',
    },
    {
      titleJa: '実務支援',
      titleEn: 'Practical Support',
      descriptionJa: '契約交渉、現地視察、商談セッティングなど、実務面での積極的なサポート',
      descriptionEn: 'Active support in practical matters such as contract negotiations, site visits, and business meeting arrangements',
    },
    {
      titleJa: '長期的な関係構築',
      titleEn: 'Long-term Relationship Building',
      descriptionJa: '一時的な取引ではなく、信頼に基づいた長期的なパートナーシップの構築',
      descriptionEn: 'Building long-term partnerships based on trust, not just one-time transactions',
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
              {lang === 'ja' ? 'パートナーシップ募集' : 'Partnership Opportunities'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? '共に成長する、信頼できるパートナーを募集しています'
                : 'We are looking for trusted partners to grow together'}
            </p>
          </div>
        </div>
      </section>

      {/* パートナーシップ概要セクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {lang === 'ja' ? '共に"信頼"をつくるパートナーへ' : 'To Partners Who Build "Trust" Together'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {lang === 'ja' ? (
                  <>
                    SEEMAPAARは、日本とインドの架け橋として、両国のビジネス発展に貢献したいと考えています。私たちは、単なる仲介業者ではなく、お客様やパートナー企業と共に成長し、長期的な信頼関係を築くことを大切にしています。
                  </>
                ) : (
                  <>
                    As a bridge between Japan and India, SEEMAPAAR aims to contribute to the business development of both countries. We value not just being intermediaries, but growing together with our clients and partner companies and building long-term trust relationships.
                  </>
                )}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                {lang === 'ja' ? (
                  <>
                    もしあなたが、<span className="font-semibold text-brand-600">日印クロスボーダー事業に関心がある</span>、<span className="font-semibold text-brand-600">信頼に基づいた長期的な関係を築きたい</span>、<span className="font-semibold text-brand-600">お互いの強みを活かして共に成長したい</span>とお考えなら、ぜひ私たちと一緒にビジネスを展開しませんか?
                  </>
                ) : (
                  <>
                    If you are <span className="font-semibold text-brand-600">interested in Japan-India cross-border business</span>, want to <span className="font-semibold text-brand-600">build long-term relationships based on trust</span>, and wish to <span className="font-semibold text-brand-600">grow together leveraging each other's strengths</span>, why not develop business with us?
                  </>
                )}
              </p>
            </div>
          </div>

          {/* パートナーシップタイプ */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'ja' ? '募集中のパートナーシップ' : 'Partnership Types We Are Looking For'}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {partnershipTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-white mb-6">
                    {type.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {lang === 'ja' ? type.titleJa : type.titleEn}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {lang === 'ja' ? type.descriptionJa : type.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* パートナーになるメリット */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? 'パートナーになるメリット' : 'Benefits of Partnership'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="space-y-6">
              {partnerBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-brand-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {lang === 'ja' ? benefit.titleJa : benefit.titleEn}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {lang === 'ja' ? benefit.descriptionJa : benefit.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* パートナー募集プロセス */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? 'パートナー募集の流れ' : 'Partnership Process'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {lang === 'ja' ? 'お問い合わせ' : 'Initial Contact'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'ja'
                      ? 'まずは下記のフォームからお気軽にお問い合わせください。簡単なご相談内容をお聞かせください。'
                      : 'Please feel free to contact us via the form below. Share a brief overview of your inquiry.'}
                  </p>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {lang === 'ja' ? '初回面談' : 'First Meeting'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'ja'
                      ? 'オンラインまたは対面で初回面談を実施します。お互いのビジネス内容、パートナーシップの可能性について話し合います。'
                      : 'We conduct an initial meeting online or in person. We discuss each other\'s business and partnership possibilities.'}
                  </p>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {lang === 'ja' ? '協業内容の検討' : 'Collaboration Discussion'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'ja'
                      ? '具体的な協業内容、役割分担、ビジネスモデルなどについて詳細に検討します。'
                      : 'We discuss specific collaboration content, role division, and business models in detail.'}
                  </p>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {lang === 'ja' ? 'パートナーシップ契約' : 'Partnership Agreement'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'ja'
                      ? '双方合意の上、正式なパートナーシップ契約を締結し、協業を開始します。'
                      : 'Upon mutual agreement, we sign a formal partnership agreement and start collaboration.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-brand-500 to-brand-600">
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
