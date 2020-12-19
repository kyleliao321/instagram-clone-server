import { NewPost, Post, PostDao } from '../../utilities/types';

export default function makeBuildPostDao() {
  return function buildPostDao(): PostDao {
    return Object.freeze({
      insert,
      getOne,
      filterByPostedUserId
    });

    async function insert(newPost: NewPost): Promise<Post> {
      throw new Error('Not yet implemented.');
    }

    async function getOne(postId: string): Promise<Post> {
      throw new Error('Not yet implemented.');
    }

    async function filterByPostedUserId(userId: string): Promise<Post[]> {
      throw new Error('Not yet implemented.');
    }
  };
}
