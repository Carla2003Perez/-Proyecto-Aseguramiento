import { test, expect } from "@playwright/test";

test("límite de paginación en la sección 'Overall Rating'", async ({ page }) => {

  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  // Acceder a la sección 'Overall Rating' desde la imagen principal
  await page.click('a[href="/overall"] img.img-fluid.center-block');

  // Verificar que la URL corresponda a la sección esperada
  await expect(page).toHaveURL(/\/overall/i);

  // Localizador del botón 'siguiente' en la paginación
  const botonSiguiente = page.locator('a.btn', { hasText: '»' });

  // Localizador del texto que indica la página actual
  const textoPagina = page.locator('text=/page \\d+ of \\d+/i');

  // Simular múltiples clics para intentar sobrepasar el número máximo de páginas
  for (let i = 0; i < 7; i++) {
    await botonSiguiente.click();
    await page.waitForTimeout(700);
  }

  // Capturar el texto de paginación mostrado (por ejemplo: "page 5 of 5")
  const textoActual = await textoPagina.textContent();
  console.log(`📘 Estado actual de la paginación: ${textoActual}`);

  // Extraer los valores numéricos de la página actual y el total permitido
  const match = textoActual?.match(/page (\d+) of (\d+)/i);
  const paginaActual = match ? parseInt(match[1], 10) : NaN;
  const paginaMaxima = match ? parseInt(match[2], 10) : 5;

  // Evaluar si el sistema permite avanzar más allá del límite establecido
  if (paginaActual > paginaMaxima) {
    console.log(`Comportamiento incorrecto: la paginación avanzó hasta la página ${paginaActual}, superando el máximo permitido (${paginaMaxima}).`);
  } else {
    console.log(`Comportamiento correcto: la navegación se detuvo en la página ${paginaActual} dentro del límite (${paginaMaxima}).`);
  }

  // Validar con Playwright que el número de página no exceda el máximo
  expect(paginaActual).toBeLessThanOrEqual(paginaMaxima);
});
