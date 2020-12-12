import {
  LikeSystemDao,
  LikeSystemRepository,
  UserProfile
} from '../../utilities/types';

export default function makeBuildLikeSystemRepository(dependencies: {
  likeSystemDao: LikeSystemDao;
}) {
  return function buildLikeSystemRepository(): LikeSystemRepository {
    return Object.freeze({
      likePost,
      dislikePost,
      getLikedUsers
    });

    async function likePost(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      return await dependencies.likeSystemDao.insert(userId, postId);
    }

    async function dislikePost(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      return await dependencies.likeSystemDao.remove(userId, postId);
    }

    async function getLikedUsers(postId: string): Promise<UserProfile[]> {
      return await dependencies.likeSystemDao.filterByPostId(postId);
    }
  };
}
