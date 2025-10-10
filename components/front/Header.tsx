'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default function Header({ lang }: { lang: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [dict, setDict] = useState<any>(null)

  // 辞書を取得
  if (!dict) {
    getDictionary(lang as Language).then(setDict)
  }

  const navigation = [
    { name: dict?.nav?.top || 'Top', href: `/${lang}` },
    { name: dict?.nav?.about || 'About', href: `/${lang}/about` },
    { name: dict?.nav?.service || 'Service', href: `/${lang}/service` },
    { name: dict?.nav?.contact || 'Contact', href: `/${lang}/contact` },
  ]

  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link href={`/${lang}`} className="text-xl font-bold text-primary-600">
            SEEMAPAR
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-primary-600 transition ${
                  pathname === item.href ? 'text-primary-600 font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 言語切り替え */}
          <div className="hidden md:flex items-center space-x-4">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={pathname.replace(`/${lang}`, `/${language.code}`)}
                className={`text-sm ${
                  lang === language.code
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {language.name}
              </Link>
            ))}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-gray-700 hover:bg-gray-50 rounded ${
                    pathname === item.href ? 'bg-gray-50 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex space-x-4 px-4 pt-4 mt-4 border-t">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={pathname.replace(`/${lang}`, `/${language.code}`)}
                  className={`text-sm ${
                    lang === language.code
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}