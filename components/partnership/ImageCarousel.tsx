'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import ImageLightbox from '@/components/shared/ImageLightbox'
import type { PartnershipImage } from '@/lib/supabase/partnership'

interface Props {
  images: PartnershipImage[]
  alt?: string
}

export default function ImageCarousel({ images, alt }: Props) {
  const isMultiple = images.length > 1
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  if (!images || images.length === 0) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className={`relative shrink-0 basis-full px-0 transition-opacity duration-300 md:px-2 ${
                isMultiple
                  ? 'md:basis-[60%] lg:basis-[55%]'
                  : ''
              } ${
                isMultiple
                  ? selectedIndex === index
                    ? 'opacity-100'
                    : 'opacity-100 md:opacity-50'
                  : 'opacity-100'
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative block w-full aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label={image.caption || alt || 'Image'}
              >
                <Image
                  src={image.url}
                  alt={image.caption || alt || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 60vw, 55vw"
                />
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-3 py-2 md:px-4 md:py-3">
                    <p className="text-xs text-white drop-shadow line-clamp-2 md:text-sm">
                      {image.caption}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {isMultiple && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-md backdrop-blur-sm hover:bg-black/60 transition-colors md:bg-white/90 md:text-gray-700 md:hover:bg-white md:hover:text-brand-600 lg:left-4 lg:h-12 lg:w-12"
          >
            <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-md backdrop-blur-sm hover:bg-black/60 transition-colors md:bg-white/90 md:text-gray-700 md:hover:bg-white md:hover:text-brand-600 lg:right-4 lg:h-12 lg:w-12"
          >
            <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? 'w-6 bg-brand-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          url={images[lightboxIndex].url}
          caption={images[lightboxIndex].caption}
          alt={alt}
        />
      )}
    </div>
  )
}
