import Knex from 'knex';
import { ConflictError, NotFoundError } from '../../utilities/http-error';
import {
  UserDao,
  NewUserProfile,
  UpdatedUserProfile,
  UserProfile
} from '../../utilities/types';

export default function makeBuildUserDao(dependencies: { db: Knex }) {
  return function buildUserDao(): UserDao {
    return Object.freeze({
      insert,
      update,
      getOne,
      filter
    });

    async function insert(newUserProfile: NewUserProfile): Promise<string> {
      await dependencies.db('users_table').insert({
        user_id: newUserProfile.getId(),
        user_name: newUserProfile.getUserName(),
        alias: newUserProfile.getAlias(),
        description: newUserProfile.getDescription(),
        image_src: await newUserProfile.getImageSrc()
      });

      return newUserProfile.getId();
    }

    async function update(
      updatedUserProfile: UpdatedUserProfile
    ): Promise<string> {
      const updatedImageSrc = await updatedUserProfile.getImageSrc();

      try {
        if (updatedImageSrc) {
          await dependencies
            .db('users_table')
            .where('user_id', updatedUserProfile.getId())
            .update({
              user_name: updatedUserProfile.getUserName(),
              alias: updatedUserProfile.getAlias(),
              description: updatedUserProfile.getDescription(),
              image_src: updatedImageSrc,
              post_num: updatedUserProfile.getPostNum(),
              follower_num: updatedUserProfile.getFollowerNum(),
              following_num: updatedUserProfile.getFollowingNum()
            });
        } else {
          await dependencies
            .db('users_table')
            .where('user_id', updatedUserProfile.getId())
            .update({
              user_name: updatedUserProfile.getUserName(),
              alias: updatedUserProfile.getAlias(),
              description: updatedUserProfile.getDescription(),
              post_num: updatedUserProfile.getPostNum(),
              follower_num: updatedUserProfile.getFollowerNum(),
              following_num: updatedUserProfile.getFollowingNum()
            });
        }

        return updatedUserProfile.getId();
      } catch (e) {
        if (e instanceof Error && e.message.includes('duplicate key value')) {
          throw new ConflictError('username already exists');
        }
        throw e;
      }
    }

    async function getOne(userId: string): Promise<UserProfile> {
      const result = await dependencies
        .db('users_table')
        .where('user_id', userId)
        .first();

      if (result) {
        return Object.freeze({
          id: result.user_id,
          userName: result.user_name,
          alias: result.alias,
          description: result.description ?? '',
          imageSrc: result.image_src ?? undefined,
          postNum: result.post_num,
          followerNum: result.follower_num,
          followingNum: result.following_num
        });
      }

      throw new NotFoundError('User Profile doest not exist in database.');
    }

    async function filter(userName: string): Promise<UserProfile[]> {
      const result = await dependencies
        .db('users_table')
        .where('user_name', 'like', `%${userName}%`);

      return result.map((user) => {
        return Object.freeze({
          id: user.user_id,
          userName: user.user_name,
          alias: user.alias,
          description: user.description ?? '',
          imageSrc: user.image_src ?? undefined,
          postNum: user.post_num,
          followerNum: user.follower_num,
          followingNum: user.following_num
        });
      });
    }
  };
}
