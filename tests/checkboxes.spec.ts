import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test.describe('Checkboxes Page Tests', () => {
  let checkboxesPage: CheckboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigate();
  });

  test('TC01 - Verify page loads successfully', async () => {
    await checkboxesPage.verifyPageLoaded();
  });

  test('TC02 - Verify exactly 2 checkboxes exist', async () => {
    await checkboxesPage.verifyCheckboxCount(2);
  });

  test('TC03 - Verify default checkbox states', async () => {
    await checkboxesPage.verifyDefaultStates();
  });

  test('TC04 - Check Checkbox 1', async () => {
    await checkboxesPage.checkCheckbox1();

    await expect(
      checkboxesPage.checkbox1
    ).toBeChecked();
  });

  test('TC05 - Uncheck Checkbox 2', async () => {
    await checkboxesPage.uncheckCheckbox2();

    await expect(
      checkboxesPage.checkbox2
    ).not.toBeChecked();
  });

  test('TC06 - Check both checkboxes', async () => {
    await checkboxesPage.checkAll();

    await expect(
      checkboxesPage.checkbox1
    ).toBeChecked();

    await expect(
      checkboxesPage.checkbox2
    ).toBeChecked();
  });

  test('TC07 - Uncheck both checkboxes', async () => {
    await checkboxesPage.uncheckAll();

    await expect(
      checkboxesPage.checkbox1
    ).not.toBeChecked();

    await expect(
      checkboxesPage.checkbox2
    ).not.toBeChecked();
  });

  test('TC08 - Toggle Checkbox 1 multiple times', async () => {
    await checkboxesPage.toggleCheckbox1(5);

    await expect(
      checkboxesPage.checkbox1
    ).toBeChecked();
  });

  test('TC09 - Toggle Checkbox 2 multiple times', async () => {
    await checkboxesPage.toggleCheckbox2(4);

    await expect(
      checkboxesPage.checkbox2
    ).toBeChecked();
  });

  test('TC10 - Verify state resets after page refresh', async ({ page }) => {
    await checkboxesPage.checkCheckbox1();

    await page.reload();

    await expect(
      checkboxesPage.checkbox1
    ).not.toBeChecked();

    await expect(
      checkboxesPage.checkbox2
    ).toBeChecked();
  });

  test('TC11 - Verify checkbox can receive focus', async () => {
    await checkboxesPage.checkbox1.focus();

    await expect(
      checkboxesPage.checkbox1
    ).toBeFocused();
  });

  test('TC12 - Verify keyboard interaction using Space key', async ({ page }) => {
    await checkboxesPage.checkbox1.focus();

    await page.keyboard.press('Space');

    await expect(
      checkboxesPage.checkbox1
    ).toBeChecked();
  });

  test('TC13 - Verify already checked checkbox remains checked', async () => {
    await checkboxesPage.checkbox2.check();

    await expect(
      checkboxesPage.checkbox2
    ).toBeChecked();
  });

  test('TC14 - Verify already unchecked checkbox remains unchecked', async () => {
    await checkboxesPage.checkbox1.uncheck();

    await expect(
      checkboxesPage.checkbox1
    ).not.toBeChecked();
  });

  test('TC15 - Verify invalid locator returns no elements', async ({ page }) => {
    const invalidLocator = page.locator('#checkbox999');

    await expect(
      invalidLocator
    ).toHaveCount(0);
  });

  test('TC16 - Verify only two checkboxes exist', async () => {
    await expect(
      checkboxesPage.checkboxes
    ).toHaveCount(2);
  });

  test('TC17 - Rapid click stability test', async () => {
    for (let i = 0; i < 10; i++) {
      await checkboxesPage.checkbox1.click();
    }

    const finalState =
      await checkboxesPage.checkbox1.isChecked();

    expect(typeof finalState).toBe('boolean');
  });
});