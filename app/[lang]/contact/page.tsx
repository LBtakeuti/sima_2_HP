import ContactForm from '@/components/sections/ContactForm'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dict.nav.contact}
          </h1>
          <p className="text-lg text-white/90">
            {lang === 'ja'
              ? 'お気軽にお問い合わせください'
              : lang === 'en'
              ? 'Feel free to contact us'
              : 'हमसे संपर्क करने में संकोच न करें'}
          </p>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white border-2 border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {lang === 'ja'
                ? 'お問い合わせフォーム'
                : lang === 'en'
                ? 'Contact Form'
                : 'संपर्क फ़ॉर्म'}
            </h2>
            <ContactForm lang={lang} dict={dict} />
          </div>

          {/* 連絡先情報 */}
          <div className="mt-12 bg-gray-50 border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              {lang === 'ja' ? '連絡先情報' : lang === 'en' ? 'Contact Information' : 'संपर्क जानकारी'}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  {lang === 'ja' ? '住所' : lang === 'en' ? 'Address' : 'पता'}
                </h4>
                <p className="text-gray-600">
                  〒420-0061<br />
                  静岡県静岡市葵区新富町3丁目35番地10
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  {lang === 'ja' ? '営業時間' : lang === 'en' ? 'Business Hours' : 'व्यावसायिक घंटे'}
                </h4>
                <p className="text-gray-600">
                  {lang === 'ja'
                    ? '月曜日 - 金曜日: 9:00 - 18:00'
                    : lang === 'en'
                    ? 'Monday - Friday: 9:00 AM - 6:00 PM'
                    : 'सोमवार - शुक्रवार: 9:00 AM - 6:00 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}