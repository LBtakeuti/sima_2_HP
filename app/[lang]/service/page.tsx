import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  const services = [
    {
      title: {
        ja: '国際ビジネス展開支援',
        en: 'International Business Expansion Support',
        hi: 'अंतर्राष्ट्रीय व्यापार विस्तार सहायता'
      },
      description: {
        ja: '海外市場への進出戦略立案から実行まで、包括的にサポートします。',
        en: 'Comprehensive support from strategy planning to execution for overseas market entry.',
        hi: 'विदेशी बाजार में प्रवेश के लिए रणनीति योजना से लेकर कार्यान्वयन तक व्यापक सहायता।'
      }
    },
    {
      title: {
        ja: '経営戦略コンサルティング',
        en: 'Management Strategy Consulting',
        hi: 'प्रबंधन रणनीति परामर्श'
      },
      description: {
        ja: '企業の持続的成長を実現するための戦略的アドバイスを提供します。',
        en: 'Providing strategic advice to realize sustainable corporate growth.',
        hi: 'टिकाऊ कॉर्पोरेट विकास को साकार करने के लिए रणनीतिक सलाह प्रदान करना।'
      }
    },
    {
      title: {
        ja: 'M&Aアドバイザリー',
        en: 'M&A Advisory',
        hi: 'एम एंड ए सलाहकार'
      },
      description: {
        ja: '企業買収・合併における戦略立案から実行支援まで行います。',
        en: 'From strategy planning to execution support in corporate acquisitions and mergers.',
        hi: 'कॉर्पोरेट अधिग्रहण और विलय में रणनीति योजना से लेकर निष्पादन समर्थन तक।'
      }
    }
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight">
            {dict.nav.ourServices}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === 'ja'
              ? '世界レベルの戦略コンサルティングサービス'
              : lang === 'en'
              ? 'World-class Strategic Consulting Services'
              : 'विश्व स्तरीय रणनीतिक परामर्श सेवाएं'}
          </p>
        </div>
      </section>

      {/* サービス一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const title = service.title[lang as Language] || service.title.ja
              const description = service.description[lang as Language] || service.description.ja

              return (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 p-8 hover:border-primary-600 transition-colors"
                >
                  <div className="w-16 h-16 bg-primary-100 flex items-center justify-center mb-6">
                    <span className="text-primary-600 text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {title}
                  </h3>
                  <p className="text-gray-600">
                    {description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}