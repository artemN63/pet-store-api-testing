import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { z } from 'zod';
import {postAPI, getAPI, putAPI, deleteAPI} from '../utils/apiCallHelper';

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

    // Zod schema for Pet response validation
    const petSchema = z.object({
        id: z.number(),
        category: z.object({
            id: z.number(),
            name: z.string()
        }).optional(),
        name: z.string(),
        photoUrls: z.array(z.string()),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()
        })).optional(),
        status: z.enum(["available", "pending", "sold"])
    });

    // Zod schema for POST Pet response validation
    const expectedPostPetResponseSchema = z.object({
        id: z.number(),
        name: z.string().optional(),
        photoUrls: z.array(z.string()).optional(),
        category: z.object({
            id: z.number(),
            name: z.string().optional()
        }).optional(),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()
        })).optional(),
        status: z.enum(["available", "pending", "sold"])
    });
    
    const expectedDeletePetResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.string()
    });

    test('CRUD Pet', async ({ request }) => {
        await postAPI(request, `${BASE_URL}/pet`, postPetRequestBody, 200, expectedPostPetResponseSchema);
        await getAPI(request, `${BASE_URL}/pet/${postPetRequestBody.id}`, 200, expectedPostPetResponseSchema);
        await putAPI(request, `${BASE_URL}/pet`, {...postPetRequestBody, status: "available"}, 200, expectedPostPetResponseSchema);
        await deleteAPI(request, `${BASE_URL}/pet/${postPetRequestBody.id}`, 200, expectedDeletePetResponseSchema);
    });

    test('Get Pet by Status', async ({ request }) => {
        await getAPI(request, `${BASE_URL}/pet/findByStatus`, 200, z.array(expectedPostPetResponseSchema), { status: 'available' });
    });

    test('Get Pet by Tags', async ({ request }) => {
        await getAPI(request, `${BASE_URL}/pet/findByTags`, 200, z.array(petSchema), { tags: '0, string' });
    });
});