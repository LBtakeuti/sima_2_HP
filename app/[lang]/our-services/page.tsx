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

          {/* Hands-on Support Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                We go beyond traditional consulting to provide active support that drives your business success. For services tailored to the specific needs of each client, kindly refer to the case studies section.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-500">
                SEEMAPAAR's Unique Hands-on Support
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                These are our general services that demonstrate our unique approach:
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Effective Meetings:</span> We coordinate and manage productive meetings for all parties involved. We also join your visits to actively guide the conversation, facilitating negotiations that result in a successful agreement.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Time-Saving Communication:</span> We draft essential emails and correspondence, freeing up your employees' time for critical tasks. We also join meetings when necessary to eliminate cross-cultural communication errors in both written and spoken interactions.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Proactive Client Management:</span> We maintain regular contact with your ongoing customers to keep them engaged and foster loyalty.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Deadline Management:</span> We professionally communicate and explain the need for time limit extensions or project changes on your behalf.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Direct Problem-Solving:</span> We leverage our connections and resources to provide practical solutions to challenges.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Active Participation:</span> We attend exhibitions, conferences, and presentations alongside or on behalf of your team.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">Multilingual & Efficient Travel:</span> Local language assistance with a personal touch (in English, Japanese, Hindi, Marathi, and Hungarian) helps form stronger client relationships. We do not require visas to travel to Japan or India, making urgent or emergency travel quick and efficient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* サービスカテゴリーセクション */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* タイトルとサブコピー */}
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? 'オーダーメイド型コンサルティング' : 'Custom-Made Consulting'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
              <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                {lang === 'ja'
                  ? '私たちは単なるコンサルタントではありません。現場での実行、出張、会議、市場調査レポートまで、お客様に代わって管理します。'
                  : 'We are not just consultants. We manage on-site execution, travel, meetings, and market intelligence reporting for you.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Global Expansion Support */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '海外進出支援' : 'Global Expansion Support'}
                </h3>
              </div>

              {/* M&A / JV */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '合併・買収（M&A）と共同事業（JV）' : 'M&A / JV'}
                </h3>
              </div>

              {/* INFRASTRUCTURE in INDIA */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '不動産開発プロジェクト' : 'Infrastructure in India'}
                </h3>
              </div>

              {/* TRAINING / HR */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '教育 / 人材' : 'Training / HR'}
                </h3>
              </div>

              {/* IMPORT EXPORT */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '輸入輸出' : 'Import Export'}
                </h3>
              </div>

              {/* AI, SOFTWARE, WEB */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '事業効率化' : 'AI, Software, Web'}
                </h3>
              </div>

              {/* Manufacturing */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '製造' : 'Manufacturing'}
                </h3>
              </div>

              {/* TRAVEL */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? '旅行' : 'Travel'}
                </h3>
              </div>

              {/* OTHERS */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  {lang === 'ja' ? 'その他' : 'Others'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href={`/${lang}/contact`}
              className="inline-block bg-gradient-to-r from-brand-500 to-brand-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
