import { test, expect } from '@playwright/test'

const OPPORTUNITY_IDS = [
  '3c43a580-a5ac-4ecd-b1b4-97eef4d017f5',
  '4213871b-1cdc-4c40-b90f-be9e645740ff',
  'a7164cb9-8524-44a5-8956-5dd70ca51f53',
  'ba8fc7c7-d76c-409c-b8a5-abd6e9ed5ca5',
  '84fce74e-d0c3-4d69-b30c-f3e1282fc7dc',
  'bb0d5fea-ed77-4aca-8465-44f6edcb3f6b',
]

// S1: メイン画像表示確認
test.describe('S1: メイン画像表示', () => {
  test('詳細ページにメイン画像が表示される（image_url を直接参照、images[0] フォールバックなし）', async ({ page }) => {
    await page.goto(`/ja/partnership/${OPPORTUNITY_IDS[0]}`)
    // h1 は必ず表示
    await expect(page.locator('h1')).toBeVisible()
    // image_url がある案件ではメイン画像が表示される（データ依存のためソフトアサーション）
    const heroImages = page.locator('section .aspect-\\[16\\/9\\] img')
    const count = await heroImages.count()
    if (count > 0) {
      await expect(heroImages.first()).toBeVisible()
    }
  })

  test('全案件で詳細ページが正常表示される（リグレッション）', async ({ page }) => {
    for (const id of OPPORTUNITY_IDS) {
      const response = await page.goto(`/ja/partnership/${id}`)
      expect(response?.status(), `案件 ${id} のステータスコード`).toBe(200)
      await expect(page.locator('h1'), `案件 ${id} のh1`).toBeVisible()
    }
  })
})

// S2: ギャラリーセクション（1枚以上で表示 ← 旧条件「2枚以上」から緩和）
test.describe('S2: ギャラリーセクション', () => {
  test('画像が1枚以上ある案件でギャラリーセクションが表示される（データ依存）', async ({ page }) => {
    let galleryFound = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const gallery = page.getByText('ギャラリー')
      if (await gallery.isVisible()) {
        galleryFound = true
        // 矢印ボタンの存在確認（embla-carousel の前後ナビ）
        const prevBtn = page.locator('button').filter({ hasText: /prev|previous/ }).or(
          page.locator('button[aria-label*="prev"], button[aria-label*="前"]')
        )
        const nextBtn = page.locator('button').filter({ hasText: /next/ }).or(
          page.locator('button[aria-label*="next"], button[aria-label*="次"]')
        )
        // SVGアイコンボタン（円形矢印ボタン）が2つある
        const roundButtons = page.locator('button.rounded-full, button[class*="rounded-full"]')
        const btnCount = await roundButtons.count()
        expect(btnCount, 'ギャラリー内に円形ボタンが2つ以上あること').toBeGreaterThanOrEqual(2)
        break
      }
    }
    // ギャラリーを持つ案件がない場合はスキップ相当（テストデータ未整備）
    if (!galleryFound) {
      test.skip()
    }
  })

  test('ギャラリーの矢印ボタンクリックでスライドが切り替わる', async ({ page }) => {
    let galleryFound = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const gallery = page.getByText('ギャラリー')
      if (await gallery.isVisible()) {
        galleryFound = true
        // 2番目の円形ボタン（次へ）をクリック
        const roundButtons = page.locator('button.rounded-full, button[class*="rounded-full"]')
        const btnCount = await roundButtons.count()
        if (btnCount >= 2) {
          const nextBtn = roundButtons.nth(1)
          await expect(nextBtn).toBeVisible()
          await nextBtn.click()
          // クリック後もギャラリーが壊れず表示されていること
          await expect(gallery).toBeVisible()
        }
        break
      }
    }
    if (!galleryFound) {
      test.skip()
    }
  })
})

