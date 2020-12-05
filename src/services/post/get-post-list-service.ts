import {
  BuildQueryPost,
  GetPostListService,
  PostRepository,
  QueryPost
} from '../../utilities/types';

export default function makeGetPostListService(dependencies: {
  buildQueryPost: BuildQueryPost;
  postRepository: PostRepository;
}): GetPostListService {
  return async function getPostListService(
    userId: string
  ): Promise<QueryPost[]> {
    const posts = await dependencies.postRepository.getPosts(userId);

    return posts.map((post) => dependencies.buildQueryPost(post));
  };
}
