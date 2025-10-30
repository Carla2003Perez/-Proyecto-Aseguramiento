import { test, expect } from '@playwright/test';


  test('Validar que los campos nombre y apellido no se actualizen vacios', async ({ page }) => {

    // 1️⃣ Iniciar sesión
    await page.goto("https://buggy.justtestit.org/");
    await page.fill('input[name="login"]', "Renee101761616948370");
    await page.fill('input[name="password"]', "Sur.123ho");
    await page.click('button[type="submit"]');
    console.log("Sesión iniciada correctamente.");

  
    await page.waitForSelector('a[href="/profile"]', { timeout: 25000 });
    console.log("Login confirmado. Accediendo al módulo Perfil...");

    await page.click('a[href="/profile"]');
    await page.waitForSelector('input#firstName', { timeout: 25000 });
    console.log("Formulario de perfil cargado correctamente.");

    const nombreInput = page.locator('#firstName');
    const apellidoInput = page.locator('#lastName');
    const botonGuardar = page.locator('button.btn-success');

    //Llenar el campo nombre y dejar el apellido vacío
    await nombreInput.fill('Carla');
    await apellidoInput.fill(''); // Campo vacío
    console.log("Se llenó solo el campo 'Nombre' y se dejó vacío el 'Apellido'.");

  
    await botonGuardar.click();
    console.log("Intentando guardar con apellido vacío...");

    //Validar comportamiento esperado
    const botonDeshabilitado = await botonGuardar.isDisabled();
    const mensajeError = page.locator('.alert-danger');

    if (botonDeshabilitado) {
      console.log(" El sistema bloqueó el guardado: botón deshabilitado.");
    } else if (await mensajeError.isVisible()) {
      console.log(" El sistema mostró mensaje de error: no se permite guardar con apellido vacío.");
    } else {
      console.log("El sistema permitió guardar con apellido vacío: posible fallo de validación.");
    }

    // 8️⃣ Validación final
    await expect(nombreInput).toHaveValue('Carlos');
    await expect(apellidoInput).toHaveValue('');
  });
