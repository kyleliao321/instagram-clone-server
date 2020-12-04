import { RelationRepository, UserProfile } from '../../utilities/types';
import { NoContentError } from '../../utilities/http-error';

export default function makeBuildRelationRepository() {
  const followingTable = new Map<string, UserProfile[]>(); // followerId - following-users;

  const followerTable = new Map<string, UserProfile[]>(); // followingId - follower-users;

  return function buildRelationRepository(): RelationRepository {
    return Object.freeze({
      getFollowers,
      getFollowings,
      followUser,
      cancelFollowing
    });

    async function getFollowers(userId: string): Promise<UserProfile[]> {
      if (!followerTable.has(userId)) {
        throw new NoContentError(
          `user id ${userId} does not exist in database.`
        );
      }

      return followerTable.get(userId);
    }

    async function getFollowings(userId: string): Promise<UserProfile[]> {
      if (!followingTable.has(userId)) {
        throw new NoContentError(
          `user id ${userId} does not exist in database.`
        );
      }

      return followingTable.get(userId);
    }

    async function followUser(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      const originalFollowings = await getFollowings(followerId);

      const originalFollowers = await getFollowers(followingId);

      const updatedFollowings = [
        ...originalFollowings,
        {
          id: followingId,
          userName: 'mockFollowingUserName',
          alias: 'mockFollowingAlias',
          description: 'mockFollowingDescription',
          postNum: 0,
          followerNum: 1,
          followingNum: 2
        }
      ];

      const updatedFollowers = [
        ...originalFollowers,
        {
          id: followerId,
          userName: 'mockFollowerUserName',
          alias: 'mockFollowerAlias',
          description: 'mockFollowerDescription',
          postNum: 0,
          followerNum: 1,
          followingNum: 2
        }
      ];

      followingTable.set(followerId, updatedFollowings);

      followerTable.set(followingId, updatedFollowers);

      return updatedFollowings;
    }

    async function cancelFollowing(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      const originalFollowings = await getFollowings(followerId);

      const originalFollowers = await getFollowers(followingId);

      const updatedFollowings = originalFollowings.filter(
        (userProfile) => userProfile.id !== followingId
      );

      const updatedFollowers = originalFollowers.filter(
        (userProfile) => userProfile.id !== followerId
      );

      followingTable.set(followerId, updatedFollowings);

      followerTable.set(followerId, updatedFollowers);

      return updatedFollowings;
    }
  };
}
