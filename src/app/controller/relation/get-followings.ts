import { Request } from 'express';
import {
  GetFollowingListService,
  Controller,
  HttpResponse,
  GetFollowingsResponseBody
} from '../../utilities/types';

export default function makeGetFollowings(dependencies: {
  getFollowingListService: GetFollowingListService;
}): Controller<HttpResponse<GetFollowingsResponseBody>> {
  return async function getFollowings(
    req: Request
  ): Promise<HttpResponse<GetFollowingsResponseBody>> {
    const userId = req.params.userId;

    const followers = await dependencies.getFollowingListService(userId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        followings: followers.map((userProfile) => {
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
