import {test, expect} from '@playwright/test';

test.describe("Sample API Test", () => {
    test("Login API Test", async ({ request }) => {

        const requestBody = {"identifier":process.env.username,"password":process.env.password,"portal":"admin"};
        const response = await request.post(`${process.env.host}/api/auth/login`, {
            data: requestBody
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });
});