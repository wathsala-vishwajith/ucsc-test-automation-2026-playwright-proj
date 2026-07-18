import { test, expect,request, APIRequestContext } from '@playwright/test';

test.describe("Sample API Test", () => {
  let token: string;
  let requestContext: APIRequestContext;

  // Initialize the request context before all tests
  test.beforeAll(async () => {
    requestContext = await request.newContext({baseURL: process.env.HOST});
  });

  test.beforeEach(async () => {
    const loginResponse = await requestContext.post(`${process.env.HOST}/api/auth/login`, {
      data: {
        identifier: process.env.USERNAME,
        password: process.env.PASSWORD,
        portal: "admin",
      },
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody).toHaveProperty('token');
    token = loginBody.token;
  });

  test("Get User Profile API Test", async () => {
    const response = await requestContext.get(`${process.env.HOST}/api/admin/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('profile');
    expect(responseBody.profile).toHaveProperty('username', process.env.USERNAME);
  });
});