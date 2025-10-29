import { test, expect } from "@playwright/test";

test("Mostrar mensaje de error cuando las contraseñas no coinciden en el registro", async ({ page }) => {
  
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1280, height: 800 });


  await page.click('a:has-text("Register")');
  await expect(page).toHaveURL(/\/register/i);

  // Completar todos los campos con contraseñas diferentes
  await page.fill("#username", "Charilepers123");
  await page.fill("#firstName", "Carla");
  await page.fill("#lastName", "Perez");
  await page.fill("#password", "Password123!");
  await page.fill("#confirmPassword", "Password321!");

 
  await page.waitForTimeout(1000);

  // Buscar el mensaje de error
  const mensajeError = page.locator("text=Passwords do not match");

 
  if (await mensajeError.isVisible()) {
    console.log("El sistema muestra correctamente el mensaje de error: 'Passwords do not match'.");
  } else {
    console.log(" No se mostró el mensaje de error cuando las contraseñas no coinciden.");
  }

  await expect(mensajeError).toBeVisible();
});
