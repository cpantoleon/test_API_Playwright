const { test } = require('../utils/fixture'); // Import the custom fixture
const fs = require('fs');

test.describe('Test Login page', () => {
    test('Extract GoRest API Token with name PlaywrightTestToken', async ({ ui, page }) => {
        // Use the `ui` fixture to perform actions
        await ui.enterLoginDetails(page);
        await ui.clickLoginButton(page);
        await ui.navigateToAccessTokensPage(page);
        await ui.clickCreateTokenButton(page);

        // Use the `extractAndSaveToken` method to handle token extraction, logging, saving, and validation
        const tokenValue = await ui.extractAndSaveToken(page, 'PlaywrightTestToken');
        console.log(`🔑 Extracted Token: ${tokenValue}`);

        // ✅ Ensure token is retrieved
        expect(tokenValue).toBeTruthy();
    });
});