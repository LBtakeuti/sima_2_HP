import { test, expect } from '@playwright/test'

const OPPORTUNITY_IDS = [
  '3c43a580-a5ac-4ecd-b1b4-97eef4d017f5',
  '4213871b-1cdc-4c40-b90f-be9e645740ff',
  'a7164cb9-8524-44a5-8956-5dd70ca51f53',
  'ba8fc7c7-d76c-409c-b8a5-abd6e9ed5ca5',
  '84fce74e-d0c3-4d69-b30c-f3e1282fc7dc',
  'bb0d5fea-ed77-4aca-8465-44f6edcb3f6b',
]

async function findGalleryOpportunity(page: any) {
  for (const id of OPPORTUNITY_IDS) {
    await page.goto(`/ja/partnership/${id}`)
    if (await page.getByText('ギャラリー').isVisible()) return id
  }
  return null
}

// ---- 静的コード検証（テストデータ不要） ----
// <img> ネイティブタグ + closest 方式に対応した検証

test.describe('S30-STATIC: ImageLightbox.tsx 静的コード検証', () => {
  const LIGHTBOX_PATH = '/Users/keitakeuchi/Desktop/sima_2_HP/components/shared/ImageLightbox.tsx'

  test('data-lightbox-content が <img> / <p> / <button> の 3 箇所以上に定義されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    const matches = src.match(/data-lightbox-content/g)
    expect(matches?.length).toBeGreaterThanOrEqual(3)
  })

  test('ネイティブ <img タグが使われている（next/image の <Image> ではない）', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).toMatch(/<img\s/)
    expect(src).not.toContain("from 'next/image'")
  })

  test('<img> の className に max-h-[80vh] max-w-full object-contain が含まれている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).toContain('max-h-[80vh]')
    expect(src).toContain('max-w-full')
    expect(src).toContain('object-contain')
  })

  test('画像コンテナ div には data-lightbox-content が付与されていない', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).not.toMatch(/<div[^>]*data-lightbox-content/)
  })

  test('closest("[data-lightbox-content]") 判定が維持されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).toContain("closest('[data-lightbox-content]')")
  })

  test('× ボタンに aria-label="Close" が維持されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).toContain('aria-label="Close"')
  })

  test('ESC キーハンドラ（e.key === "Escape"）が維持されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(LIGHTBOX_PATH, 'utf-8')
    expect(src).toContain("e.key === 'Escape'")
  })
})

// ---- 実ブラウザテスト（ギャラリー画像がある案件が必要） ----

test.describe('S30: Lightbox 開閉（実ブラウザ）', () => {
  test('ギャラリー画像クリックで Lightbox が開く', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const carouselImg = page.locator('[role="dialog"] img, button[aria-label] img').first()
    // カルーセル内の画像ボタンをクリック
    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })
  })
})

test.describe('S31: 背景クリックで Lightbox が閉じる（実ブラウザ）', () => {
  test('Lightbox の暗い背景領域クリックで閉じる', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    // 左端の暗い領域（x=10, y=中央）をクリック → 背景クリックになる
    const box = await lightbox.boundingBox()
    if (!box) { test.skip(); return }
    await page.mouse.click(box.x + 10, box.y + box.height / 2)

    await expect(lightbox).not.toBeVisible({ timeout: 3000 })
  })
})

test.describe('S32: 画像本体クリックで Lightbox が閉じない（実ブラウザ）', () => {
  test('Lightbox 内の画像クリックでは閉じない', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    // Lightbox 内の img を直接クリック
    const lightboxImg = lightbox.locator('img').first()
    if (await lightboxImg.isVisible()) {
      await lightboxImg.click()
      // Lightbox が閉じないこと
      await expect(lightbox).toBeVisible({ timeout: 1000 })
    } else {
      test.skip()
    }
  })
})

test.describe('S33: × ボタンクリックで Lightbox が閉じる（実ブラウザ）', () => {
  test('Close ボタンクリックで Lightbox が閉じる', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    const closeBtn = page.getByRole('button', { name: 'Close' })
    await expect(closeBtn).toBeVisible()
    await closeBtn.click()

    await expect(lightbox).not.toBeVisible({ timeout: 3000 })
  })
})

test.describe('S34: ESC キーで Lightbox が閉じる（実ブラウザ）', () => {
  test('ESC キー押下で Lightbox が閉じる', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    await page.keyboard.press('Escape')
    await expect(lightbox).not.toBeVisible({ timeout: 3000 })
  })
})

// S35: モバイルビューポートでの Lightbox 動作
test.describe('S35: モバイルビューポートでの Lightbox 動作（実ブラウザ）', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('モバイルで背景タップにより Lightbox が閉じる', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    // モバイルでも左端の暗い領域をクリック
    const box = await lightbox.boundingBox()
    if (!box) { test.skip(); return }
    await page.mouse.click(box.x + 10, box.y + 20)

    await expect(lightbox).not.toBeVisible({ timeout: 3000 })
  })

  test('モバイルで画像本体タップでは Lightbox が閉じない', async ({ page }) => {
    const id = await findGalleryOpportunity(page)
    if (!id) { test.skip(); return }

    await page.goto(`/ja/partnership/${id}`)
    await page.getByText('ギャラリー').waitFor({ state: 'visible' })

    const imgBtn = page.locator('button').filter({ has: page.locator('img') }).first()
    if (!(await imgBtn.isVisible())) { test.skip(); return }
    await imgBtn.click()

    const lightbox = page.locator('[role="dialog"]')
    await expect(lightbox).toBeVisible({ timeout: 3000 })

    const lightboxImg = lightbox.locator('img').first()
    if (await lightboxImg.isVisible()) {
      await lightboxImg.click()
      await expect(lightbox).toBeVisible({ timeout: 1000 })
    } else {
      test.skip()
    }
  })
})
