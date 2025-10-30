import { test, expect } from "@playwright/test";

test("Validar mensaje de error cuando el comentario excede el límite permitido", async ({ page }) => {

  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });


  await page.fill('input[placeholder="Login"]', "Renee101761616948370");
  await page.fill('input[type="password"]', "Sur.123ho");
  await page.click('button.btn-success');
  await expect(page.locator('a[href="/profile"]')).toBeVisible();


  await page.click('img[title="Lamborghini"]');
  await page.click('text=Veneno');

  
  const comentarioLargo = "Este auto es una verdadera obra maestra de la ingeniería. Su diseñe, la potencia del motor y la sensación de velocidad que transmite hacen que cada segundo al volante sea pura emoción".repeat(1500); 
  await page.fill('#comment', comentarioLargo);


  await page.click('button:has-text("Vote!")');

  const alerta = page.locator('.alert-danger');
  await expect(alerta).toHaveText("comment is too long");

});
