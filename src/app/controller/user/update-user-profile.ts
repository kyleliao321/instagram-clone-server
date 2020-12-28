import { Request } from 'express';
import { BadRequestError, ForbiddenError } from '../../utilities/http-error';
import {
  Controller,
  HttpResponse,
  UpdateAccountService,
  UpdateUserProfileRequestBody,
  UpdateUserProfileResponseBody,
  UpdateUserProfileService,
  VerifyTokenService
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependencies: {
  verifyTokenService: VerifyTokenService;
  updateUserProfileService: UpdateUserProfileService;
  updateAccountService: UpdateAccountService;
}): Controller<HttpResponse<UpdateUserProfileResponseBody>> {
  return async function updateUserProfile(
    request: Request
  ): Promise<HttpResponse<UpdateUserProfileResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      request.headers.authorization
    );

    const data: UpdateUserProfileRequestBody = request.body;

    const pathUserId = request.params.userId;

    const bodyUserId = data.id;

    if (pathUserId !== bodyUserId) {
      throw new BadRequestError(
        `path id ${pathUserId} is not compatible with body id ${bodyUserId}`
      );
    }

    if (tokenUserId !== bodyUserId) {
      throw new ForbiddenError(
        `${tokenUserId}(user-id) trying to act as ${bodyUserId} to update its profile.`
      );
    }

    const userId = await dependencies.updateUserProfileService(data);

    if (data.userName) {
      await dependencies.updateAccountService({
        id: data.id,
        userName: data.userName
      });
    }

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        userId
      }
    });
  };
}
