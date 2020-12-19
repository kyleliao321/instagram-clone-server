import Knex from 'knex';
import { LikeSystemDao, UserProfile } from '../../utilities/types';

export default function makeBuildLikeSystemDao(dependencies: { db: Knex }) {
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
      await dependencies
        .db('user_post_relations_table')
        .insert({ user_id: userId, post_id: postId });

      return await filterByPostId(postId);
    }

    async function remove(
      userId: string,
      postId: string
    ): Promise<UserProfile[]> {
      await dependencies
        .db('user_post_relations_table')
        .where('user_id', userId)
        .andWhere('post_id', postId)
        .del();

      return await filterByPostId(postId);
    }

    async function filterByPostId(postId: string): Promise<UserProfile[]> {
      const result = await dependencies
        .db('user_post_relations_table')
        .where('post_id', postId)
        .join(
          'users_table',
          'user_post_relations_table.user_id',
          '=',
          'users_table.user_id'
        )
        .select(
          'users_table.user_id',
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
