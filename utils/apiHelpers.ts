import { APIRequestContext, APIResponse } from '@playwright/test';
import { env } from '../config/env';

const BASE_URL = env.apiBaseUrl;

interface UserPayload {
  name?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Creates a new user via POST request
 */
export async function createUser(
  context: APIRequestContext,
  userPayload: UserPayload
): Promise<APIResponse> {
  const response = await context.post(`${BASE_URL}/users`, {
    data: userPayload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

/**
 * Gets a user by ID via GET request
 */
export async function getUser(context: APIRequestContext, userId: number): Promise<APIResponse> {
  const response = await context.get(`${BASE_URL}/users/${userId}`);
  return response;
}

/**
 * Updates a user via PUT request
 */
export async function updateUser(
  context: APIRequestContext,
  userId: number,
  userPayload: UserPayload
): Promise<APIResponse> {
  const response = await context.put(`${BASE_URL}/users/${userId}`, {
    data: userPayload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

/**
 * Deletes a user via DELETE request
 */
export async function deleteUser(context: APIRequestContext, userId: number): Promise<APIResponse> {
  const response = await context.delete(`${BASE_URL}/users/${userId}`);
  return response;
}
