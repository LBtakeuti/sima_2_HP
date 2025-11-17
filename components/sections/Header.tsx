'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import type { Language } from '@/lib/i18n/config'

// 辞書データを直接インポート
import jaDict from '@/lib/i18n/dictionaries/ja.json'
import enDict from '@/lib/i18n/dictionaries/en.json'

const dictionaries = {
  ja: jaDict,
  en: enDict,
}

export default function Header({ lang }: { lang: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const dict = dictionaries[lang as Language] || dictionaries.ja
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const navigation = [
    { name: dict?.nav?.about || 'About Us', href: `/${lang}/about` },
    { name: dict?.nav?.message || 'Message', href: `/${lang}/message` },
    { name: dict?.nav?.ourServices || 'Our Service', href: `/${lang}/our-services` },
    { name: dict?.nav?.partnership || 'Partnership Opportunities', href: `/${lang}/partnership` },
    { name: dict?.nav?.news || 'News', href: `/${lang}/news` },
    { name: dict?.nav?.contact || 'Contact', href: `/${lang}/contact` },
  ]

  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
  ]

  // メニューの外側をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        menuButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header className="relative z-50 shadow-sm">
      {/* ロゴセクション */}
      <div className="py-[5px] md:py-6" style={{
        backgroundImage: 'url(/images/back.reverse.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center">
            {/* 左側のスペーサー（デスクトップのみ、言語切り替えと同じ幅） */}
            <div className="hidden md:block flex-1">
              {/* 空白スペース */}
            </div>

            {/* 中央ロゴ */}
            <div className="flex-1 flex justify-center">
              <Link href={`/${lang}`} className="flex items-center">
                <Image
                  src="/images/Seemapaar1.png"
                  alt="SEEMAPAR Logo"
                  width={180}
                  height={180}
                  className="object-contain w-[110px] h-[110px] md:w-[180px] md:h-[180px]"
                  priority
                />
              </Link>
            </div>

            {/* 言語切り替え（デスクトップのみ） */}
            <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={pathname.replace(`/${lang}`, `/${language.code}`)}
                  className={`text-sm ${
                    lang === language.code
                      ? 'text-brand-300 font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {language.name}
                </Link>
              ))}
            </div>

            {/* モバイルメニューボタン */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden absolute right-4 p-2 text-white z-10"
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
        </div>
      </div>

      {/* ナビゲーションバー */}
      <div className="border-t border-gray-200 bg-white" style={{ borderBottom: '4px solid #D2A655' }}>
        <div className="container mx-auto px-4">
          <nav className="hidden lg:flex justify-center items-center h-16 space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-800 hover:text-brand-500 transition font-medium text-sm uppercase tracking-wider ${
                  pathname === item.href ? 'text-brand-500 border-b-2 border-brand-500 pb-1' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div ref={menuRef} className="lg:hidden absolute top-full left-0 right-0 py-4 border-t border-gray-200 bg-white shadow-lg z-40">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 text-gray-800 hover:bg-gray-50 rounded font-medium ${
                    pathname === item.href ? 'bg-brand-50 text-brand-600 font-semibold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* モバイル用言語切り替え */}
              <div className="px-4 pt-4 border-t border-gray-200 mt-4">
                {/* 言語切り替え */}
                <div className="flex space-x-4">
                  {languages.map((language) => (
                    <Link
                      key={language.code}
                      href={pathname.replace(`/${lang}`, `/${language.code}`)}
                      className={`text-sm ${
                        lang === language.code
                          ? 'text-brand-600 font-medium'
                          : 'text-gray-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {language.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}