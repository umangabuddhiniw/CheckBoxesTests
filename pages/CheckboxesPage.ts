import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

export class CheckboxesPage {
  readonly page: Page;
  readonly checkboxes: Locator;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkboxes = page.locator(
      '#checkboxes input[type="checkbox"]'
    );

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

  async verifyCheckboxCount(expectedCount: number): Promise<void> {
    await expect(this.checkboxes).toHaveCount(expectedCount);
  }

  async verifyDefaultStates(): Promise<void> {
    await expect(this.checkbox1).not.toBeChecked();
    await expect(this.checkbox2).toBeChecked();
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

  async checkAll(): Promise<void> {
    await this.checkbox1.check();
    await this.checkbox2.check();
  }

  async uncheckAll(): Promise<void> {
    await this.checkbox1.uncheck();
    await this.checkbox2.uncheck();
  }

  async toggleCheckbox1(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.checkbox1.click();
    }
  }

  async toggleCheckbox2(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.checkbox2.click();
    }
  }
}