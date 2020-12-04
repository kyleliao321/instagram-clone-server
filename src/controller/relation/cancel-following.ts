import { Request } from 'express';
import {
  CacnelFollowingService,
  CancelFollowingRequestBody,
  CancelFollowingResponseBody,
  Controller,
  HttpResponse,
  VerifyTokenService
} from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';

export default function makeCancelFollowing(dependencies: {
  verifyTokenService: VerifyTokenService;
  cancelFollowingService: CacnelFollowingService;
}): Controller<HttpResponse<CancelFollowingResponseBody>> {
  return async function cancelFollowing(
    req: Request
  ): Promise<HttpResponse<CancelFollowingResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const data: CancelFollowingRequestBody = req.body;

    if (tokenUserId !== data.followerId) {
      throw new UnauthorizedError(
        `HttpError.UnauthorizedError: ${tokenUserId}(user-id) is trying to act as ${data.followerId}(user-id) to cancel following relationship with ${data.followingId}(user-id).`
      );
    }

    const updatedFollowings = await dependencies.cancelFollowingService(data);

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
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
    };
  };
}
