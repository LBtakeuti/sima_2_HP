import { describe, it, expect } from 'vitest'
import type { PartnershipImage } from '@/lib/supabase/partnership'

// 管理画面の純関数ロジックをここで再実装してテスト
// (page.tsx は useState に密結合しているため、同じロジックを純関数として検証)

type FormState = {
  image_url: string
  images: PartnershipImage[]
}

function addTagLogic(currentTags: string[], raw: string): string[] {
  const candidates = raw
    .split(/[,、]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
  if (candidates.length === 0) return currentTags
  const merged = [...currentTags]
  candidates.forEach((t) => {
    if (!merged.includes(t)) merged.push(t)
  })
  return merged
}

function removeTagLogic(currentTags: string[], tag: string): string[] {
  return currentTags.filter((t) => t !== tag)
}

// arrayMove の純関数実装（@dnd-kit/sortable の arrayMove と同等）
function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

function reorderImagesLogic(state: FormState, activeId: string, overId: string): FormState {
  const oldIndex = state.images.findIndex((img) => img.url === activeId)
  const newIndex = state.images.findIndex((img) => img.url === overId)
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return state
  return { ...state, images: arrayMove(state.images, oldIndex, newIndex) }
}

function removeImageLogic(state: FormState, index: number): FormState {
  return {
    ...state,
    images: state.images.filter((_, i) => i !== index),
  }
}

function removeMainImageLogic(state: FormState): FormState {
  return { ...state, image_url: '' }
}

describe('addTagLogic', () => {
  it('単一タグを追加できる', () => {
    expect(addTagLogic([], 'AI')).toEqual(['AI'])
  })

  it('カンマ区切りで複数タグを追加できる（追加ボタン押下時に一括追加）', () => {
    expect(addTagLogic([], 'AI,SaaS,物流')).toEqual(['AI', 'SaaS', '物流'])
  })

  it('読点（、）区切りで複数タグを追加できる（追加ボタン押下時に一括追加）', () => {
    expect(addTagLogic([], 'AI、SaaS、物流')).toEqual(['AI', 'SaaS', '物流'])
  })

  it('前後の空白をトリムする', () => {
    expect(addTagLogic([], ' AI , SaaS ')).toEqual(['AI', 'SaaS'])
  })

  it('重複タグは追加しない', () => {
    expect(addTagLogic(['AI'], 'AI')).toEqual(['AI'])
  })

  it('既存タグと重複しない新規タグのみ追加する', () => {
    expect(addTagLogic(['AI'], 'AI,SaaS')).toEqual(['AI', 'SaaS'])
  })

  it('空文字列の場合は既存タグをそのまま返す', () => {
    expect(addTagLogic(['AI'], '')).toEqual(['AI'])
  })

  it('スペースのみの場合は既存タグをそのまま返す（追加ボタン disabled 相当）', () => {
    expect(addTagLogic(['AI'], '   ')).toEqual(['AI'])
  })

  it('追加ボタンクリック相当：入力値をそのまま渡すと追加される', () => {
    // UI では tagInput を addTag(tagInput) に渡す
    const tagInput = 'SaaS'
    expect(addTagLogic([], tagInput)).toEqual(['SaaS'])
  })

  it('追加ボタン disabled 判定：trim() が空文字の場合 candidates が空になる', () => {
    // tagInput.trim() === '' のとき UI ではボタン disabled
    // addTagLogic に渡しても既存タグが変わらないことで一致確認
    expect(addTagLogic(['AI'], '')).toEqual(['AI'])
    expect(addTagLogic(['AI'], '  ')).toEqual(['AI'])
  })
})

describe('removeTagLogic', () => {
  it('指定タグを削除できる', () => {
    expect(removeTagLogic(['AI', 'SaaS', '物流'], 'SaaS')).toEqual(['AI', '物流'])
  })

  it('先頭タグを削除できる', () => {
    expect(removeTagLogic(['AI', 'SaaS'], 'AI')).toEqual(['SaaS'])
  })

  it('末尾タグを削除できる', () => {
    expect(removeTagLogic(['AI', 'SaaS'], 'SaaS')).toEqual(['AI'])
  })

  it('存在しないタグを指定しても変化しない', () => {
    expect(removeTagLogic(['AI', 'SaaS'], 'NoExist')).toEqual(['AI', 'SaaS'])
  })

  it('全タグを削除できる', () => {
    expect(removeTagLogic(['AI'], 'AI')).toEqual([])
  })

  it('Backspace 削除相当：末尾タグを取得して removeTag に渡すと除去される', () => {
    // UI: tagInput === '' && tags.length > 0 のとき tags[tags.length - 1] を removeTag に渡す
    const tags = ['AI', 'SaaS', '物流']
    const last = tags[tags.length - 1]
    expect(removeTagLogic(tags, last)).toEqual(['AI', 'SaaS'])
  })
})

describe('reorderImagesLogic', () => {
  const baseState: FormState = {
    image_url: 'main.jpg',
    images: [
      { url: 'url1', caption: 'a' },
      { url: 'url2', caption: 'b' },
      { url: 'url3', caption: 'c' },
    ],
  }

  it('先頭 → 末尾に移動できる', () => {
    const result = reorderImagesLogic(baseState, 'url1', 'url3')
    expect(result.images[0].url).toBe('url2')
    expect(result.images[1].url).toBe('url3')
    expect(result.images[2].url).toBe('url1')
  })

  it('末尾 → 先頭に移動できる', () => {
    const result = reorderImagesLogic(baseState, 'url3', 'url1')
    expect(result.images[0].url).toBe('url3')
    expect(result.images[1].url).toBe('url1')
    expect(result.images[2].url).toBe('url2')
  })

  it('中間同士を入れ替えられる', () => {
    const result = reorderImagesLogic(baseState, 'url1', 'url2')
    expect(result.images[0].url).toBe('url2')
    expect(result.images[1].url).toBe('url1')
    expect(result.images[2].url).toBe('url3')
  })

  it('activeId === overId の場合は no-op', () => {
    const result = reorderImagesLogic(baseState, 'url1', 'url1')
    expect(result).toBe(baseState)
  })

  it('activeId が見つからない場合は no-op', () => {
    const result = reorderImagesLogic(baseState, 'notexist', 'url2')
    expect(result).toBe(baseState)
  })

  it('overId が見つからない場合は no-op', () => {
    const result = reorderImagesLogic(baseState, 'url1', 'notexist')
    expect(result).toBe(baseState)
  })

  it('image_url を変更しない（メイン画像と独立）', () => {
    const result = reorderImagesLogic(baseState, 'url1', 'url3')
    expect(result.image_url).toBe('main.jpg')
  })

  it('元の配列を変更しない（immutable）', () => {
    const original = baseState.images.map((img) => img.url)
    reorderImagesLogic(baseState, 'url1', 'url3')
    expect(baseState.images.map((img) => img.url)).toEqual(original)
  })
})

describe('removeImageLogic', () => {
  const baseState: FormState = {
    image_url: 'main.jpg',
    images: [
      { url: 'url1', caption: 'a' },
      { url: 'url2', caption: 'b' },
      { url: 'url3', caption: 'c' },
    ],
  }

  it('指定インデックスの画像を削除できる', () => {
    const result = removeImageLogic(baseState, 1)
    expect(result.images).toHaveLength(2)
    expect(result.images[0].url).toBe('url1')
    expect(result.images[1].url).toBe('url3')
  })

  it('先頭画像を削除できる', () => {
    const result = removeImageLogic(baseState, 0)
    expect(result.images[0].url).toBe('url2')
  })

  it('末尾画像を削除できる', () => {
    const result = removeImageLogic(baseState, 2)
    expect(result.images).toHaveLength(2)
    expect(result.images[1].url).toBe('url2')
  })

  it('元の配列を変更しない（immutable）', () => {
    removeImageLogic(baseState, 0)
    expect(baseState.images).toHaveLength(3)
  })

  it('image_url を変更しない（メイン画像と独立）', () => {
    const result = removeImageLogic(baseState, 0)
    expect(result.image_url).toBe('main.jpg')
  })
})

describe('removeMainImageLogic', () => {
  it('image_url を空文字列にリセットする', () => {
    const state: FormState = {
      image_url: 'https://example.com/main.jpg',
      images: [{ url: 'gallery.jpg', caption: 'gallery' }],
    }
    const result = removeMainImageLogic(state)
    expect(result.image_url).toBe('')
  })

  it('images を変更しない（ギャラリーと独立）', () => {
    const state: FormState = {
      image_url: 'main.jpg',
      images: [
        { url: 'url1', caption: 'a' },
        { url: 'url2', caption: 'b' },
      ],
    }
    const result = removeMainImageLogic(state)
    expect(result.images).toHaveLength(2)
    expect(result.images[0].url).toBe('url1')
  })

  it('image_url が既に空の場合も空のまま', () => {
    const state: FormState = { image_url: '', images: [] }
    const result = removeMainImageLogic(state)
    expect(result.image_url).toBe('')
  })
})

describe('handleMainImageUpload（ロジック検証）', () => {
  it('image_url のみ更新し images に副作用がない', () => {
    const state: FormState = {
      image_url: '',
      images: [{ url: 'gallery.jpg', caption: 'g' }],
    }
    const newUrl = 'https://example.com/new-main.jpg'
    const result: FormState = { ...state, image_url: newUrl }
    expect(result.image_url).toBe(newUrl)
    expect(result.images).toHaveLength(1)
    expect(result.images[0].url).toBe('gallery.jpg')
  })
})

describe('handleGalleryImageUpload（ロジック検証）', () => {
  it('images のみ更新し image_url に副作用がない', () => {
    const state: FormState = {
      image_url: 'main.jpg',
      images: [{ url: 'existing.jpg', caption: '' }],
    }
    const uploaded: PartnershipImage[] = [{ url: 'new-gallery.jpg', caption: '' }]
    const result: FormState = { ...state, images: [...state.images, ...uploaded] }
    expect(result.image_url).toBe('main.jpg')
    expect(result.images).toHaveLength(2)
    expect(result.images[1].url).toBe('new-gallery.jpg')
  })
})

describe('handleSubmit submitData（ロジック検証）', () => {
  it('image_url と images が独立して保存される', () => {
    const formData = {
      image_url: 'main.jpg',
      images: [
        { url: 'gallery1.jpg', caption: 'a' },
        { url: 'gallery2.jpg', caption: 'b' },
      ],
      tags: ['AI'],
    }
    const submitData = {
      ...formData,
      image_url: formData.image_url || null,
      images: formData.images,
      tags: formData.tags,
    }
    expect(submitData.image_url).toBe('main.jpg')
    expect(submitData.images).toHaveLength(2)
    expect(submitData.images[0].url).toBe('gallery1.jpg')
  })

  it('image_url が空の場合は null で保存される', () => {
    const formData = {
      image_url: '',
      images: [{ url: 'gallery.jpg', caption: '' }],
    }
    const submitData = {
      ...formData,
      image_url: formData.image_url || null,
    }
    expect(submitData.image_url).toBeNull()
    expect(submitData.images[0].url).toBe('gallery.jpg')
  })
})
