import { test, APIRequestContext } from '@playwright/test';
import { createAPIContext } from '../utils/apiClient.ts';
import { parseResponse } from '../utils/responseParse.ts';
import { createUser } from '../utils/apiHelpers.ts';
import { newUserPayload, invalidUserPayload } from '../data/userData.ts';
import {
  expectStatus,
  expectValidStructure,
  expectDataMatch,
  expectValidEmail,
  expectValidHeaders,
  expectResponseTime,
  expectUserCreated,
  logResponse,
} from '../utils/testHelpers.ts';

let apiContext: APIRequestContext;

test.beforeAll(async () => {
  apiContext = await createAPIContext();
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('POST Users API - Create User Tests', () => {
  test.describe('✅ POSITIVE TESTS - Valid User Creation', () => {
    test('01 - Should return 201 status code for valid user', async () => {
      const response = await createUser(apiContext, newUserPayload[0]);
      await expectStatus(response, 201);
    });

    test('02 - Should return correct response structure', async () => {
      const response = await createUser(apiContext, newUserPayload[1]);
      const body = await parseResponse(response);
      expectValidStructure(body);
    });

    test('03 - Should return user data matching the request payload', async () => {
      const response = await createUser(apiContext, newUserPayload[2]);
      const body = await parseResponse(response);
      expectDataMatch(body, newUserPayload[2]);
    });

    test('04 - Should return valid email format in response', async () => {
      const response = await createUser(apiContext, newUserPayload[3]);
      const body = await parseResponse(response);
      expectValidEmail(body);
    });

    test('05 - Should return correct response headers', async () => {
      const response = await createUser(apiContext, newUserPayload[0]);
      expectValidHeaders(response);
    });

    test('06 - Should complete user creation within acceptable time', async () => {
      const response = await createUser(apiContext, newUserPayload[1]);
      expectResponseTime(response, 5000);
    });

    test('07 - Should create complete user with all validations', async () => {
      const response = await createUser(apiContext, newUserPayload[2]);
      await expectUserCreated(response, newUserPayload[2]);
    });

    test('08 - Should create multiple independent users', async () => {
      const response1 = await createUser(apiContext, newUserPayload[0]);
      const user1 = await expectUserCreated(response1, newUserPayload[0]);

      const response2 = await createUser(apiContext, newUserPayload[1]);
      const user2 = await expectUserCreated(response2, newUserPayload[1]);

      logResponse('User 1 created', user1);
      logResponse('User 2 created', user2);
    });
  });

  test.describe('❌ NEGATIVE TESTS - Invalid User Handling', () => {
    test('09 - Should handle user creation with blank name field', async () => {
      const response = await createUser(apiContext, invalidUserPayload[0]);
      const body = await parseResponse(response);
      logResponse('Response for blank name', body);
    });

    test('10 - Should handle user creation with blank username field', async () => {
      const response = await createUser(apiContext, invalidUserPayload[1]);
      const body = await parseResponse(response);
      logResponse('Response for blank username', body);
    });

    test('11 - Should handle user creation with blank email field', async () => {
      const response = await createUser(apiContext, invalidUserPayload[2]);
      const body = await parseResponse(response);
      logResponse('Response for blank email', body);
    });
  });
});
