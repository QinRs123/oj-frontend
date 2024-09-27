/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionSubmitRequest } from '../models/QuestionSubmitRequest';
import type { ResultPageQuestionSubmit } from '../models/ResultPageQuestionSubmit';
import type { ResultString } from '../models/ResultString';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSubmitControllerService {
    /**
     * @param requestBody
     * @returns ResultPageQuestionSubmit OK
     * @throws ApiError
     */
    public static listQuestionSubmitByPageTest(
        requestBody: QuestionSubmitRequest,
    ): CancelablePromise<ResultPageQuestionSubmit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question-submit/list/page/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ResultString OK
     * @throws ApiError
     */
    public static questionSubmitAdd(
        requestBody: QuestionSubmitRequest,
    ): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question-submit/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
