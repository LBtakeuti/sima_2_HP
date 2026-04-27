'use client'

import { useEffect } from 'react'
import Image from 'next/image'

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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div
        className="relative flex max-h-full max-w-6xl w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ height: '80vh' }}>
          <Image
            src={url}
            alt={alt || caption || ''}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        {caption && (
          <p className="mt-4 max-w-3xl text-center text-sm text-white/90 px-4">
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
