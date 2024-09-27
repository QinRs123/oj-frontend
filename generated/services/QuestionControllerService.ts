/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionRequest } from '../models/QuestionRequest';
import type { ResultPageQuestion } from '../models/ResultPageQuestion';
import type { ResultPageQuestionVo } from '../models/ResultPageQuestionVo';
import type { ResultQuestionVo } from '../models/ResultQuestionVo';
import type { ResultString } from '../models/ResultString';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * @param requestBody
     * @returns ResultString OK
     * @throws ApiError
     */
    public static questionUpdate(
        requestBody: QuestionRequest,
    ): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ResultPageQuestion OK
     * @throws ApiError
     */
    public static listQuestionByPage(
        requestBody: QuestionRequest,
    ): CancelablePromise<ResultPageQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ResultPageQuestionVo OK
     * @throws ApiError
     */
    public static listQuestionVoByPage(
        requestBody: QuestionRequest,
    ): CancelablePromise<ResultPageQuestionVo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/pageVo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ResultPageQuestion OK
     * @throws ApiError
     */
    public static listQuestionByPageTest(
        requestBody: QuestionRequest,
    ): CancelablePromise<ResultPageQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/page/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ResultString OK
     * @throws ApiError
     */
    public static questionAdd(
        requestBody: QuestionRequest,
    ): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ResultQuestionVo OK
     * @throws ApiError
     */
    public static questionGetById(
        id: number,
    ): CancelablePromise<ResultQuestionVo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getById',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns ResultString OK
     * @throws ApiError
     */
    public static deleteById(
        id: number,
    ): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/deleteById',
            query: {
                'id': id,
            },
        });
    }
}
