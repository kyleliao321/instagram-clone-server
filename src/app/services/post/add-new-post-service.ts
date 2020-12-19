import {
  AddNewPostService,
  BuildNewPost,
  PostRepository,
  NewPostInfo,
  QueryPost,
  BuildQueryPost
} from '../../utilities/types';

export default function makeAddNewPostService(dependencies: {
  buildNewPost: BuildNewPost;
  buildQueryPost: BuildQueryPost;
  postRepository: PostRepository;
}): AddNewPostService {
  return async function addNewPostService(
    newPostInfo: NewPostInfo
  ): Promise<QueryPost> {
    const newPost = dependencies.buildNewPost(newPostInfo);

    const addedPost = await dependencies.postRepository.insertNewPost(newPost);

    return dependencies.buildQueryPost(addedPost);
  };
}
