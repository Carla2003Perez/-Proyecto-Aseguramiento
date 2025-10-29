import { test, expect } from '@playwright/test';

test('Validar que el campo de género solo permita Male y Female', async ({ page }) => {

  //Abrir la página de login
  await page.goto("https://buggy.justtestit.org/");
  await page.fill('input[name="login"]', "Renee101761616948370");
  await page.fill('input[name="password"]', "Sur.123ho");
  await page.click('button[type="submit"]');
  console.log("Sesión iniciada con éxito.");

  //Confirmar que el login fue exitoso
  await page.waitForSelector('a[href="/profile"]', { timeout: 25000 });
  console.log(" Login confirmado. Redirigiendo al perfil...");

  //Acceder al módulo de perfil
  await page.click('a[href="/profile"]');
  await page.waitForSelector('input#gender', { timeout: 25000 });
  console.log("Formulario de perfil cargado.");

  //Localizar el campo de género y sus opciones
  const campoGenero = page.locator('input#gender');
  const listaOpciones = page.locator('datalist#genders option');

  //Obtener las opciones del menú desplegable
  const opciones = await listaOpciones.allTextContents();
  console.log("📌 Opciones disponibles en 'Género':", opciones);

  //Validar que solo existan las opciones Male y Female
  const opcionesEsperadas = ['Male', 'Female'];
  const opcionesInvalidas = opciones.filter(op => !opcionesEsperadas.includes(op));

  expect(opciones.length).toBe(2);
  expect(opciones).toEqual(expect.arrayContaining(opcionesEsperadas));

  if (opcionesInvalidas.length === 0) {
    console.log("El campo de género contiene únicamente las opciones válidas.");
  } else {
    console.log("Se encontraron opciones inválidas:", opcionesInvalidas);
  }

  // Probar selección de opciones válidas
  await campoGenero.fill('Male');
  await expect(campoGenero).toHaveValue('Male');
  console.log("Selección de 'Male' funciona correctamente.");

  await campoGenero.fill('Female');
  await expect(campoGenero).toHaveValue('Female');
  console.log("Selección de 'Female' funciona correctamente.");

  // 🔹 Intentar ingresar un valor no permitido
  await campoGenero.fill('Otro');
  const valorFinal = await campoGenero.inputValue();

  if (valorFinal === 'Otro') {
    console.log("❌ El campo aceptó un valor no permitido ('Otro'). Posible fallo en la validación.");
  } else {
    console.log("✅ El campo rechazó valores no válidos correctamente.");
  }
});
