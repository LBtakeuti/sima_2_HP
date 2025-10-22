import type { Language } from '@/lib/i18n/config'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function CTASection({ lang, dict }: { lang: Language; dict: any }) {
  return (
    <section className="bg-gradient-to-br from-brand-100 to-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <FadeInAnimation>
          <h2 className="text-2xl lg:text-3xl font-bold text-text mb-6">
            {lang === 'ja'
              ? '日印クロスボーダー事業を成功に導く'
              : "Japan-India Partnerships powered by Consultations, AI and People."}
          </h2>

          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            {lang === 'ja'
              ? '「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チームがあなたのビジネスをサポートします。'
              : 'We create unique value to the business by combining the strengths of both countries and using AI.'}
          </p>
        </FadeInAnimation>

        {/* 有料相談CTA */}
        <FadeInAnimation delay={200}>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-text mb-4">
              {lang === 'ja' ? '初回コンサルティング' : 'I. PRIVATE CUSTOMIZED CONSULTATION'}
            </h3>
            <p className="text-brand-700 text-xl lg:text-2xl font-bold mb-4">
              {lang === 'ja' ? '¥20,000' : 'Fee: ¥20,000 (Approx. ₹12,000 INR / $150 USD)'}
            </p>
            <p className="text-gray-600 mb-6">
              {lang === 'ja'
                ? '現状課題の整理と最適な方向性を提示します'
                : 'Organize current challenges and suggest optimal directions'}
            </p>
            <a
              href={`/${lang}/contact?type=paid`}
              className="inline-block bg-brand-500 text-white px-8 py-4 font-bold hover:bg-brand-600 transition text-lg rounded-md shadow-md"
            >
              {lang === 'ja' ? '今すぐ予約する' : 'Book Now'}
            </a>
          </div>
        </FadeInAnimation>

        {/* 無料相談CTA */}
        <FadeInAnimation delay={400}>
          <div className="bg-pearl rounded-lg border-2 border-brand-300 p-8">
            <h3 className="text-lg lg:text-xl font-bold text-text mb-4">
              {lang === 'ja' ? '無料相談枠' : 'FREE GROUP CONSULTATION'}
            </h3>
            <p className="text-gray-600 mb-6">
              {lang === 'ja'
                ? '毎月第1土曜日 13:00–18:00 JSTで無料相談を実施しています'
                : '1st Saturday of every month, 13:00-18:00 JST — GROUP DISCUSSIONS, Q&A'}
            </p>
            <a
              href={`/${lang}/contact?type=free`}
              className="inline-block bg-transparent border-2 border-brand-500 text-brand-700 px-8 py-4 font-bold hover:bg-brand-500 hover:text-white transition text-lg rounded-md"
            >
              {lang === 'ja' ? '無料枠を確認する' : 'Register Now'}
            </a>
          </div>
        </FadeInAnimation>

        <FadeInAnimation delay={600}>
          <div className="mt-12 grid grid-cols-3 gap-8 text-text">
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">1989</p>
              <p className="text-sm md:text-base text-gray-600">
                {lang === 'ja' ? '来日から' : 'Since Japan Arrival'}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">500+</p>
              <p className="text-sm md:text-base text-gray-600">
                {lang === 'ja' ? '人材育成' : 'People Trained'}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">2016</p>
              <p className="text-sm md:text-base text-gray-600">
                {lang === 'ja' ? 'MukTI売却' : 'MukTI Exit'}
              </p>
            </div>
          </div>
        </FadeInAnimation>
      </div>
    </section>
  )
}