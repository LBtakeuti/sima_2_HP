import 'server-only'
import type { Language } from './config'

const dictionaries = {
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Language) => {
  const dictionaryLoader = dictionaries[locale]
  if (!dictionaryLoader) {
    console.error(`No dictionary found for locale: ${locale}`)
    return dictionaries.ja()
  }
  return dictionaryLoader()
}