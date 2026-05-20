import { APIRequestContext, request } from '@playwright/test';
import { env, DEFAULT_HEADERS } from '../config/env';

const BASE_URL = env.apiBaseUrl;

/**
 * Creates a new API context with base configuration
 */
export async function createAPIContext(): Promise<APIRequestContext> {
  const apiContext = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: DEFAULT_HEADERS,
  });
  return apiContext;
}

/**
 * Generic API request function
 */
export async function apiRequest(
  context: APIRequestContext,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  data?: any
) {
  const options: any = {
    headers: DEFAULT_HEADERS,
  };

  if (data) {
    options.data = data;
  }

  return context.fetch(endpoint, {
    method,
    ...options,
  });
}
