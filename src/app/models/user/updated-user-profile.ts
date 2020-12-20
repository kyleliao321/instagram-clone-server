import { logger } from '../../infrastructure';
import {
  BuildUpdatedUserProfile,
  IdHandler,
  UpdatedUserProfileInfo,
  UpdatedUserProfile,
  ImageHandler
} from '../../utilities/types';

export default function makeBuildUpdatedUserProfile(dependencies: {
  idHandler: IdHandler;
  imageHandler: ImageHandler;
}): BuildUpdatedUserProfile {
  return function buildUpdatedUserProfile(
    updatedUserProfileInfo: UpdatedUserProfileInfo
  ): UpdatedUserProfile {
    if (!dependencies.idHandler.isValid(updatedUserProfileInfo.id)) {
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
      getEncodedImage: () => updatedUserProfileInfo.encodedImage ?? null,
      getPostNum: () => updatedUserProfileInfo.postNum,
      getFollowerNum: () => updatedUserProfileInfo.followerNum,
      getFollowingNum: () => updatedUserProfileInfo.followingNum,
      getImageSrc: async () => exportImage(updatedUserProfileInfo.encodedImage)
    });

    async function exportImage(encodedImage?: string): Promise<string | null> {
      if (!encodedImage) {
        return null;
      }

      try {
        return await dependencies.imageHandler.exports(encodedImage);
      } catch (e) {
        logger.error(e);
        return null;
      }
    }
  };
}
