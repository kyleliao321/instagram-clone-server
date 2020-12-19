import { Request } from 'express';
import {
  GetFollowerListService,
  Controller,
  HttpResponse,
  GetFollowersResponseBody,
  GetFollowersRequestBody
} from '../../utilities/types';

export default function makeGetFollowers(dependencies: {
  getFollowerListService: GetFollowerListService;
}): Controller<HttpResponse<GetFollowersResponseBody>> {
  return async function getFollowers(
    req: Request
  ): Promise<HttpResponse<GetFollowersResponseBody>> {
    const data: GetFollowersRequestBody = req.body;

    const followers = await dependencies.getFollowerListService(data.userId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        followers: followers.map((userProfile) => {
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
