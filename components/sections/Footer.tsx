import Link from 'next/link'
import Image from 'next/image'
import type { Language } from '@/lib/i18n/config'

export default function Footer({ lang, dict }: { lang: Language; dict: any }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white" style={{ backgroundColor: '#182C8C', borderTop: '4px solid #D2A655' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Logo & Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href={`/${lang}`} className="flex items-center">
                <Image
                  src="/images/SEEMA 1.svg"
                  alt="SEEMAPAR Logo"
                  width={80}
                  height={60}
                  className="object-contain"
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
                <p>{lang === 'ja' ? '東京準備室' : 'Tokyo Preparation Office'}</p>
                <p>Pune, India</p>
                <p>Goa, India</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? 'サービスについて' : 'Our Services'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/service`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '初回コンサルティング' : 'Initial Consultation'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '市場調査・競合分析' : 'Market Research & Analysis'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '展示会同行・商談支援' : 'Exhibition & Negotiation Support'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '直接調達・製造管理' : 'Direct Procurement & Manufacturing'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '無料相談枠' : 'Free Consultation Slots'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? '会社情報' : 'Company Info'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/about`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '会社概要' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about#founder`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '創業者について' : 'About Founder'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about#history`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? '沿革' : 'History'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-brand-300 transition">
                  {lang === 'ja' ? 'お問い合わせ先' : 'Contact Information'}
                </Link>
              </li>
            </ul>
          </div>

          {/* News & Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
              {lang === 'ja' ? '最新ニュースをご購読ください' : 'Subscribe to Latest News'}
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {lang === 'ja'
                ? 'SEEMAPARのイベントや活動についての最新情報を配信いたします。'
                : 'Get the latest updates about SEEMAPAR events and activities.'}
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <Link
                href={`/${lang}/contact`}
                className="inline-block bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded text-sm font-medium transition"
              >
                {lang === 'ja' ? 'ご購読' : 'Subscribe'}
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-brand-500 rounded-full flex items-center justify-center transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z"/>
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