import {
  RelationDao,
  RelationRepository,
  UserProfile
} from '../../utilities/types';

export default function makeBuildRelationRepository(dependencies: {
  relationDao: RelationDao;
}) {
  return function buildRelationRepository(): RelationRepository {
    return Object.freeze({
      getFollowers,
      getFollowings,
      followUser,
      cancelFollowing
    });

    async function getFollowers(userId: string): Promise<UserProfile[]> {
      return await dependencies.relationDao.filterByFollowingId(userId);
    }

    async function getFollowings(userId: string): Promise<UserProfile[]> {
      return await dependencies.relationDao.filterByFollowerId(userId);
    }

    async function followUser(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      return await dependencies.relationDao.insert(followerId, followingId);
    }

    async function cancelFollowing(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      return await dependencies.relationDao.remove(followerId, followingId);
    }
  };
}
