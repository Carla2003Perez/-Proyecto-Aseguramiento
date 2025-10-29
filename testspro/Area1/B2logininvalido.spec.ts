import { test, expect } from '@playwright/test';

test('Caso B2: Login inválido - mensaje y sin sesión activa', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');

  // Navegar a login si existe el enlace
  if (await page.locator('a[href="/login"]').count() > 0) {
    await page.click('a[href="/login"]');
  }

  // Esperar y llenar usuario (incorrecto o válido para prueba)
  const loginInput = page.locator('input[placeholder="Login"], input[name="login"]');
  await loginInput.waitFor({ state: 'visible', timeout: 5000 });
  await loginInput.fill('Renee101761616948370');

  // Esperar y llenar contraseña incorrecta
  const passwordInput = page.locator('input[placeholder="Password"], input[name="password"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
  await passwordInput.fill('Holamundo/12');

  // Click en login
  await page.click('button:has-text("Login")');

  // Verificar mensaje de error
  const errorMsg = page.locator('.result');
  await expect(errorMsg).toHaveText(/Invalid username\/password/i, { timeout: 5000 });

  // Verificar que no se haya iniciado sesión
  await expect(page.locator('text=Profile')).not.toBeVisible();
  console.log('Login inválido detectado correctamente. No se inició sesión.');
});
