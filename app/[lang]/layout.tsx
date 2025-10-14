import { Inter } from 'next/font/google'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import { languages } from '@/lib/i18n/config'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header lang={lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  )
}