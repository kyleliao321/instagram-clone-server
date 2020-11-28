import { Request } from 'express';
import {
  Controller,
  GetUserProfileReponseBody,
  GetUserProfileRequestBody,
  GetUserProfileService,
  HttpResponse
} from '../../utilities/types';
import { logger } from '../../infrastructure';
import { HttpError } from '../../utilities/http-error';
import { BadRequestError } from '../../utilities/http-error/http-errors';

export default function makeGetUserProfile(dependency: {
  getUserProfileByIdService: GetUserProfileService;
}): Controller<HttpResponse<GetUserProfileReponseBody>> {
  return async function getUserProfile(
    request: Request
  ): Promise<HttpResponse<GetUserProfileReponseBody>> {
    try {
      const data: GetUserProfileRequestBody = request.body;

      const pathUserId = request.params.userId;

      const bodyUserId = data.userId;

      if (pathUserId !== bodyUserId) {
        throw new BadRequestError(
          `HttpError.BadRequest: path id - ${pathUserId} is not compatible with body id - ${bodyUserId}`
        );
      }

      const userProfile = await dependency.getUserProfileByIdService(
        bodyUserId
      );

      return Object.freeze({
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: {
          id: userProfile.getId(),
          userName: userProfile.getUserName(),
          alias: userProfile.getAlias(),
          description: userProfile.getDescription(),
          imageSrc: userProfile.getImageSrc(),
          postNum: userProfile.getPostNum(),
          followerNum: userProfile.getFollowerNum(),
          followingNum: userProfile.getFollowingNum()
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
