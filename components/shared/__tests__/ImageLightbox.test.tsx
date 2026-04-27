import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageLightbox from '../ImageLightbox'

describe('ImageLightbox', () => {
  const onClose = vi.fn()
  const defaultProps = {
    isOpen: true,
    onClose,
    url: 'https://example.com/image.jpg',
    alt: 'test image',
  }

  beforeEach(() => {
    onClose.mockClear()
    document.body.style.overflow = ''
  })

  it('isOpen=false のとき null を返す', () => {
    const { container } = render(<ImageLightbox {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('isOpen=true のとき dialog が表示される', () => {
    render(<ImageLightbox {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('画像が表示される', () => {
    render(<ImageLightbox {...defaultProps} />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
    expect(img).toHaveAttribute('alt', 'test image')
  })

  it('背景オーバーレイ（暗い領域）クリックで onClose が呼ばれる', () => {
    render(<ImageLightbox {...defaultProps} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ESC キーで onClose が呼ばれる', () => {
    render(<ImageLightbox {...defaultProps} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('× ボタンクリックで onClose が1回だけ呼ばれる（closest 判定で二重発火しない）', () => {
    render(<ImageLightbox {...defaultProps} />)
    const closeBtn = screen.getByLabelText('Close')
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('画像本体クリックでは onClose が呼ばれない（data-lightbox-content の closest 判定）', () => {
    render(<ImageLightbox {...defaultProps} />)
    const img = screen.getByRole('img')
    fireEvent.click(img)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('キャプションクリックでは onClose が呼ばれない（data-lightbox-content の closest 判定）', () => {
    render(<ImageLightbox {...defaultProps} caption="テストキャプション" />)
    const caption = screen.getByText('テストキャプション')
    fireEvent.click(caption)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('isOpen=true のとき body overflow が hidden になる', () => {
    render(<ImageLightbox {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('caption あり時にキャプションが表示される', () => {
    render(<ImageLightbox {...defaultProps} caption="テストキャプション" />)
    expect(screen.getByText('テストキャプション')).toBeInTheDocument()
  })

  it('caption なし時にキャプション要素が存在しない', () => {
    render(<ImageLightbox {...defaultProps} />)
    expect(screen.queryByText('テストキャプション')).toBeNull()
  })

  describe('data-lightbox-content 属性の付与確認', () => {
    it('<img> に data-lightbox-content が付与されている', () => {
      render(<ImageLightbox {...defaultProps} />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('data-lightbox-content')
    })

    it('× ボタンに data-lightbox-content が付与されている', () => {
      render(<ImageLightbox {...defaultProps} />)
      const closeBtn = screen.getByLabelText('Close')
      expect(closeBtn).toHaveAttribute('data-lightbox-content')
    })

    it('caption あり時に <p> に data-lightbox-content が付与されている', () => {
      render(<ImageLightbox {...defaultProps} caption="テストキャプション" />)
      const caption = screen.getByText('テストキャプション')
      expect(caption).toHaveAttribute('data-lightbox-content')
    })
  })
})
