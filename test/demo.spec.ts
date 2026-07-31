import { test, expect } from '@playwright/test';

test.describe('Demo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'amolsw-components' })).toBeVisible();
  });

  test('shows all component demo sections', async ({ page }) => {
    await expect(page.getByText('SearchInput', { exact: true })).toBeVisible();
    await expect(page.getByText('SingleSelect', { exact: true })).toBeVisible();
    await expect(page.getByText('MultiSelect', { exact: true })).toBeVisible();
    await expect(page.getByText('BackLink', { exact: true })).toBeVisible();
    await expect(page.getByText('DateTimeField', { exact: true })).toBeVisible();
    await expect(page.getByText('DataTable', { exact: true })).toBeVisible();
    await expect(page.getByText('Pagination', { exact: true })).toBeVisible();
    await expect(page.getByText('ToastProvider', { exact: true })).toBeVisible();
    await expect(page.getByText('DateRangeField', { exact: true })).toBeVisible();
    await expect(page.getByText('Back to top', { exact: true })).toBeVisible();
  });

  test('has interactive search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search anything...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('hello');
    await expect(page.getByText('Value: hello')).toBeVisible();
  });

  test('shows pagination controls', async ({ page }) => {
    await expect(page.getByLabel('Go to page 1').first()).toBeVisible();
    await expect(page.getByLabel('Go to next page').first()).toBeVisible();
  });

  test('opens DateRangeField calendar popover', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Select dates' });
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByRole('grid').first()).toBeVisible();
  });

  test('calendar with dropdown caption layout has clickable nav buttons', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const nextButton = calendar.locator('[class*="rdp-button_next"]');
    const prevButton = calendar.locator('[class*="rdp-button_previous"]');

    const dropdowns = calendar.locator('[class*="rdp-dropdowns"]');
    const initialText = await dropdowns.textContent();

    await nextButton.click();
    await expect(dropdowns).not.toHaveText(initialText ?? '');

    await prevButton.click();
    await expect(dropdowns).toHaveText(initialText ?? '');
  });

  test('calendar with dropdown caption layout can select month from dropdown', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const nativeSelects = calendar.locator('select[class*="rdp-dropdown"]');
    const monthSelect = nativeSelects.first();
    const currentMonth = await monthSelect.inputValue();

    const monthOptions = await monthSelect.locator('option').all();
    let otherValue: string | null = null;
    for (const opt of monthOptions) {
      const val = await opt.getAttribute('value');
      if (val !== currentMonth) {
        otherValue = val;
        break;
      }
    }

    if (otherValue) {
      await monthSelect.selectOption(otherValue);
      const selectedMonth = await monthSelect.inputValue();
      expect(selectedMonth).toBe(otherValue);
    }
  });

  test('calendar with dropdown caption layout can select year from dropdown', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const nativeSelects = calendar.locator('select[class*="rdp-dropdown"]');
    const yearSelect = nativeSelects.last();
    const currentYear = await yearSelect.inputValue();

    const yearOptions = await yearSelect.locator('option').all();
    let otherValue: string | null = null;
    for (const opt of yearOptions) {
      const val = await opt.getAttribute('value');
      if (val !== currentYear) {
        otherValue = val;
        break;
      }
    }

    if (otherValue) {
      await yearSelect.selectOption(otherValue);
      const selectedYear = await yearSelect.inputValue();
      expect(selectedYear).toBe(otherValue);
    }
  });

  test('calendar with dropdown caption layout grid updates when month changes', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const grid = calendar.getByRole('grid');
    const initialLabel = await grid.getAttribute('aria-label');

    const nativeSelects = calendar.locator('select[class*="rdp-dropdown"]');
    const monthSelect = nativeSelects.first();

    const monthOptions = await monthSelect.locator('option').all();
    for (const opt of monthOptions) {
      const val = await opt.getAttribute('value');
      if (val !== (await monthSelect.inputValue())) {
        await monthSelect.selectOption(val);
        break;
      }
    }

    await expect(grid).not.toHaveAttribute('aria-label', initialLabel ?? '');
  });

  test('calendar with dropdown caption layout grid updates when year changes', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const grid = calendar.getByRole('grid');
    const initialLabel = await grid.getAttribute('aria-label');

    const nativeSelects = calendar.locator('select[class*="rdp-dropdown"]');
    const yearSelect = nativeSelects.last();

    const yearOptions = await yearSelect.locator('option').all();
    for (const opt of yearOptions) {
      const val = await opt.getAttribute('value');
      if (val !== (await yearSelect.inputValue())) {
        await yearSelect.selectOption(val);
        break;
      }
    }

    await expect(grid).not.toHaveAttribute('aria-label', initialLabel ?? '');
  });

  test('calendar with dropdown caption layout can select month then year then date', async ({ page }) => {
    const calendar = page.getByTestId('calendar-dropdown');
    await expect(calendar).toBeVisible();

    const nativeSelects = calendar.locator('select[class*="rdp-dropdown"]');
    const monthSelect = nativeSelects.first();
    const yearSelect = nativeSelects.last();

    const monthOpts = await monthSelect.locator('option').all();
    const lastMonthVal = await monthOpts[monthOpts.length - 1].getAttribute('value');
    if (lastMonthVal) await monthSelect.selectOption(lastMonthVal);

    const yearOpts = await yearSelect.locator('option').all();
    const lastYearVal = await yearOpts[yearOpts.length - 1].getAttribute('value');
    if (lastYearVal) await yearSelect.selectOption(lastYearVal);

    const grid = calendar.getByRole('grid');
    const dayButtons = grid.getByRole('button');
    const firstEnabled = dayButtons.filter(':not([disabled])').first();
    await firstEnabled.click();

    await expect(firstEnabled).toHaveAttribute('data-selected-single');
  });

  test('shows BackToTop button on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 500 }));
    await expect(page.getByLabel('Back to top').first()).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await expect(page.getByLabel('Back to top').first()).not.toBeVisible();
  });
});
