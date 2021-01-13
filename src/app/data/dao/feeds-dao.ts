import Knex from 'knex';
import { Feed, FeedsDao, GetFeedQuery } from '../../utilities/types';

export default function makeBuildFeedsDao(dependencies: { db: Knex }) {
  return function buildFeedsDao(): FeedsDao {
    return Object.freeze({
      getNextPage,
      getPreviousPage,
      getLatest
    });

    async function getFollowingIds(followerId: string): Promise<string[]> {
      const followingIds = await dependencies
        .db('user_relations_table')
        .select('following_id')
        .where('follower_id', followerId);

      return followingIds.map((f) => f.following_id);
    }

    async function getLatest(query: GetFeedQuery): Promise<Feed[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .select(
          dependencies.db.ref('user_id').withSchema('users_table'),
          dependencies.db.ref('user_name').withSchema('users_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('users_table')
            .as('user_image'),
          dependencies.db.ref('post_id').withSchema('posts_table'),
          dependencies.db.ref('location').withSchema('posts_table'),
          dependencies.db.ref('description').withSchema('posts_table'),
          dependencies.db.ref('created_at').withSchema('posts_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('posts_table')
            .as('post_image')
        )
        .whereIn('posted_user', followingIds)
        .innerJoin(
          'users_table',
          'posts_table.posted_user',
          'users_table.user_id'
        )
        .orderBy('created_at', 'desc')
        .limit(query.pageSize());

      return feeds.map((f) => {
        return Object.freeze({
          userId: f.user_id,
          userName: f.user_name,
          userImage: f.user_image ?? undefined,
          postId: f.post_id,
          location: f.location ?? undefined,
          description: f.description ?? '',
          timestamp: new Date(f.created_at).toISOString(),
          postImage: f.post_image
        });
      });
    }

    async function getNextPage(query: GetFeedQuery): Promise<Feed[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .select(
          dependencies.db.ref('user_id').withSchema('users_table'),
          dependencies.db.ref('user_name').withSchema('users_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('users_table')
            .as('user_image'),
          dependencies.db.ref('post_id').withSchema('posts_table'),
          dependencies.db.ref('location').withSchema('posts_table'),
          dependencies.db.ref('description').withSchema('posts_table'),
          dependencies.db.ref('created_at').withSchema('posts_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('posts_table')
            .as('post_image')
        )
        .whereIn('posted_user', followingIds)
        .andWhere('created_at', '<', query.after())
        .innerJoin(
          'users_table',
          'posts_table.posted_user',
          'users_table.user_id'
        )
        .orderBy('created_at', 'desc')
        .limit(query.pageSize());

      return feeds.map((f) => {
        return Object.freeze({
          userId: f.user_id,
          userName: f.user_name,
          userImage: f.user_image ?? undefined,
          postId: f.post_id,
          location: f.location ?? undefined,
          description: f.description ?? '',
          timestamp: new Date(f.created_at).toISOString(),
          postImage: f.post_image
        });
      });
    }

    async function getPreviousPage(query: GetFeedQuery): Promise<Feed[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .select(
          dependencies.db.ref('user_id').withSchema('users_table'),
          dependencies.db.ref('user_name').withSchema('users_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('users_table')
            .as('user_image'),
          dependencies.db.ref('post_id').withSchema('posts_table'),
          dependencies.db.ref('location').withSchema('posts_table'),
          dependencies.db.ref('description').withSchema('posts_table'),
          dependencies.db.ref('created_at').withSchema('posts_table'),
          dependencies.db
            .ref('image_src')
            .withSchema('posts_table')
            .as('post_image')
        )
        .whereIn('posted_user', followingIds)
        .andWhere('created_at', '>', query.before())
        .innerJoin(
          'users_table',
          'posts_table.posted_user',
          'users_table.user_id'
        )
        .orderBy('created_at', 'asc')
        .limit(query.pageSize());

      const formattedFeeds = feeds.map((f) => {
        return Object.freeze({
          userId: f.user_id,
          userName: f.user_name,
          userImage: f.user_image ?? undefined,
          postId: f.post_id,
          location: f.location ?? undefined,
          description: f.description ?? '',
          timestamp: new Date(f.created_at).toISOString(),
          postImage: f.post_image
        });
      });

      return formattedFeeds.reverse();
    }
  };
}
