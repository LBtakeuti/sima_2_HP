export const languages = ['ja', 'en'] as const
export type Language = typeof languages[number]
export const defaultLanguage: Language = 'ja'

export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language)
}