import { test, expect } from '@playwright/test';

test.describe('Pruebas de Login y Logout - Buggy Cars Rating', () => {

  test('Caso B1: Login válido y acceso exitoso', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/');

    // Si existe link a login, hacer click
    if (await page.locator('a[href="/login"]').count() > 0) {
      await page.click('a[href="/login"]');
    }

    // Esperar y llenar usuario
    const loginInput = page.locator('input[placeholder="Login"], input[name="login"]');
    await loginInput.waitFor({ state: 'visible', timeout: 5000 });
    await loginInput.fill('Renee101761616948370');

    // Esperar y llenar contraseña
    const passwordInput = page.locator('input[placeholder="Password"], input[name="password"]');
    await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await passwordInput.fill('Sur.123ho');

    // Click en login
    await page.click('button:has-text("Login")');

    // Verificar acceso al área privada
    await expect(page.locator('text=Profile')).toBeVisible({ timeout: 5000 });
    console.log('Login exitoso y acceso al área privada confirmado.');
  });

});
