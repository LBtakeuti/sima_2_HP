import { test, expect } from '@playwright/test'

const PARTNERSHIP_LIST_URL = '/ja/partnership'

// 既存案件ID（一覧ページから取得済み）
const OPPORTUNITY_IDS = [
  '3c43a580-a5ac-4ecd-b1b4-97eef4d017f5',
  '4213871b-1cdc-4c40-b90f-be9e645740ff',
  'a7164cb9-8524-44a5-8956-5dd70ca51f53',
  'ba8fc7c7-d76c-409c-b8a5-abd6e9ed5ca5',
  '84fce74e-d0c3-4d69-b30c-f3e1282fc7dc',
  'bb0d5fea-ed77-4aca-8465-44f6edcb3f6b',
]

test.describe('スモーク: パートナーシップ一覧・詳細ページ', () => {
  test('一覧ページが200で表示される', async ({ page }) => {
    const response = await page.goto(PARTNERSHIP_LIST_URL)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/ja\/partnership$/)
  })

  test('一覧ページに案件カードが1件以上表示される', async ({ page }) => {
    await page.goto(PARTNERSHIP_LIST_URL)
    const cards = page.locator('a[href*="/ja/partnership/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('詳細ページが200で表示される（最初の案件）', async ({ page }) => {
    const id = OPPORTUNITY_IDS[0]
    const response = await page.goto(`/ja/partnership/${id}`)
    expect(response?.status()).toBe(200)
  })

  test('詳細ページにタイトルと概要セクションが表示される', async ({ page }) => {
    const id = OPPORTUNITY_IDS[0]
    await page.goto(`/ja/partnership/${id}`)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText('概要')).toBeVisible()
  })
})
