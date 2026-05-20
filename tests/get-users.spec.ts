import { test, expect, APIRequestContext, request } from '@playwright/test';
import { UsersApis, User } from '../api/usersApis';
import { env, DEFAULT_HEADERS } from '../config/env';

const BASE_URL = env.apiBaseUrl;
let apiContext: APIRequestContext;
let usersApis: UsersApis;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: DEFAULT_HEADERS,
  });
  usersApis = new UsersApis(apiContext);
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('GET Users API - Retrieve Users', () => {
  test.describe('✅ POSITIVE TESTS - Valid GET Requests', () => {
    test('01 - Should return 200 status code for users list endpoint', async () => {
      const response = await usersApis.getUsers();
      expect(response.status()).toBe(200);
    });

    test('02 - Should return JSON content type for users list', async () => {
      const response = await usersApis.getUsers();
      const contentType = response.headers()['content-type'];
      expect(contentType).toContain('application/json');
    });

    test('03 - Should return array structure for users list endpoint', async () => {
      const response = await usersApis.getUsers();
      const users = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
    });

    test('04 - Should return users list with at least one user', async () => {
      const response = await usersApis.getUsers();
      const users = await response.json();
      expect(users.length).toBeGreaterThan(0);
    });

    test('05 - Should return valid email format for all users in list', async () => {
      const response = await usersApis.getUsers();
      const users = await response.json();
      users.forEach((user: User) => {
        expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    test('06 - Should return 200 for single user endpoint', async () => {
      const response = await usersApis.getUserById(1);
      expect(response.status()).toBe(200);
    });

    test('07 - Should return object structure for single user', async () => {
      const response = await usersApis.getUserById(1);
      const user = await response.json();
      expect(typeof user).toBe('object');
      expect(Array.isArray(user)).toBeFalsy();
    });

    test('08 - Should return single user with required fields', async () => {
      const response = await usersApis.getUserById(1);
      const user = await response.json();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });

    test('09 - Should return correct user data for specific ID', async () => {
      const userId = 1;
      const response = await usersApis.getUserById(userId);
      const user = await response.json();
      expect(user.id).toBe(userId);
    });

    test('10 - Should create multiple users independently', async () => {
      const response1 = await usersApis.getUserById(1);
      const user1 = await response1.json();
      const response2 = await usersApis.getUserById(2);
      const user2 = await response2.json();
      expect(user1.id).not.toBe(user2.id);
    });

    test('11 - Should complete list retrieval within acceptable time', async () => {
      const startTime = Date.now();
      await usersApis.getUsers();
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(5000);
    });

    test('12 - Should complete single user retrieval within acceptable time', async () => {
      const startTime = Date.now();
      await usersApis.getUserById(1);
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(5000);
    });
  });

  test.describe('❌ NEGATIVE TESTS - Invalid/Error Cases', () => {
    test('13 - Should return 404 for non-existent user', async () => {
      const response = await usersApis.getUserById(999999);
      expect(response.status()).toBe(404);
    });

    test('14 - Should handle malformed user ID', async () => {
      const response = await apiContext.get(`${BASE_URL}/users/invalid-id`);
      expect([400, 404]).toContain(response.status());
    });

    test('15 - Should validate users list is not empty', async () => {
      const response = await usersApis.getUsers();
      const users = await response.json();
      expect(users.length).toBeGreaterThan(0);
    });

    test('16 - Should validate all users have unique IDs', async () => {
      const response = await usersApis.getUsers();
      const users = await response.json();
      const ids = users.map((user: User) => user.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});