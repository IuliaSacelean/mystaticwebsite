import { Page, Locator } from '@playwright/test';

export class PlaygroundPage {
  readonly page: Page;
  readonly droidName: Locator;
  readonly droidStatus: Locator;
  readonly updateButton: Locator;
  readonly log: Locator;

  readonly accessCode: Locator;
  readonly consoleResult: Locator;
  readonly openConsole: Locator;
  readonly submitAccess: Locator;

  readonly lightsaber: Locator;
  readonly forceLevel: Locator;
  readonly starship: Locator;
  readonly preview: Locator;

  readonly openE2E: Locator;
  readonly runE2E: Locator;
  readonly e2eResult: Locator;

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
