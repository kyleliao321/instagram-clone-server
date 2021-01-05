import { Request } from 'express';
import {
  Controller,
  GenerateTokenService,
  HttpResponse,
  LoginRequestBody,
  LoginResponseBody,
  VerifyAccountService
} from '../../utilities/types';

export default function makeLogin(dependency: {
  generateTokenService: GenerateTokenService;
  verifyAccountService: VerifyAccountService;
}): Controller<HttpResponse<LoginResponseBody>> {
  return async function login(
    httpRequest: Request
  ): Promise<HttpResponse<LoginResponseBody>> {
    const data: LoginRequestBody = httpRequest.body;

    const userId = await dependency.verifyAccountService(data);

    const token = dependency.generateTokenService(userId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        credential: {
          jwt: token,
          userId
        }
      }
    });
  };
}
