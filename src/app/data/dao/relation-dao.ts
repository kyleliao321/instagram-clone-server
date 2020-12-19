import Knex from 'knex';
import { RelationDao, UserProfile } from '../../utilities/types';

export default function makeBuildRelationDao(dependencies: { db: Knex }) {
  return function buildRelationDao(): RelationDao {
    return Object.freeze({
      insert,
      remove,
      filterByFollowerId,
      filterByFollowingId
    });

    async function insert(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      await dependencies.db('user_relations_table').insert({
        follower_id: followerId,
        following_id: followingId
      });

      return await filterByFollowerId(followerId);
    }

    async function remove(
      followerId: string,
      followingId: string
    ): Promise<UserProfile[]> {
      await dependencies
        .db('user_relations_table')
        .where('follower_id', followerId)
        .andWhere('following_id', followingId)
        .del();

      return await filterByFollowerId(followerId);
    }

    async function filterByFollowingId(
      followingId: string
    ): Promise<UserProfile[]> {
      const result = await dependencies
        .db('user_relations_table')
        .where('following_id', followingId)
        .join(
          'users_table',
          'user_relations_table.follower_id',
          '=',
          'users_table.user_id'
        )
        .select(
          'user_id',
          'user_name',
          'alias',
          'description',
          'image_src',
          'post_num',
          'follower_num',
          'following_num'
        );

      return result.map((user) => {
        return {
          id: user.user_id,
          userName: user.user_name,
          alias: user.alias,
          description: user.description ?? '',
          imageSrc: user.image_src ?? undefined,
          postNum: user.post_num,
          followerNum: user.follower_num,
          followingNum: user.following_num
        };
      });
    }

    async function filterByFollowerId(
      followerId: string
    ): Promise<UserProfile[]> {
      const result = await dependencies
        .db('user_relations_table')
        .where('follower_id', followerId)
        .join(
          'users_table',
          'user_relations_table.following_id',
          '=',
          'users_table.user_id'
        )
        .select(
          'user_id',
          'user_name',
          'alias',
          'description',
          'image_src',
          'post_num',
          'follower_num',
          'following_num'
        );

      return result.map((user) => {
        return {
          id: user.user_id,
          userName: user.user_name,
          alias: user.alias,
          description: user.description ?? '',
          imageSrc: user.image_src ?? undefined,
          postNum: user.post_num,
          followerNum: user.follower_num,
          followingNum: user.following_num
        };
      });
    }
  };
}
