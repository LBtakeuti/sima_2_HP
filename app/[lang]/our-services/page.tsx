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
      <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
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
                {lang === 'ja'
                  ? '私たちは従来のコンサルティングを超えて、お客様のビジネス成功を推進する積極的なサポートを提供します。各クライアントの特定のニーズに合わせたサービスについては、ケーススタディのセクションをご参照ください。'
                  : 'We go beyond traditional consulting to provide active support that drives your business success. For services tailored to the specific needs of each client, kindly refer to the case studies section.'}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-500">
                {lang === 'ja' ? 'SEEMAPAARの独自の実働型サポート' : "SEEMAPAAR's Unique Hands-on Support"}
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {lang === 'ja'
                  ? '私たちが提供する価値：'
                  : 'These are our general services that demonstrate our unique approach:'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '効果的なミーティング：' : 'Effective Meetings:'}
                </span>{' '}
                {lang === 'ja'
                  ? '関係する全ての当事者のために、生産的なミーティングを調整し、管理します。また、お客様の訪問に同行し、会話を積極的に導き、成功する合意に至る交渉を促進します。'
                  : 'We coordinate and manage productive meetings for all parties involved. We also join your visits to actively guide the conversation, facilitating negotiations that result in a successful agreement.'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '時間を節約するコミュニケーション：' : 'Time-Saving Communication:'}
                </span>{' '}
                {lang === 'ja'
                  ? '重要なメールや通信文を作成し、従業員の時間を重要なタスクに充てられるようにします。また、必要に応じてミーティングに参加し、文書および口頭のやり取りにおける異文化間コミュニケーションエラーを排除します。'
                  : "We draft essential emails and correspondence, freeing up your employees' time for critical tasks. We also join meetings when necessary to eliminate cross-cultural communication errors in both written and spoken interactions."}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? 'プロアクティブな顧客管理：' : 'Proactive Client Management:'}
                </span>{' '}
                {lang === 'ja'
                  ? '継続中のお客様と定期的に連絡を取り、エンゲージメントを維持し、ロイヤルティを育成します。'
                  : 'We maintain regular contact with your ongoing customers to keep them engaged and foster loyalty.'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '期限管理：' : 'Deadline Management:'}
                </span>{' '}
                {lang === 'ja'
                  ? 'お客様に代わって、期限延長やプロジェクト変更の必要性をプロフェッショナルにコミュニケーションを支援します。'
                  : 'We professionally communicate and explain the need for time limit extensions or project changes on your behalf.'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '直接的な問題解決：' : 'Direct Problem-Solving:'}
                </span>{' '}
                {lang === 'ja'
                  ? '私たちのコネクションとリソースを活用して、課題に対する実践的なソリューションを提供します。'
                  : 'We leverage our connections and resources to provide practical solutions to challenges.'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '積極的な参加：' : 'Active Participation:'}
                </span>{' '}
                {lang === 'ja'
                  ? 'お客様のチームと共に、または代理として、展示会、カンファレンス、プレゼンテーションに参加します。'
                  : 'We attend exhibitions, conferences, and presentations alongside or on behalf of your team.'}
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900 border-b-2 border-brand-300 pb-1">
                  {lang === 'ja' ? '多言語対応と効率的な移動：' : 'Multilingual & Efficient Travel:'}
                </span>{' '}
                {lang === 'ja'
                  ? 'パーソナルなタッチを持つ現地言語サポート（英語、日本語、ヒンディー語、マラーティー語、ハンガリー語）により、より強固なクライアント関係を築きます。日本やインドへの渡航にビザが不要なため、緊急時や急な出張も迅速かつ効率的に対応できます。'
                  : 'Local language assistance with a personal touch (in English, Japanese, Hindi, Marathi, and Hungarian) helps form stronger client relationships. We do not require visas to travel to Japan or India, making urgent or emergency travel quick and efficient.'}
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
