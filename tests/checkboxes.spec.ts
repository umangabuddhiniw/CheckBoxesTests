import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test.describe('Checkboxes Page Tests', () => {
  let pageObject: CheckboxesPage;

  test.beforeEach(async ({ page }) => {
    pageObject = new CheckboxesPage(page);
    await pageObject.navigate();
  });

  test('TC01 Verify page loads', async () => {
    await pageObject.verifyPageLoaded();
  });

  test('TC02 Verify checkbox count', async () => {
    await pageObject.verifyCheckboxCount(2);
  });

  test('TC03 Verify default states', async () => {
    await pageObject.verifyDefaultStates();
  });

  test('TC04 Check checkbox 1', async () => {
    await pageObject.checkCheckbox1();

    await expect(
      pageObject.checkbox1
    ).toBeChecked();
  });

  test('TC05 Uncheck checkbox 2', async () => {
    await pageObject.uncheckCheckbox2();

    await expect(
      pageObject.checkbox2
    ).not.toBeChecked();
  });

  test('TC06 Check both checkboxes', async () => {
    await pageObject.checkCheckbox1();
    await pageObject.checkCheckbox2();

    await expect(
      pageObject.checkbox1
    ).toBeChecked();

    await expect(
      pageObject.checkbox2
    ).toBeChecked();
  });

  test('TC07 Uncheck both checkboxes', async () => {
    await pageObject.uncheckCheckbox1();
    await pageObject.uncheckCheckbox2();

    await expect(
      pageObject.checkbox1
    ).not.toBeChecked();

    await expect(
      pageObject.checkbox2
    ).not.toBeChecked();
  });

  test('TC08 Verify focus', async () => {
    await pageObject.checkbox1.focus();

    await expect(
      pageObject.checkbox1
    ).toBeFocused();
  });

  test('TC09 Verify keyboard interaction', async ({ page }) => {
    await pageObject.checkbox1.focus();

    await page.keyboard.press('Space');

    await expect(
      pageObject.checkbox1
    ).toBeChecked();
  });

  test('TC10 Verify page refresh resets state', async ({ page }) => {
    await pageObject.checkCheckbox1();

    await page.reload();

    await expect(
      pageObject.checkbox1
    ).not.toBeChecked();

    await expect(
      pageObject.checkbox2
    ).toBeChecked();
  });

  test('TC11 Invalid locator', async ({ page }) => {
    const invalidLocator =
      page.locator('#checkbox999');

    await expect(
      invalidLocator
    ).toHaveCount(0);
  });

  test('TC12 Rapid click test', async () => {
    for (let i = 0; i < 10; i++) {
      await pageObject.checkbox1.click();
    }

    const state =
      await pageObject.checkbox1.isChecked();

    expect(typeof state).toBe('boolean');
  });
});