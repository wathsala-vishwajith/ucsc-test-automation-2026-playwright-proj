import { test, expect } from '../../fixtures/base';
import userData from '../../data/user.json' with { type: 'json' };

test.describe("User Details API", () => {
  test("Should be able to update user details", async ({ apiClient }) => {
    const response = await apiClient.put(`${process.env.HOST}/api/admin/users/test001`, userData.update);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response Body:", responseBody);
    expect(responseBody.message).toBe('User updated');
  });
});
