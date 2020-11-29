import { Request } from 'express';
import { logger } from '../../infrastructure';
import {
  HttpError,
  BadRequestError,
  ForbiddenError
} from '../../utilities/http-error';
import {
  Controller,
  HttpResponse,
  UpdateUserProfileRequestBody,
  UpdateUserProfileResponseBody,
  UpdateUserProfileService,
  VerifyTokenService
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  verifyTokenService: VerifyTokenService;
  updateUserProfileService: UpdateUserProfileService;
}): Controller<HttpResponse<UpdateUserProfileResponseBody>> {
  return async function updateUserProfile(
    request: Request
  ): Promise<HttpResponse<UpdateUserProfileResponseBody>> {
    try {
      const tokenUserId = dependency.verifyTokenService(
        request.headers.authorization
      );

      const data: UpdateUserProfileRequestBody = request.body;

      const pathUserId = request.params.userId;

      const bodyUserId = data.id;

      if (pathUserId !== bodyUserId) {
        throw new BadRequestError(
          `HttpError.BadRequest: path id ${pathUserId} is not compatible with body id ${bodyUserId}`
        );
      }

      if (tokenUserId !== bodyUserId) {
        throw new ForbiddenError(
          `HttpError.ForbiddenError: user ${tokenUserId} trying to update other user's profile ${bodyUserId}`
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
