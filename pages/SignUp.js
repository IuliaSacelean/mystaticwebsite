// pages/SignupPage.ts
export class SignupPage {
   
    constructor(page) {
        this.page = page;
    }


    
    async goto() {
      await this.page.goto('/signup');
    }
  
    async fillForm({ name, rank, saber }: { name: string; rank: string; saber: string }) {
      await this.page.getByLabel('Name').fill(name);
      await this.page.getByLabel('Rank').selectOption(rank);
      await this.page.getByLabel('Lightsaber Color').selectOption(saber);
    }
  
    async submit() {
      await this.page.getByRole('button', { name: /submit/i }).click();
    }
  
    async expectSuccessMessage(text: string) {
      await expect(this.page.getByRole('alert')).toContainText(text);
    }
  }
  