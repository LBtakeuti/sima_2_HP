import type { Language } from '@/lib/i18n/config'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function CompanyInfoSection({ lang }: { lang: Language }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <FadeInAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'ja' ? '会社概要' : 'Corporate Information'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
          </div>
        </FadeInAnimation>

        {/* 会社名の由来 */}
        <FadeInAnimation delay={150}>
          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {lang === 'ja' ? '社名の由来' : 'About Our Name'}
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4 text-center">
              <p className="text-lg">
                <span className="font-bold text-brand-600">SEEMAPAAR</span>{' '}
                {lang === 'ja'
                  ? 'は、インドの言語で「国境を越えて」を意味します。日本語の発音では、シーマパール（パール＝真珠）となり、私たちの独自のアプローチを象徴しています。'
                  : 'means "Across the Border" in Indian languages.'}
              </p>
              <p className="text-lg">
                {lang === 'ja'
                  ? '真珠貝が異物から貴重な真珠を生み出すように、私たちは、お客様の海外での課題を、ビジネスにとって価値ある永続的な成功へと変えていきます。'
                  : 'In Japanese, the pronunciation, Seema-Paaru (パール = Pearl), symbolizes our unique approach: just as an oyster creates a precious pearl from a foreign object, we transform your foreign challenges into valuable, enduring success for your business.'}
              </p>
            </div>
          </div>
        </FadeInAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 基本情報 */}
          <FadeInAnimation delay={200}>
            <div className="bg-gray-50 rounded-lg p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-500">
                {lang === 'ja' ? '基本情報' : 'Company Details'}
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-600 mb-1">
                    {lang === 'ja' ? '商号' : 'Company Name'}
                  </dt>
                  <dd className="text-gray-900 font-medium">
                    SEEMAPAAR Co., Ltd.
                    {lang === 'ja' && (
                      <>
                        <br />
                        <span className="text-sm">株式会社シーマパール</span>
                      </>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600 mb-1">
                    {lang === 'ja' ? '設立日' : 'Established'}
                  </dt>
                  <dd className="text-gray-900 font-medium">
                    {lang === 'ja' ? '2025年10月15日' : 'October 15, 2025'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600 mb-1">
                    {lang === 'ja' ? '役員' : 'Director'}
                  </dt>
                  <dd className="text-gray-900 font-medium">
                    PATIL SEEMA (VISHNUPANT)
                    {lang === 'ja' && (
                      <>
                        <br />
                        <span className="text-sm">パティル・シーマ</span>
                      </>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </FadeInAnimation>

          {/* オフィス情報 */}
          <FadeInAnimation delay={300}>
            <div className="bg-gray-50 rounded-lg p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-500">
                {lang === 'ja' ? 'オフィス所在地' : 'Office Locations'}
              </h3>
              <div className="space-y-6">
                {/* Shizuoka Office */}
                {lang === 'ja' && (
                  <div>
                    <dt className="text-sm font-medium text-brand-600 mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      静岡
                    </dt>
                    <dd className="text-sm text-gray-700 leading-relaxed ml-6">
                      〒420-0061 静岡県静岡市葵区新富町3-35-10
                    </dd>
                  </div>
                )}

                {/* India Office */}
                <div>
                  <dt className="text-sm font-medium text-brand-600 mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {lang === 'ja' ? 'インドオフィス（プネー）' : 'India Office (Pune)'}
                  </dt>
                  <dd className="text-sm text-gray-700 leading-relaxed ml-6">
                    {lang === 'ja' ? (
                      <>
                        ロクマットビル 2階、シンガッド通り
                        <br />
                        ヴァドガオン・クルド、プネー、マハーラーシュトラ州 インド 411068
                      </>
                    ) : (
                      <>
                        Lokmat Building, 2nd Floor, Sinhgad Road,
                        <br />
                        Vadgaon Khurd, Pune, Maharashtra India - 411068
                      </>
                    )}
                  </dd>
                </div>
              </div>
            </div>
          </FadeInAnimation>
        </div>
      </div>
    </section>
  )
}
