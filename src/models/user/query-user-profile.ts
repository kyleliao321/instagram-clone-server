import {
  BuildQueryUserProfile,
  QueryUserProfile,
  QueryUserProfileInfo,
  ImageHandler,
  IdHandler
} from '../../utilities/types';

export default function makeBuildQueryUserProfile(dependency: {
  idHandler: IdHandler;
  ImageHandler: ImageHandler;
}): BuildQueryUserProfile {
  return function buildQueryUserProfile(
    fetchedUserProfileInfo: QueryUserProfileInfo
  ): QueryUserProfile {
    if (!dependency.idHandler.isValid(fetchedUserProfileInfo.id)) {
      throw new Error('Fetched User Profile must have a valid user id.');
    }

    if (!dependency.ImageHandler.isValid(fetchedUserProfileInfo.imageSrc)) {
      throw new Error('Fetched User Profile must have a valid file path.');
    }

    if (fetchedUserProfileInfo.postNum < 0) {
      throw new Error(
        'Fetched User Profile must have a positive or at least zero posts.'
      );
    }

    if (fetchedUserProfileInfo.followerNum < 0) {
      throw new Error(
        'Fetched User Profile must have a positive or at least zero followers.'
      );
    }

    if (fetchedUserProfileInfo.followingNum < 0) {
      throw new Error(
        'Fetched User Profile must have a positive or at least zero followings.'
      );
    }

    return Object.freeze({
      getId: () => fetchedUserProfileInfo.id,
      getUserName: () => fetchedUserProfileInfo.userName,
      getAlias: () => fetchedUserProfileInfo.alias,
      getDescription: () => fetchedUserProfileInfo.description,
      getImageSrc: () => fetchedUserProfileInfo.imageSrc ?? null,
      getPostNum: () => fetchedUserProfileInfo.postNum,
      getFollowerNum: () => fetchedUserProfileInfo.followerNum,
      getFollowingNum: () => fetchedUserProfileInfo.followingNum
    });
  };
}
