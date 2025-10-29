import { test, expect } from "@playwright/test";

test("Verificar que el botón 'Register' se habilite al completar todos los campos del formulario", async ({ page }) => {
 
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1280, height: 800 });

  
  await page.click('a:has-text("Register")');
  await expect(page).toHaveURL(/\/register/i);

  // Localizar el botón de registro
  const botonRegister = page.locator('button:has-text("Register")');

  // Confirmar que el botón esté inicialmente deshabilitado
  await expect(botonRegister).toBeDisabled();
  console.log("El botón 'Register' está deshabilitado al cargar el formulario.");

 
  await page.fill("#username", "Charilepers123");
  await page.fill("#firstName", "Carla");
  await page.fill("#lastName", "Perez");
  await page.fill("#password", "Password123!");
  await page.fill("#confirmPassword", "Password123!");

  // Esperar un momento para que se actualice el estado del botón
  await page.waitForTimeout(1000);

  // Verificar que el botón se habilite
  const estadoBoton = await botonRegister.isEnabled();
  if (estadoBoton) {
    console.log("El botón 'Register' se habilitó correctamente después de completar todos los campos.");
  } else {
    console.log("El botón 'Register' sigue deshabilitado aunque se completaron todos los campos.");
  }


  await expect(botonRegister).toBeEnabled();
});
