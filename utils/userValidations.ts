import { expect } from '@playwright/test';

interface UserPayload {
  name?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Validates user data structure contains required fields
 */
export function validateUserStructure(user: any): void {
  expect(user).toBeDefined();
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('username');
  expect(user).toHaveProperty('email');
}

/**
 * Validates user data matches the payload
 */
export function validateUserData(responseUser: any, payloadUser: UserPayload): void {
  if (payloadUser.name) {
    expect(responseUser.name).toBe(payloadUser.name);
  }
  if (payloadUser.username) {
    expect(responseUser.username).toBe(payloadUser.username);
  }
  if (payloadUser.email) {
    expect(responseUser.email).toBe(payloadUser.email);
  }
}

/**
 * Validates email format
 */
export function validateEmailFormat(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test(email)).toBe(true);
}
