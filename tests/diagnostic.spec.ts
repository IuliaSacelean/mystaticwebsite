// tests/e2e-diagnostic.spec.ts
import { test, expect } from '@playwright/test';

test('should run E2E diagnostics and show success', async ({ page }) => {
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html');

  await page.click('text=Ensures droid systems are synced and operational');
  await page.click('text=Run Test');

  const result = page.locator('#e2eResult');
  await expect(result).toHaveText(/Running diagnostics/);
  await expect(result).toHaveText(/All systems are operational./, { timeout: 3000 });
});
