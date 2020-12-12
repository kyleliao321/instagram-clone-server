import { PostRepository, Post, NewPost, PostDao } from '../../utilities/types';

export default function makeBuildPostRepository(dependencies: {
  postDao: PostDao;
}) {
  return function buildPostRepository(): PostRepository {
    return Object.freeze({
      getPost,
      getPosts,
      insertNewPost
    });

    async function getPost(postId: string): Promise<Post> {
      return await dependencies.postDao.getOne(postId);
    }

    async function getPosts(userId: string): Promise<Post[]> {
      return await dependencies.postDao.filterByPostedUserId(userId);
    }

    async function insertNewPost(newPost: NewPost): Promise<Post> {
      return await dependencies.postDao.insert(newPost);
    }
  };
}
