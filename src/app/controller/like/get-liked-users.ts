import { Request } from 'express';
import {
  Controller,
  GetLikedUserListService,
  GetLikedUsersResponseBody,
  HttpResponse
} from '../../utilities/types';

export default function makeGetLikedUsers(dependencies: {
  getLikedUserListService: GetLikedUserListService;
}): Controller<HttpResponse<GetLikedUsersResponseBody>> {
  return async function getLikedUsers(
    req: Request
  ): Promise<HttpResponse<GetLikedUsersResponseBody>> {
    const postId = req.query.postId as string;

    const likedUsers = await dependencies.getLikedUserListService(postId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        likedUsers: likedUsers.map((userProfile) => {
          return Object.freeze({
            id: userProfile.getId(),
            userName: userProfile.getUserName(),
            alias: userProfile.getAlias(),
            description: userProfile.getDescription(),
            imageSrc: userProfile.getImageSrc(),
            postNum: userProfile.getPostNum(),
            followerNum: userProfile.getFollowerNum(),
            followingNum: userProfile.getFollowingNum()
          });
        })
      }
    });
  };
}
