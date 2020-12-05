import { PostRepository, Post, NewPost } from '../../utilities/types';
import { NoContentError } from '../../utilities/http-error';

export default function makeBuildPostRepository() {
  const postTable = new Map<string, Post>();

  return function buildPostRepository(): PostRepository {
    return Object.freeze({
      getPost,
      getPosts,
      insertNewPost
    });

    async function getPost(postId: string): Promise<Post> {
      if (!postTable.has(postId)) {
        throw new NoContentError(
          `${postId}(post-id) is not exist in database.`
        );
      }

      return postTable.get(postId);
    }

    async function getPosts(userId: string): Promise<Post[]> {
      const postArray = Array.from(postTable.values());

      return postArray.filter((post) => post.postedUserId === userId);
    }

    async function insertNewPost(newPost: NewPost): Promise<Post> {
      if (!postTable.has(newPost.getId())) {
        throw new Error(
          `${newPost.getId()}(post-id) is already exist in database.`
        );
      }

      const addedPost: Post = {
        id: newPost.getId(),
        description: newPost.getDescription(),
        location: newPost.getLocation(),
        timestamp: newPost.getTimeStamp(),
        imageSrc: newPost.getEncodedImage(),
        postedUserId: newPost.getPostedUserId()
      };

      postTable.set(newPost.getId(), addedPost);

      return addedPost;
    }
  };
}
