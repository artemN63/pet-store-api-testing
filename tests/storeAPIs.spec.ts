import { test, expect } from '@playwright/test';
import { z } from 'zod';
import {getAPI} from '../utils/apiCallHelper';

test.describe('Pet API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const expectedInventoryResponseSchema = z
        .record(z.string(), z.number())
        .refine((data) => Object.keys(data).length === 14
    );

    test('Get Inventory', async ({ request }) => {
        await getAPI(request, `${BASE_URL}/store/inventory`, 200, expectedInventoryResponseSchema);
    });
});