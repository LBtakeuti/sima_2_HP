'use client'

import { use, useState, useEffect } from 'react'
import Image from 'next/image'
import ContactForm from '@/components/sections/ContactForm'
import type { Language } from '@/lib/i18n/config'

// 辞書データを直接インポート
import jaDict from '@/lib/i18n/dictionaries/ja.json'
import enDict from '@/lib/i18n/dictionaries/en.json'

const dictionaries = {
  ja: jaDict,
  en: enDict,
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = use(params)
  const dict = dictionaries[lang as Language] || dictionaries.ja
  const [activeTab, setActiveTab] = useState<'private' | 'group'>('private')

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-8 md:py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight leading-relaxed pb-2">
            {lang === 'ja' ? 'お問い合わせ' : 'CONTACT'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === 'ja' ? '一般相談' : 'General Inquiry'}
          </p>
        </div>
      </section>

      {/* コンサルテーションタブ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* 貝殻型タブ */}
          <div className="flex justify-center gap-8 mb-12">
            <button
              onClick={() => setActiveTab('private')}
              className={`relative w-64 h-64 transition-all duration-300 ${
                activeTab === 'private' ? 'scale-110' : 'scale-100 opacity-70 hover:opacity-90'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/shellicon.svg"
                  alt="Shell icon"
                  width={256}
                  height={256}
                  className="absolute inset-0"
                  style={{
                    filter: activeTab === 'private'
                      ? 'brightness(0) saturate(100%) invert(37%) sepia(93%) saturate(1086%) hue-rotate(183deg) brightness(92%) contrast(101%)'
                      : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center ${activeTab === 'private' ? 'text-white' : 'text-gray-700'}`}>
                    <div className="text-lg font-bold">PRIVATE</div>
                    <div className="text-lg font-bold">CONSULTATION</div>
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('group')}
              className={`relative w-64 h-64 transition-all duration-300 ${
                activeTab === 'group' ? 'scale-110' : 'scale-100 opacity-70 hover:opacity-90'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/shellicon.svg"
                  alt="Shell icon"
                  width={256}
                  height={256}
                  className="absolute inset-0"
                  style={{
                    filter: activeTab === 'group'
                      ? 'brightness(0) saturate(100%) invert(37%) sepia(93%) saturate(1086%) hue-rotate(183deg) brightness(92%) contrast(101%)'
                      : 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center ${activeTab === 'group' ? 'text-white' : 'text-gray-700'}`}>
                    <div className="text-sm font-medium mb-1">FREE</div>
                    <div className="text-lg font-bold">GROUP</div>
                    <div className="text-lg font-bold">CONSULTATION</div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* タブコンテンツ */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12">
            {activeTab === 'private' ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-brand-700 mb-4">
                    {lang === 'ja' ? 'I. プライベートコンサルテーション' : 'I. PRIVATE CONSULTATION'}
                  </h2>
                  <div className="text-2xl font-bold text-gray-800 mb-6">
                    {lang === 'ja'
                      ? '料金：¥20,000（約₹11,000 INR / $150 USD）'
                      : 'Fee: ¥20,000 (₹11,000 INR / $150 USD)'}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '目的：' : 'Purpose:'}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {lang === 'ja'
                        ? '成功への第一歩。お客様特有のビジネスニーズに完全に焦点を当てた、専任のマンツーマンセッションです。'
                        : 'Your first step to success. This is a dedicated, one-on-one session where we focus entirely on your specific business needs.'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '提供内容：' : 'What You Get:'}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {lang === 'ja'
                        ? 'お客様の国際ビジネスについて徹底的に理解し、研究し、明確な道筋を提案します。次のステップを決定するために役立つサマリーレポートと貴重な情報を受け取ることができます。また、お客様のビジネスに独自の価値を加えることができる場合には、当社のサービスの詳細とプロジェクトに合わせたお見積もりを提供します。'
                        : 'We will thoroughly understand, study, and suggest a clear path for your international business. You will receive a summary report and valuable information to help you decide on your next steps. We will also provide details of our services and a tailored quotation for your project in case we can add unique value to your business.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-brand-700 mb-4">
                    {lang === 'ja' ? 'II. 無料グループコンサルテーション' : 'II. FREE GROUP CONSULTATION'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '開催日時：' : 'When:'}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {lang === 'ja'
                        ? '毎月第1土曜日、13:00〜18:00 JST（日本標準時）。登録後、参加リンクをお送りします。'
                        : '1st Saturday of every month, 13:00 - 18:00 JST (Japan Standard Time). You will receive a participation link after registration.'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lang === 'ja' ? '進行方法：' : 'How it Works:'}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {lang === 'ja'
                        ? '貴重な学びの機会です。事前に質問や課題を提出いただけます（前月20日まで）。グループセッションでは、これらのトピックや質問をオープンに議論します。お名前や身元は一切公開いたしませんので、安全で有益な、協力的な学習環境をすべての参加者に提供します。'
                        : 'This is a valuable opportunity to learn. You are welcome to submit your queries and challenges in advance (before the 20th of the previous month). In the group session, we will discuss these topics and questions openly. We guarantee not to disclose any names or identities, allowing for a safe, informative, and collaborative learning environment for all participants.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {lang === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
            </h2>
            <ContactForm lang={lang} dict={dict} serviceName={activeTab === 'private' ? 'Private Consultation' : 'Free Group Consultation'} serviceId="" />
          </div>
        </div>
      </section>

      {/* 連絡先情報 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white border-2 border-gray-200 p-12 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">
              {lang === 'ja' ? '連絡先情報' : 'Contact Information'}
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-brand-700 mb-3">
                  {lang === 'ja' ? '住所' : 'Address'}
                </h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    {lang === 'ja' ? '〒 140-0002' : ''}<br />
                    {lang === 'ja'
                      ? '東京都品川区東品川1-25-8'
                      : '1-25-8 Higashi-Shinagawa, Shinagawa-ku, Tokyo'}
                  </p>
                  <p>
                    {lang === 'ja' ? 'インドオフィス（プネー）：' : 'India Office (Pune):'}
                    <br />
                    {lang === 'ja' ? (
                      <>
                        ロクマットビル 2階、シンガッド通り
                        <br />
                        ヴァドガオン・クルド、プネー、マハーラーシュトラ州 インド 411068
                      </>
                    ) : (
                      'Lokmat Building, 2nd Floor, Sinhgad Road, Vadgaon Khurd, Pune, Maharashtra India - 411068'
                    )}
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
