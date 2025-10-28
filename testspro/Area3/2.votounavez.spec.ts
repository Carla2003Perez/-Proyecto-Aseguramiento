import { test, expect } from "@playwright/test";

test("Verificar que no se pueda votar otra vez", async ({ page }) => {

  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  // Iniciar sesión
  await page.waitForSelector('input[placeholder="Login"]');
  await page.waitForSelector('input[type="password"]');
  await page.fill('input[placeholder="Login"]', "Renee101761616948370");
  await page.fill('input[type="password"]', "Sur.123ho");
  await page.click('button.btn-success');

 
  await page.click('img[title="Lamborghini"]');
  await page.click('text=Veneno');
  
  //Verificar el mensaje mostrado
  const mensaje = page.locator(".card-text");
   await expect(mensaje).toHaveText("Thank you for your vote!", { timeout: 10000 });

});
