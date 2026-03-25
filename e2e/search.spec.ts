import { test, expect } from '@playwright/test'

test.describe('Search and Results', () => {
  test('loads initial job listings', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('search results')).toBeVisible()
    await expect(page.locator('article[role="button"]').first()).toBeVisible()
  })

  test('searches by keyword and updates title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.getByPlaceholder('Job title, keyword, or company').first().fill('Developer')
    await page.getByRole('button', { name: 'Search' }).first().click()

    await expect(page.getByText('Results for Developer jobs')).toBeVisible()
  })

  test('filters by country', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('article[role="button"]').first()).toBeVisible()

    await page.getByLabel('Filter by country').first().selectOption('United States')
    await page.getByRole('button', { name: 'Search' }).first().click()

    await expect(page.getByText('search results')).toBeVisible()
  })
})
