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
              className={`relative shrink-0 px-2 transition-opacity duration-300 ${
                isMultiple
                  ? 'basis-[80%] md:basis-[60%] lg:basis-[55%]'
                  : 'basis-full'
              } ${isMultiple && selectedIndex !== index ? 'opacity-50' : 'opacity-100'}`}
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
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 55vw"
                />
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3">
                    <p className="text-sm text-white drop-shadow line-clamp-2">
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
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-white hover:text-brand-600 transition-colors lg:left-4 lg:h-12 lg:w-12"
          >
            <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-white hover:text-brand-600 transition-colors lg:right-4 lg:h-12 lg:w-12"
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
