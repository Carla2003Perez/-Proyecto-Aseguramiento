import { test, expect } from '@playwright/test';

test(' Verificar cambio de contraseña y login con la nueva contraseña', async ({ page }) => {
  const username = 'Renee101761616948370';
  const oldPassword = 'Sur.123ho';
  const newPassword = 'Sur.123nuevo';

  // 1. Iniciar sesión con las credenciales actuales
  await page.goto('https://buggy.justtestit.org/');
  await page.waitForSelector('input[placeholder="Login"]');
  await page.waitForSelector('input[type="password"]');

  await page.locator('input[placeholder="Login"]').fill(username);
  await page.locator('input[type="password"]').fill(oldPassword);
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=Profile')).toBeVisible({ timeout: 5000 });
  console.log(' Login inicial exitoso.');

  // 2. Cambiar contraseña
  await Promise.all([
    page.waitForNavigation({ url: '**/profile', timeout: 10000 }),
    page.click('a[href="/profile"]'),
  ]);

  // Esperar a que se cargue el formulario de perfil
  await page.waitForSelector('#currentPassword', { timeout: 10000 });
  await expect(page.locator('#currentPassword')).toBeVisible();

  await page.locator('#currentPassword').fill(oldPassword);
  await page.locator('#newPassword').fill(newPassword);
  await page.locator('#newPasswordConfirmation').fill(newPassword);
  await page.click('button:has-text("Save")');

  // 3. Verificar mensaje de éxito
  const successMsg = page.locator('.result');
  await expect(successMsg).toHaveText(/The profile has been saved successful/i, { timeout: 5000 });
  console.log('Contraseña cambiada correctamente.');

  // 4. Logout
  await page.click('text=Logout');
  await expect(page.locator('text=Login')).toBeVisible({ timeout: 5000 });
  console.log('Logout exitoso.');

  // 5. Login con nueva contraseña
  await page.waitForSelector('input[placeholder="Login"]');
  await page.waitForSelector('input[type="password"]');
  await page.locator('input[placeholder="Login"]').fill(username);
  await page.locator('input[type="password"]').fill(newPassword);
  await page.click('button:has-text("Login")');

  // 6. Verificar login exitoso con la nueva contraseña
  await expect(page.locator('text=Profile')).toBeVisible({ timeout: 5000 });
  console.log('Login exitoso con la nueva contraseña.');
});
