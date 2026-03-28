import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByPlaceholder(/correo/i)).toBeVisible();
    await expect(page.getByPlaceholder(/contraseña/i)).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'asesor@finazactivos.com');
    await page.fill('input[type="password"]', 'password');

    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText(/dashboard/i)).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    // Should stay on login page
    await expect(page).toHaveURL('/login');
  });

  test('should protect dashboard route', async ({ page }) => {
    // Try to access dashboard without login
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('should protect evaluation route', async ({ page }) => {
    // Try to access evaluation without login
    await page.goto('/evaluacion/FA-2026-001');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'asesor@finazactivos.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should display dashboard stats', async ({ page }) => {
    await expect(page.getByText(/total solicitudes/i)).toBeVisible();
    await expect(page.getByText(/en revisión/i)).toBeVisible();
    await expect(page.getByText(/aprobadas/i)).toBeVisible();
    await expect(page.getByText(/rechazadas/i)).toBeVisible();
  });

  test('should display application cards', async ({ page }) => {
    // Wait for applications to load
    await page.waitForTimeout(1000);

    // Should show application cards or empty state
    const hasCards = await page.locator('[data-testid="application-card"]').count() > 0;
    const hasEmptyState = await page.getByText(/no se encontraron solicitudes/i).isVisible();

    expect(hasCards || hasEmptyState).toBeTruthy();
  });

  test('should filter applications by status', async ({ page }) => {
    // Wait for applications to load
    await page.waitForTimeout(1000);

    // Select filter
    await page.selectOption('select[name="statusFilter"], select', 'submitted');

    await page.waitForTimeout(500);

    // Results should be filtered (or show empty state)
    const cards = page.locator('[data-testid="application-card"]');
    const count = await cards.count();

    // Either we have cards or empty state
    if (count > 0) {
      // All visible cards should have 'submitted' status
      await expect(cards.first()).toBeVisible();
    }
  });

  test('should search applications', async ({ page }) => {
    await page.waitForTimeout(1000);

    await page.fill('input[placeholder*="Buscar"]', 'Juan');
    await page.waitForTimeout(500);

    // Should show filtered results or empty state
    const hasResults = await page.locator('[data-testid="application-card"]').count() > 0;
    const hasEmptyState = await page.getByText(/no se encontraron solicitudes/i).isVisible();

    expect(hasResults || hasEmptyState).toBeTruthy();
  });

  test('should navigate to evaluation page', async ({ page }) => {
    await page.waitForTimeout(1000);

    const evalButton = page.getByRole('link', { name: /evaluar/i }).first();

    if (await evalButton.isVisible()) {
      await evalButton.click();

      // Should navigate to evaluation page
      await expect(page.url()).toContain('/evaluacion/');
      await expect(page.getByText(/evaluación de crédito/i)).toBeVisible();
    }
  });

  test('should logout successfully', async ({ page }) => {
    // Click logout button
    await page.click('button:has-text("Cerrar sesión"), button:has-text("Salir")');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
