import { test as base } from '@playwright/test';
import { APIClient } from 'client/api-client';

type MyFixtures = {
  apiClient: APIClient;
};

export const test = base.extend<MyFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new APIClient(request);

    // Perform login and set token
    const loginResponse = await apiClient.post(`${process.env.HOST}/api/auth/login`, {
      identifier: process.env.USERNAME,
      password: process.env.PASSWORD,
      portal: "admin",
    });

    if (!loginResponse.ok()) {
        throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
    }
    
    const loginBody = await loginResponse.json();
    
    if (!loginBody.token) {
        throw new Error('Token not found in login response');
    }

    apiClient.setAuthToken(loginBody.token);
    await use(apiClient);
  },
});

export { expect } from '@playwright/test';
