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
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-4 tracking-tight">
            CONTACT
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Free General Query
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
                  <h2 className="text-3xl font-bold text-brand-700 mb-4">I. PRIVATE CONSULTATION</h2>
                  <div className="text-2xl font-bold text-gray-800 mb-6">
                    Fee: ¥20,000 (Approx. ₹11,000 INR / $150 USD)
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Purpose:</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Your first step to success. This is a dedicated, one-on-one session where we focus entirely on your specific business needs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What You Get:</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We will thoroughly understand, study, and suggest a clear path for your international business. You will receive a summary report and valuable information to help you decide on your next steps. We will also provide details of our services and a tailored quotation for your project in case we can add unique value to your business.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-brand-700 mb-4">
                    II. FREE GROUP CONSULTATION
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">When:</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      1st Saturday of every month, 13:00 - 18:00 JST (Japan Standard Time). You will receive a participation link after registration.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">How it Works:</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      This is a valuable opportunity to learn. You are welcome to submit your queries and challenges in advance (before the 20th of the previous month). In the group session, we will discuss these topics and questions openly. We guarantee not to disclose any names or identities, allowing for a safe, informative, and collaborative learning environment for all participants.
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
              Contact Form
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
              Contact Information
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-brand-700 mb-3">Address</h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    〒 140-0002<br />
                    15F, Tennozu Ocean Square, 2-2-20 Higashi-Shinagawa, Shinagawa-ku, Tokyo
                  </p>
                  <p>
                    〒420-0061<br />
                    3-35-10 Shintomicho, Aoi-ku, Shizuoka-shi, Shizuoka-ken 420-0061
                  </p>
                  <p>
                    India Office (Pune):<br />
                    Lokmat Building, 2nd Floor, Sinhgad Road, Vadgaon Khurd, Pune, Maharashtra India - 411068
                  </p>
                  <p>
                    India Office (Goa):<br />
                    628, B 13 G2 Pintos Waddo, Candolim, Goa, India 403515
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
