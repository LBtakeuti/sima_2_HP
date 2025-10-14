import { formatDate } from '@/lib/utils/date'
import type { Language } from '@/lib/i18n/config'

// ダミーデータ（実際にはSupabaseから取得）
const dummyNews = [
  {
    id: '1',
    published_date: '2025-01-10',
    title_ja: '新サービス開始のお知らせ',
    title_en: 'New Service Launch',
    title_hi: 'नई सेवा की शुरुआत',
    content_ja: '国際ビジネス展開をサポートする新サービスを開始しました。',
    content_en: 'We have launched a new service to support international business expansion.',
    content_hi: 'हमने अंतर्राष्ट्रीय व्यापार विस्तार का समर्थन करने के लिए एक नई सेवा शुरू की है।',
  },
  {
    id: '2',
    published_date: '2025-01-05',
    title_ja: 'ウェブサイトリニューアル',
    title_en: 'Website Renewal',
    title_hi: 'वेबसाइट नवीनीकरण',
    content_ja: 'より使いやすく、情報を見つけやすいウェブサイトにリニューアルしました。',
    content_en: 'We have renewed our website to be more user-friendly and easier to find information.',
    content_hi: 'हमने अपनी वेबसाइट को अधिक उपयोगकर्ता-अनुकूल और जानकारी खोजने में आसान बनाने के लिए नवीनीकृत किया है।',
  },
  {
    id: '3',
    published_date: '2025-01-01',
    title_ja: '新年のご挨拶',
    title_en: 'New Year Greetings',
    title_hi: 'नववर्ष की शुभकामनाएं',
    content_ja: '新年あけましておめでとうございます。本年もよろしくお願いいたします。',
    content_en: 'Happy New Year! We look forward to working with you this year.',
    content_hi: 'नववर्ष की शुभकामनाएं! हम इस वर्ष आपके साथ काम करने की आशा करते हैं।',
  },
]

export default function NewsSection({ lang, dict }: { lang: Language; dict: any }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{dict.news.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'ja'
              ? '最新の業界動向とSEEMAPARからのお知らせをお届けします'
              : lang === 'en'
              ? 'Latest industry trends and updates from SEEMAPAR'
              : 'नवीनतम उद्योग रुझान और SEEMAPAR से अपडेट'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dummyNews.map((item) => {
            const titleKey = `title_${lang}` as keyof typeof item
            const contentKey = `content_${lang}` as keyof typeof item

            return (
              <article
                key={item.id}
                className="bg-gray-50 border border-gray-200 overflow-hidden"
              >
                {/* カテゴリタグ */}
                <div className="bg-primary-300 px-6 py-2">
                  <span className="text-gray-900 text-xs font-semibold uppercase tracking-wider">
                    {lang === 'ja' ? 'お知らせ' : lang === 'en' ? 'News' : 'समाचार'}
                  </span>
                </div>

                <div className="p-6">
                  <time className="text-sm text-gray-500">
                    {formatDate(item.published_date, lang)}
                  </time>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900">
                    {item[titleKey] as string}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {item[contentKey] as string}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center mt-4 text-primary-500 hover:text-primary-700 font-semibold"
                  >
                    <span>{dict.news.readMore}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}