import Link from 'next/link'
import Image from 'next/image'
import type { Language } from '@/lib/i18n/config'

export default function Footer({ lang, dict }: { lang: Language; dict: any }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white" style={{
      backgroundImage: 'url(/images/back.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderTop: '4px solid #D2A655'
    }}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Logo & Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href={`/${lang}`} className="flex items-center">
                <Image
                  src="/images/Seemapaar.png"
                  alt="SEEMAPAR Logo"
                  width={150}
                  height={150}
                  className="object-contain w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {lang === 'ja'
                ? '日印クロスボーダー事業の「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チーム'
                : 'A hands-on consulting team that delivers results through human relationships and on-site execution for Japan-India cross-border business'}
            </p>

            {/* Office Locations */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                {lang === 'ja' ? '拠点' : 'Offices'}
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Tokyo, Japan</p>
                <p>Pune, India</p>
                <p>Goa, India</p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? '会社情報' : 'Company'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/about`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '私たちについて' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/message`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '代表メッセージ' : 'Message from Founder'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/our-services`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? 'サービス' : 'Our Services'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Opportunities & Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? '案件・情報' : 'Opportunities & Info'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/partnership`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? 'パートナーシップ案件' : 'Partnership Opportunities'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/news`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? 'ニュース' : 'News'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? 'お問い合わせ' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? 'フォローする' : 'Follow Us'}
            </h4>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://m.facebook.com/profile.php?id=61582667907392&name=xhp_nt__fb__action__open_user"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="http://www.youtube.com/@seemapaar_staff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/seemapaar.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/seemapaar-staff-54286b38b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} 株式会社SEEMAPAR. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href={`/${lang}/privacy`} className="text-gray-400 hover:text-brand-300 transition">
                {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
              </Link>
              <Link href={`/${lang}/terms`} className="text-gray-400 hover:text-brand-300 transition">
                {lang === 'ja' ? '利用規約' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}