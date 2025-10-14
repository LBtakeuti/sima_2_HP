import type { Language } from '@/lib/i18n/config'

export default function CompanySection({ lang, dict }: { lang: Language; dict: any }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-text">
              {lang === 'ja' ? '会社情報' : lang === 'en' ? 'Company Info' : 'कंपनी की जानकारी'}
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-gray-700">
                  {lang === 'ja' ? '商号' : lang === 'en' ? 'Company Name' : 'कंपनी का नाम'}
                </dt>
                <dd className="text-gray-600">株式会社SEEMAPAR</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-700">
                  {lang === 'ja' ? '設立' : lang === 'en' ? 'Established' : 'स्थापना'}
                </dt>
                <dd className="text-gray-600">2025年10月15日</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-700">
                  {lang === 'ja' ? '代表取締役' : lang === 'en' ? 'CEO' : 'सीईओ'}
                </dt>
                <dd className="text-gray-600">PATIL SEEMA (VISHNUPANT)</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-700">
                  {lang === 'ja' ? '拠点' : lang === 'en' ? 'Locations' : 'स्थान'}
                </dt>
                <dd className="text-gray-600">
                  <p className="mb-1">東京準備室</p>
                  <p className="mb-1">インド: Pune, Goa</p>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-700">
                  {lang === 'ja' ? '事業領域' : lang === 'en' ? 'Business Areas' : 'व्यवसाय क्षेत्र'}
                </dt>
                <dd className="text-gray-600">
                  {lang === 'ja'
                    ? '日印クロスボーダー事業コンサルティング'
                    : lang === 'en'
                    ? 'Japan-India Cross-border Business Consulting'
                    : 'जापान-भारत क्रॉस-बॉर्डर व्यापार परामर्श'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Founder Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-text">
              {lang === 'ja' ? '創業者' : lang === 'en' ? 'Founder' : 'संस्थापक'}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-text">Seema Patil</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  {lang === 'ja'
                    ? '1989年来日、日印ビジネスのパイオニア'
                    : lang === 'en'
                    ? 'Pioneer of Japan-India business since arriving in Japan in 1989'
                    : '1989 से जापान में, जापान-भारत व्यापार के अग्रदूत'}
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  {lang === 'ja'
                    ? '500名以上の人材を育成'
                    : lang === 'en'
                    ? 'Trained over 500 professionals'
                    : '500 से अधिक पेशेवरों को प्रशिक्षित किया'}
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  {lang === 'ja'
                    ? 'MukTI設立・売却（2016年）'
                    : lang === 'en'
                    ? 'Founded and exited MukTI (2016)'
                    : 'MukTI की स्थापना और बिक्री (2016)'}
                </li>
                <li className="flex items-start">
                  <span className="text-brand-500 mr-2">•</span>
                  {lang === 'ja'
                    ? '著書：複数のビジネス関連書籍を執筆'
                    : lang === 'en'
                    ? 'Author: Multiple business-related books'
                    : 'लेखक: कई व्यावसायिक पुस्तकें'}
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href={`/${lang}/founder`}
                  className="inline-block text-brand-600 hover:text-brand-700 font-semibold"
                >
                  {lang === 'ja' ? '詳しく見る →' : lang === 'en' ? 'Learn More →' : 'और जानें →'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Story */}
        <div className="mt-16 bg-brand-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-text">
            {lang === 'ja' ? 'SEEMAPARの意味' : lang === 'en' ? 'Meaning of SEEMAPAR' : 'SEEMAPAR का अर्थ'}
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            {lang === 'ja'
              ? '空の色（スカイブルー）× 真珠（Pearl）= 異質の交わりから価値を生む。日本とインド、異なる文化・ビジネス慣習を持つ二つの国を結び、新たな価値を創造します。'
              : lang === 'en'
              ? 'Sky Blue × Pearl = Creating value from the intersection of differences. We connect Japan and India, two countries with different cultures and business practices, to create new value.'
              : 'आसमानी रंग × मोती = अंतर के चौराहे से मूल्य बनाना। हम जापान और भारत को जोड़ते हैं, दो देश अलग संस्कृतियों और व्यावसायिक प्रथाओं के साथ, नए मूल्य बनाने के लिए।'}
          </p>
        </div>
      </div>
    </section>
  )
}