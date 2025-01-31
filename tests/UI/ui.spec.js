import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Extract GoRest API Token with name PlaywrightTestToken', async ({ page }) => {
    // 🔹 Go to GoRest login page
    await page.goto('https://gorest.co.in/login');

    // 🔐 Enter login details (Replace with valid credentials)
    await page.fill('input[name="email"]', 'your-email@example.com');
    await page.fill('input[name="password"]', 'your-secure-password');
    await page.click('button[type="submit"]'); // Click login button

    // 🔹 Navigate to Access Tokens Page
    await page.waitForURL('https://gorest.co.in/my-account/access-tokens');
    await page.goto('https://gorest.co.in/my-account/access-tokens');

    // 🔍 Find the token with name "PlaywrightTestToken"
    const rows = await page.$$('table tbody tr');

    let tokenValue = null;
    for (const row of rows) {
        const name = await row.locator('td:nth-child(1)').textContent();
        if (name.trim() === 'PlaywrightTestToken') {
            tokenValue = await row.locator('td:nth-child(2)').textContent();
            break;
        }
    }

    if (!tokenValue) {
        throw new Error('Token "PlaywrightTestToken" not found.');
    }

    console.log(`🔑 Extracted Token: ${tokenValue}`);

    // Save token to a file
    fs.writeFileSync('gorest_token.txt', tokenValue.trim());

    // ✅ Ensure token is retrieved
    expect(tokenValue).toBeTruthy();
});
