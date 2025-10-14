import type { Language } from '@/lib/i18n/config'

export default function CTASection({ lang, dict }: { lang: Language; dict: any }) {
  return (
    <section className="bg-gradient-to-br from-brand-100 to-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
          {lang === 'ja'
            ? '日印クロスボーダー事業を成功に導く'
            : lang === 'en'
            ? "Lead Your Japan-India Cross-border Business to Success"
            : 'अपने जापान-भारत क्रॉस-बॉर्डर व्यवसाय को सफलता की ओर ले जाएं'}
        </h2>

        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          {lang === 'ja'
            ? '「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チームがあなたのビジネスをサポートします。'
            : lang === 'en'
            ? 'As a "hands-on consultant", our elite small team delivers results through human relationships and on-site execution to support your business.'
            : 'एक "हाथों पर सलाहकार" के रूप में, हमारी छोटी कुलीन टीम मानव संबंधों और साइट पर निष्पादन के माध्यम से परिणाम देती है।'}
        </p>

        {/* 有料相談CTA */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-text mb-4">
            {lang === 'ja' ? '初回コンサルティング' : lang === 'en' ? 'Initial Consultation' : 'प्रारंभिक परामर्श'}
          </h3>
          <p className="text-brand-700 text-3xl font-bold mb-4">¥20,000</p>
          <p className="text-gray-600 mb-6">
            {lang === 'ja'
              ? '現状課題の整理と最適な方向性を提示します'
              : lang === 'en'
              ? 'Organize current challenges and suggest optimal directions'
              : 'वर्तमान चुनौतियों को व्यवस्थित करें और इष्टतम दिशाओं का सुझाव दें'}
          </p>
          <a
            href={`/${lang}/contact?type=paid`}
            className="inline-block bg-brand-500 text-white px-8 py-4 font-bold hover:bg-brand-600 transition text-lg rounded-md shadow-md"
          >
            {lang === 'ja' ? '今すぐ予約する' : lang === 'en' ? 'Book Now' : 'अभी बुक करें'}
          </a>
        </div>

        {/* 無料相談CTA */}
        <div className="bg-pearl rounded-lg border-2 border-brand-300 p-8">
          <h3 className="text-xl font-bold text-text mb-4">
            {lang === 'ja' ? '無料相談枠' : lang === 'en' ? 'Free Consultation' : 'मुफ्त परामर्श'}
          </h3>
          <p className="text-gray-600 mb-6">
            {lang === 'ja'
              ? '毎月第1土曜日 13:00–18:00 JSTで無料相談を実施しています'
              : lang === 'en'
              ? 'Free consultation available on 1st Saturday of every month, 13:00-18:00 JST'
              : 'हर महीने के पहले शनिवार को 13:00-18:00 JST पर मुफ्त परामर्श उपलब्ध'}
          </p>
          <a
            href={`/${lang}/contact?type=free`}
            className="inline-block bg-transparent border-2 border-brand-500 text-brand-700 px-8 py-4 font-bold hover:bg-brand-500 hover:text-white transition text-lg rounded-md"
          >
            {lang === 'ja' ? '無料枠を確認する' : lang === 'en' ? 'Check Free Slots' : 'मुफ्त स्लॉट जांचें'}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 text-text">
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">1989</p>
            <p className="text-sm md:text-base text-gray-600">
              {lang === 'ja' ? '来日から' : lang === 'en' ? 'Since Japan Arrival' : 'जापान आगमन से'}
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">500+</p>
            <p className="text-sm md:text-base text-gray-600">
              {lang === 'ja' ? '人材育成' : lang === 'en' ? 'People Trained' : 'प्रशिक्षित लोग'}
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">2016</p>
            <p className="text-sm md:text-base text-gray-600">
              {lang === 'ja' ? 'MukTI売却' : lang === 'en' ? 'MukTI Exit' : 'MukTI बिक्री'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}