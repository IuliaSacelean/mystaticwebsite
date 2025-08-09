// tests/signup.spec.ts
import { test } from '../fixtures/fixtures';

test('create new padawan', async ({ signup }) => {
  await signup.goto();
  await signup.fillForm({ name: 'Ahsoka', rank: 'Padawan', saber: 'Blue' });
  await signup.submit();
  await signup.expectSuccessMessage('Welcome, Ahsoka!');
});
