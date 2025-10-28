import { test, expect } from "@playwright/test";

test("Validar que el botón, esté deshabilitado en la primera página de la sección 'Overall Rating", async ({ page }) => {
  // Navegar al sitio principal
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  // Acceder a la sección 'Overall Rating'
  await page.click('a[href="/overall"] img.img-fluid.center-block');
  await expect(page).toHaveURL(/\/overall/i);

  // Seleccionar el botón con el texto « (anterior)
  const botonAnterior = page.locator('a.btn', { hasText: '«' });

  // Validar que el botón sea visible
  await expect(botonAnterior).toBeVisible();

  // Obtener las clases CSS actuales del botón
  const clases = await botonAnterior.getAttribute("class");
  console.log(`Clases detectadas en el botón «: ${clases}`);

  // Comprobar si el botón está correctamente deshabilitado
  if (clases?.includes("disabled")) {
    console.log("Validación exitosa: el botón « está deshabilitado en la primera página.");
  } else {
    console.log("Error: el botón « no está deshabilitado en la primera página (comportamiento incorrecto).");
  }

  // Aserción final con expect
  expect(clases).toContain("disabled");
});
