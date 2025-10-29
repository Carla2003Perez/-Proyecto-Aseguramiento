import { test, expect } from "@playwright/test";

test.setTimeout(60000);

test("Editar perfil de usuario en Buggy Cars", async ({ page }) => {
  // Abrir la página principal de Buggy Cars
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1280, height: 800 });
  console.log("Navegación exitosa al sitio principal.");

  // Iniciar sesión con credenciales válidas
  await page.fill('input[name="login"]', "Renee101761616948370");
  await page.fill('input[name="password"]', "Sur.123ho");
  await page.click('button:has-text("Login")');
  console.log(" Inicio de sesión ejecutado correctamente.");

  // Esperar y acceder a la sección de perfil
  await page.waitForSelector('a:has-text("Profile")');
  await page.click('a:has-text("Profile")');
  console.log("Navegación a la sección de perfil completada.");

  // Esperar la carga del formulario de edición
  await page.waitForSelector('input[name="firstName"]');
  console.log("Formulario de edición de perfil cargado correctamente.");

  // Modificar los campos del perfil
  await page.fill('input[name="firstName"]', "Carlos");
  await page.fill('input[name="lastName"]', "Contreras");
  console.log("Campos de nombre y apellido actualizados con nuevos valores.");

  // Guardar los cambios realizados
  await page.click('button:has-text("Save")');
  console.log("Acción de guardar cambios ejecutada.");

  // Verificar el mensaje de confirmación
  const mensaje = page.locator(".result:not(.hidden-md-down)");
  await expect(mensaje).toHaveText(/The profile has been saved/);
  console.log("Validación exitosa: mensaje de confirmación detectado correctamente.");
});
