/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultListUser } from '../models/ResultListUser';
import type { ResultString } from '../models/ResultString';
import type { ResultUser } from '../models/ResultUser';
import type { ResultUserVo } from '../models/ResultUserVo';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * @param requestBody
     * @returns ResultUser OK
     * @throws ApiError
     */
    public static userLogin(
        requestBody: UserLoginRequest,
    ): CancelablePromise<ResultUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param current
     * @param size
     * @returns ResultListUser OK
     * @throws ApiError
     */
    public static select(
        current: number,
        size: number,
    ): CancelablePromise<ResultListUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/select',
            query: {
                'current': current,
                'size': size,
            },
        });
    }
    /**
     * @returns ResultString OK
     * @throws ApiError
     */
    public static register(): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/register',
        });
    }
    /**
     * @returns ResultUserVo OK
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<ResultUserVo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/GetUser',
        });
    }
}
