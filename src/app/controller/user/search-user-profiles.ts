import { Request } from 'express';
import {
  Controller,
  GetUserProfileListService,
  HttpResponse,
  SearchUserProfilesResponseBody
} from '../../utilities/types';

export default function makeSearchUserProfiles(dependency: {
  getUserProfileListService: GetUserProfileListService;
}): Controller<HttpResponse<SearchUserProfilesResponseBody>> {
  return async function searchUserProfiles(
    request: Request
  ): Promise<HttpResponse<SearchUserProfilesResponseBody>> {
    const userName = request.query.userName as string;

    const userProfiles = await dependency.getUserProfileListService(userName);

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        users: userProfiles.map((userProfile) => {
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
