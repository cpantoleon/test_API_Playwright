import { test, expect } from '@playwright/test';
import fs from 'fs';
import { execSync } from 'child_process';

const TOKEN_FILE = 'gorest_token.txt';
const BASE_URL = 'https://gorest.co.in/public/v2';
let API_TOKEN = '';

function fetchApiToken() {
    // Check if token exists; if not, run the UI test to get the token
    if (!fs.existsSync(TOKEN_FILE)) {
        console.log('No API token found. Running UI test to fetch token...');
        try {
            execSync('npx playwright test tests/ui/ui.spec.js', { stdio: 'inherit' });
        } catch (error) {
            console.error('Failed to get API token.');
            process.exit(1);
        }
    }

    API_TOKEN = fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
}

test.describe('GoRest API Tests', () => {
    let userId; // Store user ID after creation

    // Fetch the API token before running the tests
    test.beforeAll(() => {
        fetchApiToken();
    });

    test('Create User', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            data: {
                name: 'John Doe',
                gender: 'male',
                email: `john.doe.${Date.now()}@example.com`,
                status: 'active'
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        userId = responseBody.id;
        console.log(`🆕 User Created:`, responseBody);
    });
});