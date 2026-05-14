import { APIRequestContext, expect, request, test } from '@playwright/test';
import { UsersApis } from '../api/usersApis';
import { env } from '../config/env';
//import { validateOkStatus, validateJsonContentType, validateUsersListShape, validateSingleUserShape } from '../utils/response.Validators';

const BASE_URL = env.apiBaseUrl;

let apiContext: APIRequestContext;
let usersApis: UsersApis;

test.describe('GET users API', () => {
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    usersApis = new UsersApis(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('returns 200 for users list endpoint', async () => {
    const response = await usersApis.getUsers();

    expect(response.status()).toBe(200);
  });

  test('returns an array for users list endpoint', async () => {
    const response = await usersApis.getUsers();
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('returns required fields with valid email format for users list items', async () => {
    const response = await usersApis.getUsers();
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);

    for (const user of body) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(user.email).toContain('@');
    }
  });

  test('returns 200 for single user endpoint', async () => {
    const response = await usersApis.getUserById(1);

    expect(response.status()).toBe(200);
  });

  test('returns an object for single user endpoint', async () => {
    const response = await usersApis.getUserById(1);
    const body = await response.json();

    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(body).not.toBeNull();
  });

  test('returns expected user fields and data integrity for single user endpoint', async () => {
    const response = await usersApis.getUserById(1);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');

    expect(body.id).toBe(1);
    expect(typeof body.name).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(body.email).toContain('@');
  });

  test('returns JSON content type header for users endpoint', async () => {
    const response = await usersApis.getUsers();
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');
  });

  test('responds within a reasonable time for users endpoint', async () => {
    const startedAt = Date.now();
    const response = await usersApis.getUsers();
    const durationMs = Date.now() - startedAt;

    expect(response.status()).toBe(200);
    expect(durationMs).toBeLessThan(5000);
  });

  test('returns 404 for a non-existing user endpoint', async () => {
    const response = await usersApis.getUserById(99999);
    expect(response.status()).toBe(404);
     });
});
