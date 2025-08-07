// tests/jedi-enhancements.spec.ts
import { test, expect } from '@playwright/test';

test('should update preview with Jedi settings', async ({ page }) => {
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html');

  await page.check('#lightsaber');
  await page.fill('#forceLevel', '85');
  await page.selectOption('#starship', 'X-Wing');

  const preview = page.locator('#preview');
  await expect(preview).toContainText('Lightsaber: 🟢 On');
  await expect(preview).toContainText('Force Sensitivity: 85%');
  await expect(preview).toContainText('Assigned Starship: X-Wing');
});
