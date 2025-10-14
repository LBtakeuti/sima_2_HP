import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dict.nav.about}
          </h1>
          <p className="text-lg text-white/90">
            SEEMAPAR - Strategic Consulting
          </p>
        </div>
      </section>

      {/* 会社情報セクション */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white border-2 border-gray-200 p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              {lang === 'ja' ? '会社概要' : lang === 'en' ? 'Company Overview' : 'कंपनी अवलोकन'}
            </h2>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {lang === 'ja' ? '会社名' : lang === 'en' ? 'Company Name' : 'कंपनी का नाम'}
                </h3>
                <p className="text-gray-600">SeemaPar（シーマパール）</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {lang === 'ja' ? '設立年月日' : lang === 'en' ? 'Establishment Date' : 'स्थापना तिथि'}
                </h3>
                <p className="text-gray-600">2025年10月15日</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {lang === 'ja' ? '代表者' : lang === 'en' ? 'Director' : 'निदेशक'}
                </h3>
                <p className="text-gray-600">PATIL SEEMA (VISHNUPANT)</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {lang === 'ja' ? '所在地' : lang === 'en' ? 'Address' : 'पता'}
                </h3>
                <p className="text-gray-600">
                  〒420-0061<br />
                  静岡県静岡市葵区新富町3丁目35番地10
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {lang === 'ja' ? '事業内容' : lang === 'en' ? 'Business Activities' : 'व्यावसायिक गतिविधियाँ'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'ja'
                    ? '戦略コンサルティング、国際ビジネス支援'
                    : lang === 'en'
                    ? 'Strategic Consulting, International Business Support'
                    : 'रणनीतिक परामर्श, अंतर्राष्ट्रीय व्यापार सहायता'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}