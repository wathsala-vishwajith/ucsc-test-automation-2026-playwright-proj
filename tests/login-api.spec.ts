import { test, expect } from '@playwright/test';

test.describe("Sample API Test", () => {
  let token: string;

  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post(`${process.env.HOST}/api/auth/login`, {
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

  test("Get User Profile API Test", async ({ request }) => {
    const response = await request.get(`${process.env.HOST}/api/admin/profile`, {
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