const { test: base, expect } = require('@playwright/test');
const { UI } = require('../Actions/UI.js'); // Ensure the correct import path

exports.test = base.extend({
    ui: async ({ page }, use) => {
        const ui = new UI(page); // Initialize the UI class with the page object
        await ui.goToGoRestLoginPage(); // Perform common steps
        await use(ui); // Expose the UI instance to the test
    },
});

exports.expect = expect;