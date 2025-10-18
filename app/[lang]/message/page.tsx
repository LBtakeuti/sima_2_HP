import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function MessagePage({
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
              {lang === 'ja' ? '代表メッセージ' : 'Message from the Founder'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? '国境を越えて、"信頼"をつくる'
                : 'Beyond Borders, Build Trust'}
            </p>
          </div>
        </div>
      </section>

      {/* メインメッセージセクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {lang === 'ja' ? (
                    <>
                      私がインドから日本に来て30年以上が経ちます。その間、ヨガ講師として、天然染毛剤ヘナの普及活動、スパスクール経営、輸出入ビジネス、そして自身の会社MukTIの創業と売却を経験しました。
                    </>
                  ) : (
                    <>
                      More than 30 years have passed since I came to Japan from India. During that time, I have worked as a yoga instructor, promoted natural henna hair dye, managed a spa school, engaged in import/export business, and founded and sold my own company, MukTI.
                    </>
                  )}
                </p>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {lang === 'ja' ? (
                    <>
                      この長い旅の中で、私は一つの確信を得ました。それは、<span className="font-semibold text-brand-600">「国境を越えたビジネスの成功は、技術や資金だけでは実現できない」</span>ということです。
                    </>
                  ) : (
                    <>
                      Throughout this long journey, I have gained one conviction: <span className="font-semibold text-brand-600">"Success in cross-border business cannot be achieved with technology and capital alone."</span>
                    </>
                  )}
                </p>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {lang === 'ja' ? (
                    <>
                      最も重要なのは<span className="font-semibold text-brand-600">「人と人の信頼関係」</span>です。文化の違い、言語の壁、商習慣の相違──これらの課題は、単なる情報やマニュアルでは乗り越えられません。現場に入り込み、相手の立場に立ち、共に汗を流すことで初めて、本当の信頼が生まれます。
                    </>
                  ) : (
                    <>
                      The most important thing is <span className="font-semibold text-brand-600">"trust between people."</span> Cultural differences, language barriers, differences in business practices—these challenges cannot be overcome with mere information or manuals. True trust is born only when we immerse ourselves in the field, stand in the other person's position, and work together.
                    </>
                  )}
                </p>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {lang === 'ja' ? (
                    <>
                      SEEMAPAARは、私のこれまでの経験と学びを基盤に、日本とインド間のビジネスにおける「<span className="font-semibold text-brand-600">実働型コンサルティング</span>」を提供します。私たちは単なるアドバイザーではありません。お客様と共に現場に立ち、課題解決のために手を動かし、成果が出るまで伴走します。
                    </>
                  ) : (
                    <>
                      SEEMAPAAR, based on my experience and learning, provides <span className="font-semibold text-brand-600">"hands-on consulting"</span> for business between Japan and India. We are not just advisors. We stand with our clients in the field, work to solve problems, and accompany them until results are achieved.
                    </>
                  )}
                </p>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {lang === 'ja' ? (
                    <>
                      真珠貝が異物を包み込んで美しい真珠を生み出すように、私たちは皆様の課題を価値あるものへと変容させることをお約束します。国境を越えて、共に"信頼"をつくりましょう。
                    </>
                  ) : (
                    <>
                      Just as an oyster envelops a foreign object to create a beautiful pearl, we promise to transform your challenges into something valuable. Let us build "trust" together beyond borders.
                    </>
                  )}
                </p>

                <div className="mt-12 pt-8 border-t border-gray-200 text-right">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {lang === 'ja' ? 'PATIL SEEMA (VISHNUPANT)' : 'PATIL SEEMA (VISHNUPANT)'}
                  </p>
                  <p className="text-brand-600 font-medium">
                    {lang === 'ja' ? '創業者・代表取締役' : 'Founder & CEO'}
                  </p>
                </div>
              </div>

              {/* ビジョンセクション */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 border border-brand-100">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {lang === 'ja' ? '信頼の構築' : 'Building Trust'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {lang === 'ja'
                      ? '人と人の信頼関係を第一に、長期的なパートナーシップを築きます'
                      : 'We prioritize trust between people and build long-term partnerships'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 border border-brand-100">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {lang === 'ja' ? '実働型支援' : 'Hands-On Support'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {lang === 'ja'
                      ? '現場に入り込み、お客様と共に課題を解決します'
                      : 'We immerse ourselves in the field and solve problems together with our clients'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 border border-brand-100">
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {lang === 'ja' ? '価値の創造' : 'Creating Value'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {lang === 'ja'
                      ? '課題を価値あるものへと変容させ、持続可能な成長を支援します'
                      : 'We transform challenges into valuable assets and support sustainable growth'}
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
