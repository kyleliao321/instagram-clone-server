import { Request } from 'express';
import {
  Controller,
  GetUserProfileReponseBody,
  GetUserProfileRequestBody,
  GetUserProfileService,
  HttpResponse
} from '../utilities/types';
import { logger } from '../infrastructure';
import { HttpError } from '../utilities/http-error';

export default function makeGetUserProfile(dependency: {
  getUserProfileById: GetUserProfileService;
}): Controller<HttpResponse<GetUserProfileReponseBody>> {
  return async function getUserProfile(
    request: Request
  ): Promise<HttpResponse<GetUserProfileReponseBody>> {
    try {
      const data: GetUserProfileRequestBody = request.body;

      const userId = data.userId;

      const userProfile = await dependency.getUserProfileById(userId);

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
