import { expect } from '@playwright/test';  
import config from '../playwright.config.js';
export class SignupPage {
   
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        const baseURL = config.use.baseURL || 'https://yourdailyqadose.com/automationPlaywgroundStarwarstheme.html';
      await this.page.goto(baseURL);
    }

    async fillForm({ name, rank, saber }) {
      await this.page.getByLabel('Name').nth(1).fill(name, { delay: 100 });
      await this.page.getByLabel('Rank').selectOption(rank);
      await this.page.getByLabel('Lightsaber Color').selectOption(saber);
    }
  
    async submit() {
      await this.page.getByRole('button', { name: /submit/i }).click();
    }
  
    async expectSuccessMessage() {
    const text = '✅ Registration complete! May the Force be with you.';
      await expect(this.page.getByText(text)).toBeVisible();
    }
  }
  