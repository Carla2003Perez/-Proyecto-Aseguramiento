import { test, expect } from "@playwright/test";

test("Intentar votar sin iniciar sesión", async ({ page }) => {
 
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1920, height: 1050});

  await page.click('img[title="Lamborghini"]');

  await page.click('text=Veneno');

  const mensaje = page.locator(".card-text");
  await expect(mensaje).toHaveText("You need to be logged in to vote.", { timeout: 10000 });

  console.log(" El sistema impidió votar sin iniciar sesión, mensaje mostrado correctamente.");
});
