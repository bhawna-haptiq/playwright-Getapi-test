import { APIRequestContext, APIResponse, expect, request, test } from '@playwright/test';
import { UsersApis, User } from '../api/usersApis';
import { env, DEFAULT_HEADERS } from '../config/env';
import { validateOkStatus, validateJsonContentType, validateUsersListShape, validateSingleUserShape } from '../utils/response.Validators';

const BASE_URL = env.apiBaseUrl;

let apiContext: APIRequestContext;
let usersApis: UsersApis;
let usersResponse: APIResponse;
let usersBody: User[];
let singleUserResponse: APIResponse;
let singleUserBody: User;

test.describe('GET users API', () => {
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: DEFAULT_HEADERS,
    });

    usersApis = new UsersApis(apiContext);
    usersResponse = await usersApis.getUsers();
    usersBody = await usersResponse.json();
    singleUserResponse = await usersApis.getUserById(1);
    singleUserBody = await singleUserResponse.json();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('returns 200 for users list endpoint', async () => {
    validateOkStatus(usersResponse.status());
  });

  test('returns an array for users list endpoint', async () => {
    expect(Array.isArray(usersBody)).toBe(true);
    expect(usersBody.length).toBeGreaterThan(0);
  });

  test('returns required fields with valid email format for users list items', async () => {
    validateUsersListShape(usersBody);
  });

  test('returns 200 for single user endpoint', async () => {
    validateOkStatus(singleUserResponse.status());
  });

  test('returns an object for single user endpoint', async () => {
    expect(typeof singleUserBody).toBe('object');
    expect(Array.isArray(singleUserBody)).toBe(false);
    expect(singleUserBody).not.toBeNull();
  });

  test('returns expected user fields and data integrity for single user endpoint', async () => {
    validateSingleUserShape(singleUserBody);
    expect(singleUserBody.id).toBe(1);
  });

  test('returns JSON content type header for users endpoint', async () => {
    validateJsonContentType(usersResponse.headers()['content-type']);
  });

  test('responds within a reasonable time for users endpoint', async () => {
    const startedAt = Date.now();
    const response = await usersApis.getUsers();
    const durationMs = Date.now() - startedAt;

    validateOkStatus(response.status());
    expect(durationMs).toBeLessThan(5000);
  });

  test('returns 404 for a non-existing user endpoint', async () => {
    const response = await usersApis.getUserById(99999);
    expect(response.status()).toBe(404);
  });
});
