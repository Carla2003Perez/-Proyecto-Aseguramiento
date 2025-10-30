import { test, expect } from "@playwright/test";

test.setTimeout(60000);

test("Verificar que el perfil no se actualice con numeros los campos de nombre o apellido", async ({ page }) => {

  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1280, height: 800 });
  console.log("Sitio cargado correctamente.");

  // Iniciar sesión con credenciales válidas
  await page.fill('input[name="login"]', "Renee101761616948370");
  await page.fill('input[name="password"]', "Sur.123ho");
  await page.click('button:has-text("Login")');
  console.log("Inicio de sesión exitoso.");

  // Acceder al perfil del usuario
  await page.waitForSelector('a:has-text("Profile")');
  await page.click('a:has-text("Profile")');
  console.log("Sección de perfil abierta.");

  // Esperar la carga del formulario
  await page.waitForSelector('input[name="firstName"]');
  console.log("Formulario de perfil disponible.");

  // Definir entradas inválidas para probar
  const valoresInvalidos = [
    { nombre: "12345", apellido: "Lopez" },
    { nombre: "Carlos@", apellido: "Martínez" },
    { nombre: "Ana#", apellido: "1234" },
    { nombre: "Lu!s", apellido: "Contreras%" },
    { nombre: "Pepe12", apellido: "Gómez3" },
  ];

  // Iterar por cada caso de prueba
  for (const caso of valoresInvalidos) {
    console.log(`🧪 Probando con First Name: "${caso.nombre}" | Last Name: "${caso.apellido}"`);

    await page.fill('input[name="firstName"]', caso.nombre);
    await page.fill('input[name="lastName"]', caso.apellido);
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(1000); // pequeña pausa para esperar respuesta visual

    const mensaje = await page.locator(".result:not(.hidden-md-down)").textContent();

    // Mostrar mensaje de resultado en consola
    console.log(`📨 Mensaje del sistema: "${mensaje?.trim()}"`);

    // Verificar que el mensaje indique un error o rechazo de datos inválidos
    expect(mensaje).not.toMatch(/The profile has been saved/i);
    console.log("✅ Validación exitosa: el sistema NO permitió guardar el perfil con datos inválidos.\n");
  }
});
