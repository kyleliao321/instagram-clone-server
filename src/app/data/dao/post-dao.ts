import Knex from 'knex';
import { NotFoundError } from '../../utilities/http-error';
import { NewPost, Post, PostDao } from '../../utilities/types';

export default function makeBuildPostDao(dependencies: { db: Knex }) {
  return function buildPostDao(): PostDao {
    return Object.freeze({
      insert,
      getOne,
      filterByPostedUserId
    });

    async function insert(newPost: NewPost): Promise<Post> {
      const imageSrc = await newPost.getImageSrc();

      await dependencies.db('posts_table').insert({
        post_id: newPost.getId(),
        location: newPost.getLocation(),
        created_at: newPost.getTimeStamp(),
        description: newPost.getDescription(),
        image_src: imageSrc,
        posted_user: newPost.getPostedUserId()
      });

      return Object.freeze({
        id: newPost.getId(),
        location: newPost.getLocation() ?? undefined,
        timestamp: newPost.getTimeStamp(),
        description: newPost.getDescription(),
        imageSrc: imageSrc,
        postedUserId: newPost.getPostedUserId()
      });
    }

    async function getOne(postId: string): Promise<Post> {
      const result = await dependencies
        .db('posts_table')
        .where('post_id', postId)
        .first();

      if (result) {
        return Object.freeze({
          id: result.post_id,
          location: result.location ?? undefined,
          timestamp: new Date(result.created_at).toISOString(),
          description: result.description ?? '',
          imageSrc: result.image_src,
          postedUserId: result.posted_user
        });
      }

      throw new NotFoundError('Post does not exist in database.');
    }

    async function filterByPostedUserId(userId: string): Promise<Post[]> {
      const result = await dependencies
        .db('posts_table')
        .where('posted_user', userId)
        .orderBy('created_at', 'desc');

      return result.map((post) => {
        return Object.freeze({
          id: post.post_id,
          location: post.location ?? undefined,
          timestamp: new Date(post.created_at).toISOString(),
          description: post.description ?? '',
          imageSrc: post.image_src,
          postedUserId: post.posted_user
        });
      });
    }
  };
}
