import { test, expect } from '@playwright/test'

test.describe('Job Detail - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('clicking a job card opens modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.locator('article[role="button"]').first().click()

    await expect(page.getByText('Apply Now')).toBeVisible()
    await expect(page.getByText('Back')).toBeVisible()
  })

  test('back button closes modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.locator('article[role="button"]').first().click()
    await expect(page.getByText('Apply Now')).toBeVisible()

    await page.getByText('Back').click()

    await expect(page.getByText('Apply Now')).not.toBeVisible()
    await expect(page.locator('article[role="button"]').first()).toBeVisible()
  })
})
