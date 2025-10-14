import type { Language } from '@/lib/i18n/config'

export default function ServiceSection({ lang, dict }: { lang: Language; dict: any }) {
  const services = [
    {
      icon: '🌍',
      title: {
        ja: '初回コンサルティング',
        en: 'Initial Consultation',
        hi: 'प्रारंभिक परामर्श'
      },
      description: {
        ja: '現状課題の整理と最適な方向性の提示。予約制で¥20,000（第1土曜日は無料枠あり）',
        en: 'Organize current challenges and suggest optimal directions. ¥20,000 by appointment (Free slots on 1st Saturday)',
        hi: 'वर्तमान चुनौतियों को व्यवस्थित करें। ¥20,000 (पहले शनिवार मुफ्त)'
      }
    },
    {
      icon: '📊',
      title: {
        ja: '市場調査・競合分析',
        en: 'Market Research & Analysis',
        hi: 'बाजार अनुसंधान'
      },
      description: {
        ja: '現地訪問を含む徹底的な調査。規制・競合・消費者動向を月次レポートで提供',
        en: 'Thorough research including site visits. Monthly reports on regulations, competition, and consumer trends',
        hi: 'साइट यात्राओं सहित गहन शोध। मासिक रिपोर्ट'
      }
    },
    {
      icon: '🤝',
      title: {
        ja: '展示会同行・商談支援',
        en: 'Exhibition & Negotiation Support',
        hi: 'प्रदर्शनी और वार्ता समर्थन'
      },
      description: {
        ja: '展示会への同行、重要会議の設計・同席、多言語対応メールドラフト作成',
        en: 'Accompany to exhibitions, design and attend important meetings, multilingual email drafts',
        hi: 'प्रदर्शनियों में साथ, महत्वपूर्ण बैठकें, बहुभाषी ईमेल'
      }
    },
    {
      icon: '💡',
      title: {
        ja: '直接調達・製造管理',
        en: 'Direct Procurement & Manufacturing',
        hi: 'प्रत्यक्ष खरीद और विनिर्माण'
      },
      description: {
        ja: '小ロット製造対応、第三者検査済み、価格透明性を保ちつつ自走化支援',
        en: 'Small lot manufacturing, third-party inspection, price transparency with self-sufficiency support',
        hi: 'छोटे लॉट विनिर्माण, तृतीय-पक्ष निरीक्षण, मूल्य पारदर्शिता'
      }
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {lang === 'ja' ? '実働型コンサルサービス' : lang === 'en' ? 'Hands-on Consulting Services' : 'हाथों पर परामर्श सेवाएं'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'ja'
              ? 'AIで標準化できる領域は最小化し、人の関係性と現場実行で成果を出します'
              : lang === 'en'
              ? 'Minimize AI-standardizable areas, deliver results through human relationships and on-site execution'
              : 'AI-मानकीकरण योग्य क्षेत्रों को कम से कम करें, मानव संबंधों और साइट पर निष्पादन के माध्यम से परिणाम दें'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const title = service.title[lang] || service.title.ja
            const description = service.description[lang] || service.description.ja

            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 p-6 hover:border-brand-500 transition-colors hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={`/${lang}/service`}
            className="inline-block bg-brand-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-brand-600 transition shadow-md"
          >
            {lang === 'ja' ? '初回相談を予約する' : lang === 'en' ? 'Book Initial Consultation' : 'प्रारंभिक परामर्श बुक करें'} →
          </a>
        </div>
      </div>
    </section>
  )
}