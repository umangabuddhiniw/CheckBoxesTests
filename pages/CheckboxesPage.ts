import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

export class CheckboxesPage {
  readonly page: Page;
  readonly checkboxes: Locator;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkboxes =
      page.locator('#checkboxes input[type="checkbox"]');

    this.checkbox1 = this.checkboxes.nth(0);
    this.checkbox2 = this.checkboxes.nth(1);
  }

  async navigate(): Promise<void> {
    await this.page.goto(URLS.CHECKBOXES);
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(URLS.CHECKBOXES);

    await expect(
      this.page.getByRole('heading', {
        name: 'Checkboxes'
      })
    ).toBeVisible();
  }

  async verifyDefaultStates(): Promise<void> {
    await expect(this.checkbox1).not.toBeChecked();
    await expect(this.checkbox2).toBeChecked();
  }

  async verifyCheckboxCount(count: number): Promise<void> {
    await expect(this.checkboxes).toHaveCount(count);
  }

  async checkCheckbox1(): Promise<void> {
    await this.checkbox1.check();
  }

  async uncheckCheckbox1(): Promise<void> {
    await this.checkbox1.uncheck();
  }

  async checkCheckbox2(): Promise<void> {
    await this.checkbox2.check();
  }

  async uncheckCheckbox2(): Promise<void> {
    await this.checkbox2.uncheck();
  }
}