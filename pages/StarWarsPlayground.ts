import { Page, Locator } from '@playwright/test';

export class PlaygroundPage {
  private page: Page;
  readonly droidName: Locator;


  
  constructor(page: Page) {
    this.page = page;
    this.droidName = page.locator('#droid-name');
    this.droidStatus = page.locator('#status');
    this.updateButton = page.locator('text=Update Droid');
    this.log = page.locator('#log');

    this.accessCode = page.locator('#accessCode');
    this.consoleResult = page.locator('#consoleResult');
    this.openConsole = page.locator('text=Launch Command Console');
    this.submitAccess = page.locator('text=Submit');

    this.lightsaber = page.locator('#lightsaber');
    this.forceLevel = page.locator('#forceLevel');
    this.starship = page.locator('#starship');
    this.preview = page.locator('#preview');

    this.openE2E = page.locator('text=Initiate E2E Diagnostic');
    this.runE2E = page.locator('text=Run Test');
    this.e2eResult = page.locator('#e2eResult');
  }

  async goto() {
    await this.page.goto('/');
  }
}
