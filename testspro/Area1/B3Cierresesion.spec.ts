import { test, expect } from '@playwright/test';

test('Logout exitoso y redirección correcta', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');

  // Ir a login si existe el enlace
  if (await page.locator('a[href="/login"]').count() > 0) {
    await page.click('a[href="/login"]');
  }

  // Llenar usuario y contraseña
  const loginInput = page.locator('input[placeholder="Login"], input[name="login"]');
  await loginInput.waitFor({ state: 'visible', timeout: 5000 });
  await loginInput.fill('Renee101761616948370');

  const passwordInput = page.locator('input[placeholder="Password"], input[name="password"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
  await passwordInput.fill('Sur.123ho');

  // Login
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=Profile')).toBeVisible({ timeout: 5000 });

  // Logout: buscar por texto visible
  const logoutButton = page.locator('text=Logout');
  await logoutButton.waitFor({ state: 'visible', timeout: 5000 });
  await logoutButton.click();

  // Verificar redirección a login
  await expect(page.locator('a[href="/login"]')).toBeVisible({ timeout: 5000 });
  console.log('Logout realizado y redirigido correctamente a la pantalla de login.');
});
