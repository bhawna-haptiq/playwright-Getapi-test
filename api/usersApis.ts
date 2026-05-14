import { APIRequestContext, APIResponse } from '@playwright/test';

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UsersApis {
  constructor(private readonly apiContext: APIRequestContext) {}

  async getUsers(): Promise<APIResponse> {
    return this.apiContext.get('/users');
  }

  async getUserById(userId: number): Promise<APIResponse> {
    return this.apiContext.get(`/users/${userId}`);
  }
}
