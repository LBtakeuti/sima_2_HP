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
  title: 'SEEMAPAR（シーマパール）| 日印クロスボーダー事業コンサルティング',
  description: '国境を越えて、"信頼"をつくる。日印クロスボーダー事業の「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チーム',
  keywords: ['SEEMAPAR', 'シーマパール', '日印', 'インド', 'クロスボーダー', 'コンサルティング', '国際ビジネス', '真珠'],
  authors: [{ name: 'SEEMAPAR Corporation' }],
  creator: 'SEEMAPAR Corporation',
  publisher: 'SEEMAPAR Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/SEEMA.png',
  },
  openGraph: {
    title: 'SEEMAPAR（シーマパール）| 日印クロスボーダー事業コンサルティング',
    description: '国境を越えて、"信頼"をつくる。日印クロスボーダー事業の「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チーム',
    url: 'https://seemapar.com',
    siteName: 'SEEMAPAR',
    images: [
      {
        url: '/images/SEEMA.png',
        width: 1200,
        height: 630,
        alt: 'SEEMAPAR - 日印クロスボーダー事業コンサルティング',
        type: 'image/png',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEEMAPAR（シーマパール）| 日印クロスボーダー事業コンサルティング',
    description: '国境を越えて、"信頼"をつくる。日印クロスボーダー事業の「実働型コンサル」として、人の関係性と現場実行で成果を出す小規模精鋭チーム',
    images: ['/images/SEEMA.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Google Search Console verification code
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