import { Request } from 'express';
import { ForbiddenError } from '../../utilities/http-error';
import {
  Controller,
  HttpResponse,
  DislikePostResponseBody,
  DislikePostService,
  VerifyTokenService
} from '../../utilities/types';

export default function makeDislikePost(dependencies: {
  verifyTokenService: VerifyTokenService;
  dislikePostService: DislikePostService;
}): Controller<HttpResponse<DislikePostResponseBody>> {
  return async function dislikePost(
    req: Request
  ): Promise<HttpResponse<DislikePostResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const userId = req.params.userId;
    const postId = req.params.postId;

    if (tokenUserId !== userId) {
      throw new ForbiddenError(
        `${tokenUserId}(user-id) is trying to act as ${userId}(user-id) to dislike post - ${postId}.`
      );
    }

    const updatedLikedUsers = await dependencies.dislikePostService({
      userId,
      postId
    });

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        likedUsers: updatedLikedUsers.map((userProfile) => {
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
