import { RelationDao, UserProfile } from '../../utilities/types';

export default function makeBuildRelationDao() {
  return function buildRelationDao(): RelationDao {
    return Object.freeze({
      insert,
      remove,
      filterByFollowerId,
      filterByFollowingId
    });

    async function insert(): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }

    async function remove(): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }

    async function filterByFollowingId(
      followingId: string
    ): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }

    async function filterByFollowerId(
      followerId: string
    ): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }
  };
}
