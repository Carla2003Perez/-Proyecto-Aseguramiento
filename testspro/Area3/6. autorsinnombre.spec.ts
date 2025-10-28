import { test, expect } from "@playwright/test";

test("Validar que el usuario tenga nombre configurado antes de comentar", async ({ page }) => {
  //  Abrir el sitio
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  //  Iniciar sesión con usuario sin nombre configurado
  await page.fill('input[placeholder="Login"]', "Renee101761616948370");
  await page.fill('input[type="password"]', "Sur.123ho");
  await page.click('button.btn-success');
  await expect(page.locator('a[href="/profile"]')).toBeVisible();

  //  Ir a Lamborghini → Diablo
  await page.click('img[title="Pagani"]');
  await page.click('text=Zonda');

  //  Agregar comentario
  const comentario = ` Probando el campo vacio de autor`;
  await page.fill('#comment', comentario);
  await page.click('button:has-text("Vote!")');
  await page.waitForLoadState("networkidle");

  //  Validar que el comentario se haya publicado
  const comentarioTabla = page.locator('table tr').last();
  await expect(comentarioTabla).toBeVisible();

  //  Obtener los valores de la fila
  const columnas = comentarioTabla.locator('td');
  const autor = await columnas.nth(1).textContent(); // Columna Author
  const comentarioTexto = await columnas.nth(2).textContent(); // Columna Comment

  console.log("Autor:", autor?.trim());
  console.log("Comentario:", comentarioTexto?.trim());

  
  if (!autor?.trim()) {
    console.warn(" Ahí te voy san Pedroooooooo!!");
  }

  //  Marcar como fallo si el autor está vacío
  expect(autor?.trim()?.length).toBeGreaterThan(0);
});