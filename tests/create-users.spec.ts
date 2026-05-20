import { test, APIRequestContext } from '@playwright/test';
import { createAPIContext } from '../utils/apiClient.ts';
import { createUser } from '../utils/apiHelpers.ts';
import { validateStatusCode, validateResponseType } from '../utils/responseValidations.ts';
import { validateUserData, validateEmailFormat, validateUserStructure } from '../utils/userValidations.ts';
import { parseResponse } from '../utils/responseParse.ts';
import { newUserPayload, invalidUserPayload } from '../data/userData.ts';

let apiContext: APIRequestContext;

test.beforeAll(async () => {
  apiContext = await createAPIContext();
});

test.afterAll(async () => {
  await apiContext.dispose();
});

//******************************************************************************************************************************************
//                                                      TEST SCENARIO: CREATE NEW USER
//******************************************************************************************************************************************
test.describe('POST Users API Tests', () => {

  test('01 Verify using Post method able to Create new user successfully', async () => {
    const response = await createUser(apiContext, newUserPayload[0]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, newUserPayload[0]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 2: CREATE NEW USER WITH EXISTING NAME AND NEW USERNAME AND EMAIL
  //******************************************************************************************************************************************
  test('02 Verify using Post method able to Create new user with existing name and new user name and email successfully', async () => {
    const response = await createUser(apiContext, newUserPayload[1]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, newUserPayload[1]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 3: CREATE NEW USER WITH EXISTING USERNAME AND NEW NAME AND EMAIL
  //******************************************************************************************************************************************
  test('03 Verify using Post method able to Create new user with existing username and new name and email successfully', async () => {
    const response = await createUser(apiContext, newUserPayload[2]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, newUserPayload[2]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 4: CREATE NEW USER WITH EXISTING EMAIL AND NEW USERNAME AND NAME
  //******************************************************************************************************************************************
  test('04 Verify using Post method able to Create new user with existing email and new username and name successfully', async () => {
    const response = await createUser(apiContext, newUserPayload[3]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, newUserPayload[3]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 5: CREATE NEW USER BY LEAVING NAME FIELD BLANK
  //******************************************************************************************************************************************
  test('05 Verify using Post method able to Create new user by leaving name field blank', async () => {
    const response = await createUser(apiContext, invalidUserPayload[0]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, invalidUserPayload[0]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 6: CREATE NEW USER BY LEAVING USERNAME FIELD BLANK
  //******************************************************************************************************************************************
  test('06 Verify using Post method able to Create new user by leaving user name field blank', async () => {
    const response = await createUser(apiContext, invalidUserPayload[1]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, invalidUserPayload[1]);

    // Validate Email Format
    validateEmailFormat(responseBody.email);
  });

  //******************************************************************************************************************************************
  //                               TEST SCENARIO 7: CREATE NEW USER BY LEAVING EMAIL FIELD BLANK
  //******************************************************************************************************************************************
  test('07 Verify using Post method able to Create new user by leaving email field blank', async () => {
    const response = await createUser(apiContext, invalidUserPayload[2]);

    // Validating Status Code
    validateStatusCode(response, 201);

    // Converting response to JSON
    const responseBody = await parseResponse(response);

    // Validating Response Structure
    validateResponseType(responseBody);

    // Validating Required Fields
    validateUserStructure(responseBody);

    // Validate Response Data
    validateUserData(responseBody, invalidUserPayload[2]);
  });

});
