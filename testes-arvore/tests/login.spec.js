import { test, expect } from '@playwright/test';

test('Login correto - Árvore Genealógica', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('input[type="email"]', 'alex1@gmail.com');
  await page.fill('input[type="password"]', '123456');

  // 🔥 Captura o alert e confirma automaticamente
  page.once('dialog', async dialog => {
    console.log('Texto do alerta:', dialog.message());
    await dialog.accept(); // Clica em OK
  });

  await page.click('text=Entrar');

  await expect(page).toHaveURL(/dashboard/);
});


test('Login incorreto - Árvore Genealógica', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('input[type="email"]', 'usuarioerrado@email.com');
  await page.fill('input[type="password"]', 'senha_errada');

  await page.click('text=Entrar');

  // Ajuste de acordo com seu alert ou elemento de erro
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  // Se tiver mensagem de erro na tela, coloque o seletor real
  // await expect(page.locator('.erro')).toBeVisible();
});
