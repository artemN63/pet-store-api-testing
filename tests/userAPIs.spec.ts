import { faker } from '@faker-js/faker';
import {test, expect} from '@playwright/test';
import { create } from 'domain';
import { z } from 'zod';

test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;

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

    const createUserRequestBody = {
        id: "345238",
        username: userName,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: password,
        phone: faker.phone.number(),
        userStatus: 0
    }

    const expectedCreateUserResponseSchema = z.object ({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(createUserRequestBody.id.toString())
    });

    const expectedDeleteUserResponseSchema = z.object ({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(userName)
    });

  test('Create a new user', async ({request}) => {
    const createUserResponse = await request.post(`${BASE_URL}/user`, {
        data: createUserRequestBody
    });

    await expect(createUserResponse.status()).toBe(200);

    const createUserResponseBody = await createUserResponse.json();

    expectedCreateUserResponseSchema.parse(createUserResponseBody);
});
    
test('Get user by UserName', async ({request}) => {
    let getUserResponse;
    for (let i = 0; i < 15; i++) {
        getUserResponse = await request.get(`${BASE_URL}/user/${userName}`);
        if (getUserResponse.status() === 200) {
            break;
        }
    }

    const getUserResponseBody = await getUserResponse!.json();

    expectedGetUserResponseSchema.parse(getUserResponseBody);
})

test('Delete user by UserName', async ({request}) => {
    let deleteUserResponse;
    for (let i = 0; i < 15; i++) {
        deleteUserResponse = await request.delete(`${BASE_URL}/user/${userName}`);
        if (deleteUserResponse.status() === 200) {
            break;
        }
    }

    const deleteUserResponseBody = await deleteUserResponse!.json();

    expectedDeleteUserResponseSchema.parse(deleteUserResponseBody);
})
});