import { LikeSystemRepository, UserProfile } from '../../utilities/types';
import { NoContentError } from '../../utilities/http-error';

export default function makeBuildLikeSystemRepository() {
  const likeTable = new Map<string, UserProfile[]>(); // postId - likedUsers

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
      const originalLikedUsers = await getLikedUsers(postId);

      const updatedLikedUsers: UserProfile[] = [
        ...originalLikedUsers,
        {
          id: userId,
          userName: 'likedUserName',
          alias: 'likedUserAlias',
          description: 'likedUserDes',
          postNum: 0,
          followerNum: 1,
          followingNum: 2
        }
      ];

      likeTable.set(postId, updatedLikedUsers);

      return updatedLikedUsers;
    }

    async function dislikePost(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      const originalLikedUsers = await getLikedUsers(postId);

      const updatedLikedUsers = originalLikedUsers.filter(
        (userProfile) => userProfile.id !== userId
      );

      likeTable.set(postId, updatedLikedUsers);

      return updatedLikedUsers;
    }

    async function getLikedUsers(postId: string): Promise<UserProfile[]> {
      if (!likeTable.has(postId)) {
        throw new NoContentError(
          `${postId}(post-id) is not exist in database.`
        );
      }

      return likeTable.get(postId);
    }
  };
}
