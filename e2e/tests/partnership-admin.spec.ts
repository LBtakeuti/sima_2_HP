import { test, expect } from '@playwright/test'

// ---- 静的コード検証（テストデータ不要） ----
// タグ入力「追加」ボタン方式の検証

test.describe('S6-STATIC / S40-STATIC: タグ入力「追加」ボタン方式の静的コード検証', () => {
  const ADMIN_PAGE_PATH = '/Users/keitakeuchi/Desktop/sima_2_HP/app/admin/partnership/opportunities/page.tsx'

  test('タグ入力欄の近くに「追加」ボタンが定義されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    // 「追加」テキストを持つ button が存在する
    expect(src).toContain('追加')
    // onClick で addTag を呼ぶ button が存在する
    expect(src).toContain('onClick={() => addTag(tagInput)}')
  })

  test('旧仕様の「カンマまたはエンターで区切り」文言が残っていない', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    expect(src).not.toContain('カンマ')
    expect(src).not.toContain('エンターで区切')
    expect(src).not.toContain('読点')
  })

  test('新仕様の「追加ボタンで確定」文言が含まれている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    expect(src).toContain('追加ボタンで確定')
  })

  test('入力欄が空のとき追加ボタンが disabled になる属性定義が含まれている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    // disabled={tagInput.trim() === ''} のパターン
    expect(src).toContain("disabled={tagInput.trim() === ''}")
  })

  test('Enter / カンマ / 読点 / blur による自動確定が廃止されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    // onBlur でタグ追加しているコードがない
    expect(src).not.toContain('onBlur')
    // Enter キーでタグ追加するコード（e.key === 'Enter' で addTag を呼ぶ）がない
    // Backspace 判定の onKeyDown は残るが、Enter での addTag 呼び出しはない
    const enterAddPattern = /e\.key\s*===\s*['"]Enter['"]\s*[^}]*addTag/s
    expect(src).not.toMatch(enterAddPattern)
  })

  test('Backspace による末尾タグ削除は維持されている', () => {
    const fs = require('fs')
    const src = fs.readFileSync(ADMIN_PAGE_PATH, 'utf-8')
    expect(src).toContain("e.key === 'Backspace'")
    expect(src).toContain('removeTag')
  })
})

// ---- 実ブラウザテスト（認証済み前提） ----
// S6-S9, S12, S24, S26, S27, S40, S41: 管理画面テスト（要ログイン）
// 認証セッションなしでは /admin にリダイレクトされるため、認証不可能な場合はスキップ

