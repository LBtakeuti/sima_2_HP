import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

interface YouTubeVideo {
  id: string
  youtube_url: string
  title_ja: string
  title_en: string
  display_order: number
  is_published: boolean
}

// YouTube URLから動画IDを抽出
function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

// YouTube埋め込みURL取得
function getEmbedUrl(url: string): string {
  const videoId = extractVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
}

export default async function MessagePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)
  const supabase = await createClient()

  // YouTube動画データを取得
  const { data: videos, error } = await supabase
    .from('youtube_videos')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
    .limit(4)

  const youtubeVideos: YouTubeVideo[] = error ? [] : (videos || [])

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
              {lang === 'ja' ? '代表メッセージ' : 'Message from the Founder'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-8"></div>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              {lang === 'ja'
                ? 'Alliance Beyond borders'
                : 'Alliance Beyond borders'}
            </p>
          </div>
        </div>
      </section>

      {/* 創業者セクション */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                MESSAGE
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* 代表者写真 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 lg:p-12">
                  <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl">
                    <Image
                      src="/images/sima_pro.png"
                      alt="PATIL SEEMA"
                      width={400}
                      height={500}
                      className="shadow-lg w-full h-auto object-cover"
                    />
                  </div>
                  <div className="text-center mt-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      PATIL SEEMA
                    </h3>
                    <p className="text-brand-600 font-semibold text-lg">
                      Founder & CEO
                    </p>
                  </div>
                </div>
              </div>

              {/* テキストコンテンツ */}
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    The foundation of SEEMAPAAR is built on my unique three-decade journey, began not in the boardroom, but in the classroom.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    I started my career as an elementary school teacher in India who trained herself to teach Yoga to school children. When I first came to Japan in 1989, I initially worked as a yoga and English teacher. This early experience quickly led to a crucial insight: students with atopic and allergic conditions could not safely use chemical hair dyes. Recognizing this need, I introduced Henna, a natural hair dye, from India to Japan.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    This led to a transformation in my career. My clients became the catalysts for my journey in the wellness industry of Henna (a herbal hair treatment and hair dye), Oil massages, organic cosmetics and Ayurveda. I authored three books on Henna in Japanese, wrote 12 textbooks, and managed a spa school for over 30 years, successfully training more than 500 beauty professionals.
                  </p>

                  <h4 className="text-lg font-bold text-gray-900 mt-8 mb-4">
                    The Entrepreneurial and Business Leader
                  </h4>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    I served for 30 years as a CEO and business leader in Japan, managing every facet of international trade: import/exports, marketing, R&D, hiring, legal contracts, taxes, and supply chain management. I owned a cosmetics and Quasi-drugs manufacturing unit, created and trained an Ayurveda-based spa training school, and worked on IP contracts for my consultations with brands like TEALIFE (JAPAN), SARAYA (JAPAN), and PUSHPAM (INDIA).
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    My entrepreneurial peak was the successful launch, management, and sale of my own company, Mukti, in 2016. It was during this exit process that I witnessed firsthand the common pitfalls, detachment, and loss of critical nuance associated with standard mediation and M&A practices—a realization that directly inspired the founding of SEEMAPAAR.
                  </p>

                  <h4 className="text-lg font-bold text-gray-900 mt-8 mb-4">
                    From Individual Empowerment to Organizational Resilience
                  </h4>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    The core philosophy of self-reliance has been the key driver throughout my career. My initial work was helping Japanese beauticians and estheticians gain skills in organic imported cosmetics to become more self-reliant.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    Today, this concept has expanded:
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6 italic">
                    "We see a wealth of potential in making organizations become self-reliant and resilient. My goal is to help companies maximize their potential by successfully going overseas and partnering with the right entities, to build internal resilience and create unique values. We provide you the services not just to mitigate the risks, but to create something that only your presence can add."
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    Thus, the process of using something from overseas to create something unique, self-reliant, and resilient has been the essence of my life's work. This is the foundational passion the SEEMAPAAR team uses to guide your cross-border ventures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTubeセクション */}
      {youtubeVideos.length > 0 && (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* セクションタイトル */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {lang === 'ja' ? 'メッセージ動画' : 'Message Video'}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto"></div>
              </div>

              {/* YouTubeグリッド */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {youtubeVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getEmbedUrl(video.youtube_url)}
                        title={lang === 'ja' ? video.title_ja : video.title_en}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                        {lang === 'ja' ? video.title_ja : video.title_en}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
