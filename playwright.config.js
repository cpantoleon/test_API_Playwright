import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://gorest.co.in',
    headless: false,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
  //globalSetup: require.resolve('./tests/globals/global-setup.js'),
  globalTeardown: require.resolve('./tests/globals/global-teardown.js'),
  workers: 2,
  timeout: 30000,
  reporter: [['list'], ['json', { outputFile: 'results.json' }]],
});
