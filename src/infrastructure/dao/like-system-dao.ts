import { LikeSystemDao, UserProfile } from '../../utilities/types';

export default function makeBuildLikeSystemDao() {
  return function buildLikeSystemDao(): LikeSystemDao {
    return Object.freeze({
      insert,
      remove,
      filterByPostId
    });

    async function insert(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }

    async function remove(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }

    async function filterByPostId(postId: string): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }
  };
}
