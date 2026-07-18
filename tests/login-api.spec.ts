import {test, expect} from '@playwright/test';

test.describe("Sample API Test", () => {
    test("Login API Test", async ({ request }) => {

        const requestBody = {"identifier":process.env.USERNAME,"password":process.env.PASSWORD,"portal":"admin"};
        const response = await request.post(`${process.env.HOST}/api/auth/login`, {
            data: requestBody
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });
});