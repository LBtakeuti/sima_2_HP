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
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-36">
        <div className="max-w-4xl">
          {/* タグライン */}
          <p className="text-brand-100 text-lg md:text-xl font-medium tracking-wider mb-4">
            {dict.hero.tagline || 'Beyond Borders, Build Trust.'}
          </p>

          {/* メインタイトル */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white">
            {dict.hero.title}
          </h1>

          {/* 説明文 */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-10 max-w-3xl leading-relaxed">
            {dict.hero.subtitle}
          </p>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${lang}/contact?type=paid`}
              className="inline-block bg-brand-500 text-white px-8 py-4 font-bold hover:bg-brand-600 transition text-center shadow-md rounded-md"
            >
              {lang === 'ja' ? '初回相談を予約（¥20,000）' : lang === 'en' ? 'Book Consultation (¥20,000)' : 'परामर्श बुक करें (¥20,000)'}
            </a>
            <a
              href={`/${lang}/contact?type=free`}
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-brand-900 transition text-center rounded-md"
            >
              {lang === 'ja' ? '無料相談枠を確認' : lang === 'en' ? 'Check Free Consultation' : 'मुफ्त परामर्श जांचें'}
            </a>
          </div>

          {/* 信頼性指標 */}
          <div className="mt-12 flex flex-wrap gap-8 text-brand-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">
                {lang === 'ja' ? '実働型コンサル' : lang === 'en' ? 'Hands-on Consulting' : 'हाथों पर परामर्श'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">
                {lang === 'ja' ? '日印クロスボーダー専門' : lang === 'en' ? 'Japan-India Specialist' : 'जापान-भारत विशेषज्ञ'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">
                {lang === 'ja' ? '小規模精鋭チーム' : lang === 'en' ? 'Elite Small Team' : 'कुलीन छोटी टीम'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}