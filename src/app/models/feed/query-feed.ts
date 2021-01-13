import {
  BuildQueryFeed,
  Feed,
  IdHandler,
  ImageHandler,
  QueryFeed
} from '../../utilities/types';

export default function makeBuildQueryFeed(dependencies: {
  imageHandler: ImageHandler;
  idHandler: IdHandler;
}): BuildQueryFeed {
  return function buildQueryFeed(data: Feed): QueryFeed {
    if (!dependencies.imageHandler.isValid(data.postImage)) {
      throw new Error('Feed should have a valid post image.');
    }

    if (
      data.userImage !== undefined &&
      !dependencies.imageHandler.isValid(data.userImage)
    ) {
      throw new Error('Feed should have a valid user image.');
    }

    if (!dependencies.idHandler.isValid(data.userId)) {
      throw new Error('Feed should have a valid user id');
    }

    if (!dependencies.idHandler.isValid(data.postId)) {
      throw new Error('Feed should have a valid post id');
    }

    return Object.freeze({
      userId: () => data.userId,
      userName: () => data.userName,
      userImage: () => data.userImage ?? null,
      postId: () => data.postId,
      location: () => data.location ?? '',
      description: () => data.description,
      timestamp: () => data.timestamp,
      postImage: () => data.postImage
    });
  };
}
