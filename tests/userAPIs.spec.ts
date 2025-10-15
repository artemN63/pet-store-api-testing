import { faker } from '@faker-js/faker';
import {test, expect} from '@playwright/test';
import { create } from 'domain';
import { z } from 'zod';

test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;

    const createUserRequestBody = {
        id: "345238",
        username: "TestUserNameArt123",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "Test1234!",
        phone: faker.phone.number(),
        userStatus: 0
    }

  test('Create a new user', async ({request}) => {
    const createUserResponse = await request.post(`${BASE_URL}/user`, {
        data: createUserRequestBody
    });

    await expect(createUserResponse.status()).toBe(200);

    const createUserResponseBody = await createUserResponse.json();
    
    const expectedCreateUserResponseSchema = z.object ({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(createUserRequestBody.id.toString())
    });

    expectedCreateUserResponseSchema.parse(createUserResponseBody);
});
    
test('Get user by UserName', async ({request}) => {
    let getUserResponse;
    for (let i = 0; i < 5; i++) {
        getUserResponse = await request.get(`${BASE_URL}/user/${userName}`);
        if (getUserResponse.status() === 200) {
            break;
        }
    }

    const getUserResponseBody = await getUserResponse!.json();

    const expectedGetUserResponseSchema = z.object ({
        id: z.number(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        userStatus: z.number()
    });

    expectedGetUserResponseSchema.parse(getUserResponseBody);
})
});