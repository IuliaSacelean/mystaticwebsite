// tests/console-access.spec.ts
import { test, expect } from '@playwright/test';

test('should grant access with correct code', async ({ page }) => {
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html');
  
  await page.click('text=Launch Command Console');
  await page.fill('#accessCode', 'reb3l');
  await page.click('text=Submit');

  const result = page.locator('#consoleResult');
  await expect(result).toHaveText('Access Granted', { timeout: 3000 });
//  await expect(page).toHaveURL(/.*console/);
});
