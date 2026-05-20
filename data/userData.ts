/**
 * Valid user payloads for creating new users
 */
export const newUserPayload = [
  {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
  },
  {
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane.smith@example.com',
  },
  {
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob.johnson@example.com',
  },
  {
    name: 'Alice Williams',
    username: 'alicewilliams',
    email: 'alice.williams@example.com',
  },
];

/**
 * Invalid user payloads for negative testing
 */
export const invalidUserPayload = [
  {
    name: '',
    username: 'invaliduser1',
    email: 'invalid1@example.com',
  },
  {
    name: 'Invalid User 2',
    username: '',
    email: 'invalid2@example.com',
  },
  {
    name: 'Invalid User 3',
    username: 'invaliduser3',
    email: '',
  },
];
