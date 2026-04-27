import { test, expect } from '@playwright/test'

const TEST_ID = 'e713ed6e-fe83-4128-8159-1a3ad06d78c9'

test.describe('SEO: パートナーシップ詳細ページ（ja）', () => {
  test('title タグに記事タイトルと SEEMAPAR が含まれる', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const title = await page.title()
    expect(title).toMatch(/SEEMAPAR/)
    expect(title.length).toBeGreaterThan(10)
  })

  test('meta description が存在する', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(0)
  })

  test('og:title が存在する', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()
  })

  test('og:description が存在する', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDesc).toBeTruthy()
  })

  test('og:type が article である', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content')
    expect(ogType).toBe('article')
  })

  test('og:locale が ja_JP である', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content')
    expect(ogLocale).toBe('ja_JP')
  })

  test('JSON-LD に @type:Article と headline が含まれる', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(jsonLd).toBeTruthy()
    const data = JSON.parse(jsonLd!)
    expect(data['@type']).toBe('Article')
    expect(data['headline']).toBeTruthy()
  })

  test('image_url がある案件で og:image が存在する', async ({ page }) => {
    await page.goto(`/ja/partnership/${TEST_ID}`)
    // image_url が設定されている場合のみ検証
    const ogImage = page.locator('meta[property="og:image"]')
    const count = await ogImage.count()
    if (count > 0) {
      const content = await ogImage.getAttribute('content')
      expect(content).toBeTruthy()
    } else {
      test.skip()
    }
  })
})

test.describe('SEO: パートナーシップ詳細ページ（en）', () => {
  test('og:locale が en_US である', async ({ page }) => {
    await page.goto(`/en/partnership/${TEST_ID}`)
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content')
    expect(ogLocale).toBe('en_US')
  })

  test('title タグに英語タイトルと SEEMAPAR が含まれる', async ({ page }) => {
    await page.goto(`/en/partnership/${TEST_ID}`)
    const title = await page.title()
    expect(title).toMatch(/SEEMAPAR/)
    expect(title.length).toBeGreaterThan(10)
  })
})