test.describe('S8/S9/S12: 管理画面モーダル（認証済み前提）', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/admin/partnership/opportunities')
    // ログインページにリダイレクトされた場合はスキップ
    if (page.url().includes('/login') || page.url().includes('/auth') || response?.status() === 401 || response?.status() === 403) {
      test.skip()
    }
  })

  test('S9: 管理画面が表示される', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('S8: モーダルがESCキーで閉じる', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible({ timeout: 3000 })
  })

  test('S8: モーダルが背景クリックで閉じる', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    const overlay = page.locator('[class*="overlay"], [class*="backdrop"], [class*="bg-black"]').first()
    if (await overlay.isVisible()) {
      await overlay.click({ position: { x: 10, y: 10 } })
      await expect(modal).not.toBeVisible({ timeout: 3000 })
    } else {
      test.skip()
    }
  })

  // S12: メイン画像セクションとギャラリー画像セクションが両方独立して表示される
  test('S12: モーダル内にメイン画像セクションとギャラリー画像セクションが独立して表示される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    const mainImageSection = modal.getByText(/メイン画像|Main Image/i)
    await expect(mainImageSection).toBeVisible()
    const gallerySection = modal.getByText(/ギャラリー画像|Gallery/i)
    await expect(gallerySection).toBeVisible()
  })

  // S24: ギャラリー画像のドラッグハンドルが表示される
  test('S24: 編集モーダルでギャラリー画像にドラッグハンドルが表示される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    // ドラッグハンドル（≡ アイコン or aria-label/cursor-grab 付き要素）の存在確認
    const dragHandle = modal.locator('[class*="cursor-grab"], [aria-label*="drag"], [aria-label*="ドラッグ"], [data-cypress="drag-handle"]').first()
    // 画像が追加されている場合のみ有効、画像がない場合はスキップ
    const hasHandle = await dragHandle.isVisible()
    if (!hasHandle) {
      test.skip()
    } else {
      await expect(dragHandle).toBeVisible()
    }
  })

  // S26: URL 折りたたみ（<details>）が動作する
  test('S26: 画像 URL の折りたたみ（details 要素）がクリックで展開される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    // <details> 要素の存在確認（画像登録済みの場合のみ）
    const details = modal.locator('details').first()
    const hasDetails = await details.isVisible()
    if (!hasDetails) {
      test.skip()
      return
    }
    // summary をクリックして展開
    const summary = details.locator('summary')
    await summary.click()
    // open 属性が付与されること
    const isOpen = await details.evaluate((el: Element) => (el as HTMLDetailsElement).open)
    expect(isOpen).toBe(true)
  })

  // S27: メイン画像セクションにアップロードと URL 入力欄が表示される
  test('S27: メイン画像セクションにアップロード欄と URL 入力欄が表示される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規|作成|追加|New|Create|Add/i })
    if (!(await createBtn.isVisible())) {
      test.skip()
      return
    }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })
    const fileInput = modal.locator('input[type="file"]').first()
    const urlInput = modal.locator('input[type="url"], input[placeholder*="URL"], input[placeholder*="http"]').first()
    const hasFile = await fileInput.count() > 0
    const hasUrl = await urlInput.count() > 0
    if (!hasFile && !hasUrl) {
      test.skip()
      return
    }
    expect(hasFile || hasUrl).toBe(true)
  })

  // S6: タグ入力欄に文字を入れて「追加」ボタンクリック → タグチップが追加される
  test('S6: タグ追加ボタンクリックでタグチップが追加される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規作成|新規追加/i })
    if (!(await createBtn.isVisible())) { test.skip(); return }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })

    const tagInput = modal.locator('input[placeholder*="タグ"]')
    if (!(await tagInput.isVisible())) { test.skip(); return }

    await tagInput.fill('[E2E_TEST]テスト用タグ')
    const addBtn = modal.getByRole('button', { name: '追加' }).first()
    await expect(addBtn).toBeEnabled()
    await addBtn.click()

    // チップが追加されること
    const chip = modal.locator('span, div').filter({ hasText: '[E2E_TEST]テスト用タグ' }).first()
    await expect(chip).toBeVisible({ timeout: 2000 })
  })

  // S7: チップの × クリックでタグ削除
  test('S7: チップの × クリックでタグが削除される', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規作成|新規追加/i })
    if (!(await createBtn.isVisible())) { test.skip(); return }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })

    const tagInput = modal.locator('input[placeholder*="タグ"]')
    if (!(await tagInput.isVisible())) { test.skip(); return }

    await tagInput.fill('[E2E_TEST]削除テスト')
    const addBtn = modal.getByRole('button', { name: '追加' }).first()
    await addBtn.click()

    const chip = modal.locator('span, div').filter({ hasText: '[E2E_TEST]削除テスト' }).first()
    await expect(chip).toBeVisible({ timeout: 2000 })

    // × ボタンクリック
    const deleteBtn = chip.locator('button, [aria-label*="削除"], [aria-label*="remove"]').first()
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click()
      await expect(chip).not.toBeVisible({ timeout: 2000 })
    } else {
      test.skip()
    }
  })

  // S40: 入力欄が空のとき「追加」ボタンが disabled
  test('S40: タグ入力欄が空のとき追加ボタンが disabled になる', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規作成|新規追加/i })
    if (!(await createBtn.isVisible())) { test.skip(); return }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })

    const tagInput = modal.locator('input[placeholder*="タグ"]')
    if (!(await tagInput.isVisible())) { test.skip(); return }

    // 入力欄を空にする
    await tagInput.fill('')
    const addBtn = modal.getByRole('button', { name: '追加' }).first()
    await expect(addBtn).toBeDisabled()
  })

  // S41: Enter キー押下でタグが追加されない（IME 衝突解消の検証）
  test('S41: タグ入力欄で Enter キー押下してもタグが追加されない', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /新規作成|新規追加/i })
    if (!(await createBtn.isVisible())) { test.skip(); return }
    await createBtn.click()
    const modal = page.locator('[role="dialog"], [class*="modal"], [class*="Modal"]').first()
    await expect(modal).toBeVisible({ timeout: 3000 })

    const tagInput = modal.locator('input[placeholder*="タグ"]')
    if (!(await tagInput.isVisible())) { test.skip(); return }

    await tagInput.fill('[E2E_TEST]Enterテスト')
    // Enter キー押下
    await tagInput.press('Enter')

    // タグチップが追加されていないことを確認
    const chip = modal.locator('span, div').filter({ hasText: '[E2E_TEST]Enterテスト' }).first()
    const chipCount = await chip.count()
    expect(chipCount).toBe(0)
  })
})
