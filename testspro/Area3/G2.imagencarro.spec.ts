import { test, expect } from "@playwright/test";

test("Verificar la imagen del modelo que se selecciono", async ({ page }) => {
 
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1920, height: 1050 });

  await page.click('img[title="Lamborghini"]');

  await page.click('text=Veneno');

  const imagenModelo = page.locator('a[href="/"] img.img-fluid');
  await expect(imagenModelo).toBeVisible();

  const urlAntes = page.url();

  await imagenModelo.click();

  await page.waitForLoadState("networkidle");
  const urlDespues = page.url();

  // Validar el comportamiento
  if (urlDespues === "https://buggy.justtestit.org/") {
    console.log("  Comportamiento inesperado: el clic en la imagen redirige a la página principal");
  } else if (urlAntes === urlDespues) {
    console.log(" La imagen no mostró ninguna acción visible tras el clic");
  } else {
    console.log(" La imagen respondió correctamente al clic y mantuvo el contexto del modelo");
  }

  await page.waitForTimeout(2000);
});
