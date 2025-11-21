'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Button from '@/components/shared/Button'
import ContactSuccessModal from '@/components/sections/ContactSuccessModal'
import { submitContact } from '@/lib/supabase/contacts'
import type { ContactInsert } from '@/lib/types/contact'

const contactSchema = z.object({
  name: z.string()
    .min(1, 'お名前は必須です')
    .max(100, 'お名前は100文字以内で入力してください')
    .trim(),
  company: z.string()
    .max(200, '会社名は200文字以内で入力してください')
    .trim()
    .optional(),
  email: z.string()
    .email('正しいメールアドレスを入力してください')
    .max(255, 'メールアドレスは255文字以内で入力してください')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .max(50, '電話番号は50文字以内で入力してください')
    .trim()
    .optional(),
  message: z.string()
    .min(10, 'メッセージは10文字以上で入力してください')
    .max(5000, 'メッセージは5000文字以内で入力してください')
    .trim()
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm({
  lang,
  dict,
  serviceName,
  serviceId
}: {
  lang: string;
  dict: any;
  serviceName?: string;
  serviceId?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // データのサニタイゼーション（XSS対策）
      const sanitizedData = {
        name: data.name.trim(),
        company: data.company?.trim() || null,
        email: data.email.toLowerCase().trim(),
        phone: data.phone?.trim() || null,
        message: data.message.trim(),
      }

      // Supabaseへお問い合わせデータを送信
      const contactData: ContactInsert = {
        ...sanitizedData,
        language: lang as 'ja' | 'en' | 'hi',
        service_name: serviceName || null,
        service_id: serviceId || null,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        ip_address: null, // クライアントサイドでは取得不可
      }

      const result = await submitContact(contactData)

      if (result.success) {
        reset()
        setIsSuccessModalOpen(true)
      } else {
        throw new Error(result.error || 'サーバーエラーが発生しました')
      }
    } catch (error) {
      // 開発環境のみエラー詳細をログ出力
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact form submission error:', error)
      }
      setSubmitMessage(
        lang === 'ja'
          ? 'エラーが発生しました。もう一度お試しください。'
          : lang === 'en'
          ? 'An error occurred. Please try again.'
          : 'एक त्रुटि हुई। कृपया पुन: प्रयास करें।'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label={dict.contact.name}
          {...register('name')}
          error={errors.name?.message}
          required
        />

        <Input
          label={dict.contact.company}
          {...register('company')}
          error={errors.company?.message}
        />

        <Input
          label={dict.contact.email}
          type="email"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <Input
          label={dict.contact.phone}
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Textarea
          label={dict.contact.message}
          {...register('message')}
          error={errors.message?.message}
          rows={5}
          required
        />

        {submitMessage && (
          <div className="p-4 border-2 rounded-lg border-red-500 bg-red-50 text-red-800">
            {submitMessage}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (lang === 'ja' ? '送信中...' : lang === 'en' ? 'Sending...' : 'भेज रहे हैं...')
            : dict.contact.submit}
        </Button>
      </form>

      {/* 成功モーダル */}
      <ContactSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        language={lang}
      />
    </>
  )
}