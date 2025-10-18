import { test, expect } from '@playwright/test';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import {deleteAPI, getAPI, postAPI} from '../utils/apiCallHelper';

const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

const expectedInventoryResponseSchema = z
        .record(z.string(), z.number())
        .refine((data) => Object.keys(data).length === 14
    );


const expectedOrderResponseSchema = z.object({
    id: z.number(),
    petId: z.number(),
    quantity: z.number(),
    shipDate: z.string(),
    status: z.union([z.literal('placed'), z.literal('approved'), z.literal('delivered')]),
    complete: z.boolean()
});

// Helper function to generate order request body using faker
const generateOrderRequestBody = () => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    petId: faker.number.int({ min: 0, max: 100 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    shipDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']),
    complete: faker.datatype.boolean()
});

const expectedDeleteResponseSchema = z.object({
    code: z.number(),
    type: z.string(),
    message: z.string()
});

test.describe('Pet API Tests', () => {
    test('Get Inventory', async ({ request }) => {
        await getAPI(request, `${BASE_URL}/store/inventory`, 200, expectedInventoryResponseSchema);
    });
});


test.describe('Pet Store CRUD API Tests', () => {
    const orderData = generateOrderRequestBody();
    test('CRUD Operations', async ({ request }) => {
        await postAPI(request, `${BASE_URL}/store/order`, orderData, 200, expectedOrderResponseSchema);
        await getAPI(request, `${BASE_URL}/store/order/${orderData.id}`, 200, expectedOrderResponseSchema);
        await deleteAPI(request, `${BASE_URL}/store/order/${orderData.id}`, 200, expectedDeleteResponseSchema);
    });
});