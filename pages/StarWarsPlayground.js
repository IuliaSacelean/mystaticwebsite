
export class StarWarsPlayground {

    constructor(page) {
        this.page = page;
    }

    droidName = this.page.locator('#droid-name');
    statusSelect = this.page.locator('#status');
    updateButton = this.page.locator('text=Update Droid');
    log = this.page.locator('#log');
    droidStatus = this.page.locator('#droid-status');
    droidStatusText = this.page.locator('#droid-status-text');


fillDetails = async () => {
    await this.droidName.waitFor()
    await this.droidName.fill('R2-D2');
    await this.page.goto('/');
  }
}
