import {
  BuildNewPost,
  IdHandler,
  NewPostInfo,
  NewPost,
  ImageHandler
} from '../../utilities/types';

export default function makeBuildNewPost(dependencies: {
  postIdHandler: IdHandler;
  userIdHandler: IdHandler;
  imageHandler: ImageHandler;
}): BuildNewPost {
  return function buildNewPost(newPostInfo: NewPostInfo): NewPost {
    const generatedPostId = dependencies.postIdHandler.getId();

    if (!dependencies.postIdHandler.isValid(generatedPostId)) {
      throw new Error('New Post must have a valid post id.');
    }

    if (!dependencies.userIdHandler.isValid(newPostInfo.postedUserId)) {
      throw new Error('New Post must have a valid posted user id.');
    }

    return Object.freeze({
      getId: () => generatedPostId,
      getDescription: () => newPostInfo.description ?? '',
      getLocation: () => newPostInfo.location ?? null,
      getTimeStamp: () => newPostInfo.timestamp,
      getEncodedImage: () => newPostInfo.encodedImage,
      getPostedUserId: () => newPostInfo.postedUserId,
      getImageSrc: async () => exportImage(newPostInfo.encodedImage)
    });

    async function exportImage(encodedImage: string): Promise<string> {
      return await dependencies.imageHandler.exports(encodedImage);
    }
  };
}
