import { test, expect } from "@playwright/test";

test("Votar por el modelo Zonda", async ({ page }) => {
 
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  //credenciales
  await page.waitForSelector('input[placeholder="Login"]', { timeout: 15000 });
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });

  await page.fill('input[placeholder="Login"]', "Renee101761616948370"); 
  await page.fill('input[type="password"]', "Sur.123ho");               


  await page.click('button.btn-success');

  //  Verificar login exitoso
  await expect(page.locator('a[href="/profile"]')).toBeVisible({ timeout: 10000 }); 

  await page.click('img[title="Lamborghini"]');
  await page.click('text=Veneno');


  //  Escribir el comentario 
  await page.waitForSelector('#comment', { timeout: 10000 });
  await page.fill('#comment', "Esta coool"); 
  await page.click('button:has-text("Vote!")');

  
  await page.waitForLoadState("networkidle");
  const mensaje = page.locator(".card-text");
  await expect(mensaje).toHaveText("Thank you for your vote!", { timeout: 10000 });

});
