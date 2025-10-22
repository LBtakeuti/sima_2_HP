'use client'

import { useState, useEffect } from 'react'
import type { Language } from '@/lib/i18n/config'
import FadeInAnimation from '@/components/shared/FadeInAnimation'

export default function ServiceSection({ lang, dict }: { lang: Language; dict: any }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden' // スクロールを無効化
  }

  const closeModal = () => {
    setSelectedIndex(null)
    document.body.style.overflow = 'unset' // スクロールを有効化
  }

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedIndex])

  // コンポーネントのアンマウント時にスクロールを復元
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const services = [
    {
      title: {
        ja: '海外進出支援',
        en: 'Global Expansion Support'
      },
      shortDescription: {
        ja: '日系企業のインド市場参入を包括的にサポート',
        en: 'Comprehensive support for Japanese companies entering India'
      },
      fullDescription: {
        ja: '日系企業がインド市場へスムーズに参入できるよう、現地調査からパートナー選定、法規制対応までを包括的にサポート。',
        en: 'We provide end-to-end support for Japanese companies entering the Indian market — from market research and local partner selection to regulatory guidance and on-site facilitation.'
      },
      details: {
        ja: [
          '現地訪問・展示会同行',
          '商談アポイント管理・通訳サポート',
          '現地行政・業界団体とのコーディネート',
          '文化的ギャップの解消と交渉サポート'
        ],
        en: [
          'Business delegation support and exhibition participation',
          'Appointment scheduling and local coordination',
          'Government and industry networking',
          'Cultural and communication guidance'
        ]
      }
    },
    {
      title: {
        ja: '合併・買収（M&A）と共同事業（JV）',
        en: 'M&A / JV'
      },
      shortDescription: {
        ja: '信頼できる現地パートナーの発掘・紹介',
        en: 'Finding and connecting with trusted local partners'
      },
      fullDescription: {
        ja: '信頼できる販売代理店・サプライヤー・規制当局など、事業成功に不可欠な現地パートナーを発掘・紹介。',
        en: 'We connect clients with trusted local partners essential for sustainable success, including distributors, suppliers, and regulatory authorities.'
      },
      details: {
        ja: [
          '潜在的パートナー企業のリサーチと信頼性評価',
          '現地関係者との関係構築支援',
          'サプライチェーン企業の紹介'
        ],
        en: [
          'Research and evaluation of potential partners',
          'Relationship building and negotiation facilitation',
          'Reliable supply chain sourcing'
        ]
      }
    },
    {
      title: {
        ja: '不動産開発プロジェクト',
        en: 'INFRASTRUCTURE in INDIA'
      },
      shortDescription: {
        ja: '日印間の文化的ギャップを橋渡し',
        en: 'Bridging cultural gaps between Japan and India'
      },
      fullDescription: {
        ja: '日本とインド間の文化的・商習慣の違いを橋渡しし、相互理解を促進。',
        en: 'Acting as a cultural bridge between Japan and India, we ensure that both sides communicate effectively and build long-term trust.'
      },
      details: {
        ja: [
          'クライアントチームへの文化研修',
          '双方のビジネスコミュニケーションにおける文化的仲介',
          'ローカルチームとの円滑な連携支援'
        ],
        en: [
          'Cross-cultural training for client teams',
          'Mediation of cultural and communication nuances',
          'Support for smooth collaboration with local teams'
        ]
      }
    },
    {
      title: {
        ja: '教育／人材',
        en: 'TRAINING／HR'
      },
      shortDescription: {
        ja: '各種規制や法的リスクの最小化',
        en: 'Minimizing regulatory and legal risks'
      },
      fullDescription: {
        ja: '市場参入に伴う各種規制や外国投資関連の課題を特定・緩和し、法的なリスクを最小化。',
        en: 'Our experts help clients identify and mitigate legal and regulatory challenges related to business setup and foreign investment in India.'
      },
      details: {
        ja: [
          '輸入規制・認可取得支援',
          '契約・税務・労務に関する現地アドバイス',
          '政府・自治体との調整支援'
        ],
        en: [
          'Support for import regulations and certifications',
          'Legal, tax, and labor advisory',
          'Liaison with local and national government authorities'
        ]
      }
    },
    {
      title: {
        ja: '輸入輸出',
        en: 'IMPORT EXPORT'
      },
      shortDescription: {
        ja: '継続的な市場分析と戦略立案支援',
        en: 'Ongoing market analysis and strategic planning'
      },
      fullDescription: {
        ja: '専門家による継続的な市場分析と、実践的な戦略立案支援。',
        en: 'We deliver actionable market insights and competitive analyses to guide strategic decision-making.'
      },
      details: {
        ja: [
          '競合分析（国内・海外プレーヤー比較）',
          '消費者行動・トレンド分析',
          '展示会・見本市の情報収集と報告',
          '月次市場レポートの作成'
        ],
        en: [
          'Competitor benchmarking (domestic and international)',
          'Consumer behavior and trend analysis',
          'Insights from trade fairs and industry events',
          'Monthly market reports summarizing key developments'
        ]
      }
    },
    {
      title: {
        ja: '事業効率化',
        en: 'AI, SOFTWARE, WEB'
      },
      shortDescription: {
        ja: '現地市場に合わせた製品調整',
        en: 'Adapting products for local market preferences'
      },
      fullDescription: {
        ja: '日本企業の製品を現地市場の嗜好・文化に合わせて調整。',
        en: 'We help Japanese products succeed in India by tailoring them to local preferences and cultural contexts.'
      },
      details: {
        ja: [
          '商品コンセプト・味・パッケージなどの現地最適化',
          '消費者テスト・市場フィードバックの反映'
        ],
        en: [
          'Localization of taste, concept, and packaging',
          'Consumer testing and feedback integration'
        ]
      }
    },
    {
      title: {
        ja: 'その他',
        en: 'OTHERS'
      },
      shortDescription: {
        ja: '継続的なリスク監視と改善提案',
        en: 'Continuous risk monitoring and improvement'
      },
      fullDescription: {
        ja: '参入初期から運用段階まで、リスクを継続的にモニタリングし、改善提案を実施。',
        en: 'Our team provides continuous monitoring and guidance to ensure stable operations and early detection of market or communication risks.'
      },
      details: {
        ja: [
          '現地での「危険信号」の早期発見',
          'コミュニケーション課題の特定と改善',
          '長期的な事業伴走サポート'
        ],
        en: [
          'Identification of early warning signs and risk factors',
          'Communication issue assessment and improvement',
          'Long-term business support and follow-up consulting'
        ]
      }
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <FadeInAnimation>
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
              {lang === 'ja' ? 'オーダーメイド・コンサルティング' : 'Custom-Made Consulting'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'ja'
                ? '私たちは単なるコンサルタントではなく、成功に必要な現地の出張、管理、会議、そして市場情報レポートの作成まであらゆる事をします'
                : 'We are not just consultants. We manage on-site execution, travel, meetings, and market intelligence reporting for you.'}
            </p>
          </div>
        </FadeInAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 lg:gap-3">
          {services.map((service, index) => {
            const title = service.title[lang] || service.title.ja
            const shortDescription = service.shortDescription[lang] || service.shortDescription.ja

            return (
              <div key={index} className="group">
                <FadeInAnimation delay={index * 100 + 200}>
                  <div
                    className="bg-white border border-gray-200 rounded-xl cursor-pointer h-52 sm:h-56 lg:h-52 xl:h-48 transition-all duration-300 ease-out hover:shadow-lg hover:border-brand-400 hover:-translate-y-1 active:scale-95"
                    onClick={() => openModal(index)}
                  >
                    <div className="p-4 lg:p-3 xl:p-4 flex flex-col justify-between h-full">
                      {/* アイコンエリア */}
                      <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-lg lg:text-base xl:text-lg font-bold transition-all duration-300 group-hover:bg-brand-600 group-hover:scale-110">
                          {index + 1}
                        </div>
                      </div>

                      {/* コンテンツエリア */}
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h3 className="text-sm lg:text-xs xl:text-sm font-bold text-gray-900 mb-2 leading-tight line-clamp-1 group-hover:text-brand-700 transition-colors">
                          {title}
                        </h3>
                        <p className="text-xs lg:text-xs xl:text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                          {shortDescription}
                        </p>
                      </div>

                      {/* CTAエリア */}
                      <div className="text-center">
                        <div className="inline-flex items-center text-xs font-medium text-brand-500 group-hover:text-brand-600 transition-colors">
                          {lang === 'ja' ? '詳細を見る' : 'View Details'}
                          <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInAnimation>
              </div>
            )
          })}
        </div>

        {/* モーダルオーバーレイ */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景オーバーレイ（透過） */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
              onClick={closeModal}
            />

            {/* モーダルコンテンツ */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
              {(() => {
                const service = services[selectedIndex]
                const title = service.title[lang] || service.title.ja
                const fullDescription = service.fullDescription[lang] || service.fullDescription.ja
                const details = service.details[lang] || service.details.ja

                return (
                  <>
                    {/* モーダルヘッダー */}
                    <div className="sticky top-0 bg-gradient-to-r from-brand-500 to-brand-600 text-white p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                            {selectedIndex + 1}
                          </div>
                          <h2 className="text-xl lg:text-2xl font-bold">{title}</h2>
                        </div>
                        <button
                          onClick={closeModal}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                          aria-label="Close modal"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* モーダルボディ */}
                    <div className="p-6">
                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        {fullDescription}
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-brand-700 border-l-4 border-brand-500 pl-4">
                          {lang === 'ja' ? '主要サービス' : 'Key Services'}
                        </h3>
                        <ul className="space-y-3">
                          {details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <svg className="w-3 h-3 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700 leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="mt-8 p-4 bg-brand-50 rounded-lg border border-brand-200">
                        <p className="text-brand-700 text-sm mb-3">
                          {lang === 'ja'
                            ? 'このサービスについて詳しく知りたい方は、お気軽にお問い合わせください。'
                            : 'For more information about this service, please feel free to contact us.'}
                        </p>
                        <a
                          href={`/${lang}/contact?service=${encodeURIComponent(title)}&serviceId=${selectedIndex + 1}`}
                          className="inline-block bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                          {lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                        </a>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}

        <FadeInAnimation delay={800}>
          <div className="text-center mt-12">
            <a
              href={`/${lang}/service`}
              className="inline-block bg-brand-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-brand-600 transition shadow-md"
            >
              {lang === 'ja' ? '初回相談を予約する' : 'Book Initial Consultation'} →
            </a>
          </div>
        </FadeInAnimation>
      </div>
    </section>
  )
}