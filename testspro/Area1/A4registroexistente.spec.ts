import { test, expect } from '@playwright/test';

test('Registro de nuevo usuario en Buggy Cars', async ({ page }) => {

  await page.goto('https://buggy.justtestit.org/');
  await page.setViewportSize({ width: 710, height: 735 });


  await page.click('text=Register');

  await page.fill('#username', 'Renee101761616948370');
  await page.fill("#firstName", "Renee");
  await page.fill('#lastName', 'Suriano');
  await page.fill('#password', 'Sur.123ho');
  await page.fill('#confirmPassword', 'Sur.123ho');

 
  await page.click('button:has-text("Register")');


  await expect(page.locator('.result')).toHaveText('Registro existoso');

 
});