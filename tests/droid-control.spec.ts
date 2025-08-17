// tests/droid-control.spec.ts
import { test, expect } from '@playwright/test';
import { StarWarsPlayground } from '../pages/StarWarsPlayground';
import { defineConfig } from '@playwright/test';


test('load the playground', async ({ page }) => {
  await page.goto('https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html'); 
});

test('should update droid status and log entry', async ({ page }) => {
  const starWarsPlayground = new StarWarsPlayground(page);
  await starWarsPlayground.fillDetails()
  
// await page.pause();
});


