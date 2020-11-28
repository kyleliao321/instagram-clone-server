import * as Joi from 'joi';
import makeValidateRequest from './validate-request';
import { NextFunction, Request, Response } from 'express';

describe('validate request', () => {
  test('should trigger next function when schema validation succeed', () => {
    // given
    const mockRequest = {} as Request;

    const mockResponse = {} as Response;

    const mockNextFunction = jest.fn();

    const mockValidateResult = {
      error: undefined
    } as Joi.ValidationResult;

    const mockSchema = {
      validate: (value: any) => mockValidateResult
    } as Joi.Schema;

    const validateRequest = makeValidateRequest({ schema: mockSchema });

    // when
    validateRequest(mockRequest, mockResponse, mockNextFunction);

    // expect
    expect(mockNextFunction).toHaveBeenCalled();
  });

  test('should not trigger next function when schema validation failed', () => {
    // given
    const mockRequest = {} as Request;

    const mockResponse = {
      sendStatus: (code: number) => {},
      send: (body?: any) => {}
    } as Response;

    const mockNextFunction = jest.fn();

    const mockValidationError = {} as Joi.ValidationError;

    const mockValidateResult = {
      error: mockValidationError
    } as Joi.ValidationResult;

    const mockSchema = {
      validate: (value: any) => mockValidateResult
    } as Joi.Schema;

    const validateRequest = makeValidateRequest({ schema: mockSchema });

    // when
    validateRequest(mockRequest, mockResponse, mockNextFunction);

    // expect
    expect(mockNextFunction).toHaveBeenCalledTimes(0);
  });
});
