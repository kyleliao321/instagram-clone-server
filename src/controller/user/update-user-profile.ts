import { Request } from 'express';
import { logger } from '../../infrastructure';
import { HttpError } from '../../utilities/http-error';
import { BadRequestError } from '../../utilities/http-error/http-errors';
import {
  Controller,
  HttpResponse,
  UpdateUserProfileRequestBody,
  UpdateUserProfileResponseBody,
  UpdateUserProfileService
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  updateUserProfileService: UpdateUserProfileService;
}): Controller<HttpResponse<UpdateUserProfileResponseBody>> {
  return async function updateUserProfile(
    request: Request
  ): Promise<HttpResponse<UpdateUserProfileResponseBody>> {
    try {
      const data: UpdateUserProfileRequestBody = request.body;

      const pathUserId = request.params.userId;

      const bodyUserId = data.id;

      if (pathUserId !== bodyUserId) {
        throw new BadRequestError(
          `HttpError.BadRequest: path id - ${pathUserId} is not compatible with body id - ${bodyUserId}`
        );
      }

      const userId = await dependency.updateUserProfileService(data);

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
