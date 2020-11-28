import { Request } from 'express';
import { logger } from '../../infrastructure';
import { HttpError } from '../../utilities/http-error';
import {
  AddNewAccountService,
  AddNewUserProfileService,
  HttpResponse,
  NewUserProfileInfo,
  Controller,
  RegisterResponseBody,
  RegisterRequestBody
} from '../../utilities/types';

export default function makeRegister(dependency: {
  addNewAccountService: AddNewAccountService;
  addNewUserProfileService: AddNewUserProfileService;
}): Controller<HttpResponse<RegisterResponseBody>> {
  return async function register(
    httpRequest: Request
  ): Promise<HttpResponse<RegisterResponseBody>> {
    try {
      const data: RegisterRequestBody = httpRequest.body;

      const generatedId = await dependency.addNewAccountService(data);

      const newUserProfileInfo: NewUserProfileInfo = {
        id: generatedId,
        userName: data.userName
      };

      await dependency.addNewUserProfileService(newUserProfileInfo);

      return Object.freeze({
        headers: {
          'Content-Type': 'application/json'
        },
        status: 201
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
      }
      return Object.freeze({
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      });
    }
  };
}
