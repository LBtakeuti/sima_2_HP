'use client'

import Modal from '@/components/shared/Modal'

interface ContactSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

export default function ContactSuccessModal({
  isOpen,
  onClose,
  language,
}: ContactSuccessModalProps) {
  const content = {
    ja: {
      title: 'お問い合わせありがとうございます',
      message: '内容を確認次第、ご連絡いたします。',
      button: '閉じる',
    },
    en: {
      title: 'Thank You for Your Inquiry',
      message: 'We will contact you after reviewing your message.',
      button: 'Close',
    },
    hi: {
      title: 'आपकी जांच के लिए धन्यवाद',
      message: 'हम आपके संदेश की समीक्षा करने के बाद आपसे संपर्क करेंगे।',
      button: 'बंद करें',
    },
  }

  const lang = language as keyof typeof content
  const text = content[lang] || content.ja

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* アイコン */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* タイトル */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          {text.title}
        </h2>

        {/* メッセージ */}
        <p className="text-center text-gray-600 mb-8">{text.message}</p>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-lg hover:from-brand-700 hover:to-brand-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {text.button}
        </button>
      </div>
    </Modal>
  )
}

