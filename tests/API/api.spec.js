import { test, expect } from '@playwright/test';
import fs from 'fs';
import { execSync } from 'child_process';

const TOKEN_FILE = 'gorest_token.txt';

// 🔹 Check if token exists; if not, run the UI test to get the token
if (!fs.existsSync(TOKEN_FILE)) {
    console.log('🔍 No API token found. Running UI test to fetch token...');
    try {
        execSync('npx playwright test tests/ui/get_gorest_token.spec.js', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to get API token.');
        process.exit(1);
    }
}

// 🔹 Read the extracted token
const API_TOKEN = fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
const BASE_URL = 'https://gorest.co.in/public/v2';

test.describe('GoRest API Tests', () => {
    let userId; // Store user ID after creation

    test('Create User', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            data: {
                name: 'John Doe',
                gender: 'male',
                email: `john.doe${Date.now()}@example.com`,
                status: 'active'
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        userId = responseBody.id;
        console.log(`✅ User Created: ID ${userId}`);
    });

    test('Get User', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        console.log(`🔍 User Details:`, responseBody);
    });

    test('Update User', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            data: {
                name: 'John Doe Updated',
                status: 'inactive'
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        console.log(`✏️ User Updated:`, responseBody);
    });

    test('Delete User', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });

        expect(response.ok()).toBeTruthy();
        console.log(`🗑️ User Deleted: ID ${userId}`);
    });

});
