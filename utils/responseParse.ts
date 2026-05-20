import { APIResponse } from '@playwright/test';

/**
 * Parses API response to JSON
 */
export async function parseResponse(response: APIResponse): Promise<any> {
  try {
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    throw new Error(`Failed to parse response: ${error}`);
  }
}

/**
 * Parses API response to text
 */
export async function parseResponseText(response: APIResponse): Promise<string> {
  try {
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    throw new Error(`Failed to parse response text: ${error}`);
  }
}
