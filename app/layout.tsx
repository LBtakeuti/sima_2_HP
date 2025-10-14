import type { Metadata } from 'next'
import { Inter, Poppins, Space_Grotesk, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: false
})

export const metadata: Metadata = {
  title: 'SEEMAPAR（シーマパール）| 戦略コンサルティング',
  description: '25年の実績を持つ戦略コンサルタントが、真の国際ビジネス成功へ導きます',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${notoSansJP.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}