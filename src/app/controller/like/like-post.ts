import { Request } from 'express';
import { UnauthorizedError } from '../../utilities/http-error';
import {
  Controller,
  HttpResponse,
  LikePostRequestBody,
  LikePostResponseBody,
  LikePostService,
  VerifyTokenService
} from '../../utilities/types';

export default function makeLikePost(dependencies: {
  verifyTokenService: VerifyTokenService;
  likePostService: LikePostService;
}): Controller<HttpResponse<LikePostResponseBody>> {
  return async function likePost(
    req: Request
  ): Promise<HttpResponse<LikePostResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const data: LikePostRequestBody = req.body;

    if (tokenUserId !== data.userId) {
      throw new UnauthorizedError(
        `${tokenUserId}(user-id) is trying to act as ${data.userId}(user-id) to like post - ${data.postId}.`
      );
    }

    const updatedLikedUsers = await dependencies.likePostService(data);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201,
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
