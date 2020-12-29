import { logger } from '../../infrastructure';
import {
  BuildNewUserProfile,
  IdHandler,
  ImageHandler,
  NewUserProfile,
  NewUserProfileInfo
} from '../../utilities/types';

export default function makeBuildNewUserProfile(dependencies: {
  idHandler: IdHandler;
  imageHandler: ImageHandler;
}): BuildNewUserProfile {
  return function buildNewUserProfile(
    newUserProfileInfo: NewUserProfileInfo
  ): NewUserProfile {
    if (!dependencies.idHandler.isValid(newUserProfileInfo.id)) {
      throw new Error('User Profile must have a valid id.');
    }

    return Object.freeze({
      getId: () => newUserProfileInfo.id,
      getUserName: () => newUserProfileInfo.userName,
      getAlias: () => newUserProfileInfo.alias ?? newUserProfileInfo.userName,
      getDescription: () => newUserProfileInfo.description ?? null,
      getEncodedImage: () => newUserProfileInfo.encodedImage ?? null,
      getImageSrc: async () =>
        await exportImage(newUserProfileInfo.encodedImage)
    });

    async function exportImage(encodedImage?: string): Promise<string | null> {
      if (!encodedImage) {
        return null;
      }

      try {
        return await dependencies.imageHandler.exports(encodedImage);
      } catch (e) {
        if (e instanceof Error) {
          logger.warn(`Cannot export encoded image as file: ${e.stack}`);
        } else {
          logger.warn(
            `Cannot export encoded image as file: ${JSON.stringify(e)}`
          );
        }
        return null;
      }
    }
  };
}
