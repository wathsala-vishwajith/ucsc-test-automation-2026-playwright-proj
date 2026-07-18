import { test, expect } from '../fixtures/base';

test.describe("Sample API Test", () => {
  test("Get User Profile API Test", async ({ apiClient }) => {
    const response = await apiClient.get(`${process.env.HOST}/api/admin/profile`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('profile');
    expect(responseBody.profile).toHaveProperty('username', process.env.USERNAME);
  });
});