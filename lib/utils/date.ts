export function formatDate(date: string | Date, lang: string): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const locales: { [key: string]: string } = {
    ja: 'ja-JP',
    en: 'en-US',
    hi: 'hi-IN'
  }

  return d.toLocaleDateString(locales[lang] || 'ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}