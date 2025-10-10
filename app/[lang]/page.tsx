import Hero from '@/components/front/Hero'
import NewsSection from '@/components/front/NewsSection'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Language } from '@/lib/i18n/config'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Language)

  return (
    <div>
      <Hero dict={dict} />
      <NewsSection lang={lang as Language} dict={dict} />
    </div>
  )
}