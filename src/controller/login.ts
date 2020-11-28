import { Request } from 'express';
import { logger } from '../infrastructure';
import { HttpError } from '../utilities/http-error';
import {
  Controller,
  GenerateTokenService,
  HttpResponse,
  LoginRequestBody,
  LoginResponseBody,
  VerifyAccountService
} from '../utilities/types';

export default function makeLogin(dependency: {
  generateToken: GenerateTokenService;
  verifyAccount: VerifyAccountService;
}): Controller<HttpResponse<LoginResponseBody>> {
  return async function login(
    httpRequest: Request
  ): Promise<HttpResponse<LoginResponseBody>> {
    try {
      const data: LoginRequestBody = httpRequest.body;

      const userId = await dependency.verifyAccount(data);

      const token = dependency.generateToken(userId);

      return Object.freeze({
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: {
          jwt: token
        }
      });
    } catch (e) {
      logger.error(JSON.stringify(e));

      if (e instanceof HttpError) {
        return Object.freeze({
          headers: {
            'Content-Type': 'application/json'
          },
          status: e.getStatus()
        });
      } else {
        return Object.freeze({
          headers: {
            'Content-Type': 'application/json'
          },
          status: 500
        });
      }
    }
  };
}
