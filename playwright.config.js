import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://gorest.co.in', // Base URL for API tests
    headless: true,  // Run tests in headless mode (UI tests)
    viewport: { width: 1280, height: 720 }, // For UI test screen size
    screenshot: 'only-on-failure', // Capture screenshot on failure
    video: 'retain-on-failure', // Capture video on failure
  },
});
