import { defineConfig } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: env.apiBaseUrl,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
  reporter: [['list']],
});