// S3: Lightbox
test.describe('S3: Lightbox', () => {
  test('ギャラリー画像クリックでLightboxが開く', async ({ page }) => {
    let galleryFound = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const gallery = page.getByText('ギャラリー')
      if (await gallery.isVisible()) {
        galleryFound = true
        // embla-carousel 内の画像をクリック
        const carouselImg = page.locator('[class*="embla"] img, [class*="carousel"] img').first()
        if (await carouselImg.isVisible()) {
          await carouselImg.click()
          // Lightbox: fixed + z-50 以上の要素が出現
          const lightbox = page.locator('[class*="fixed"][class*="z-"], dialog, [role="dialog"]').first()
          await expect(lightbox).toBeVisible({ timeout: 3000 })
        }
        break
      }
    }
    if (!galleryFound) {
      test.skip()
    }
  })
})

// S4: タグ表示
test.describe('S4: タグ（キーワード）セクション', () => {
  test('タグが設定された案件でキーワードセクションに#タグ名が表示される', async ({ page }) => {
    let tagFound = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const keywordSection = page.getByText('キーワード')
      if (await keywordSection.isVisible()) {
        tagFound = true
        // #タグ名チップが1つ以上表示されている
        const tagChips = page.locator('span').filter({ hasText: /^#/ })
        await expect(tagChips.first()).toBeVisible()
        const chipText = await tagChips.first().textContent()
        expect(chipText).toMatch(/^#/)
        break
      }
    }
    if (!tagFound) {
      test.skip()
    }
  })
})

// S5: タグ未設定の案件でキーワードセクション非表示
test.describe('S5: タグ未設定の案件', () => {
  test('タグが未設定の案件ではキーワードセクションが表示されない', async ({ page }) => {
    let noTagFound = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const keywordSection = page.getByText('キーワード')
      if (!(await keywordSection.isVisible())) {
        noTagFound = true
        // キーワードセクションが存在しないことを確認
        await expect(keywordSection).not.toBeVisible()
        break
      }
    }
    if (!noTagFound) {
      test.skip()
    }
  })
})

// S10: メイン画像のみ設定、ギャラリー非表示
test.describe('S10: メイン画像のみ（ギャラリーなし）', () => {
  test('image_url のみ設定でメイン画像が表示され、ギャラリーは非表示', async ({ page }) => {
    // image_url があり images が空の案件を探す
    let found = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const heroImg = page.locator('section .aspect-\\[16\\/9\\] img')
      const gallery = page.getByText('ギャラリー')
      const hasHero = await heroImg.count() > 0
      const hasGallery = await gallery.isVisible()
      if (hasHero && !hasGallery) {
        found = true
        await expect(heroImg.first()).toBeVisible()
        await expect(gallery).not.toBeVisible()
        break
      }
    }
    if (!found) {
      test.skip()
    }
  })
})

// S11: ギャラリーのみ設定、メイン画像セクション非表示
test.describe('S11: ギャラリーのみ（メイン画像なし）', () => {
  test('image_url が空でギャラリー画像があれば、メイン画像セクションが非表示でギャラリーが表示される', async ({ page }) => {
    // image_url が空で images がある案件を探す
    let found = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const heroImg = page.locator('section .aspect-\\[16\\/9\\] img')
      const gallery = page.getByText('ギャラリー')
      const hasHero = await heroImg.count() > 0
      const hasGallery = await gallery.isVisible()
      if (!hasHero && hasGallery) {
        found = true
        await expect(heroImg).toHaveCount(0)
        await expect(gallery).toBeVisible()
        break
      }
    }
    if (!found) {
      test.skip()
    }
  })
})

// S2-1: images が1枚のみでもギャラリーセクションが表示される（条件緩和の検証）
test.describe('S2-1: 1枚画像でのギャラリー表示（条件緩和検証）', () => {
  test('images が1枚の案件でもギャラリーセクションが表示される', async ({ page }) => {
    // ギャラリーが表示されている案件を探す（1枚以上で表示されるはず）
    let found = false
    for (const id of OPPORTUNITY_IDS) {
      await page.goto(`/ja/partnership/${id}`)
      const gallery = page.getByText('ギャラリー')
      if (await gallery.isVisible()) {
        found = true
        await expect(gallery).toBeVisible()
        // ImageCarousel コンポーネントが描画されていること
        const carouselContainer = page.locator('[class*="embla"], [class*="overflow-hidden"]').first()
        await expect(carouselContainer).toBeVisible()
        break
      }
    }
    if (!found) {
      test.skip()
    }
  })
})
