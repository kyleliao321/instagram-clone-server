import { Request } from 'express';
import { logger } from '../infrastructure';
import { HttpError } from '../utilities/http-errors';
import {
  AddNewAccountService,
  AddNewUserProfileService,
  HttpResponse,
  NewAccountInfo,
  NewUserProfileInfo,
  Controller,
  RegisterResponseBody
} from '../utilities/types';

export default function makeRegister(dependency: {
  addNewAccount: AddNewAccountService;
  addNewUserProfile: AddNewUserProfileService;
}): Controller<RegisterResponseBody> {
  return async function register(
    httpRequest: Request
  ): Promise<HttpResponse<RegisterResponseBody>> {
    try {
      const data: NewAccountInfo = httpRequest.body;

      const generatedId = await dependency.addNewAccount(data);

      const newUserProfileInfo: NewUserProfileInfo = {
        id: generatedId,
        userName: data.userName
      };

      await dependency.addNewUserProfile(newUserProfileInfo);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 201
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
      }
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      };
    }
  };
}
