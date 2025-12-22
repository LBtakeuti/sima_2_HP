import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function Hero({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/images/26901572.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-36">
        <div className="max-w-4xl">
          {/* タグライン */}
          <FadeInAnimation delay={200}>
            <p className="text-[#999999] text-lg md:text-xl font-medium tracking-wider mb-4">
              {dict.hero.tagline || 'Beyond Borders, Build Trust.'}
            </p>
          </FadeInAnimation>

          {/* メインタイトル */}
          <FadeInAnimation delay={400}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {dict.hero.title}
            </h1>
          </FadeInAnimation>

          {/* 説明文 */}
          <FadeInAnimation delay={600}>
            <p className="text-base md:text-lg lg:text-xl text-[#999999] mb-10 max-w-3xl leading-relaxed whitespace-pre-line">
              {dict.hero.subtitle}
            </p>
          </FadeInAnimation>

        </div>
      </div>

    </section>
  )
}