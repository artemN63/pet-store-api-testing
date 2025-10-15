import { faker } from '@faker-js/faker';
import {test, expect} from '@playwright/test';
import { z } from 'zod';

test.describe('User API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
  test('Create a new user', async ({request}) => {
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

    const createUserResponse = await request.post(`${BASE_URL}/user`, {
        data: createUserRequestBody
    });

    await expect(createUserResponse.status()).toBe(200);

    const createUserResponseBody = await createUserResponse.json();
    
    const expectedResponseSchema = z.object ({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal(createUserRequestBody.id.toString())
    });

    expectedResponseSchema.parse(createUserResponseBody);
});
})