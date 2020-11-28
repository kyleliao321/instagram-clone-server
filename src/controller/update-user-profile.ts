import { Request } from 'express';
import { logger } from '../infrastructure';
import { HttpError } from '../utilities/http-error';
import {
  Controller,
  HttpResponse,
  UpdateUserProfileRequestBody,
  UpdateUserProfileResponseBody,
  UpdateUserProfileService
} from '../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  updateUserProfile: UpdateUserProfileService;
}): Controller<HttpResponse<UpdateUserProfileResponseBody>> {
  return async function updateUserProfile(
    request: Request
  ): Promise<HttpResponse<UpdateUserProfileResponseBody>> {
    try {
      const data: UpdateUserProfileRequestBody = request.body;

      const userId = await dependency.updateUserProfile(data);

      return Object.freeze({
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: {
          userId
        }
      });
    } catch (e) {
      logger.info(JSON.stringify(e));

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
