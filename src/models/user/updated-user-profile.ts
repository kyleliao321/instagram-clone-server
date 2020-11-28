import {
  BuildUpdatedUserProfile,
  IdHandler,
  UpdatedUserProfileInfo,
  UpdatedUserProfile
} from '../../utilities/types';

export default function makeBuildUpdatedUserProfile(dependency: {
  idHandler: IdHandler;
}): BuildUpdatedUserProfile {
  return function buildUpdatedUserProfile(
    updatedUserProfileInfo: UpdatedUserProfileInfo
  ): UpdatedUserProfile {
    if (!dependency.idHandler.isValid(updatedUserProfileInfo.id)) {
      throw new Error('Updated User Profile must have a valid id.');
    }

    if (updatedUserProfileInfo.postNum < 0) {
      throw new Error(
        'Updated User Profile must have positive or at least zero posts.'
      );
    }

    if (updatedUserProfileInfo.followerNum < 0) {
      throw new Error(
        'Updated User Profile must have positive or at least zero followers.'
      );
    }

    if (updatedUserProfileInfo.followingNum < 0) {
      throw new Error(
        'Updated User Profile must have positive or at least zero followings.'
      );
    }

    return Object.freeze({
      getId: () => updatedUserProfileInfo.id,
      getUserName: () => updatedUserProfileInfo.userName,
      getAlias: () => updatedUserProfileInfo.alias,
      getDescription: () => updatedUserProfileInfo.description,
      getImageByteArray: () => updatedUserProfileInfo.imageByteArray ?? null,
      getPostNum: () => updatedUserProfileInfo.postNum,
      getFollowerNum: () => updatedUserProfileInfo.followerNum,
      getFollowingNum: () => updatedUserProfileInfo.followingNum
    });
  };
}
