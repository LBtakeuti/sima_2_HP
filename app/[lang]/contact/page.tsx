import ContactForm from '@/components/sections/ContactForm'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  // URLパラメータからサービス情報を取得
  const resolvedSearchParams = await searchParams
  const serviceParam = resolvedSearchParams?.service as string
  const serviceIdParam = resolvedSearchParams?.serviceId as string

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight">
            {dict.nav.contact}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
          {/* サービス情報表示 */}
          {serviceParam && (
            <div className="bg-brand-50 border-2 border-brand-200 p-6 mb-8 rounded-lg">
              <div className="flex items-center space-x-4">
                {serviceIdParam && (
                  <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white text-lg font-bold">
                    {serviceIdParam}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-brand-700 mb-1">
                    {lang === 'ja' ? 'お問い合わせ対象サービス' : lang === 'en' ? 'Inquiry about Service' : 'सेवा के बारे में पूछताछ'}
                  </h3>
                  <p className="text-brand-600 font-semibold">{decodeURIComponent(serviceParam)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
            <h2 className="text-xl lg:text-2xl font-bold mb-8 text-gray-900">
              {lang === 'ja'
                ? 'お問い合わせフォーム'
                : lang === 'en'
                ? 'Contact Form'
                : 'संपर्क फ़ॉर्म'}
            </h2>
            <ContactForm lang={lang} dict={dict} serviceName={serviceParam} serviceId={serviceIdParam} />
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