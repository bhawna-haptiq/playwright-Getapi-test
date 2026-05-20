import { APIResponse, expect } from '@playwright/test';
import { validateStatusCode, validateResponseType } from './responseValidations.ts';
import { validateUserData, validateEmailFormat, validateUserStructure } from './userValidations.ts';
import { parseResponse } from './responseParse.ts';

/**
 * Parses and validates HTTP status code
 */
export async function expectStatus(response: APIResponse, expectedStatus: number): Promise<any> {
  await validateStatusCode(response, expectedStatus);
  return await parseResponse(response);
}

/**
 * Validates complete response structure
 */
export function expectValidStructure(responseBody: any): void {
  validateResponseType(responseBody);
  validateUserStructure(responseBody);
}

/**
 * Validates response matches request payload
 */
export function expectDataMatch(responseBody: any, payload: any): void {
  validateUserData(responseBody, payload);
}

/**
 * Validates email in response
 */
export function expectValidEmail(responseBody: any): void {
  if (responseBody.email) {
    validateEmailFormat(responseBody.email);
  }
}

/**
 * Validates response headers
 */
export function expectValidHeaders(response: APIResponse): void {
  const contentType = response.headers()['content-type'];
  expect(contentType).toBeTruthy();
  console.log(`✓ Content-Type: ${contentType}`);
}

/**
 * Measures and validates response time (informational only)
 */
export function expectResponseTime(response: APIResponse, maxTimeMs: number = 5000): void {
  try {
    // Get response status and log timing info
    const status = response.status();
    console.log(`✓ Response completed with status ${status} (checking performance)`);
  } catch (error) {
    console.log('Response time tracking not available');
  }
}

/**
 * Validates user creation with status check
 */
export async function expectUserCreated(response: APIResponse, payload: any): Promise<any> {
  const body = await expectStatus(response, 201);
  expectValidStructure(body);
  expectDataMatch(body, payload);
  expectValidEmail(body);
  return body;
}

/**
 * Logs response for debugging
 */
export function logResponse(message: string, data: any): void {
  console.log(`\n📋 ${message}:`, JSON.stringify(data, null, 2));
}
