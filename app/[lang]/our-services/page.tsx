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
                  ? '私たちは従来のコンサルティングを超えて、お客様のビジネス成功を推進する積極的なサポートを提供します。各クライアントの特定のニーズに合わせたサービスについては、パートナーシップオポチュニティのページをご参照ください。'
                  : 'We go beyond traditional consulting to provide active support that drives your business success. For services tailored to the specific needs of each client, please visit our Partnership Opportunities page.'}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-brand-500">
                {lang === 'ja' ? 'SEEMAPAARの独自の実働型サポート' : "SEEMAPAAR's Unique Hands-on Support"}
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg mb-10 text-center">
                {lang === 'ja'
                  ? '私たちが提供する価値：'
                  : 'These are our general services that demonstrate our unique approach:'}
              </p>

              {/* サービス項目をグリッドレイアウトに変更 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 戦略的ミーティングマネジメント */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {lang === 'ja' ? '戦略的ミーティングマネジメント' : 'Effective Meetings'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '関係者全体の視点を統合し、目的達成に直結するミーティング設計・進行を実施。重要訪問には同行し、対話を整理しながら合意形成を確実に導きます。'
                      : 'We coordinate and manage productive meetings for all parties involved. We also join your visits to actively guide the conversation, facilitating negotiations that result in a successful agreement.'}
                  </p>
                </div>

                {/* 経営の意思疎通・対外発信などコミュニケーション支援 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {lang === 'ja' ? '経営の意思疎通・対外発信などコミュニケーション支援' : 'Time-Saving Communication'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '戦略的メール・文書を精度高く作成し、チームの時間をコア業務へ最適化。必要に応じて会議に参加し、異文化間のニュアンスギャップを高度に調整します。'
                      : "We draft essential emails and correspondence, freeing up your employees' time for critical tasks. We also join meetings when necessary to eliminate cross-cultural communication errors in both written and spoken interactions."}
                  </p>
                </div>

                {/* プロアクティブなクライアントマネジメント */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {lang === 'ja' ? 'プロアクティブなクライアントマネジメント' : 'Proactive Client Management'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '継続顧客との定期的なコンタクトを通じ、エンゲージメントの維持・深化を実現。信頼とロイヤルティを長期的に育てます。'
                      : 'We maintain regular contact with your ongoing customers to keep them engaged and foster loyalty.'}
                  </p>
                </div>

                {/* 期限・プロセスマネジメントの最適化 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lang === 'ja' ? '期限・プロセスマネジメントの最適化' : 'Deadline Management'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '期限延長や計画変更の必要性を、プロフェッショナルな対話で調整し、プロジェクト全体の整合性とスピードを確保します。'
                      : 'We professionally communicate and explain the need for time limit extensions or project changes on your behalf.'}
                  </p>
                </div>

                {/* 即応性の高い課題解決 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    {lang === 'ja' ? '即応性の高い課題解決' : 'Direct Problem-Solving'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '専門ネットワークと実務リソースを活用し、現場で有効に機能する実践的ソリューションを迅速に提供します。'
                      : 'We leverage our connections and resources to provide practical solutions to challenges.'}
                  </p>
                </div>

                {/* 現場におけるエグゼクティブサポート */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                    <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {lang === 'ja' ? '現場におけるエグゼクティブサポート' : 'Active Participation'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {lang === 'ja'
                      ? '展示会・カンファレンス・プレゼンへ、お客様の一員または代理として参加。ブランド価値を損なわない高品質な現場対応を担います。'
                      : 'We attend exhibitions, conferences, and presentations alongside or on behalf of your team.'}
                  </p>
                </div>
              </div>

              {/* 多言語 × 国際間取引に必要な対応力 - フル幅カード */}
              <div className="bg-gradient-to-r from-brand-50 to-white rounded-lg p-8 shadow-sm border border-brand-100">
                <h4 className="text-lg font-bold text-brand-600 mb-3 flex items-start">
                  <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {lang === 'ja' ? '多言語 × 国際間取引に必要な対応力' : 'Multilingual & Efficient Travel'}
                </h4>
                <p className="text-gray-700 leading-relaxed text-base">
                  {lang === 'ja'
                    ? '英語、日本語、ヒンディー語、マラーティー語、ハンガリー語による多言語サポートで、対外コミュニケーションの精度を最大化。日本・インド間のビザ不要により、急な出張や緊急対応にも即時対応可能です。'
                    : 'Local language assistance with a personal touch (in English, Japanese, Hindi, Marathi, and Hungarian) helps form stronger client relationships. We do not require visas to travel to Japan or India, making urgent or emergency travel quick and efficient.'}
                </p>
              </div>
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
                  ? '単なるアドバイザーではなく、現場での実行から出張同行、会議運営、市場調査レポートの作成まで、お客様の"実務そのもの"を包括的にマネジメントする伴走型コンサルティングをご提供します。'
                  : 'We are not just consultants. We manage on-site execution, travel, meetings, and market intelligence reporting for you.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Global Expansion Support */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '海外進出支援（国際間取引）' : 'Global Expansion Support (Cross-Border Trade)'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '日印を中心とした外国市場参入戦略、パートナー選定、現地オペレーションの確立を支援。'
                    : 'Support for foreign market entry strategies focused on Japan-India, partner selection, and establishment of local operations.'}
                </p>
              </div>

              {/* M&A / JV */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '合併・買収（M&A） / 共同事業（JV）' : 'M&A / Joint Ventures (JV)'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '戦略設計からデューデリジェンス、交渉、合意形成、統合プロセスまでをトータルでサポート。'
                    : 'Comprehensive support from strategy design to due diligence, negotiation, consensus building, and integration processes.'}
                </p>
              </div>

              {/* INFRASTRUCTURE in INDIA */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '不動産開発プロジェクト' : 'Real Estate Development Projects'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '現地調査、パートナー連携、行政手続き、プロジェクト管理まで一貫支援。'
                    : 'Comprehensive support from site surveys, partner collaboration, administrative procedures, to project management.'}
                </p>
              </div>

              {/* TRAINING / HR */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '教育 / 人材' : 'Training / HR'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '研修設計、海外人材の採用・定着化支援、異文化マネジメント研修を提供。'
                    : 'Training program design, support for overseas talent recruitment and retention, and cross-cultural management training.'}
                </p>
              </div>

              {/* IMPORT EXPORT */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '輸入輸出' : 'Import Export'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '市場リサーチ、商品選定、現地調整、物流・法規制への対応を包括的にコーディネート。'
                    : 'Comprehensive coordination of market research, product selection, local adjustments, and logistics and regulatory compliance.'}
                </p>
              </div>

              {/* AI, SOFTWARE, WEB */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '事業効率化・オペレーション改善' : 'Business Efficiency & Operations Improvement'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? 'プロセス最適化、コスト構造の見直し、現場改善を実務レベルで伴走。'
                    : 'Hands-on support for process optimization, cost structure review, and on-site improvements.'}
                </p>
              </div>

              {/* Manufacturing */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '製造領域支援' : 'Manufacturing Support'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? 'サプライチェーン構築、協力工場選定、品質管理、現地交渉を実務ベースで支援。'
                    : 'Practical support for supply chain construction, partner factory selection, quality management, and local negotiations.'}
                </p>
              </div>

              {/* TRAVEL */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '旅行・渡航サポート' : 'Travel & Transit Support'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? '海外間ビジネス渡航の手配、アテンド、現地調整まで効率的にサポート。'
                    : 'Efficient support for international business travel arrangements, attendance, and local coordination.'}
                </p>
              </div>

              {/* OTHERS */}
              <div className="bg-white p-6 border-l-4 border-brand-500 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? 'その他の特別プロジェクト' : 'Other Special Projects'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'ja'
                    ? 'ニーズに応じて、領域を超えたカスタムメイドのプロジェクトを設計・実行します。'
                    : 'We design and execute custom-made projects that transcend boundaries according to your needs.'}
                </p>
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
