import { expect } from '@playwright/test';
import type { User } from '../api/usersApis';

export function validateOkStatus(status: number): void {
  expect(status).toBe(200);
}

export function validateJsonContentType(contentType: string | undefined): void {
  expect(contentType).toBeDefined();
  expect(contentType).toContain('application/json');
}

export function validateUsersListShape(users: unknown): asserts users is User[] {
  expect(Array.isArray(users)).toBe(true);

  for (const user of users as User[]) {
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(user.email).toContain('@');
  }
}

export function validateSingleUserShape(user: unknown): asserts user is User {
  expect(user).toBeTruthy();
  expect(typeof user).toBe('object');
  expect(Array.isArray(user)).toBe(false);

  const typedUser = user as User;
  expect(typeof typedUser.id).toBe('number');
  expect(typeof typedUser.name).toBe('string');
  expect(typeof typedUser.email).toBe('string');
  expect(typedUser.email).toContain('@');
}
