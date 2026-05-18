import { defineConfig } from '@playwright/test';
import { env, DEFAULT_HEADERS } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: env.apiBaseUrl,
    extraHTTPHeaders: DEFAULT_HEADERS,
  },
  reporter: [['list']],
});
