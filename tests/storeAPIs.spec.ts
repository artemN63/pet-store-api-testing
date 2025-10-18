import { test, expect } from '@playwright/test';

test.describe('Pet API Tests', () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    test('Get Inventory', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/store/inventory`);
        
        expect(response.status()).toBe(200);
        
        const inventoryData = await response.json();
        
        const entries = Object.entries(inventoryData);
        expect(entries.length).toBe(14);
    });
});