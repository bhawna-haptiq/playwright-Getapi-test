/**
 * Valid user payloads for positive testing - organized in arrays
 */
export const newUserPayload = [
  // Test 01: Standard new user
  {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
  },
  // Test 02: New user with existing name but new username/email
  {
    name: 'John Doe',
    username: 'johndoe_new',
    email: 'john.doe.new@example.com',
  },
  // Test 03: New user with existing username but new name/email
  {
    name: 'Jane Doe',
    username: 'johndoe',
    email: 'jane.doe@example.com',
  },
  // Test 04: New user with existing email but new username/name
  {
    name: 'Jack Doe',
    username: 'jackdoe',
    email: 'john.doe@example.com',
  },
];

/**
 * Invalid user payloads for negative testing - organized in arrays
 */
export const invalidUserPayload = [
  // Test 05: Blank name field
  {
    name: '',
    username: 'blankname_user',
    email: 'blankname@example.com',
  },
  // Test 06: Blank username field
  {
    name: 'Blank Username User',
    username: '',
    email: 'blankusername@example.com',
  },
  // Test 07: Blank email field
  {
    name: 'Blank Email User',
    username: 'blankemail_user',
    email: '',
  },
];