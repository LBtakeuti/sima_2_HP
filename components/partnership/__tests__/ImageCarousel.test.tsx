import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageCarousel from '../ImageCarousel'
import type { PartnershipImage } from '@/lib/supabase/partnership'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

vi.mock('@/components/shared/ImageLightbox', () => ({
  default: ({ isOpen, onClose, url, caption }: {
    isOpen: boolean
    onClose: () => void
    url: string
    caption?: string
  }) =>
    isOpen ? (
      <div data-testid="lightbox" data-url={url} data-caption={caption}>
        <button onClick={onClose}>Close Lightbox</button>
      </div>
    ) : null,
}))

const mockScrollPrev = vi.fn()
const mockScrollNext = vi.fn()
const mockScrollTo = vi.fn()
const mockOn = vi.fn()
const mockOff = vi.fn()
const mockSelectedScrollSnap = vi.fn(() => 0)

vi.mock('embla-carousel-react', () => ({
  default: () => [
    vi.fn(),
    {
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      scrollTo: mockScrollTo,
      on: mockOn,
      off: mockOff,
      selectedScrollSnap: mockSelectedScrollSnap,
    },
  ],
}))

const singleImage: PartnershipImage[] = [
  { url: 'https://example.com/img1.jpg', caption: '' },
]

const multipleImages: PartnershipImage[] = [
  { url: 'https://example.com/img1.jpg', caption: 'First image' },
  { url: 'https://example.com/img2.jpg', caption: '' },
  { url: 'https://example.com/img3.jpg', caption: 'Third image' },
]

describe('ImageCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('画像 0 枚', () => {
    it('null を返す', () => {
      const { container } = render(<ImageCarousel images={[]} />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('画像 1 枚', () => {
    it('画像が表示される', () => {
      render(<ImageCarousel images={singleImage} alt="test" />)
      expect(screen.getByAltText('test')).toBeInTheDocument()
    })

    it('前後矢印ボタンが表示されない', () => {
      render(<ImageCarousel images={singleImage} />)
      expect(screen.queryByLabelText('Previous')).toBeNull()
      expect(screen.queryByLabelText('Next')).toBeNull()
    })

    it('ドットナビゲーションが表示されない', () => {
      render(<ImageCarousel images={singleImage} />)
      expect(screen.queryByLabelText('Go to slide 1')).toBeNull()
    })
  })

  describe('画像 2 枚以上', () => {
    it('全ての画像がレンダリングされる', () => {
      render(<ImageCarousel images={multipleImages} />)
      expect(screen.getByAltText('First image')).toBeInTheDocument()
      expect(screen.getByAltText('Third image')).toBeInTheDocument()
    })

    it('前後矢印ボタンが表示される', () => {
      render(<ImageCarousel images={multipleImages} />)
      expect(screen.getByLabelText('Previous')).toBeInTheDocument()
      expect(screen.getByLabelText('Next')).toBeInTheDocument()
    })

    it('ドットナビゲーションが画像枚数分表示される', () => {
      render(<ImageCarousel images={multipleImages} />)
      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument()
    })

    it('前ボタンクリックで scrollPrev が呼ばれる', () => {
      render(<ImageCarousel images={multipleImages} />)
      fireEvent.click(screen.getByLabelText('Previous'))
      expect(mockScrollPrev).toHaveBeenCalledTimes(1)
    })

    it('次ボタンクリックで scrollNext が呼ばれる', () => {
      render(<ImageCarousel images={multipleImages} />)
      fireEvent.click(screen.getByLabelText('Next'))
      expect(mockScrollNext).toHaveBeenCalledTimes(1)
    })

    it('ドットクリックで scrollTo が呼ばれる', () => {
      render(<ImageCarousel images={multipleImages} />)
      fireEvent.click(screen.getByLabelText('Go to slide 2'))
      expect(mockScrollTo).toHaveBeenCalledWith(1)
    })
  })

  describe('lightbox', () => {
    it('画像クリックで lightbox が開く', () => {
      render(<ImageCarousel images={singleImage} />)
      const btn = screen.getByRole('button', { name: /image/i })
      fireEvent.click(btn)
      expect(screen.getByTestId('lightbox')).toBeInTheDocument()
    })

    it('lightbox に正しい url が渡される', () => {
      render(<ImageCarousel images={singleImage} />)
      const btn = screen.getByRole('button', { name: /image/i })
      fireEvent.click(btn)
      expect(screen.getByTestId('lightbox')).toHaveAttribute(
        'data-url',
        'https://example.com/img1.jpg'
      )
    })

    it('lightbox の Close ボタンで lightbox が閉じる', () => {
      render(<ImageCarousel images={singleImage} />)
      const imageBtn = screen.getByRole('button', { name: /image/i })
      fireEvent.click(imageBtn)
      expect(screen.getByTestId('lightbox')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Close Lightbox'))
      expect(screen.queryByTestId('lightbox')).toBeNull()
    })

    it('キャプションあり画像クリックで caption が lightbox に渡される', () => {
      render(<ImageCarousel images={multipleImages} />)
      const btn = screen.getByRole('button', { name: 'First image' })
      fireEvent.click(btn)
      expect(screen.getByTestId('lightbox')).toHaveAttribute('data-caption', 'First image')
    })
  })

  describe('キャプション表示', () => {
    it('caption あり画像のキャプションテキストが表示される', () => {
      render(<ImageCarousel images={multipleImages} />)
      expect(screen.getByText('First image')).toBeInTheDocument()
      expect(screen.getByText('Third image')).toBeInTheDocument()
    })

    it('caption なし画像のキャプション要素が存在しない', () => {
      const noCaption: PartnershipImage[] = [{ url: 'https://example.com/img.jpg', caption: '' }]
      render(<ImageCarousel images={noCaption} alt="no caption" />)
      const gradient = document.querySelector('.bg-gradient-to-t')
      expect(gradient).toBeNull()
    })
  })

  describe('レスポンシブ className', () => {
    it('スライド要素に basis-full が含まれる（スマホ全幅）', () => {
      render(<ImageCarousel images={multipleImages} />)
      const slides = document.querySelectorAll('.basis-full')
      expect(slides.length).toBeGreaterThan(0)
    })

    it('複数画像時のスライド要素に md:basis-[60%] が含まれる（PC幅）', () => {
      render(<ImageCarousel images={multipleImages} />)
      const slide = document.querySelector('.md\\:basis-\\[60\\%\\]')
      expect(slide).toBeInTheDocument()
    })

    it('複数画像時の非アクティブスライドに md:opacity-50 が含まれる（PC非アクティブ）', () => {
      render(<ImageCarousel images={multipleImages} />)
      const dimmedSlide = document.querySelector('.md\\:opacity-50')
      expect(dimmedSlide).toBeInTheDocument()
    })

    it('矢印ボタンに bg-black/40 が含まれる（スマホ用背景）', () => {
      render(<ImageCarousel images={multipleImages} />)
      const prevBtn = screen.getByLabelText('Previous')
      expect(prevBtn.className).toContain('bg-black/40')
    })

    it('矢印ボタンに md:bg-white/90 が含まれる（PC用背景）', () => {
      render(<ImageCarousel images={multipleImages} />)
      const prevBtn = screen.getByLabelText('Previous')
      expect(prevBtn.className).toContain('md:bg-white/90')
    })
  })
})
