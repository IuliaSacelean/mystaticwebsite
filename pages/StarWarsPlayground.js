import { expect } from '@playwright/test';

export class StarWarsPlayground {

    constructor(page) {
        this.page = page;
    }

   
    fillDetails = async () => {
        const droidName = this.page.locator('#droid-name');
        const statusSelect = this.page.locator('#status');
        const updateButton = this.page.locator('text=Update Droid');
        const log = this.page.locator('#log');
        const droidStatus = this.page.locator('#droid-status');
        const droidStatusText = this.page.locator('#droid-status-text');
        const logEntry = this.page.locator('#log p').last();
        await this.page.fill('#droid-name', 'R2-D2');
        await this.page.selectOption('#status', 'standby');
        await this.page.click('text=Update Droid');
        await expect(logEntry).toContainText('status: standby');
  }
}
