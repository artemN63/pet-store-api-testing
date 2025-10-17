import { faker } from '@faker-js/faker';
import {test} from '@playwright/test';
import { z } from 'zod';
import {postAPI, generateListOfUsers} from '../utils/apiCallHelper';


test.describe('Users API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const createUserRequestBody = () => ({
        id: faker.number.int({min: 1, max: 10000}),
        username: faker.internet.username(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: faker.number.int({min: 1, max: 10000})
    });

    const expectedCreateUsersResponseSchema = z.object({
        code: z.number(),
        type: z.string(),
        message: z.string()
    });


test('List of Users', async ({request}) => {
    await postAPI(request, `${BASE_URL}/user/createWithArray`, generateListOfUsers(createUserRequestBody, 5), 200, expectedCreateUsersResponseSchema);
});
})