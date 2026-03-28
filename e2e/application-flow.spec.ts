import { test, expect } from '@playwright/test';

test.describe('Application Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solicitud');
  });

  test('should display application form', async ({ page }) => {
    await expect(page.getByText('Solicitud de Crédito')).toBeVisible();
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
  });

  test('should navigate through form steps', async ({ page }) => {
    // Step 1: Personal Info
    await page.fill('input[name="firstName"]', 'Juan');
    await page.fill('input[name="lastName"]', 'Pérez');
    await page.fill('input[name="idNumber"]', '1234567890');
    await page.fill('input[name="birthDate"]', '1990-01-15');
    await page.selectOption('select[name="gender"]', 'Masculino');
    await page.selectOption('select[name="maritalStatus"]', 'Soltero');
    await page.fill('input[name="mobile"]', '3001234567');
    await page.fill('input[name="email"]', 'juan.perez@example.com');

    // Click Next
    await page.click('button:has-text("Siguiente")');

    // Step 2: Location
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();
    await page.selectOption('select[name="municipality"]', { index: 1 });
    await page.fill('input[name="address"]', 'Calle 123 #45-67');
    await page.selectOption('select[name="housingType"]', 'Propia');

    // Click Next
    await page.click('button:has-text("Siguiente")');

    // Step 3: Credit Request
    await expect(page.getByText('Paso 3 de 6')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to proceed without filling required fields
    await page.click('button:has-text("Siguiente")');

    // Should still be on step 1
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
  });

  test('should validate Colombian mobile format', async ({ page }) => {
    await page.fill('input[name="mobile"]', '2001234567'); // Invalid - doesn't start with 3

    await page.click('button:has-text("Siguiente")');

    // Should show validation error
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
  });

  test('should validate adult age (18+)', async ({ page }) => {
    const today = new Date();
    const year17YearsAgo = today.getFullYear() - 17;
    const invalidDate = `${year17YearsAgo}-01-15`;

    await page.fill('input[name="birthDate"]', invalidDate);
    await page.click('button:has-text("Siguiente")');

    // Should show validation error
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
  });

  test('should allow going back to previous steps', async ({ page }) => {
    // Fill step 1
    await page.fill('input[name="firstName"]', 'Juan');
    await page.fill('input[name="lastName"]', 'Pérez');
    await page.fill('input[name="idNumber"]', '1234567890');
    await page.fill('input[name="birthDate"]', '1990-01-15');
    await page.selectOption('select[name="gender"]', 'Masculino');
    await page.selectOption('select[name="maritalStatus"]', 'Soltero');
    await page.fill('input[name="mobile"]', '3001234567');
    await page.fill('input[name="email"]', 'juan.perez@example.com');

    await page.click('button:has-text("Siguiente")');
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();

    // Go back
    await page.click('button:has-text("Anterior")');
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();

    // Data should be preserved
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Juan');
  });

  test('should display progress indicator', async ({ page }) => {
    // Check progress bar exists
    const progressBar = page.locator('[role="progressbar"], .progress');
    await expect(progressBar).toBeVisible();
  });
});
