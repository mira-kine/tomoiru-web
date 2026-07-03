import { test, expect } from '@playwright/test';

// Unauthenticated smoke tests: verify the public pages render.
// These run against a production build (see webServer in playwright.config.ts)
// with no backend, so they must not depend on API responses.

test('landing page renders title and entry links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tomoiru', { exact: true })).toBeVisible();
  await expect(page.getByText('Travel to Japan with a friend')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Enter' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Demo', exact: true })).toBeVisible();
});

test('login page renders sign-in form and demo entry', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try Demo' })).toBeVisible();
});

test('login page can switch to sign-up view', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign Up', exact: true }).click();
  await expect(page.getByText('Glad you')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign up with Google' })).toBeVisible();
});
