'use client'

import { useEffect } from 'react'

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  url: string
  caption?: string
  alt?: string
}

export default function ImageLightbox({
  isOpen,
  onClose,
  url,
  caption,
  alt,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black/90 animate-fadeIn"
      onClick={(e) => {
        // 画像本体・キャプション・×ボタン以外（オーバーレイの暗い領域）をクリックしたら閉じる
        if (!(e.target as HTMLElement).closest('[data-lightbox-content]')) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        data-lightbox-content
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex max-h-full flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={alt || caption || ''}
          data-lightbox-content
          loading="eager"
          className="max-h-[80vh] max-w-full object-contain"
        />
        {caption && (
          <p
            data-lightbox-content
            className="max-w-3xl text-center text-sm text-white/90 px-4"
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
