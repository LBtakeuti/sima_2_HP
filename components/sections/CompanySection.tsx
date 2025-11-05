import type { Language } from '@/lib/i18n/config'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function CompanySection({ lang, dict }: { lang: Language; dict: any }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Info */}
          <FadeInAnimation>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-text">
                {lang === 'ja' ? '会社情報' : 'Company Info'}
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-700">
                    {lang === 'ja' ? '商号' : 'Company Name'}
                  </dt>
                  <dd className="text-gray-600">株式会社SEEMAPAR</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">
                    {lang === 'ja' ? '設立' : 'Established'}
                  </dt>
                  <dd className="text-gray-600">2025年10月15日</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">
                    {lang === 'ja' ? '代表取締役' : 'CEO'}
                  </dt>
                  <dd className="text-gray-600">PATIL SEEMA (VISHNUPANT)</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">
                    {lang === 'ja' ? '拠点' : 'Locations'}
                  </dt>
                  <dd className="text-gray-600">
                    <p className="mb-1">東京</p>
                    <p className="mb-1">インド: Pune, Goa</p>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">
                    {lang === 'ja' ? '事業領域' : 'Business Areas'}
                  </dt>
                  <dd className="text-gray-600">
                    {lang === 'ja'
                      ? '日印クロスボーダー事業コンサルティング'
                      : 'Japan-India Cross-border Business Consulting'}
                  </dd>
                </div>
              </dl>
            </div>
          </FadeInAnimation>

          {/* Founder Info */}
          <FadeInAnimation delay={200}>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-text">
                {lang === 'ja' ? '創業者' : 'Founder'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-text">Seema Patil</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-brand-500 mr-2">•</span>
                    {lang === 'ja'
                      ? '1989年来日、日印ビジネスのパイオニア'
                      : 'Pioneer of Japan-India business since arriving in Japan in 1989'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-500 mr-2">•</span>
                    {lang === 'ja'
                      ? '500名以上の人材を育成'
                      : 'Trained over 500 professionals'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-500 mr-2">•</span>
                    {lang === 'ja'
                      ? 'MukTI設立・売却（2016年）'
                      : 'Founded and exited MukTI (2016)'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-500 mr-2">•</span>
                    {lang === 'ja'
                      ? '著書：複数のビジネス関連書籍を執筆'
                      : 'Author: Multiple business-related books'}
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href={`/${lang}/founder`}
                    className="inline-block text-brand-600 hover:text-brand-700 font-semibold"
                  >
                    {lang === 'ja' ? '詳しく見る →' : 'Learn More →'}
                  </a>
                </div>
              </div>
            </div>
          </FadeInAnimation>
        </div>

        {/* Brand Story */}
        <FadeInAnimation delay={400}>
          <div className="mt-16 bg-brand-50 rounded-lg p-8 text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-text">
              {lang === 'ja' ? 'SEEMAPARの意味' : 'Meaning of SEEMAPAR'}
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {lang === 'ja'
                ? '空の色（スカイブルー）× 真珠（Pearl）= 異質の交わりから価値を生む。日本とインド、異なる文化・ビジネス慣習を持つ二つの国を結び、新たな価値を創造します。'
                : 'SEEMAPAAR means \'Across the Border\' in Indian languages. In Japanese, the pronunciation, Seema-Paaru (パール = Pearl), symbolizes our unique approach: just as an oyster creates a precious pearl from a foreign object, we transform your foreign challenges into valuable, enduring success for your business.'}
            </p>
          </div>
        </FadeInAnimation>
      </div>
    </section>
  )
}