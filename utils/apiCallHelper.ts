import {APIRequestContext, APIResponse, Response} from '@playwright/test';
import { ZodTypeAny } from 'zod';

export async function getAPI(request: APIRequestContext, url: string, expectedStatusCode: number, expectedSchema: ZodTypeAny): Promise<APIResponse> {
    let getUserResponse;
    for (let i = 0; i < 15; i++) {
        getUserResponse = await request.get(url);
        if (getUserResponse.status() === expectedStatusCode) {
            const getUserResponseBody = await getUserResponse!.json();
            expectedSchema.parse(getUserResponseBody);
            return getUserResponse;
        }
    }

    throw new Error(`GET request to ${url} did not return status code ${expectedStatusCode} within 15 attempts.`);
}


export async function postAPI(request: APIRequestContext, url: string, requestBody: any, expectedStatusCode: number, expectedSchema: ZodTypeAny): Promise<APIResponse> {
    const postUserResponse = await request.post(url, { data: requestBody });
    if (postUserResponse.status() === expectedStatusCode) {
        const postUserResponseBody = await postUserResponse.json();
        expectedSchema.parse(postUserResponseBody);
        return postUserResponse;
    }

    throw new Error(`POST request to ${url} returned status ${postUserResponse.status()} but expected ${expectedStatusCode}.`);
}

export async function deleteAPI(request: APIRequestContext, url: string, expectedStatusCode: number, expectedSchema: ZodTypeAny): Promise<APIResponse> {
    let deleteUserResponse;
    for (let i = 0; i < 15; i++) {
        deleteUserResponse = await request.delete(url);
        if (deleteUserResponse.status() === expectedStatusCode) {
            const deleteUserResponseBody = await deleteUserResponse!.json();
            expectedSchema.parse(deleteUserResponseBody);
            return deleteUserResponse;
        }
    }

    throw new Error(`DELETE request to ${url} did not return status code ${expectedStatusCode} within 15 attempts.`);
}