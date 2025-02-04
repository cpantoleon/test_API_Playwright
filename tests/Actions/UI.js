const { expect } = require('@playwright/test');
const { applicationLocators } = require('../locators/locators');
const fs = require('fs');

class UI {
    constructor(page) {
        this.page = page;
        this.locators = applicationLocators;
    }

    // 🔹 Go to GoRest login page
    async goToGoRestLoginPage() {
        await this.page.goto('https://gorest.co.in/consumer/login');
    }

    // Enter login details (Replace with valid credentials)
    async enterLoginDetails() {
        await this.page.fill(this.locators.emailInput, 'your-email@example.com');
        await this.page.fill(this.locators.passwordInput, 'your-secure-password');
    }

    async clickLoginButton() {
        await this.page.click(this.locators.loginButton); // Click login button
    }

    //Navigate to Access Tokens Page
    async navigateToAccessTokensPage() {
        await this.page.waitForURL('https://gorest.co.in/my-account/access-tokens');
    }

    async clickCreateTokenButton() {
        await this.page.goto('https://gorest.co.in/my-account/access-tokens');
    }

    // Find the token with name "PlaywrightTestToken"
    async findTokenByName(tokenName) {
        const rows = await this.page.$$(this.locators.tokenTableRows);
        let tokenValue = null;
        for (const row of rows) {
            const name = await row.locator(this.locators.tokenNameCell).textContent();
            if (name.trim() === tokenName) {
                tokenValue = await row.locator(this.locators.tokenValueCell).textContent();
                break;
            }
        }
        if (!tokenValue) {
            throw new Error(`Token "${tokenName}" not found.`);
        }
        return tokenValue.trim();
    }

    // Extract, log, save, and validate the token
    async extractAndSaveToken(tokenName, filePath = 'gorest_token.txt') {
        const tokenValue = await this.findTokenByName(tokenName);
        console.log(`Extracted Token: ${tokenValue}`);

        // Save token to a file
        fs.writeFileSync(filePath, tokenValue);

        // ✅ Ensure token is retrieved
        expect(tokenValue).toBeTruthy();

        return tokenValue;
    }
}

module.exports = { UI };