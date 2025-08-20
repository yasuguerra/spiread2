import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home page loads and shows training tab trigger', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/Spiread/i);
    const trainingNav = page.locator('[data-testid="training"]');
    await expect(trainingNav).toBeVisible();
  });
});
