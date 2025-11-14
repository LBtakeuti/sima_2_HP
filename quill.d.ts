declare module 'quill' {
  export interface QuillOptionsStatic {
    theme?: string
    placeholder?: string
    modules?: any
  }

  export interface RangeStatic {
    index: number
    length: number
  }

  export interface DeltaStatic {
    ops?: any[]
  }

  export class Quill {
    constructor(container: HTMLElement | string, options?: QuillOptionsStatic)

    root: HTMLElement
    clipboard: {
      dangerouslyPasteHTML(html: string): void
    }

    on(eventName: 'text-change', handler: (delta: DeltaStatic, oldDelta: DeltaStatic, source: string) => void): void
    off(eventName: 'text-change'): void

    getSelection(focus?: boolean): RangeStatic | null
    setSelection(index: number, length?: number): void
    setSelection(range: RangeStatic): void
  }

  export default Quill
}
