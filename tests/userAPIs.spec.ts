import { faker } from '@faker-js/faker';
import {test, expect} from '@playwright/test';
import { z } from 'zod';
import {postAPI, getAPI, putAPI, deleteAPI} from '../utils/apiCallHelper';

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
        id: faker.number.int({min: 1, max: 10000}),
        username: userName,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: password,
        phone: faker.phone.number(),
        userStatus: 0
    }

    const putUserRequestBody = {
        id: faker.number.int({min: 1, max: 10000}),
        username: userName,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: password,
        phone: faker.phone.number(),
        userStatus: faker.number.int({min: 1, max: 10000})
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


test('CRUD', async ({request}) => {
    await postAPI(request, `${BASE_URL}/user`, createUserRequestBody, 200, expectedCreateUserResponseSchema);
    await getAPI(request, `${BASE_URL}/user/${userName}`, 200, expectedGetUserResponseSchema);
    await putAPI(request, `${BASE_URL}/user/${userName}`, putUserRequestBody, 200, expectedCreateUserResponseSchema);
    await deleteAPI(request, `${BASE_URL}/user/${userName}`, 200, expectedDeleteUserResponseSchema);
});

test('Create a new user', async ({request}) => {
    await postAPI(request, `${BASE_URL}/user`, createUserRequestBody, 200, expectedCreateUserResponseSchema);});
    
test('Get user by UserName', async ({request}) => {
    await getAPI(request, `${BASE_URL}/user/${userName}`, 200, expectedGetUserResponseSchema);})

test('Delete user by UserName', async ({request}) => {
    await deleteAPI(request, `${BASE_URL}/user/${userName}`, 200, expectedDeleteUserResponseSchema);})
})