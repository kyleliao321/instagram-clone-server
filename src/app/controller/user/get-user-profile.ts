import { Request } from 'express';
import {
  Controller,
  GetUserProfileReponseBody,
  GetUserProfileService,
  HttpResponse
} from '../../utilities/types';

export default function makeGetUserProfile(dependency: {
  getUserProfileByIdService: GetUserProfileService;
}): Controller<HttpResponse<GetUserProfileReponseBody>> {
  return async function getUserProfile(
    request: Request
  ): Promise<HttpResponse<GetUserProfileReponseBody>> {
    const pathUserId = request.params.userId;

    const userProfile = await dependency.getUserProfileByIdService(pathUserId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        user: {
          id: userProfile.getId(),
          userName: userProfile.getUserName(),
          alias: userProfile.getAlias(),
          description: userProfile.getDescription(),
          imageSrc: userProfile.getImageSrc(),
          postNum: userProfile.getPostNum(),
          followerNum: userProfile.getFollowerNum(),
          followingNum: userProfile.getFollowingNum()
        }
      }
    });
  };
}
