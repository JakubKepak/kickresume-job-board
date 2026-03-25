import { test, expect } from '@playwright/test'

test.describe('Job Detail - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('clicking a job card opens modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.locator('article[role="button"]').first().click()

    await expect(page.getByRole('button', { name: 'Apply Now' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible()
  })

  test('back button closes modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.locator('article[role="button"]').first().click()
    await expect(page.getByRole('button', { name: 'Apply Now' })).toBeVisible()

    await page.getByRole('button', { name: 'Back' }).click()

    await expect(page.getByRole('button', { name: 'Apply Now' })).not.toBeVisible()
    await expect(page.locator('article[role="button"]').first()).toBeVisible()
  })
})
