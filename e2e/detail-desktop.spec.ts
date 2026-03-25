import { test, expect } from '@playwright/test'

test.describe('Job Detail - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('clicking a job card shows detail panel', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    const firstCard = page.locator('article[role="button"]').first()
    const jobTitle = await firstCard.locator('h3').first().textContent()
    await firstCard.click()

    await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible()
    await expect(page.getByText(jobTitle!).last()).toBeVisible()
  })

  test('selected card has coral border', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    const firstCard = page.locator('article[role="button"]').first()
    await firstCard.click()

    await expect(firstCard).toHaveClass(/border-coral/)
  })
})
