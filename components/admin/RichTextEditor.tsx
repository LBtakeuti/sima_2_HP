'use client'

import { useEffect, useRef } from 'react'
import type QuillType from 'quill'
import 'quill/dist/quill.snow.css'

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  active: boolean
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  active,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<QuillType | null>(null)
  const internalChange = useRef(false)

  function removeAdjacentToolbars() {
    const container = containerRef.current
    if (!container) return

    // Remove toolbars immediately before/after the container
    let sibling = container.previousElementSibling
    while (sibling && sibling.classList.contains('ql-toolbar')) {
      const toRemove = sibling
      sibling = sibling.previousElementSibling
      toRemove.remove()
    }
    sibling = container.nextElementSibling
    while (sibling && sibling.classList.contains('ql-toolbar')) {
      const toRemove = sibling
      sibling = sibling.nextElementSibling
      toRemove.remove()
    }

    // Remove toolbars nested within the container (Quill may inject them here)
    container.querySelectorAll(':scope > .ql-toolbar').forEach((toolbar) => {
      toolbar.remove()
    })

    // Remove toolbars within the parent that are directly associated with this container
    const parent = container.parentElement
    if (parent) {
      parent.querySelectorAll(':scope > .ql-toolbar').forEach((toolbar) => {
        if (toolbar.nextElementSibling === container || toolbar.previousElementSibling === container) {
          toolbar.remove()
        }
      })
    }
  }

  function cleanup() {
    if (quillRef.current) {
      quillRef.current.off('text-change')
      quillRef.current = null
    }
    removeAdjacentToolbars()
    const container = containerRef.current
    if (container) {
      container.innerHTML = ''
    }
  }

  useEffect(() => {
    let isMounted = true

    async function init() {
      if (!containerRef.current || quillRef.current) return
      removeAdjacentToolbars()

      const Quill = (await import('quill')).default

      containerRef.current.innerHTML = ''

      const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean'],
      ]

      const quill = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: toolbarOptions,
        },
      })

      quillRef.current = quill

      quill.clipboard.dangerouslyPasteHTML(value || '')

      quill.on('text-change', () => {
        if (!isMounted) return
        internalChange.current = true
        const html = quill.root.innerHTML
        onChange(html === '<p><br></p>' ? '' : html)
      })
    }

    if (active) {
      init()
    }

    return () => {
      isMounted = false
      cleanup()
    }
  }, [active, onChange, placeholder])

  useEffect(() => {
    if (!active) return
    const quill = quillRef.current
    if (!quill) return
    if (internalChange.current) {
      internalChange.current = false
      return
    }

    const currentHtml = quill.root.innerHTML
    if ((value || '') !== (currentHtml === '<p><br></p>' ? '' : currentHtml)) {
      const selection = quill.getSelection()
      quill.clipboard.dangerouslyPasteHTML(value || '')
      if (selection) {
        quill.setSelection(selection)
      }
    }
  }, [value, active])

  return (
    <div
      ref={containerRef}
      className="rich-text-editor border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
    />
  )
}

