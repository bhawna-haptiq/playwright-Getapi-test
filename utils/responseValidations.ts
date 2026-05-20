import { APIResponse, expect } from '@playwright/test';

/**
 * Validates the HTTP status code
 */
export async function validateStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
  expect(response.status()).toBe(expectedStatus);
}

/**
 * Validates that response status is OK (2xx range)
 */
export async function validateResponseOk(response: APIResponse): Promise<void> {
  expect(response.ok()).toBe(true);
}

/**
 * Validates that response is JSON type
 */
export async function validateResponseType(responseBody: any): Promise<void> {
  expect(responseBody).toBeDefined();
  expect(typeof responseBody).toBe('object');
}

/**
 * Validates JSON content type in response headers
 */
export async function validateJsonContentType(response: APIResponse): Promise<void> {
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('application/json');
}
