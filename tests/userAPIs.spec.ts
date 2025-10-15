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
    const getUserResponse = await request.get(`${BASE_URL}/user/${userName}`);

    await expect(getUserResponse.status()).toBe(200);

    const getUserResponseBody = await getUserResponse.json();

    const expectedGetUserResponseSchema = z.object ({
        id: z.literal(createUserRequestBody.id),
        username: z.literal(createUserRequestBody.username),
        firstName: z.literal(createUserRequestBody.firstName),
        lastName: z.literal(createUserRequestBody.lastName),
        email: z.literal(createUserRequestBody.email),
        password: z.literal(createUserRequestBody.password),
        phone: z.literal(createUserRequestBody.phone),
        userStatus: z.literal(createUserRequestBody.userStatus)
    });

    expectedGetUserResponseSchema.parse(getUserResponseBody);
})
})