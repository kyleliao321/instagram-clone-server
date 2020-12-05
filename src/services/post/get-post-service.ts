import {
  BuildQueryPost,
  GetPostService,
  PostRepository,
  QueryPost
} from '../../utilities/types';

export default function makeGetPostService(dependencies: {
  buildQueryPost: BuildQueryPost;
  postRepository: PostRepository;
}): GetPostService {
  return async function getPostService(postId: string): Promise<QueryPost> {
    const post = await dependencies.postRepository.getPost(postId);

    return Object.freeze({
      getId: () => post.id,
      getDescription: () => post.description ?? '',
      getLocation: () => post.location ?? null,
      getTimeStamp: () => post.timestamp,
      getImageSrc: () => post.imageSrc,
      getPostedUserId: () => post.postedUserId
    });
  };
}
