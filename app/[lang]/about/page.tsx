import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import Image from 'next/image'

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
      <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
              {lang === 'ja' ? '私たちについて' : 'About Us'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? '国境を越えて、信頼をつくる。'
                : 'Beyond Borders, Build Trust.'}
            </p>
          </div>
        </div>
      </section>

      {/* SEEMAPAARについてのセクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? 'SEEMAPAARについて' : 'Welcome to SEEMAPAAR'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* テキストコンテンツ */}
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {lang === 'ja' ? (
                      <>
                        社名「<span className="font-semibold text-brand-600">シーマパール</span>」は、私たちの使命の核心を表しています。ヒンディー語で「シーマ」は境界を、「パール」は向こう側やその先を意味し、合わせて<span className="font-semibold text-brand-600">「国境を越えたビジネス」</span>を示しています。
                      </>
                    ) : (
                      <>
                        Our name, <span className="font-semibold text-brand-600">SEEMAPAAR</span>, is the heart of our mission. In Hindi, 'Seema' means border and 'Paar' means across or beyond—together, indicating <span className="font-semibold text-brand-600">Cross-Border Business</span>.
                      </>
                    )}
                  </p>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {lang === 'ja' ? (
                      <>
                        日本語では「シーマパール」と表記され、「パール」は<span className="font-semibold text-brand-600">真珠</span>を意味します。これは私たちの独自のアプローチを象徴しています。真珠貝は異物が入り込むことで、光沢ある美しく貴重な真珠を生み出します。
                      </>
                    ) : (
                      <>
                        In Japanese, the phonetic translation is written as シーマパール where the word 'パール' is the same as <span className="font-semibold text-brand-600">pearl</span>. This symbolizes our unique approach: an oyster creates a lustrous, beautiful, and precious pearl when a foreign object enters it.
                      </>
                    )}
                  </p>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {lang === 'ja' ? (
                      <>
                        同様に、皆様が海外での取り組みや課題を私たちに託してくださる時、SEEMAPAARは<span className="font-semibold text-brand-600">仲介役</span>として、その課題を価値あるもの、美しいもの、そして永続的なものへと変容させる準備ができています。
                      </>
                    ) : (
                      <>
                        Similarly, when you bring your foreign endeavors and challenges to us, we at SEEMAPAAR are ready to act as the <span className="font-semibold text-brand-600">intermediary</span>, transforming that challenge into something valuable, beautiful, and enduring.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* 視覚的要素 */}
              <div className="relative">
                <div className="relative aspect-square w-full max-w-lg mx-auto">
                  <Image
                    src="/images/SEEMPAAR３ 1.png"
                    alt="SEEMAPAR"
                    fill
                    className="object-contain rounded-3xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-brand-700 font-semibold text-lg lg:text-xl">
                    {lang === 'ja' ? '課題を価値に変える' : 'Transforming Challenges into Value'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* アプローチセクション */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8">
              {lang === 'ja' ? '私たちのアプローチ' : 'Our Approach'}
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {lang === 'ja' ? (
                  <>
                    私たちは、AIが普及した今日の急速に変化するビジネス環境における課題を深く理解し、お客様の越境目標を支援します。SEEMAPAARでは、大規模組織が見落としがちな<span className="font-semibold text-brand-600">「あらゆる段階における高度にカスタマイズされた人的要素」</span>を提供するため、専任の少人数チームで運営しています。
                  </>
                ) : (
                  <>
                    We deeply understand the challenges of today's fast-moving, AI-enabled business environment and are here to support your cross-border goals. At SEEMAPAAR, we operate with a dedicated, small team to deliver what large organizations often overlook: <span className="font-semibold text-brand-600">a highly customized human factor in every step</span>.
                  </>
                )}
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {lang === 'ja' ? (
                    <>
                      あらゆる動きが可能になるように、効果的かつ効率的にテクノロジーを戦略的に統合し、<span className="font-semibold text-brand-600">最先端の技術と私たちのサービスのバランス</span>をとりサービスを展開していきます。
                    </>
                  ) : (
                    <>
                      We strategically integrate technology to ensure every move is as effective and efficient as possible, striking the <span className="font-semibold text-brand-600">perfect balance between high-tech and high-touch service</span>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us セクション */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 見出し */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {lang === 'ja' ? 'なぜSEEMAPAARなのか' : 'Why Choose Us?'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
                {lang === 'ja'
                  ? '従来の仲介業者や大手コンサルティング会社は、ビジネス分析や財務概要といった、現代のAIで簡単に管理できるデータに焦点を当てることが多くあります。SEEMAPAARでは、真に重要な人と人との重要なやり取りや関係構築に焦点を当てています。私たちのコミットメントは、取引を超えて、お客様を成功に導くことにあります。'
                  : '"Traditional mediators and large consulting firms often focus on standard services like business analysis and financial overviews—data easily managed by modern AI. At SEEMAPAAR, we focus on the critical human interactions and relationship building that truly matter. Our commitment goes far beyond the transaction to ensure your success."'}
              </p>
            </div>

            {/* Hands-on Consulting */}
            <div className="mb-16">
              <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-brand-700">
                {lang === 'ja' ? '実働型コンサルティング' : 'Hands-on Consulting'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto">
                {lang === 'ja'
                  ? '私たちは従来のコンサルティングを超えて、お客様のビジネス成功を推進する積極的なサポートを提供します。各クライアントの特定のニーズに合わせたサービスについては、ケーススタディのセクションをご参照ください。'
                  : 'We go beyond traditional consulting to provide active support that drives your business success. For services tailored to the specific needs of each client, kindly refer to the case studies section.'}
              </p>

              {/* SEEMAPAAR's Unique Hands-on Support */}
              <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50 rounded-3xl p-10 lg:p-12 shadow-lg border border-brand-100">
                <h4 className="text-xl lg:text-2xl font-bold text-brand-700 mb-6 text-center">
                  {lang === 'ja' ? 'SEEMAPAARの独自の実働型サポート' : "SEEMAPAAR's Unique Hands-on Support"}
                </h4>
                <p className="text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                  {lang === 'ja'
                    ? '私たちが提供する価値'
                    : 'These are our general services that demonstrate our unique approach:'}
                </p>

                {/* Services List */}
                <div className="max-w-5xl mx-auto space-y-6">
                  {/* Effective Meetings */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '効果的なミーティング' : 'Effective Meetings'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? '関係する全ての当事者のために、生産的なミーティングを調整し、管理します。また、お客様の訪問に同行し、会話を積極的に導き、成功する合意に至る交渉を促進します。'
                          : 'We coordinate and manage productive meetings for all parties involved. We also join your visits to actively guide the conversation, facilitating negotiations that result in a successful agreement.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Time-Saving Communication */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '時間を節約するコミュニケーション' : 'Time-Saving Communication'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? '重要なメールや通信文を作成し、従業員の時間を重要なタスクに充てられるようにします。また、必要に応じてミーティングに参加し、文書および口頭のやり取りにおける異文化間コミュニケーションエラーを排除します。'
                          : 'We draft essential emails and correspondence, freeing up your employees\' time for critical tasks. We also join meetings when necessary to eliminate cross-cultural communication errors in both written and spoken interactions.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Proactive Client Management */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? 'プロアクティブな顧客管理' : 'Proactive Client Management'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? '継続中のお客様と定期的に連絡を取り、エンゲージメントを維持し、ロイヤルティを育成します。'
                          : 'We maintain regular contact with your ongoing customers to keep them engaged and foster loyalty.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Deadline Management */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '期限管理' : 'Deadline Management'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? 'お客様に代わって、期限延長やプロジェクト変更の必要性をプロフェッショナルにコミュニケーションを支援します。'
                          : 'We professionally communicate and explain the need for time limit extensions or project changes on your behalf.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Direct Problem-Solving */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '直接的な問題解決' : 'Direct Problem-Solving'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? '私たちのコネクションとリソースを活用して、課題に対する実践的なソリューションを提供します。'
                          : 'We leverage our connections and resources to provide practical solutions to challenges.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Active Participation */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '積極的な参加' : 'Active Participation'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? 'お客様のチームと共に、または代理として、展示会、カンファレンス、プレゼンテーションに参加します。'
                          : 'We attend exhibitions, conferences, and presentations alongside or on behalf of your team.'}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-brand-100"></div>

                  {/* Multilingual & Efficient Travel */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        {lang === 'ja' ? '多言語対応と効率的な移動' : 'Multilingual & Efficient Travel'}
                      </h5>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'ja'
                          ? 'パーソナルなタッチを持つ現地言語サポート（英語、日本語、ヒンディー語、マラーティー語、ハンガリー語）により、より強固なクライアント関係を築きます。日本やインドへの渡航にビザが不要なため、緊急時や急な出張も迅速かつ効率的に対応できます。'
                          : 'Local language assistance with a personal touch (in English, Japanese, Hindi, Marathi, and Hungarian) helps form stronger client relationships. We do not require visas to travel to Japan or India, making urgent or emergency travel quick and efficient.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Unique Commitment */}
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
                {lang === 'ja' ? '私たち独自のコミットメント' : 'Our Unique Commitment: Beyond the Deal'}
              </h3>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg leading-relaxed text-white/95">
                  {lang === 'ja'
                    ? '私たちのコミットメントは根本的に異なります。私たちは単に取引の成功に焦点を当てるのではなく、双方が潜在能力を最大限に発揮し、コラボレーションのメリットを最大化することに専念しています。'
                    : 'Our commitment is fundamentally different. We are not just focused on a successful transaction; we are dedicated to ensuring both parties realize their full potential and maximize the benefits of the collaboration.'}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold mb-3 text-brand-100">
                      {lang === 'ja' ? '現地での快適さと親近感' : 'Local Comfort and Association'}
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      {lang === 'ja'
                        ? '現地言語サポートにより、ドライバーに至るまで関係者全員がより快適で親しみやすく、親近感を持つことができ、真の現場での関係を築きます。'
                        : 'Local language support makes every party involved, right down to a driver, feel more comfortable, friendly, and easy to associate with, building genuine, on-the-ground relationships.'}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold mb-3 text-brand-100">
                      {lang === 'ja' ? '長期的な伴走' : 'Long-Term Hand-Holding'}
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      {lang === 'ja'
                        ? '取引が完了するまでだけでなく、その後も、相互信頼、確信、そして具体的で収益性のある利益の安定したレベルに到達するまでサポートします。'
                        : 'We will support you not just until the deal is done, but afterward, until you reach a stable level of mutual trust, confidence, and tangible, profitable benefits.'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xl font-semibold text-white leading-relaxed">
                    {lang === 'ja'
                      ? '包括的なエンドツーエンドのサポートを受けることができます。不可欠な信頼を築き、効果的な対面訪問を促進し、収益性の高いパートナーシップの旅を確実にするために設計されています。'
                      : 'You will receive comprehensive, end-to-end support—all designed to build essential trust, facilitate effective in-person visits, and ensure a successful and profitable partnership journey.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}