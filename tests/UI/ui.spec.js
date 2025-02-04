const { test } = require('../utils/fixture');
const { readYaml } = require('../utils/readYaml');

const testData = readYaml('../data/myData.yml');
//const testData = readYaml('../data/testData.yml');

test.describe('Test Login page', () => {
    test('Extract GoRest API Token with name PlaywrightTestToken', async ({ ui, page }) => {

        await ui.enterLoginDetails(page, testData.username, testData.password);
        await ui.clickLoginButton(page);
        await ui.navigateToAccessTokensPage(page);
        await ui.clickCreateTokenButton(page);

        const tokenValue = await ui.extractAndSaveToken(page, 'PlaywrightTestToken');
        console.log(`🔑 Extracted Token: ${tokenValue}`);

        expect(tokenValue).toBeTruthy();
    });
});