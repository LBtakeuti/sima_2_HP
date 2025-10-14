export default function Footer({ lang }: { lang: string }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SEEMAPAR</h3>
            <p className="text-gray-400 text-sm">
              戦略コンサルティング
            </p>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {lang === 'ja' ? '連絡先' : lang === 'en' ? 'Contact' : 'संपर्क'}
            </h3>
            <p className="text-gray-400 text-sm">
              〒420-0061<br />
              静岡県静岡市葵区新富町3丁目35番地10
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {lang === 'ja' ? 'リンク' : lang === 'en' ? 'Links' : 'लिंक'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={`/${lang}/about`} className="hover:text-white transition">
                  {lang === 'ja' ? '会社情報' : lang === 'en' ? 'About' : 'हमारे बारे में'}
                </a>
              </li>
              <li>
                <a href={`/${lang}/service`} className="hover:text-white transition">
                  {lang === 'ja' ? 'サービス' : lang === 'en' ? 'Service' : 'सेवाएं'}
                </a>
              </li>
              <li>
                <a href={`/${lang}/contact`} className="hover:text-white transition">
                  {lang === 'ja' ? 'お問い合わせ' : lang === 'en' ? 'Contact' : 'संपर्क'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2025 SEEMAPAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}