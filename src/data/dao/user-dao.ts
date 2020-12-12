import {
  UserDao,
  NewUserProfile,
  UpdatedUserProfile,
  UserProfile
} from '../../utilities/types';

export default function makeBuildUserDao() {
  return function buildUserDao(): UserDao {
    return Object.freeze({
      insert,
      update,
      getOne,
      filter
    });

    async function insert(newUserProfile: NewUserProfile): Promise<string> {
      throw new Error('Not yet implemented.');
    }

    async function update(
      updatedUserProfile: UpdatedUserProfile
    ): Promise<string> {
      throw new Error('Not yet implemented.');
    }

    async function getOne(userId: string): Promise<UserProfile> {
      throw new Error('Not yet implemented.');
    }

    async function filter(userName: string): Promise<UserProfile[]> {
      throw new Error('Not yet implemented.');
    }
  };
}
