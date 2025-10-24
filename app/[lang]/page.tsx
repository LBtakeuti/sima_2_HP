import Hero from '@/components/sections/Hero'
import NewsSection from '@/components/sections/NewsSection'
import ServiceSection from '@/components/sections/ServiceSection'
import CompanyInfoSection from '@/components/sections/CompanyInfoSection'
import ServicesOverviewSection from '@/components/sections/ServicesOverviewSection'
import CTASection from '@/components/sections/CTASection'
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
      <Hero dict={dict} lang={lang} />
      <ServiceSection lang={lang as Language} dict={dict} />
      <NewsSection lang={lang as Language} dict={dict} />
      <CompanyInfoSection lang={lang as Language} />
      <ServicesOverviewSection lang={lang as Language} />
      <CTASection lang={lang as Language} dict={dict} />
    </div>
  )
}