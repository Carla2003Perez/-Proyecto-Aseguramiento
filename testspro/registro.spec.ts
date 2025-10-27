import { test, expect } from "@playwright/test";

test("Registro de nuevo usuario en Buggy Cars", async ({ page }) => {
  
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });


  await page.click('text=Register');
  await page.waitForSelector("#username", { timeout: 15000 });

  const timestamp = Date.now();
  const username = `Carlap17${timestamp}`;

  //formulario de registro
  await page.fill("#username", username);
  await page.fill("#firstName", "Carla");
  await page.fill('#lastName', 'Perez');
  await page.fill('#password', 'Holapersu22.');
  await page.fill('#confirmPassword', 'Holapersu22.');

  //Enviar formulario
  await page.click('button:has-text("Register")');

  //Esperar resultado (éxito o error)
  const result = page.locator(".result");
  await expect(result).toBeVisible({ timeout: 15000 });

  //Mostrar mensaje real en consola (útil para depurar)
  const mensaje = await result.textContent();
  console.log("Mensaje mostrado:", mensaje?.trim());

  //Validar registro exitoso
  await expect(result).toHaveText("Registration is successful");

 
});