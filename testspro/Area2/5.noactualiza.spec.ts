import { test, expect } from '@playwright/test';

test('no permite actualizar datos después de varios intentos', async ({ page }) => {

  // Abrir la página de login
  await page.goto("https://buggy.justtestit.org/");
  await page.fill('input[name="login"]', "Renee101761616948370");
  await page.fill('input[name="password"]', "Sur.123ho");
  await page.click('button[type="submit"]');
  console.log("Sesión iniciada correctamente.");

  // Confirmar login y acceder al perfil
  await page.waitForSelector('a[href="/profile"]', { timeout: 25000 });
  await page.click('a[href="/profile"]');
  await page.waitForSelector('#firstName', { timeout: 20000 });
  console.log("Perfil cargado correctamente.");

  // Definir campos a actualizar
  const campoNombre = page.locator('#firstName');
  const botonGuardar = page.locator('button.btn-success');

  // Intentar actualizar los datos de 3 a 5 veces
  let intentosFallidos = 0;

  for (let i = 1; i <= 5; i++) {
    console.log(`Intento ${i}: intentando actualizar el nombre...`);

    // Cambiar el nombre dinámicamente
    await campoNombre.fill(`Susan_Perez${i}`);
    await botonGuardar.click();

    // Esperar respuesta del sistema
    await page.waitForTimeout(3000);

    // Verificar si la actualización falló
    const botonHabilitado = await botonGuardar.isEnabled();
    const mensajeError = await page.locator('.alert-danger, .alert-warning, .toast-error').textContent().catch(() => null);

    if (!botonHabilitado || (mensajeError && mensajeError.toLowerCase().includes('error'))) {
      intentosFallidos++;
      console.log(`Actualización fallida en el intento ${i}. Mensaje: ${mensajeError || "N/A"}`);
    } else {
      console.log(`Actualización exitosa en el intento ${i}.`);
    }
  }

  // Validar comportamiento del sistema después de múltiples intentos
  if (intentosFallidos >= 3) {
    console.log("El sistema dejó de permitir actualizaciones después de varios intentos.");
  } else {
    console.log("El sistema permitió actualizaciones múltiples sin bloqueo.");
  }

  // Expect formal para la prueba
  expect(intentosFallidos).toBeGreaterThanOrEqual(3);
});
