'use client'

import { useEffect, useRef } from 'react'
import type QuillType from 'quill'
import 'quill/dist/quill.snow.css'

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<QuillType | null>(null)
  const internalChange = useRef(false)

  useEffect(() => {
    let isMounted = true

    async function init() {
      if (!containerRef.current || quillRef.current) return

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

    init()

    return () => {
      isMounted = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      quillRef.current = null
    }
  }, [onChange, placeholder])

  useEffect(() => {
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
  }, [value])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (
        containerRef.current &&
        containerRef.current.offsetParent === null &&
        quillRef.current
      ) {
        containerRef.current.innerHTML = ''
        quillRef.current = null
      }
    })

    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement, {
        attributes: true,
        attributeFilter: ['class', 'style'],
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="rich-text-editor border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
    />
  )
}

