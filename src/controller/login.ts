import { Request } from 'express';
import { logger } from '../infrastructure';
import { HttpError } from '../utilities/http-errors';
import {
  Controller,
  GenerateToken,
  HttpResponse,
  LoginAccountInfo,
  LoginResponseBody,
  VerifyAccount
} from '../utilities/types';

export default function makeLogin(dependency: {
  generateToken: GenerateToken;
  verifyAccount: VerifyAccount;
}): Controller<LoginResponseBody> {
  return async function login(
    httpRequest: Request
  ): Promise<HttpResponse<LoginResponseBody>> {
    try {
      const data: LoginAccountInfo = httpRequest.body;

      const userId = await dependency.verifyAccount(data);

      const token = dependency.generateToken(userId);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: {
          jwt: token
        }
      };
    } catch (e) {
      logger.error(JSON.stringify(e));

      if (e instanceof HttpError) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          status: e.getStatus()
        };
      } else {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          status: 500
        };
      }
    }
  };
}
