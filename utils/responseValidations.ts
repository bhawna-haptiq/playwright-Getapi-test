import { APIResponse, expect } from '@playwright/test';

/**
 * Validates the HTTP status code
 */
export function validateStatusCode(response: APIResponse, expectedStatus: number): void {
  expect(response.status()).toBe(expectedStatus);
}

/**
 * Validates that response is JSON type
 */
export function validateResponseType(responseBody: unknown): void {
  expect(responseBody).toBeDefined();
  expect(typeof responseBody).toBe('object');
}
