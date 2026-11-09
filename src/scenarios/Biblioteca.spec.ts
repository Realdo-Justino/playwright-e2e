import { test, expect } from '@playwright/test';

test('Devo ser capaz de realizar um login invalido', async ({ page }) => {
  await page.goto('https://biblioteca.satc.edu.br/');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('textbox', { name: 'Matricula' }).click();
  await page.getByRole('textbox', { name: 'Matricula' }).fill('teste1234');
  await page.getByRole('textbox', { name: 'Matricula' }).press('Tab');
  await page.getByRole('textbox', { name: 'Senha' }).fill('1234');
  await page.getByRole('button', { name: 'Acessar' }).click();
  await expect(page.getByRole('alert')).toContainText(
    '× Matricula ou senha incorreta.'
  );
});

test('Devo ser capaz de pesquisar um livro', async ({ page }) => {
  await page.goto('https://biblioteca.satc.edu.br/');
  await page.getByRole('textbox', { name: 'Digite sua busca aqui' }).click();
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page
    .getByRole('textbox', { name: 'Digite sua busca aqui' })
    .fill('Cortico');
  await page.locator('select[name="searchOption"]').selectOption('INDICE_1');
  await page.getByRole('button', { name: 'Pesquisar' }).click();
  await page.getByText('Biblioteca Turvo').click();
  await page.getByRole('checkbox', { name: 'Biblioteca Turvo' }).check();
  await page.goto(
    'https://biblioteca.satc.edu.br/pesquisa_geral?for=INDICE_1&q=Cortico&page=1&perPage=20&orderBy=obra&direction=C&fB=5'
  );
  await page
    .getByRole('link', { name: 'Cortiço : texto integral, O / 1999' })
    .click();
  await expect(page.locator('#content')).toContainText(
    'B869.3 A994c Biblioteca Central / Biblioteca Turvo'
  );
});

test('Devo ser capaz de trocar a linguagem do site', async ({ page }) => {
  await page.goto('https://biblioteca.satc.edu.br/');
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.locator('#select-language-top-accessibility').selectOption('en');
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.goto('https://biblioteca.satc.edu.br/plano_ensino');
  await expect(page.locator('#consultar')).toContainText('Teaching Plan');
});
