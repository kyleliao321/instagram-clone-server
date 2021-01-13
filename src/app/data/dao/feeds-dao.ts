import Knex from 'knex';
import { FeedsDao, GetFeedQuery, Post } from '../../utilities/types';

export default function makeBuildFeedsDao(dependencies: { db: Knex }) {
  return function buildFeedsDao(): FeedsDao {
    return Object.freeze({
      getNextPage,
      getPreviousPage,
      getLatest
    });

    async function getLatest(query: GetFeedQuery): Promise<Post[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .whereIn('posted_user', followingIds)
        .orderBy('created_at', 'desc')
        .limit(query.pageSize());

      return feeds.map((f) => {
        return Object.freeze({
          id: f.post_id,
          location: f.location ?? undefined,
          timestamp: new Date(f.created_at).toISOString(),
          description: f.description ?? '',
          imageSrc: f.image_src,
          postedUserId: f.posted_user
        });
      });
    }

    async function getNextPage(query: GetFeedQuery): Promise<Post[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .whereIn('posted_user', followingIds)
        .andWhere('created_at', '<', query.after())
        .orderBy('created_at', 'desc')
        .limit(query.pageSize());

      return feeds.map((f) => {
        return Object.freeze({
          id: f.post_id,
          location: f.location ?? undefined,
          timestamp: new Date(f.created_at).toISOString(),
          description: f.description ?? '',
          imageSrc: f.image_src,
          postedUserId: f.posted_user
        });
      });
    }

    async function getPreviousPage(query: GetFeedQuery): Promise<Post[]> {
      const followingIds = await getFollowingIds(query.userId());

      const feeds = await dependencies
        .db('posts_table')
        .whereIn('posted_user', followingIds)
        .andWhere('created_at', '>', query.before())
        .orderBy('created_at', 'asc')
        .limit(query.pageSize());

      const formattedFeeds = feeds.map((f) => {
        return Object.freeze({
          id: f.post_id,
          location: f.location ?? undefined,
          timestamp: new Date(f.created_at).toISOString(),
          description: f.description ?? '',
          imageSrc: f.image_src,
          postedUserId: f.posted_user
        });
      });

      return formattedFeeds.reverse();
    }

    async function getFollowingIds(followerId: string): Promise<string[]> {
      const followingIds = await dependencies
        .db('user_relations_table')
        .select('following_id')
        .where('follower_id', followerId);

      return followingIds.map((f) => f.following_id);
    }
  };
}
