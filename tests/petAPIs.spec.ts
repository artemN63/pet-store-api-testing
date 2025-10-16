import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { z } from 'zod';

test.describe('Pet API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const postPetRequestBody = {
        name: faker.animal.dog(),
        photoUrls: [
            faker.image.url(),
            faker.image.url()
        ],
        id: faker.number.int({ min: 1, max: 10000 }),
        category: {
            id: faker.number.int({ min: 1, max: 10000 }),
            name: faker.commerce.department()
        },
        tags: [
            {
                id: faker.number.int({ min: 1, max: 10000 }),
                name: faker.commerce.productAdjective()
            },
            {
                id: faker.number.int({ min: 1, max: 10000 }),
                name: faker.commerce.productAdjective()
            }
        ],
        status: "pending"
    };

    // Zod schema for POST Pet response validation
    const expectedPostPetResponseSchema = z.object({
        id: z.number(),
        name: z.string(),
        photoUrls: z.array(z.string()),
        category: z.object({
            id: z.number(),
            name: z.string()
        }).optional(),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()
        })).optional(),
        status: z.enum(["available", "pending", "sold"])
    });

    test('Post Pet', async ({ request }) => {
        const postPetResponse = await request.post(`${BASE_URL}/pet`, { data: postPetRequestBody });
        expect(postPetResponse.status()).toBe(200);
        const postPetResponseBody = await postPetResponse.json();
        expectedPostPetResponseSchema.parse(postPetResponseBody);
    });
});