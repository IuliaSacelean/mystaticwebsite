// tests/droid-control.spec.ts
import { test, expect } from '@playwright/test';

test('should update droid status and log entry', async ({ page }) => {
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html');

  await page.fill('#droid-name', 'R2-D2');
  await page.selectOption('#status', 'standby');
  await page.click('text=Update Droid');

  const logEntry = await page.locator('#log p').last();
  await expect(logEntry).toContainText('R2-D2 set to status: test');
 // await page.pause();
});
