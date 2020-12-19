import {
  BuildQueryPost,
  IdHandler,
  ImageHandler,
  Post,
  QueryPost
} from '../../utilities/types';

export default function makeBuildQueryPost(dependencies: {
  postIdHandler: IdHandler;
  userIdHandler: IdHandler;
  imageHandler: ImageHandler;
}): BuildQueryPost {
  return function buildQueryPost(queryPostInfo: Post): QueryPost {
    if (!dependencies.postIdHandler.isValid(queryPostInfo.id)) {
      throw new Error('Query Post must have a valid post id.');
    }

    if (!dependencies.userIdHandler.isValid(queryPostInfo.postedUserId)) {
      throw new Error('Query Post must have a valid posted user id.');
    }

    if (!dependencies.imageHandler.isValid(queryPostInfo.imageSrc)) {
      throw new Error('Query Post must have a valid image source.');
    }

    return Object.freeze({
      getId: () => queryPostInfo.id,
      getDescription: () => queryPostInfo.description,
      getLocation: () => queryPostInfo.location ?? null,
      getTimeStamp: () => queryPostInfo.timestamp,
      getImageSrc: () => queryPostInfo.imageSrc,
      getPostedUserId: () => queryPostInfo.postedUserId
    });
  };
}
