const { test, expect } = require('../utils/fixture');
const { readYaml } = require('../utils/readYaml');
const { wait } = require('../utils/wait');

const testData = readYaml('./tests/testData/myData.yml');
//const testData = readYaml('./tests/testData/testData.yml');

test.describe('Test Login page', () => {
    test('Extract GoRest API Token with name PlaywrightTestToken', async ({ ui }) => {

        await ui.clickOnGitHubButton();
        await wait(2000);
        await ui.enterLoginDetails(testData.Users.userName, testData.Users.password); // Pass correct values
        await ui.clickLoginButton();
        await ui.navigateToAccessTokensPage();
        await ui.clickCreateTokenButton();

        const tokenValue = await ui.extractAndSaveToken('PlaywrightTestToken');
        console.log(`Extracted Token: ${tokenValue}`);

        expect(tokenValue).toBeTruthy();
    });
});