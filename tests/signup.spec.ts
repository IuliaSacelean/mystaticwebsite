// tests/signup.spec.ts
import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignUp.js';

test('create new padawan', async ({ page }) => {
  const signUp = new SignupPage(page);
  await signUp.navigate();
  await signUp.fillForm({ name: 'Ahsoka', rank: 'Padawan', saber: 'Blue' });
  await signUp.submit();
  await signUp.expectSuccessMessage();
  
});