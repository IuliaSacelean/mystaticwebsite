// tests/droid-control.spec.ts
import { test, expect } from '@playwright/test';
import { StarWarsPlayground } from '../pages/StarWarsPlayground';



test('should update droid status and log entry', async ({ page }) => {
  const starWarsPlayground = new StarWarsPlayground(page);
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html');
  await starWarsPlayground.fillDetails()
  
 await page.pause();
});


