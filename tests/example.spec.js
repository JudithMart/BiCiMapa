// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("login usuario", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill('input[type="email"]', 'aguijudithmartinezgutierrez@gmail.com');
  await page.fill('input[type="password"]', 'Chuchin_1');

  await page.click('text=Iniciar sesión');

  await expect(page).toHaveURL(/mapa/);
});