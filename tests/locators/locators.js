const applicationLocators = {
    tokenTableRows: 'table tbody tr',
    tokenNameCell: 'td:nth-child(1)',
    tokenValueCell: 'td:nth-child(2)',
    emailInput: '#login_field', // Updated email input locator
    passwordInput: '#password', // Updated password input locator
    loginButton: 'input[name="commit"]',
    githubButton: 'a.btn.btn-sm-block.btn-xs-block.btn-outline-warning.me-2.mb-3:has-text("Github")'
};

module.exports = { applicationLocators };