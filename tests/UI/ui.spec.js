const { test } = require('../utils/fixture'); // Import the custom fixture

test.describe('Test Login page', () => {
    test('Extract GoRest API Token with name PlaywrightTestToken', async ({ ui, page }) => {

        await ui.enterLoginDetails(page);
        await ui.clickLoginButton(page);
        await ui.navigateToAccessTokensPage(page);
        await ui.clickCreateTokenButton(page);

        const tokenValue = await ui.extractAndSaveToken(page, 'PlaywrightTestToken');
        console.log(`🔑 Extracted Token: ${tokenValue}`);

        expect(tokenValue).toBeTruthy();
    });
});