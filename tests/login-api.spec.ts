import {test, expect} from '@playwright/test';

test.describe("Sample API Test", () => {
    test("Login API Test", async ({ request }) => {

        //for debugging purpose, printing the environment variables
        console.log("HOST: ", process.env.HOST);
        console.log("USERNAME: ", process.env.USERNAME);

        const requestBody = {"identifier":process.env.USERNAME,"password":process.env.PASSWORD,"portal":"admin"};
        const response = await request.post(`${process.env.HOST}/api/auth/login`, {
            data: requestBody
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });
});