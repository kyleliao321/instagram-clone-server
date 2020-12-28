import { Request } from 'express';
import { ForbiddenError } from '../../utilities/http-error';
import {
  Controller,
  FollowUserRequestBody,
  FollowUserResponseBody,
  FollowUserService,
  GetUserProfileService,
  HttpResponse,
  UpdateUserProfileService,
  VerifyTokenService
} from '../../utilities/types';

export default function makeFollowUser(dependencies: {
  followUserService: FollowUserService;
  verifyTokenService: VerifyTokenService;
  getUserProfileByIdService: GetUserProfileService;
  updateUserProfileService: UpdateUserProfileService;
}): Controller<HttpResponse<FollowUserResponseBody>> {
  return async function followUser(
    req: Request
  ): Promise<HttpResponse<FollowUserResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const data: FollowUserRequestBody = req.body;

    if (tokenUserId !== data.followerId) {
      throw new ForbiddenError(
        `${tokenUserId}(user-id) trying to act as ${data.followerId}(user-id) to follow ${data.followingId}(user-id).`
      );
    }

    const updatedFollowings = await dependencies.followUserService(data);

    const followerUserProfile = await dependencies.getUserProfileByIdService(
      data.followerId
    );
    const followingUserProfile = await dependencies.getUserProfileByIdService(
      data.followingId
    );

    await dependencies.updateUserProfileService({
      id: followerUserProfile.getId(),
      followingNum: followerUserProfile.getFollowingNum() + 1
    });

    await dependencies.updateUserProfileService({
      id: followingUserProfile.getId(),
      followingNum: followingUserProfile.getFollowingNum() + 1
    });

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201,
      body: {
        followings: updatedFollowings.map((userProfile) => {
          return {
            id: userProfile.getId(),
            userName: userProfile.getUserName(),
            alias: userProfile.getAlias(),
            description: userProfile.getDescription(),
            imageSrc: userProfile.getImageSrc(),
            postNum: userProfile.getPostNum(),
            followerNum: userProfile.getFollowerNum(),
            followingNum: userProfile.getFollowingNum()
          };
        })
      }
    });
  };
}
