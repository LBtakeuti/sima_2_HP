import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../Modal'

describe('Modal', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    onClose.mockClear()
    document.body.style.overflow = ''
  })

  it('isOpen=false のとき何もレンダリングしない', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    expect(container.firstChild).toBeNull()
  })

  it('isOpen=true のとき children がレンダリングされる', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <div>test content</div>
      </Modal>
    )
    expect(screen.getByText('test content')).toBeInTheDocument()
  })

  it('maxWidth 未指定時は max-w-md が適用される', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    const inner = document.querySelector('.max-w-md')
    expect(inner).toBeInTheDocument()
  })

  it('maxWidth 指定時はその値が className に含まれる', () => {
    render(
      <Modal isOpen onClose={onClose} maxWidth="max-w-4xl">
        <div>content</div>
      </Modal>
    )
    const inner = document.querySelector('.max-w-4xl')
    expect(inner).toBeInTheDocument()
  })

  it('maxWidth 指定時に max-w-md が含まれない', () => {
    render(
      <Modal isOpen onClose={onClose} maxWidth="max-w-4xl">
        <div>content</div>
      </Modal>
    )
    const defaultWidth = document.querySelector('.max-w-md')
    expect(defaultWidth).toBeNull()
  })

  it('背景クリックで onClose が呼ばれる', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    const backdrop = document.querySelector('.fixed.inset-0')!
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ESC キーで onClose が呼ばれる', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('isOpen=true のとき body の overflow が hidden になる', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('isOpen=false のとき body の overflow が hidden にならない', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>content</div>
      </Modal>
    )
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
