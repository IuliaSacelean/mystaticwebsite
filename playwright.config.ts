import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
  retries: 0,
  use: {
    baseURL: 'https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
    // Configure the reporter to generate Allure results
    // ...
    reporter: [
      ["line"],
      [
        "allure-playwright",
        {
          resultsDir: "allure-results",
        },
      ],
    ],
  });




